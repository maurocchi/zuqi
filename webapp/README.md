This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

During development, since the built in proxy is [bugged](https://github.com/facebook/create-react-app/issues/5280), you should configure the port of the conductor service.
Start the server with the environment variable `REACT_APP_SOCKET_PORT` properly configured, i.e.:
```
REACT_APP_SOCKET_PORT=8000 npm start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run storybook`

Runs the [StoryBook](https://storybook.js.org/) application.<br />
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
