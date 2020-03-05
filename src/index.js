const { WebClient } = require('@slack/web-api')
const core = require('@actions/core')

const client = new WebClient(process.env.SLACK_TOKEN)
const args = JSON.parse(core.getInput('args'))

client.chat.postMessage(args).catch(error => {
  core.setFailed(error.message)
  // console.log(error.message)
})
