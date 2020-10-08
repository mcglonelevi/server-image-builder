import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
              </ul>
            </nav>

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
