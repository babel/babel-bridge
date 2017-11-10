"use strict";
const packageJsonCodemod = require('./lib/package-json-codemod');
const testPath = "./test/package.json";
packageJsonCodemod(testPath);
