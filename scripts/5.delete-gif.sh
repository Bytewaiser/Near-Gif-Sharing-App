#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$ACCOUNT" ] && echo "Missing \$ACCOUNT environment variable" && exit 1

echo
echo 'About to call del() on the contract'
echo near call $CONTRACT del '{"id":'"$1"'}' --account_id $ACCOUNT
echo
echo \$CONTRACT is $CONTRACT
echo \$ACCOUNT is $ACCOUNT
echo
near call $CONTRACT del '{"id":'"$1"'}' --account_id $ACCOUNT
