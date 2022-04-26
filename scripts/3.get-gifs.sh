#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1

echo
echo 'About to view get() on the contract'
echo near view \$CONTRACT get
echo
echo \$CONTRACT is $CONTRACT
echo
near view $CONTRACT get
