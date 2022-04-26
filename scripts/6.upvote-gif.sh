#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$ACCOUNT" ] && echo "Missing \$ACCOUNT environment variable" && exit 1
[ -z "$ACCOUNT_OTHER" ] && echo "Missing \$ACCOUNT environment variable" && exit 1

echo
echo 'About to call downVote() on the contract'
echo near call $CONTRACT downVote '{"id":'"$1"'}' --account_id $ACCOUNT_OTHER --amount $2
echo
echo \$CONTRACT is $CONTRACT
echo \$ACCOUNT_OTHER is $ACCOUNT_OTHER
echo
near call $CONTRACT downVote '{"id":'"$1"'}' --account_id $ACCOUNT_OTHER --amount $2
