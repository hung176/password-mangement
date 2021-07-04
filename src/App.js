import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import MainPage from './MainPage';
import GuidePage from './GuidePage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>

        <Route path="/guide/:unitId">
          <GuidePage />
        </Route>
      </Switch>
    </Router>
  );
}