#!/bin/bash
cd /home/ubuntu/bsa-2019-fantasy-faker/
yarn
pm2 start --interpreter=./node_modules/.bin/babel-node server.js --name FantasyFaker
