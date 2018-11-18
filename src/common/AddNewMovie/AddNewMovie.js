import React, { Component } from 'react';
// import './App.css';
import * as Functions from '../functions/functions';
import '../../css/movies/movies.css';

class AddNewMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "imdbID": '',
            title: '',
            year: '',
            inputsValidation: { 'year': true, 'title': true },
            isValid: true,
            isMovieExist: false
        }
    }

    _add() {
        let addFormData = {
            title: this.state.title,
            year: this.state.year
        }

        let id = this._generateMovieId();
        let titleCorrectFormat = this._titleCorrectFormat(this.state.title);

        addFormData.title = titleCorrectFormat;

        this.props.isMovieExist(false)

        this.props.addMovie(this.props.general.moviesList, addFormData, id);

        this.setState({ title: '', year: '' })

    }

    _generateMovieId() {
        let id = Math.floor((Math.random() * 1000) + 1);

        while (this._isIdExist(id)) {
            id = Math.floor((Math.random() * 1000) + 1);
        }

        return id;
    }

    _isIdExist(id) {
        let moviesList = this.props.general.moviesList;

        for (var i = 0; i < moviesList.length; ++i) {
            let movie = moviesList[i];

            if (movie.id == id) {
                return true;
            }
        }

        return false;
    }

    _titleCorrectFormat(title) {
        let titleToArray = title.split('');
        let result = [];

        result = Functions.cleanStringFromJunk(titleToArray);

        result = Functions.cleanNumberAtMiddleOfWord(result);

        result = Functions.setUpperlowerCase(result);

        result = Functions.arrayToString(result);

        return result;
    }

    _validation(inputCheck) {
        let validationObj = {
            'year': (val) => {
                if (val != '') {
                    return Functions.yearValidation(val);
                }
                return { status: 'ok' }
            },
            'title': (val) => {
                return { status: 'ok' }
            }
        }

        let InputValidation = validationObj[inputCheck](this.refs[inputCheck].value);
        let { inputsValidation } = this.state;

        if (InputValidation.status == 'error') {
            this.refs[inputCheck].classList.add('invalid');
            inputsValidation[inputCheck] = false;
            this.setState({ isValid: false, inputsValidation });
        }
        else if (InputValidation.status == 'ok') {
            if (this.refs[inputCheck].className.includes('invalid')) {
                this.refs[inputCheck].classList.remove('invalid');
                inputsValidation[inputCheck] = true;

                this.setState({ isValid: true, inputsValidation })
            }
        }
    }

    _ismovieExist(title) {
        if (Functions.isMovieExistByTitle(this.props.general.moviesList, title)) {
            this.setState({ isMovieExist: true })
        }
        else {
            if (this.state.isMovieExist) {
                this.setState({ isMovieExist: false })
                this.props.isMovieExist(false)
            }
        }
    }

    _renderButtons() {
        try {
            return (
                <div className="container">
                    {/* Button to Open the Modal  */}
                    <div className="btnContainer">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#add" ><span>Add New Movie</span></button>
                    </div >

                    {/* The add Modal  */}
                    <div className="modal" id="add">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title">Add New Movie </h4>
                                    <button type="button" className="close" data-dismiss="modal" onClick={() => this.props.isMovieExist(false)}>&times;</button>
                                </div>

                                {/* Modal body  */}
                                <div className="modal-body">
                                    <div><span>{'Title: '} </span><input type="text" name="title" value={this.state.title} ref='title' onChange={(e) => { this.setState({ 'title': this.refs.title.value }); this._ismovieExist(this.refs.title.value) }}></input>{!this.state.inputsValidation['title'] && <span className="error-message">Oops! Input invalid!</span>}</div>
                                    <div><span>{'Year: '} </span><input type="text" name="year" value={this.state.year} ref='year' onChange={(e) => { this._validation('year'); this.setState({ 'year': this.refs.year.value }); }}></input>{!this.state.inputsValidation['year'] && <span className="error-message">Oops! Input invalid!</span>}</div>
                                </div>

                                {/* Modal footer  */}
                                <div className="modal-footer">
                                    {/* <button type="button" className="btn btn-danger" data-dismiss={()=>this.state.isValid && !this.props.general.isMovieExist && !Functions.isMovieExistByTitle(this.props.general.moviesList, this.state.title) ? "modal" : ''} onClick={() => { if (this.state.isValid) { this._add(this.props.index) } }}>Add</button> */}
                                    <button type="button" className="btn btn-danger" data-dismiss={this.state.isValid && !this.props.general.isMovieExist && !this.state.isMovieExist ? "modal" : ''} onClick={() => { if (this.state.isValid) { this._add(this.props.index) } }}>Add</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.props.isMovieExist(false)}>Close</button>
                                </div>
                                {this.props.general.isMovieExist && <span className="error-message">Oops! This Movie Is Exist!</span>}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        catch (err) { }
    }

    render() {
        return this._renderButtons()
    }
}

export default (AddNewMovie);

