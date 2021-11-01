# Tasks project

This project contains the backend test for Northone.

## Requirements

Install the service dependencies:
```sh
npm i
```

To start the service:
```sh
npm run start
```

The service is configured to run by default on `http://localhost:5000`
It also needs to have a mongo instance running, by default the service expects it to be running on `mongodb://localhost:27017`

## Project overview

The project starts a service to support the creation and maintenance of tasks and categories that can be added to tasks. The tasks can have subtasks. As the exercise mentions, any task can have subtasks, so I decided to allow subtasks to also have them. There's a config value `MAX_NESTED_LEVEL` that indicates how deep you can go with subtasks.

## Services
This is an overall view of the services implemented to satisfy the exercise requirements and bonus features. More explanations and in depth look will be taken during the demo.

### Tasks
`POST /api/v1/task`: Body and data validators have been added to create tasks.  Allows the creation of subtasks by specifying the `parentId` in the body. Subtasks can have subtasks. Nesting level is defined by a config value `MAX_NESTED_LEVEL`.

`GET /api/v1/tasks`: Get all tasks in db. A search function has been added that accept query params. Deleted tasks are added by default.

`GET /api/v1/tasks/:taskId`: Gets one task. Deleted tasks won't be returned.

`PATCH /api/v1/tasks/:taskId`: Update single task service. Body and data validators have been added. If a task with subtasks gets its `dueDate` changed, all subtasks whose `dueDate` are after the new date, will have their date updated.

`DELETE /api/v1/tasks/:taskId`: Deletes a task. If the task has subTasks, these will be erased too.

Tasks and subtasks are used like a tree structure. There are recursive functions like deleting all nodes from a parent or calculating the current tree depth to avoid infinite nesting.
### Categories

`POST /api/v1/category`: Service to create categories. Body validators added.

`GET /api/v1/categories`: Gets all available categories.

## Tests
Two types of tests were used:
- Unit tests: These tests validate managers functions used.
- Integration tests: These tests start the service locally and hits the API to validate different scenarios.

Tests were done using `jest`. I have more experience using `mocha` and other tools (`sinon`, `proxyQuire`, etc.) but decided to use jest for its simpler syntax. I am aware that mocha tests run faster but I prefered to write tests in a more comfortable way given the exercise requirements.

To run tests, use:
```sh
npm run test
```
## Requirements implemented
- CRUD methods over tasks: :white_check_mark:
- Make simple to see when things are due: :white_check_mark:
- Create and assign categories: :white_check_mark:
- Search functionality: :white_check_mark: -ish
- Calendar view: :x:
- Attach files: :x:
- User accounts: :x: Wanted to tackle this one next, adding an auth collection with email/phone number and a header validator middleware to verify that the userId (in a jwt token) exists and it's valid.
- Email or text reminders before a task is due: :x: Thought of doing this with a cronjob but needed the auth collection to validate userIds and get users info.
- Subtasks: :white_check_mark:
- Filter: :white_check_mark:

## Conclusion
The project uses Typescript to serve a REST API to create and maintain tasks. The exercise asks to prioritize speed versus build time and in hindsight, going for NodeJS would have been a better option to just deliver the requirements and not thinking about the implementation or types. Nevertheless, I think that going for Typescript and enforcing strong typing will give a more robust experience over all.

I spent most of the time with the sub tasks feature and adding tests, probably could have skipped some tests and focused more on showing features in the demo but I also wanted to show how much testing I find it's required for anything.

At the end I was rushing a little trying to find more things to polish and show in the demo and some tests are not well written, code is repeated and not all types have been verified. 