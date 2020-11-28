import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import io from "socket.io-client";

import { setSocket } from "../redux/actions/socket";

import colors from "../assets/res/colors";

import LazyLoader from "./components/Reusable/LazyLoader";
import Main from "./components/Main";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io({ path: "/socket.io" });
    dispatch(setSocket(socket));
  }, []);

  return (
    <ThemeProvider theme={colors}>
      <Suspense fallback={<LazyLoader />}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Main />} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
