#!/usr/bin/env node

const yargs = require("yargs/yargs");

const lintCmd = require("@commands/lint/command");

const versionCmd = require("@commands/version");

const scanCmd = require("@commands/scan");

const cli = require("@fip/fip");

function executeTool() {
  cli(process.argv.slice(2))
    .command(lintCmd)
    .command(versionCmd)
    .command(scanCmd).argv;
}

executeTool();
