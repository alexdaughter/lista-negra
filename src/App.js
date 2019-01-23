import React, { Component } from 'react';
import './App.css';
import {getPersons} from './services/personService';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      results: []
    }
    this.getCriatutas();

  }

  getCriatutas(){
    getPersons()
      .then(data =>{
        this.setState({
          results: data.results
        })
      });
  }

  

  render() {
    return (
      <div className="App">
        :)
      </div>
    );
  }
}

export default App;
