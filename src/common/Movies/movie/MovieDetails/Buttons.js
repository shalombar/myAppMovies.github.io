import React, { Component } from 'react';
import '../../../../css/movies/movies.css';
import * as Functions from '../../../functions/functions'

class Buttons extends Component {
    constructor(props) {
        super(props);

    }



    _setOpenModalKey(key) {
        this.props.setOpenModalKey(key)
    }



    _renderButtons() {
        try {
            return (
                <div className="container">
                    {/* Button to Open the Modal  */}
                    <div className="btnContainer">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#update" onClick={() => this.props.setCurrentMovie(this.props.item)}>
                            <span>Update</span>
                        </button>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#delete" onClick={() => this.props.setCurrentMovie(this.props.item)}><span>Delete</span></button>
                    </div >
                </div>
            );
        }
        catch (err) { }
    }

    render() {
        return this._renderButtons();
    }
}

export default (Buttons);

