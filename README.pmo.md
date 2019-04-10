# Install

Requires create-react-app 2.X or later `npm i -g create-react-app` (may need sudo)

Create the app `create-react-app react-pmo`

`cd react-pmo`

`npm i -D place-my-order-api@1`

`npm i -S react-router-dom prop-types`

Add "api" to scripts of package.json `"api": "place-my-order-api --port 7070"`

**TODO: acquire assets, currently committed to this repo in `style`.**

Add "proxy" to the root of package.json `"proxy": "http://localhost:7070"`

# Run

Start the API server `npm run api`
Start the application server `npm start`

# Further
Code splitting using react router (HOC): https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
