# sst-agent-setup

**SST setup for max AI development productivity!**

SST's dev mode runs a full-stack cloud app in a local dev environment, with hot reloading of app and infra changes and powerful log viewers providing a fast feedback loop.

We're all now using AI coding assistants to write code and fix issues in long agentic loops. However current models can get stuck trying to work with SST dev mode, trying to start duplicate servers, struggling to discover app endpoints, not seeing logs etc.

This project demonstrates a setup that helps agents to work with SST dev mode:

- Rules to help the agent discover logs, app status, endpoints etc.
- The excellent [Browser MCP](https://browsermcp.io/) for agent browser use.

> A key principle is that you as the human developer runs `npx sst dev` in your terminal. The AI agent then interacts with the app. This helps you see for yourself what's going on as the AI develops, and avoids the creation of multiple app instances,

The project is a simple React Router app. You can easily apply the setup to any SST application. 

## Getting started

### Prerequisites

- **This setup is for SST v3 only**, though it should be pretty easy to adapt to v2 if required.
- Some familiarity with SST is assumed. 
- Instructions are for MacOS or Linux only.

### Install Browser MCP

- Install and start Browser MCP: https://docs.browsermcp.io/welcome

### Quick start (Cursor)

Assuming you have Cursor and a basic dev environment configured to point to your AWS account...

- `git clone https://github.com/martinpllu/sst-agent-setup`
- `cd sst-agent-setup`
- `pnpm install` or `npm install`
- `npx sst dev`
- Open the app in Cursor
- Get vibe coding, e.g. "Turn this app into an Anki clone. Use DynamoDB and Cognito". Watch the agent interact with SST logs and app endpoints.


### Applying the setup to your app

If you have an existing SST app, apply the setup as follows:

- If you're using a web app like React, React Router, Svelte or NextJS, modify the `dev` command in `package.json`, adding `> .sst/log/web.log 2>&1` to the end of the command. (This sends the output of the local web app to the logs directory. This is necessary as SST doesn't currently capture web app output in a file).
- Copy `env.sh` to your workspace and add any required setup (e.g. AWS account config).
- Copy the rules from `.cursor/rules/sst-local-dev.mdc` to the same path in your workspace.
- If you're using something other than Cursor put the rules wherever they get picked up (e.g. `CLAUDE.md` for Claude Code).

## Notes

- Tested mainly with Claude Sonnet 4 which has good knowledge of SST v3.

## Why not use an MCP server?

I built a working MCP server to achieve the equivalent of the above, and tried various approaches including using the websockets/streaming APIs to connect to a running server, and spawning `npx sst dev --mode=mono` as a child process to capture stdio. However I found that a rules-based approach is simpler and more effective, and easier to adapt to a user's specific requirements. 
