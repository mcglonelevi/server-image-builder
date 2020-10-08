import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Editor from './editor/Editor';
import Home from './home/Home';
import Upload from './upload/Upload';
import { GameContextProvider } from './contexts/GameContext';

function App() {
  return (
    <div className="App">
      <GameContextProvider>
        <Router>
            <div className="container">
              <h1>Server Banner Image Generator</h1>
              <Switch>
                <Route path="/editor/:id">
                  <Editor />
                </Route>
                <Route path="/upload">
                  <Upload />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
        </Router>
      </GameContextProvider>
    </div>
  );
}

export default App;
