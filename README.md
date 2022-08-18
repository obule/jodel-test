# SURVEY

## Introduction

This is a simple API that allows you to create a survey, answer survey question and view answers to survey questions

## Table of Contents

1. <a href="#application-features">Application Features</a>
2. <a href="#how-to-use">How To Use</a>
3. <a href="#thoughts">Thoughts</a>
4. <a href="#author">Author</a>
5. <a href="#license">License</a>

## Tech Stack Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Application Features

- Endpoints to create, fetch and publish jobs.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/obule/jodel-test.git

# Go into the repository
$ cd into the base directory

# Install dependencies
$ npm install

# Create .env file for environmental variables in your root directory and add variable for PORT
PORT=5000


# Run the app
$ npm run start

# Check the port on the specified port on the env or 5000


# Run test
$ npm run test
```

## API endpoints

```
- /api/v1/survey # Create a survey
Method: POST
Body: {
  name: string, // name of survey
  description: string, // optional
  questions: {
    questionType: enum, // Boolean, MultiChoice
    question: string,
    answer: string[],
  }[]
}
Success Response: {
  success: true,
  message: 'Survey created'
  data: {
      name: string
      description: string
      questions: [
        {
          questionType: string
          question: string,
          answer: string[],
          id: string,
          surveyId: string
        }
      ],
      id: string
      createdAt: date string
    }
}
Error Response: {
  success: false,
  message: 'Server Error',
  data: null
}


- /api/v1/answer # Answer a question
Method: POST
Body: {
  questionId: string,
  surveyId: string,
  answer: string[],
}
Success Response: {
  success: true,
   message: 'Answer created'
    data: {
      id: string,
      answer: string[],
      questionId: string,
      surveyId: string,
      createdAt: date string
    }
}
Error Response: {
  success: false,
  message: 'Server Error',
  data: null
}



- /api/v1/answer/:surveyId
Method: GET
Success Response: {
  success: true,
  message: 'Answer fetched!'
  data: [
      {
        id: string,
        answer: string[],
        questionId: string,
        surveyId: string,
        createdAt: date string
      }
  ]
}
Error Response: {
  success: false,
  message: 'Server Error',
  data: null
}
```

## THOUGHTS

This simple implementaion of the survey system uses an array as the data structure of choice to store data. This implementation comes with some bottle necks which might add limitations that will prevent the production readiness of the application. Although the architecture used makes it easy to replace the array with an actual database. Some of the problems and potential solutions/additions are discussed below.

- Data structure used: Using an array is efficient for just local use but it can quickly become a problem when the application grows in size. Such growth can lead to us running out of memory.
- Using arrays can be ephemeral, meaning when the server reloads, we will loose all the data stored in it. Using a solution like MySQL to persist the information will go a long way in maintaing data intergrity accross the system.
- The current application currently runs on a single server, I think running it on multiple server while keeping one datastore(Redis/Database) will improve speed of the application.

## Author

Ruona Izuagbala

## License

MIT
