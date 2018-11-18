import React, { Component } from 'react';
import '../../css/movies/movies.css';
import Movie from './movie/Movie'

class Movies extends Component {
    constructor(props) {
        super(props);
    }

    _renderMoviesList() {
        // if(this.props.general.moviesList){
            return (
                <div className="moviesList">
                    {this.props.general.moviesList.map((item, index) => <Movie {...this.props} item={item} key={index} index={index}/>)}
                </div>
            );
        // }
        // else {
        //     return ''
        // }

    }

    render() {
        return this._renderMoviesList()
    }
}

export default (Movies);

