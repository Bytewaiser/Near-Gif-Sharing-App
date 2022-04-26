#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$ACCOUNT" ] && echo "Missing \$ACCOUNT environment variable" && exit 1

echo
echo 'About to call create() on the contract'
echo near call \$CONTRACT create '{"gifLink":"$1"}' --account_id \$ACCOUNT --amount \$1
echo
echo \$CONTRACT is $CONTRACT
echo \$ACCOUNT2 is $ACCOUNT
echo \$1 is [ $1 ] '(the gif)'
echo \$2 is [ $2 NEAR ] '(optionally attached amount)'
echo
near call $CONTRACT create '{"gifLink":"'"$1"'"}' --account_id $ACCOUNT --amount $2
