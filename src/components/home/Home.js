import React from 'react';
import ReactMd from 'react-md-file';
import './home.css';
const copyOfREADME = "# React Test Environment \nThis is here so I don't have to run `create-react-app anotherfrigginapp` every time I want to test out an idea or flesh out a component. Feel free to play around or contribute! \n## Request Component \nThe idea is to create a XMLHTTPRequest component that can be reused across applications with self-contained logic. \n### To make a request \n#### Edit requestConfig.js \n1. Edit base_URL \n* ex: `https://randomuser.me` \n2. Edit endpoints \n* ex: `/api` \n3. Edit parameters \n* ex: `format=JSON,results=2` \n\n\n### To process data from the request \n#### Edit processData method in Request.js \nThe `processData` method accepts the parsed JSON response and returns a promise. By default, it simply passes the data through untouched to the `render` method. \nTo change this behavior, write your logic inside the promise that is inside the `processData` method, then update the `render` method to visualize your data. \nTry it out by replacing the values in `requestConfig.js`, you can copy and paste them if you like, just don't forget to leave the quotation marks. \nThanks for checking out my stuff, \nGreg \n[Studio42Dev](portfolio.studio42dev.com)"

const Home = ({...props}) => {

return ( 
    <ReactMd markdown={`${copyOfREADME}`} /> );
}

export default Home;