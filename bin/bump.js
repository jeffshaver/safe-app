const exec = require('child_process').execSync
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
  try {
    exec('git status | grep -q "CHANGELOG.md"')
  } catch (e) {
    throw new Error('You must update CHANGELOG.md in order to bump the version')
  }

  file.get('version')
    .then(function(version) {
      const newVersion = semver.inc(version, type)

      file.set({'version': newVersion})
      file.save()
        .then(function () {
          process.stdout.write(`updated package.json to version: ${newVersion}\n`)
          if (shouldCommit) {
            exec('git add package.json CHANGELOG.md && git commit -m "' + newVersion + '"')
          }

          if (shouldTag) {
            exec(`git tag -a v${newVersion} -m "${newVersion}"`)
          }
        })
        .catch(function () {
          process.stdout.write('could not update package.json\n')
        })
    })
}