import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Wall from './Wall';
import Login from './Login';
import PostDetails from './PostDetails';
import NotFoundError from './NotFoundError';
import PrivateRoute from '../router/PrivateRoute';

import './styles.scss';

function App() {
  return (
    <div className='app'>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <PrivateRoute exact path='/'>
            <Wall />
          </PrivateRoute>
          <PrivateRoute path='/post/:id'>
            <PostDetails />
          </PrivateRoute>
          <PrivateRoute path='/*'>
            <NotFoundError />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
