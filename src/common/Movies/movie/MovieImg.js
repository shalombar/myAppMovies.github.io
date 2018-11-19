import React, { Component } from 'react';
// import './App.css';

class MovieImg extends Component {
    constructor(props) {
        super(props);
    }

    _onMouseEvent(val) {
        this.props.movieDisplayUpdateCallback(val);
    }

    _renderMovieImg() {
        try {
            let style = {
                'background-image': 'url(' + this.props.item.Poster + ')',
                'background-repeat': 'no-repeat',
                'background-size': 'cover'
            }

            return (
                <div className="movieImg" onMouseLeave={() => this._onMouseEvent('poster')} style={style} onMouseEnter={() => this._onMouseEvent('movieDetails')}></div>
            );
        }
        catch (err) { }
    }

    render() {
        return this._renderMovieImg()
    }
}

export default (MovieImg);

