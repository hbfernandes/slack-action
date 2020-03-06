const { WebClient } = require('@slack/web-api')
const core = require('@actions/core')

const client = new WebClient(process.env.SLACK_TOKEN)

const method = core.getInput('method').split('.')
const args = JSON.parse(core.getInput('args'))

let methodFn = client
method.forEach(methodPart => {
  if (methodFn[methodPart]) {
    methodFn = methodFn[methodPart]
  } else {
    core.setFailed(`Method '${method}' does not exist`)
  }
})

methodFn(args).catch(error => {
  console.log(error.data)
  core.setFailed(error.message)
})
