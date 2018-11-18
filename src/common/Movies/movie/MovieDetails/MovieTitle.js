import React, { Component } from 'react';
// import './App.css';

class MovieTitle extends Component {
    constructor(props) {
        super(props);
    }

    _renderMovieTitle() {
        try {
            return (
                <div className="movieTitle">
                    {this.props.item.Title}
                </div>
            );
        }
        catch (err) { }
    }

    render() {
        return this._renderMovieTitle()
    }
}

export default (MovieTitle);

