// Replace babel-cli to @babel/core
const fs = require("fs");

const packageName = '@babel/core';
const packageVersion = '7.0.0-beta.31';
const packageJsonPath = 'package.json'; // path for package.json in the root dir;


module.exports = function readPackageJson(path = packageJsonPath) {
  fs.readFile(path, function (err, data) {
    if (err) {
      console.error(err);
      return;
    }
    const dataStr = data.toString();
    let updateStr = updatePackageJson(dataStr);
    writeToPackageJson(updateStr, path);
  });
}

function updatePackageJson(text) {
  const json = JSON.parse(text);
  let keys = Object.keys(json.dependencies);
  const hasBabelCli = keys.indexOf('babel-cli') !== -1;

  if(!hasBabelCli) {
    console.log("babel-cli not found in package.json file");
    return;
  }
  const dependencies = json.dependencies;
  for(const key in dependencies) {
    if(key === 'babel-cli') {
      delete json.dependencies[key];
      json.dependencies[packageName] = packageVersion;
    }
  }
  return JSON.stringify(json);
}

function writeToPackageJson(data, path) {
  fs.writeFile(path, data, function(err, data){
    if(err) {
      console.error(err);
    }
    console.log('Updated successfully!!');
  });
}
