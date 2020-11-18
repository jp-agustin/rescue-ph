import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import colors from '../assets/res/colors';

import LazyLoader from './components/Reusable/LazyLoader/';
import Main from './components/Main/';

const App = () => {

  return (
    <ThemeProvider theme={colors}>
      <Suspense fallback={<LazyLoader />}>
        <BrowserRouter>
          <Switch>
            <Route
              exact path='/'
              render={() =>
                <Main />
              }
            />
            <Route path='*'>
              <Redirect to='/' />
            </Route>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
