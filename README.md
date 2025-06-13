# SST-agent-setup

**Set up your [SST](https://sst.dev/) app for max AI productivity!**

AI agents are great at writing code and getting feedback from linters, unit tests etc. However they can get stuck when working with the full app: testing  via the UI, restarting, looking at logs etc. 

This project demonstrates a setup that helps the agent work with a full-stack SST app running locally in dev mode. 

- Makes all application/SST logs visible to the agent
- Defines rules on how to work with the app
- Enables browser control via the excellent [Browser MCP](https://browsermcp.io/) 

The demo uses a simple React Router app. You can easily apply the setup to any SST v3 app.

## Getting started

### Prerequisites

**This setup is for SST v3 only**, though it should be pretty easy to adapt to v2 if required.

- Some familiarity with SST is assumed. 
- Instructions are for MacOS or Linux only
- Install and start Browser MCP: https://docs.browsermcp.io/welcome

### Quick start (Cursor)

Assuming you have Cursor and a basic dev environment configured to point to your AWS account....

- `git clone https://github.com/martinpllu/sst-agent-setup`
- `cd sst-agent-setup`
- `pnpm install` or `npm install`
- `npx sst dev`
- Open the app in Cursor
- Get vibe coding, e.g. "Turn this app into an Anki clone. Use DynamoDB and Cognito". Watch the agent interact with SST logs and app endpoints.


### Applying the setup to your app

- If you're using a web app like React, React Router, Svelte or NextJS, modify the `dev` command in `package.json`, adding `> .sst/log/web.log 2>&1` to the end of the command. This sends the output of the local web app to the logs directory (this is necessary as SST doesn't currently capture web app output in a file)
- Copy `env.sh` to your workspace, add any required setup (e.g. AWS account config)
- Copy the rules from `.cursor/rules/local-app.mdc` to the same path in your workspace.
- If you're using something other than Cursor put the rules wherever they get picked up (e.g. `CLAUDE.md` for Claude Code).

## Notes

- Tested mainly with Claude Sonnet 4 which is great at using tools and staying on task, and has good knowledge of SST v3.

## Why not use an MCP server?

I built a working MCP server to achieve the equivalent of the above, and tried various approaches including using the websockets/streaming APIs and running `npx sst dev --mode=mono` to capture stdio. However overall I found that simple rules work better, and will also be easier to adapt to a user's specific requirements.
