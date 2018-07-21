[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

# teravoz-challenge

# Notable Packages

Prettier
Lint-stage
Ava
Nextjs

## Project Structure
This is a monorepo made using [lerna](https://github.com/lerna/lerna) to manage multiple packages.

It contains 3 different applications:
   - dashboard: A little dashboard in React, showing current active calls.
   - api: Exposes current active calls via http and handle teravoz event by exposing a /webhook endpoint.
   - teravoz-fake: A http service that mimics the teravoz api.

Even though there's no shared packages for this trivial application, the monorepo structure is convenient to use a single linting and formatting set of rules.

## Overview

The application teravoz-fake hammers the api's /webhook, the api is responsible for keeping track of returning users and delegating calls, it also
notifies the dashboard's application about active calls. The dashboard keeps a inmemory list of active calls and displays them in a table.
