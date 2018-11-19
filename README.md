# React Test Environment
This is here so I don't have to run `create-react-app anotherfrigginapp` every time I want to test out an idea or flesh out a component. Feel free to play around or contribute!

## Request Component

The idea is to create a XMLHTTPRequest component that can be reused across applications with self-contained logic.

### To make a request

#### Edit requestConfig.js

1. Edit base_URL
    * ex: `https://randomuser.me`
2. Edit endpoints
    * ex: `/api`
3. Edit parameters
    * ex: `format=JSON,results=2`

### To process data from the request

#### Edit processData method in Request.js

The `processData` method accepts the parsed JSON response and returns a promise. By default, it simply passes the data through untouched to the `render` method.
To change this behavior, write your logic inside the promise that is inside the `processData` method, then update the `render` method to visualize your data.

Try it out by replacing the values in `requestConfig.js`, you can copy and paste them if you like, just don't forget to leave the quotation marks.

Thanks for checking out my stuff,

Greg
[Studio42Dev](portfolio.studio42dev.com)