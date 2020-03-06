# Slack API Action
This action wraps the [Slack Web API](https://api.slack.com/web) in an action to facilitate usage within workflows.

## Setup
This actions performs it's actions using a slack bot token. To acquire one you need to create a Slack App, add the Bot token scope permissions required for the api calls you intend to perform and install it into your workspace. Once this is done the workspace token is available on the permissions page of your app and you can start using this action. 

## Usage
Send a basic text message to a channel.
```
- name: Slack Message                     
  uses: hbfernandes/slack-action@master
  env:
    SLACK_TOKEN: ${{ secrets.SLACK_TOKEN }}   
  with:
    args: |
      {
        "channel": "development",
        "text": "testing slack messaging"
      }
```

The `SLACK_TOKEN` environment variable must be present and have the necessary permissions for the method being used.

By default the api method is [chat.postMessage](https://api.slack.com/methods/chat.postMessage) but you can define any other method suported by the [`@slack/web-api`](https://slack.dev/node-slack-sdk/web-api) package provided by the [Node Slack SDK](https://slack.dev/node-slack-sdk/).

```
- name: Slack Message                     
  uses: hbfernandes/slack-action@master   
  with:
    method: conversations.list
```

The args parameter expects a string in the JSON format with any parameter that the method accepts. This way any custom message formatting is allowed.

A more complex message:
```
- name: Slack Message                     
  uses: hbfernandes/slack-action@master   
  with:
    args: |
      {
        "channel": "development",
        "attachments": [
          {
            "mrkdwn_in": ["text"],
            "color": "#36a64f",
            "pretext": "Built branch ${{ github.ref }}",
            "author_name": "${{ github.actor }}",
            "author_link": "http://flickr.com/bobby/",
            "author_icon": "https://placeimg.com/16/16/people",
            "title": "${{ github.workflow }}",
            "title_link": "https://api.slack.com/",
            "text": "Optional `text` that appears within the attachment",
            "thumb_url": "http://placekitten.com/g/200/200",
            "footer": "Github Actions",
            "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
            "ts": 123456789
          }
        ]
      }
```

## Development
To build the action simply run:
```
npm run package
```

## ToDo
Custom predefined message formats might be added in the future if needed. 