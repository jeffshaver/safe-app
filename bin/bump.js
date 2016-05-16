const exec = require('child_process').execSync
const path = require('path')
const semver = require('semver')
const jsonFile = require('json-file-plus')
const args = process.argv.slice(2)
const type = args[0]
const shouldCommit = args.indexOf('--commit') !== -1
const shouldTag = args.indexOf('--tag') !== -1

if (['major', 'minor', 'patch'].indexOf(type) === -1) {
  throw new Error('You must pass in `major`, `minor` or `patch`')
}

jsonFile('package.json', updatePackageJson)

function updatePackageJson (err, file) {
  file.get('version')
    .then(function(version) {
      const newVersion = semver.inc(version, type)

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