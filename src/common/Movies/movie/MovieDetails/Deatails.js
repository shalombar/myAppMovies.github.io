import React, { Component } from 'react';
// import './App.css';

class Deatails extends Component {
    constructor(props) {
        super(props);
    }

    _renderMovieTitle() {
        try {
            return (
                <div className="detiails">
                    <div className="year"><span>{'Year: '} </span>{this.props.item.Year}</div>
                    <div className="runtime"><span>{'Runtime: '}</span>{this.props.item.Runtime} </div>
                    <div className="genre"><span>{'Genre: '}</span> {this.props.item.Genre}</div>
                    <div className="director"> <span>{'Director: '}</span>{this.props.item.Director}</div>
                </div>
            );
        }
        catch (err) { }
    }

    render() {
        return this._renderMovieTitle()
    }
}

export default (Deatails);

