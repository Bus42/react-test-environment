import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Request from '../request/Request';
import './appRouter.css';

const Home = () => <h2>Home</h2>

const AppRouter = ({...props}) => {
const prefix = "appRouter-"

return ( <Router>
    <div>
        <nav id={`${prefix}navigation`}>
            <ul id={`${prefix}list`}>
                <li className={`${prefix}list-item`}>
                    <Link to="/" >Home</Link>
                </li>
                <li className={`${prefix}list-item`}>
                    <Link to="/request" >Request</Link>
                </li>
            </ul>
        </nav>

        <Route exact path="/" component={Home} />
        <Route path="/request" component={Request} />
    </div>
</Router> );
}

export default AppRouter;