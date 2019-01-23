import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
    render(){
        return(
            <div className="app__filter">
            <input type="text" className="app__filter-full-name"placeholder="Busca el culpable" onKeyUp={this.props.getQuery} />
          </div>
        );

    }
}

Filter.PropTypes={
    keyUpAction: PropTypes.func.isRequired
}

export default Filter;