import React, { Component } from 'react';
// import './App.css';
import MovieImg from './MovieImg'
import MovieDetails from './MovieDetails/MovieDetails'

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = { movieDisplay: 'poster' }
    }

    _movieDisplayUpdateCallback(val) {
        this.setState({ movieDisplay: val })
    }

    _renderMovieDetails() {
        let renderObj = {
            'poster': () => <MovieImg {...this.props} movieDisplayUpdateCallback={this._movieDisplayUpdateCallback.bind(this)} />,
            'movieDetails': () => <MovieDetails {...this.props} movieDisplayUpdateCallback={this._movieDisplayUpdateCallback.bind(this)} />,
        }

        return (
            <div className="movie">
                {this.props.index == this.props.general.openModalKey ? renderObj['movieDetails']() : renderObj[this.state.movieDisplay]()}
            </div>
        );
    }

    render() {
        return this._renderMovieDetails()
    }
}

export default (Movie);

