// import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import NavBar from "./Component/Navbar";
import News from "./Component/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route
              exact
              path="/"
              element={<News key="general" category="general" />}
            />
            <Route
              exact
              path="/business"
              element={<News key="business" category="business" />}
            />
            <Route
              exact
              path="/entertainment"
              element={<News key="entertainment" category="entertainment" />}
            />
            <Route
              exact
              path="/health"
              element={<News key="health" category="health" />}
            />
            <Route
              exact
              path="/science"
              element={<News key="science" category="science" />}
            />
            <Route
              exact
              path="/sports"
              element={<News key="sports" category="sports" />}
            />
            <Route
              exact
              path="/technology"
              element={<News key="technology" category="technology" />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

// function App() {
//   return <NavBar />;
// }

export default App;
