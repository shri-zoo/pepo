#!/usr/bin/env node

var program = require('commander');

program
    .version('0.0.1')
    .command('create [number]', 'Fill DB with random users').alias('c')
    .command('drop', 'Drop users && messages collections').alias('d')
    .parse(process.argv);
