// const core = require('@actions/core')
// const { exec } = require("child_process")
//
// try {
//   const command = core.getInput('command')
//
//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       core.setOutput('log', error.message)
//       core.error(error.message)
//       return
//     }
//     if (stderr) {
//       core.setOutput('log', stderr)
//       core.error(stderr)
//       return
//     }
//     core.setOutput('log', stdout)
//     core.info(stdout)
//   })
// } catch (error) {
//   core.setFailed(error.message)
// }

const core = require('@actions/core')
const { spawn } = require('child_process')

const command = core.getInput('command').split(' ')

const execution = spawn(command[0], command.slice(1))

let log = ''

execution.stdout.on('data', data => {
  log = log + data
  core.info(`STDOUT: ${data}`);
});

execution.stderr.on('data', data => {
  log = log + data
  core.info(`STDERR: ${data}`);
});

execution.on('error', (error) => {
  log = log + error.message
  core.info(`ERROR: ${error.message}`);
});

execution.on('close', (code) => {
  core.info(`LOG: ${log}`)
  core.setOutput('log', log)
});
