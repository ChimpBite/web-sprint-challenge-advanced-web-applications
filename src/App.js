import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';

import Login from './components/Login';
import './styles.scss';

function App() {
  return (
    <div className='App'>
      <Switch>
        <PrivateRoute exact path='/bubblepage' component={BubblePage} />
        <Redirect exact from='/bubblepage/refresh' to='/bubblepage' />
        <Route exact path='/login' component={Login} />
        <Route component={Login} />
      </Switch>
    </div>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
