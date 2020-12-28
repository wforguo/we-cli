#!/usr/bin/env node

const commander = require('commander');
commander
    .version(require('../package').version)
    .usage('<command> [options]')
    .command('init', 'init a project')
    .command('create <app-name>', 'create a project')
    // .description('create a project')
    .parse(process.argv);
