# Would You Rather Project

Would You Rather Project is a React & Redux app
![](./src/assets/img/info.gif)

## Database 
There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

## Install

```
$sudo npm install --unsafe-perm
```

## Test

```
$yarn start
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Built With

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
* [Redux](https://redux.js.org/) - Redux is a predictable state container for JavaScript apps.
* [React-Redux](https://react-redux.js.org/) - Official React bindings for Redux.

## Authors

* **Tom gt** - *Fullstack egineer* - [github profile](https://github.com/tomgtbst)

## License

This project is licensed under the MIT License
