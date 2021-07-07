import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import MainPage from './MainPage';
import GuidePage from './GuidePage';
import Header from './Header';

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>

        <Route exact path="/guide/:unitId">
          <GuidePage />
        </Route>
      </Switch>
    </Router>
  );
}