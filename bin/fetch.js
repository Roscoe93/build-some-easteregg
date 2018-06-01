#!/usr/bin/env node
const fetch = require("../fetch");
const { l, n, s } = require("yargs").argv;
fetch(l, n, s);
