# A simple credit-score proof generation and verification in Lurk

## Context

This is a simple example of how Lurk can be used in the zero knowledge
verification of someone's credit score. 

The protocol is as follows. 
1. Someone has one's credit report as
illustrated in file [credit-score.json](credit-score.json), where
credit-relevant information is stored, safely emitted by an
issuer. Such a report can be represented in Lurk as illustrated in
file [credit-score.lurk](credit-score.lurk), which is a quite close
representation of it's JSON counterpart. 
2. This person now wants to use
one's credit report to apply for a mortgage, for example. The
financial institution, which grant the loan, needs then to send its
credit report evaluation algorithm, in the form of functional
commitment of in Lurk itself, may it be publicly distributed, to the
person requesting the mortgage. This is represented in file
[query.lurk](query.lurk), where a few predicates are applied to the
Lurk representation of the credit score. 
3. Finally, file
[credit-score-use-case.lurk](credit-score-use-case.lurk) puts it all
together by first loading the credit-report data, then the credit
evaluation algorithm, checks if the credit report (bound to variable
`cs`) has a good enough score and finally produces of proof of it. 
4. After sent to the financial institution, the proof can be checked
and the loan is then granted. 

## Installation and execution

### Without Hardhat

1. Install Rust: https://www.rust-lang.org/
2. Install Lurk: https://www.lurk-lang.org/
3. Clone this repo: `git clone
   https://github.com/ChristianoBraga/credit-score`
4. Open a shell.
5. Change to `credit-score/src/js` directory.
6. Run `lurk credit-score-use-case.lurk`
7. Run `lurk verify "Nova_Pallas_10_29beb536d2984dff8873c750f831cd1cf41df2b7c7433480036829804a227637"`

### With Hardhat 

**(DRAFT)**

A **warm** and **big** _thank you_ to [Pedro
Magalhães](https://www.linkedin.com/in/pemagalhaes), CTO of
[FormulaChain](https://www.linkedin.com/company/formulachain/), for
the Solidity [event
scheme](https://github.com/Formula-Chain/etherListen) this example is
based on.

#### Install Hardhat
#### Initialize a Hardhat project
#### Generate a credit-score proof 
    1. `cd src/lurk/`
    2. `lurk credit-score-use-case.lurk`
    3. `cp ~/.lurk/proofs/Nova_Pallas_10_29beb536d2984dff8873c750f831cd1cf41df2b7c7433480036829804a227637.proof ../../`
    4. `cd ../../`
#### Send the proof on chain and notify verifier
    1. `npx hardhat console --network localhost`
    2. `await hre.run("demo", {key:"Nova_Pallas_10_29beb536d2984dff8873c750f831cd1cf41df2b7c7433480036829804a227637"})`
