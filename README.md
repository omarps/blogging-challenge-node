# blogging-challenge-node

Table of Contents
=================

   * [blogging-challenge-node](#blogging-challenge-node)
      * [Description](#description)
      * [Context](#context)
      * [Technology Stack](#technology-stack)
         * [Development dependencies](#development-dependencies)
      * [Development environment](#development-environment)
         * [Environment variables](#environment-variables)
         * [Project setup](#project-setup)
         * [Scripts](#scripts)
      * [Challenge tasks](#challenge-tasks)
         * [Routes](#routes)
         * [Mongo database](#mongo-database)
      * [Extras](#extras)
      * [Future steps](#future-steps)

Created by [gh-md-toc](https://github.com/ekalinin/github-markdown-toc)

## Description
Create a minimal expression (from your perspective) of a blogging platform. (Only the backend)

## Context
Full detailed instructions here: [challenge-node-js.pdf](https://github.com/omarps/blogging-challenge-node/blob/master/challenge-node-js.pdf)

## Technology Stack
The different technologies that we used in the project are:
- Node JS
- Express JS
- MongoDB
### Development dependencies
Additional to those techs, we add some components and development dependencies:
- Nodemon as development server.
- Awilix to handle DI ascross the app layers.
- Mocha as a testing framework.
- Mongoose for object data modeling.
- ESLint to improve code quality.
- Other depdencies: CodeCov, supertest, dotenv, etc.

## Development environment
To run the project locally cover this topics.
### Requirements
 - Node version v10.x.x. (v10.15.3 was used)
- Yarn
- MongoDB. ([get from here](https://docs.mongodb.com/manual/installation/))
- Some sort of REST Client. (Advance REST Client, Insomnia, etc)
### Environment variables
Look for `.env.example`, copy and rename to `.env`, and replace the values with these values:
```
REST_API_PORT=3000
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DBNAME=blog
TEST_MONGODB_HOST=localhost
TEST_MONGODB_PORT=27017
TEST_MONGODB_DBNAME=blog-test
```
### Install
👾Just run `yarn` command and thats it.
### Scripts
📝 Here is the list of commands available for the project.

| Name | Command | Description |
|---|---|---|
| start | `yarn start`   | Starts the `/api` endpoint, go open your `http://localhost:3000` and enjoy.  🚀 |
| lint | `yarn run lint` | Runs the linter task to look for code smells and improvements. 👹 |
| test | `yarn run test` | Runs the test suite for the blogging app. 🤖 |

## Challenge tasks
💰 For the MVP of the Blogging App we cover these requirements:
- [x] Http server developed in Node.
- [x] `/api/posts` endpoints that basic REST operations.

### Routes
🎢 `/api/posts` REST operations.

| Endoint | Type | Description | Params/Body | Response |
|---|---|---|---|---|
| `/api/posts` | GET | Get the list of posts. | Param: `?q=` (optional) | List of filtered posts. |
| `/api/posts` | POST | Create a new post. | Body: `<Post object>` | Persisted post object. |
| `/api/posts/:id` | GET | Get a post by id. | Param: `:id` | Post object. |
| `/api/posts/:id` | DELETE | Remove a post. | Param: `:id` | Remove post object. |
| `/api/posts/:id` | PUT | Update a post. | - Param: `:id`  | Update post object. |
||||Body: `<attrs object>`|


### Mongo database
💾 The `blog` database contains a single collection with the `post` definition.

| Field | Type | Description |
|---|---|---|
| title  | String | The title  |
| text   | String | The text  |
| author | String | The status enum: draft, private, public  |

## Extras
🌶 For additional flavor to the blogging app we add these:
- [x] A built-in enum attribute on mongoose, to support the post status. #️⃣
- [x] Mocha tests to cover the blog post CRUD operations. ☕️
- [x] Linter to look for code smells and improvements. 👹
- [x] Text search across all of the post attributes. (single `q=` param to rule them all. 💍)
## Future steps
🦄 For future steps we can consider these items:
- [ ] Add more tests to cover the diferent layers of the app. (services, models)
- [ ] Create a UI, maybe in React, to use the `/api` endpoint.
- [ ] Add security and user identification.
