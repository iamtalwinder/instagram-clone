# Contributing

Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Important Notes

1. Issues that have the label `first-timers-only` is made for beginners who have contributed to less than 5 repositories. This is a way to help people who are new to open source and contributing.
2. Before contributing to an issue, make sure that no one is assigned or has taken that issue. If no one is and you would like to work on the issue, please comment on the issue to let others know that someone is working on the issue.
3. Before creating a pull request, it is **important** that you make sure your branch and repository are up to date with this one. Some conflicts can be resolved, but many are hard to resolve. **Add the upstream** branch and always keep your branch up to date.

# Contents

- [Contributing](#contributing)
  - [Important Notes](#important-notes)
- [Contents](#contents)
- [Instructions](#instructions)
  - [Contributing to frontend](#contributing-to-frontend)
  - [Contributing to backend](#contributing-to-backend)
    - [Adding SQL code](#adding-sql-code)
    - [Adding a new model](#adding-a-new-model)
    - [Adding a new middleware](#adding-a-new-middleware)
    - [Adding a new controller](#adding-a-new-controller)
      - [Add new controller with existing model](#add-new-controller-with-existing-model)
      - [Add new controller with new model](#add-new-controller-with-new-model)
    - [Adding a new route](#adding-a-new-route)
      - [Add new route with existing controller](#add-new-route-with-existing-controller)
      - [Add new route with new controller](#add-new-route-with-new-controller)
  - [Create Pull Request](#create-pull-request)
    - [Note on abandoned pull requests](#note-on-abandoned-pull-requests)

# Instructions

1. Fork the repository.

## Contributing to frontend

1. If you are creating a new page, create a file in `client/src/pages` and then add a new route for this page in `client/App.js`.

2. Create new components in `client/src/components`.
3. Create custom hooks in `client/src/hooks` and remember to export them from `client/src/hooks/index.js`.

4. Create a new context in `client/src/context`, and it should export **context**, **actionTypes** and **contextProvider**.

5. When adding `css files` only use [css modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/s).

6. Always remember to destructuring props at top like this:

   ```js
   function Component( { prop1, prop2 } ) {...}
   ```

   This way, it is easy to know what props a component needs to work.

   **Note some components don't follow this, but it will change in future versions.**

## Contributing to backend

Backend follows [mvc model](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).

### Adding SQL code

1. SQL code that requires to setup database (CREATE TABLE, CREATE USER and ALTER TABLE etc.) should be in script.sql.
2. All queries related to a table should be in their corresponding model.
3. If query dosen't fit into any model (START TRANSACTION, and COMMIT etc.) put it in `Utils model`.

### Adding a new model

1. All the models should be in `server/model` folder.
2. Each modal should follow the following template.

   ```js
   module.exports = {
     query1: (con, param1, param2) => {
       return new Promise((resolve, reject) => {
         con.query(`your query`, (err, result) => {
           if (err) reject(err);
           else resolve(result);
         });
       });
     },

     query2: (con, param1, param2) => {
       return new Promise((resolve, reject) => {
         con.query(`your query`, (err, result) => {
           if (err) reject(err);
           else resolve(result);
         });
       });
     },
   };
   ```

### Adding a new middleware

All the middlewares should be in `server/routes/middleware` folder.

### Adding a new controller

For every model, there is a corresponding controller folder.

```bash
|-- server
|   |-- controller
|   |   |-- comment
|   |   |-- explore
|   |   |-- feeds
|   |-- model
|   |   |-- Comment.js
|   |   |-- Explore.js
|   |   |-- Feeds.js
```

Each controller folder has a dedicated file for each function.

```bash
|-- server
|   |-- controller
|   |   |-- comment
|   |   |   | -- deleteComment.js
|   |   |   | -- getComment.js
|   |   |   | -- index.js
|   |   |   | -- postComment.js
```

All these functions are exported form `index.js` like this:

**server/controller/comment/index.js**

```js
const postComment = require("./postComment");
const deleteComment = require("./deleteComment");
const getComments = require("./getComments");

module.exports = {
  postComment,
  deleteComment,
  getComments,
};
```

#### Add new controller with existing model

1. Add a new file (which exports a function) in the `server/contoller` folder.

   The following example shows you how you would go about adding a new controller function in the existing comment controller.

   ```bash
   |-- server
   |   |-- controller
   |   |   |-- comment
   |   |   |   | -- deleteComment.js
   |   |   |   | -- getComment.js
   |   |   |   | -- index.js
   |   |   |   | -- postComment.js
   |   |   |   | -- newContollerFunction.js
   ```

   **server/controller/comment/newContollerFunction.js**

   ```js
   const Comment = require("../../model/Comment");

   module.exports = async (req, res) => {};
   ```

2. Export that function from `index.js`.

   **server/controller/comment/index.js**

   ```js
   const postComment = require("./postComment");
   const deleteComment = require("./deleteComment");
   const getComments = require("./getComments");
   const newContollerFunction = require("./newContollerFunction");

   module.exports = {
     postComment,
     deleteComment,
     getComments,
     newContollerFunction,
   };
   ```

#### Add new controller with new model

1. Add a file with necessary sql queries in `server/model` folder.

   ```bash
   |-- server
   |   |-- model
   |   |   |-- New.js
   ```

2. Create a folder in `server/controller` folder with `index.js` and new controller file.

   ```bash
   |-- server
   |   |-- controller
   |   |   |-- new
   |   |   |   | -- newContollerFunction.js
   |   |   |   | -- index.js
   ```

   **server/controller/new/newContollerFunction.js**

   ```js
   const New = require("../../model/New");

   module.exports = async (req, res) => {};
   ```

   **server/controller/new/index.js**

   ```js
   const newContollerFunction = require("./newContollerFunction");

   module.exports = {
     newContollerFunction,
   };
   ```

### Adding a new route

For every controller, there is a corresponding routes file.

```bash
|-- server
|   |-- controller
|   |   |-- comment
|   |   |-- explore
|   |   |-- feeds
|   |-- routes
|   |   |-- comment.js
|   |   |-- explore.js
|   |   |-- feeds.js
|   |   |-- index.js
```

Each file exports a router.

**server/controller/routes/comment.js**

```js
const express = require("express");
const commentController = require("../controller/comment");
const auth = require("./middleware/auth");

const router = express.Router();

router.post("/comment", auth, commentController.postComment);
router.delete("/comment", auth, commentController.deleteComment);
router.get("/comments", auth, commentController.getComments);

module.exports = router;
```

**_Note how each controller function has its own route_**

These routers are all collectively exported from `server/routes/index.js`.

**server/routes/index.js**

```js
const user = require("./user");
const follow = require("./follow");
const post = require("./post");
const comment = require("./comment");
const postLike = require("./postLike");
const feeds = require("./feeds");
const explore = require("./explore");

module.exports = {
  user,
  follow,
  post,
  comment,
  postLike,
  feeds,
  explore,
};
```

In `server/server.js` the following code exposes the routes.

```js
const express = require("express");
const routes = require("./routes");
const app = express();

for (const router in routes) {
  app.use("/api/", routes[router]);
}

app.listen(process.env.PORT, () => {
  console.log(`Listening at ${process.env.PORT}`);
});
```

#### Add new route with existing controller

1. Go to the corresponding routes file.
2. Add the route like this:

   ```js
   router.get(
     "/route-with-existing-controller",
     existingController.existingControllerFunction
   );
   ```

   **Use [HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) appropriate for the situation.**

   **Use auth middleware if only logged in user can access the route.**

#### Add new route with new controller

1. Add a new controller.
2. Create corresponding file in `server/routes` folder.

   ```bash
   |-- server
   |   |   |-- controller
   |   |   |   |-- new
   |   |   |   |   | -- newContollerFunction.js
   |   |   |   |   | -- index.js
   |   |-- routes
   |   |   |-- new.js
   |   |   |-- index.js
   ```

3. Create route for each controller function.

   **server/routes/new.js**

   ```js
   const express = require("express");
   const newController = require("../controller/new");
   const auth = require("./middleware/auth");

   const router = express.Router();

   router.post("/new-route", auth, newController.newContollerFunction);

   module.exports = router;
   ```

4. Export the router from `server/routes/index.js`.

   **server/routes/index.js**

   ```js
   const user = require("./user");
   const follow = require("./follow");
   const post = require("./post");
   const comment = require("./comment");
   const postLike = require("./postLike");
   const feeds = require("./feeds");
   const explore = require("./explore");
   const new = require("./new");

   module.exports = {
     user,
     follow,
     post,
     comment,
     postLike,
     feeds,
     explore,
     new,
   };
   ```

## Create Pull Request

1. Create a new branch:

```

git branch new-branch

```

2. Checkout new branch:

```

git checkout new-branch

```

3. Add, commit and push your changes to the new branch

```

git add .
git commit -m "changes"
git push origin new-branch

```

4. To make sure your forked repository is up to date with this repository. Add this repository as the upstream repository by doing the following:

```

git remote add upstream https://github.com/iamtalwinder/instagram-clone.git

```

Then, to fetch from this repository:

```

git fetch upstream
git merge upstream/master master

```

5. Go to your forked repository and press the “New pull request” button.
6. Once the pull request is reviewed and approved, it will be merged.

### Note on abandoned pull requests

If a pull request is left unchanged for a week after changes are requested and the issue was assigned to the person that sent the new pull request, they will be unassigned and someone else will be given the chance to work on it.
