import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import UserWrapper from './UserWrapper';
import Login from './Login';

//  add bootstrap
//  https://github.com/facebook/create-react-app/issues/301
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={UserWrapper} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
