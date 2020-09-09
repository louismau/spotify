import React from "react";
import logo from "./logo.svg";
import './App.css';
import Artist from './Artist'
  
class App extends React.Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Artist/>
          </header>
        </div>
      );
    }}
  
export default App;
