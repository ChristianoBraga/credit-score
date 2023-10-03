#!/usr/bin/bash

m4 -DPATH="$PWD" credit-score-use-case.lurk > csuc.lurk.tmp
time lurk csuc.lurk.tmp
rm csuc.lurk.tmp
