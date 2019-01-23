import React, { Component } from 'react';
import './App.css';
import {getPersons} from './services/personService';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      query: '',
      results: this.getSavedData()
    }
    this.getQuery= this.getQuery.bind(this);
  }

  getQuery(e){
    const userQuery = e.currentTarget.value;
    this.setState ({
      query: userQuery
    })
  }

  filterThis(){
    const filteredResults = this.state.results.filter(item => {
      const fullName = `${item.name.first} ${item.name.last}`;
      if (fullName.toLocaleLowerCase().includes(this.state.query.toLocaleLowerCase())) {
        return true;
      } else {
        return false;
      }
      // return (fullName.includes(this.state.query)) ? true : false
    });
    return filteredResults;
  }

  getSavedData(){
    const blackData = localStorage.getItem('blackData');
    if (blackData !== null){
      return JSON.parse(blackData);
    }else{
      this.getCriatutas();
      return[]
    }
  }

  saveData(data){
    localStorage.setItem('blackData', JSON.stringify(data));
  }

  getCriatutas(){
    getPersons()
       .then(data =>{

        const cleanData = data.results.map((item, index) => { return {...item, id:index}});
           
        this.setState({
          results: cleanData
        })
        this.saveData(cleanData);
      });
  }
 
  render() {
    const blackResults= this.filterThis();
    return (
      <div className="App">
      <header className="app__header">
        <h1 className="app__title">Lista negra de empleados</h1>
        <div className="app__filter">
          <input type="text" className="app__filter-full-name"placeholder="Busca el culpable" onKeyUp={this.getQuery}/>
        
        </div>
      </header>  
        <ul className="app__list">
          {blackResults.map(item => {
            return (
              <li className="app__list-item" key={item.id}>
                <div className="person">
                  <h2 className="person__name">{`${item.name.first} ${item.name.last}`}</h2>
                  <img src={item.picture.medium} alt={`${item.name} ${item.last}`} className="person__img"/>
                  <div className="person__age">{item.dob.age}</div>
                  <div className="person__city">{item.location.city}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
