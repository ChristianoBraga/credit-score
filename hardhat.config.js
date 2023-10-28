require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
      hardhat: { gas: "auto", },
      localhost: {
          gas: "auto", 
          url: "http://127.0.0.1:8545"
      },
  },
};

task("deploy", "Deploys VerifyProof contract.", async (taskArgs, hre) => {
    const VerifyProof = await hre.ethers.getContractFactory("VerifyProof");
    const eventVerify = await VerifyProof.deploy();

    await eventVerify.deployTransaction.wait() ;
    console.log("Contract deployed at: ", eventVerify.address);
    return eventVerify.address ;
});

task("listen", "Starts listening to VerifyProof events.")
    .addPositionalParam("address", "Constract address.")
    .setAction(async (taskArgs, hre) => {
    const VerifyProof = await hre.ethers.getContractFactory("VerifyProof");
    const contract = VerifyProof.attach(taskArgs.address);

    contract.on("VerifyProof", (de, key, proof, event) => {
        const lw = require('./src/js/lurk_wrapper.js')            
        const lurk = lw.verify(key, proof, './proofs/');
        lurk.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        lurk.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        
        lurk.on('close', (code) => {
            console.log(`Child process exited with code ${code}.`);
        });

    });
        
    console.log(`Listening to events for: ${taskArgs.address}`);
}) ;

task("trigger", "Triggers a VerifyProof event.")
    .addPositionalParam("key")
    .addPositionalParam("address")
    .setAction(async (taskArgs) => {
        const VerifyProof = await hre.ethers.getContractFactory("VerifyProof");
        const contract = VerifyProof.attach(taskArgs.address);
        const fs = require('fs') ;      
        const proof = fs.readFileSync(taskArgs.key + '.proof');
        await contract.fireVerifyProof(taskArgs.key, proof.toString('hex'));

        console.log("VerifyProof Event triggered for proof key " + taskArgs.key);
    }) ;

task("demo", "Runs an event demo.")
    .addPositionalParam("key")
    .setAction(async (taskArgs) => {
    addr = await hre.run("deploy");
    await hre.run("listen", {address : addr});
    await hre.run("trigger", {key : taskArgs.key, address: addr});
});

