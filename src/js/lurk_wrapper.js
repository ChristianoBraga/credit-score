exports.verify = (key, proof, proof_dir) => {
    const fs = require('fs');
    const proc = require('node:child_process');
    const spawn = require('node:child_process').spawn;

    fs.writeFileSync(proof_dir + key +'.proof',
                     new Buffer.from(proof, 'hex'));

    const lurk  = spawn('lurk',
                        ['verify', '--proofs-dir', proof_dir, key]);
    return lurk;
} ;

