#!/bin/bash

git status | grep captures
if [ $(git status | grep captures | wc -l | awk '{print $1}') -ne "0" ]; then
  echo "Screenshot comparison failed. There are changes to baseline captures."
  git status | grep captures
  exit 1
fi
