var exec = require('child_process').execSync
var path = require('path')
var semver = require('semver')
var jsonFile = require('json-file-plus')
var args = process.argv.slice(2)
var type = args[0]
var shouldCommit = args.indexOf('--commit') !== -1
var shouldTag = args.indexOf('--tag') !== -1

if (['major', 'minor', 'patch'].indexOf(type) === -1) {
  throw new Error('You must pass in `major`, `minor` or `patch`')
}

jsonFile('package.json', updatePackageJson)

function updatePackageJson (err, file) {
  file.get('version')
    .then(function(version) {
      var newVersion = semver.inc(version, type)

      file.set({'version': newVersion})
      file.save()
        .then(function () {
          console.log('updated package.json to version: ', newVersion)
          if (shouldCommit) {
            exec('git add package.json && git commit -m "' + newVersion + '"')
          }

          if (shouldTag) {
            exec('git tag -a v' + newVersion + ' -m "' + newVersion + '"')
          }
        })
        .catch(function () {
          console.log('could not update package.json')
        })
    })
}