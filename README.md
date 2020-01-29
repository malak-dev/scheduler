# Interview Scheduler

is a single page application (SPA) called Interview Scheduler, built using React.
Data is persisted by the API server using a PostgreSQL database.
The client application communicates with an API server over HTTP, using the JSON format.


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Running Cypress Visual Testbed

```sh
npm run cypress
```
## Screenshots

!["Book-Appointment-Form"](https://github.com/malak-dev/scheduler/blob/master/docs/Book-Appointment-Form.png?raw=true)
If there is any remaining spot, we can book an appointment for the interview and choose the interviewer
!["Cancel-Appointment-Form"](https://github.com/malak-dev/scheduler/blob/master/docs/Cancel-Appointment-Form.png?raw=true)
The user can be able to cancel the appointment when clicking on the confirmation button
!["Main-form"](https://github.com/malak-dev/scheduler/blob/master/docs/full-day-form.png?raw=true)
This is the home page when there is no spot left

## Dependencies
  axios
  classnames
  jest
  react
  react-dom
  react-scripts
  @testing-library/react-hooks
  react-test-renderer
