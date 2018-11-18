import React, { Component } from 'react';
// import './App.css';

class MovieImg extends Component {
    constructor(props) {
        super(props);
    }

    _onMouseOver() {
        this.props.movieDisplayUpdateCallback('movieDetails');
    }

    _renderMovieImg() {
        try {
            let style = {
                'background-image': 'url(' + this.props.item.Poster + ')',
                'background-repeat': 'no-repeat',
                'background-size': 'cover'
            }

            return (
                <div className="movieImg" onMouseOver={this._onMouseOver.bind(this)} style={style}></div>
            );
        }
        catch (err) { }
    }

    render() {
        return this._renderMovieImg()
    }
}

export default (MovieImg);

