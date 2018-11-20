import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Movies from './common/Movies/Movies';
import { connect } from 'react-redux';
import * as actions from './actions/general.act';
import AddNewMovie from './common/AddNewMovie/AddNewMovie'
import Modal from './common/Modal/Modal';
// import './css/movies/movies.css';

class App extends Component {
  componentDidMount() {
    // this.props.getMoviesList();
    this.props.getMoviesList();
  }

  render() {
    return (
      <div className="App">
        <AddNewMovie {...this.props} />
        <Movies {...this.props} />
        <Modal {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, actions)(App);

