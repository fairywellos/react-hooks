# Install

Requires create-react-app 2.X or later `npm i -g create-react-app` (may need sudo)

Create the app `create-react-app react-pmo`

`cd react-pmo`

`npm i -D place-my-order-api@1`

`npm i -S react-router-dom prop-types`

`npm i -S place-my-order-assets`

# Develop

Add "api" to scripts of package.json `"api": "place-my-order-api --port 7070"`

Add "proxy" to the root of package.json `"proxy": "http://localhost:7070"`

Change the default App.js to be a functional component.

In index.js import the css file `import "place-my-order-assets/css/place-my-order-assets.css";`

Add components! :)

# Run

Start the API server `npm run api`
Start the application server `npm start`

# Future

Code splitting using react router (HOC): https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
