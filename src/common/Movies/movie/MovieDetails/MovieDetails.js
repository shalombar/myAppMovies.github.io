import React, { Component } from 'react';
// import './App.css';
import MovieTitle from './MovieTitle'
import Deatails from './Deatails'
import Buttons from './Buttons'


class MovieDetails extends Component {
    constructor(props) {
        super(props);
    }

    _onMouseOut() {
        this.props.movieDisplayUpdateCallback('poster')
    }

    _renderMovieDetails() {
        try {
            return (
                <div className="movieDetails" onMouseOut={this._onMouseOut.bind(this)}>
                    <MovieTitle {...this.props} />
                    <Deatails {...this.props} />
                    <Buttons {...this.props}/>
                </div>
            );
        }

        catch (err) { }
    }

    render() {
        return this._renderMovieDetails()
    }
}

export default (MovieDetails);

