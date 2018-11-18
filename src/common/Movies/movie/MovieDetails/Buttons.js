import React, { Component } from 'react';
import '../../../../css/movies/movies.css';
import * as Functions from '../../../functions/functions'

class Buttons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "imdbID": '',
            year: '',
            runtime: '',
            genre: '',
            director: '',
            inputsValidation: { 'year': true, 'runtime': true, 'genre': true, 'director': true },
            isValid: true,
        }
    }

    componentDidMount() {
        this.setState({
            "imdbID": this.props.item.imdbID,
            year: this.props.item.Year,
            runtime: this.props.item.Runtime,
            genre: this.props.item.Genre,
            director: this.props.item.Director,
        })
    }

    _setOpenModalKey(key) {
        this.props.setOpenModalKey(key)
    }

    _update(id) {
        let newDatas = this._setDataToUpdate();
        let newDataToMerge = {
            id: id,
            year: this.state.year,
            runtime: this.state.runtime,
            genre: this.state.genre,
            director: this.state.director,
        }
        let newData = Object.assign(this.props.item, newDataToMerge);

        this.props.update(newDatas, newData, id);
    }

    _delete(id) {
        let newDatas = this._setDataAfterDelete();
        this.props.deleteMovie(newDatas, id);
    }

    _setDataToUpdate() {
        let currentData = this.props.general.moviesList;

        for (var i = 0; i < currentData.length; ++i) {
            let movie = currentData[i];

            if (movie.imdbID === this.state.imdbID) {
                movie.Year = this.state.year;
                movie.Runtime = this.state.runtime;
                movie.Genre = this.state.genre;
                movie.Director = this.state.director;
            }
        }

        return currentData;
    }

    _setDataAfterDelete() {
        let currentData = this.props.general.moviesList;
        return currentData.filter((item, index) => {
            return item.imdbID != this.state.imdbID
        })
    }

    _validation(inputCheck) {
        let validationObj = {
            'year': (val) => Functions.yearValidation(val),
            'runtime': (val) => Functions.runtimeValidation(val),
            'genre': (val) => Functions.genreValidation(val),
            'director': (val) => Functions.directorValidation(val),
        }

        let InputValidation = validationObj[inputCheck](this.refs[inputCheck].value);
        let { inputsValidation } = this.state;//all inputs validation

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

    _getRuntime() {
        let runtime = this.state.runtime.split(' ');

        return runtime[0];
    }

    _getGenreOrDirector(inputType) {
        let input = this.state[inputType].split(',');

        input.forEach((item, index) => {
            if (item.charAt(0) == ' ') {
                input[index] = item.substr(1);
            }
            input[index] = Functions.capitalizeFirstLetter(input[index])
        });

        return input.toString();
    }

    _renderButtons() {
        try {
            return (
                <div className="container">
                    {/* Button to Open the Modal  */}
                    <div className="btnContainer">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#update" onClick={() => this._setOpenModalKey(this.props.index)}>
                            <span>Update</span>
                        </button>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#delete" onClick={() => this.props.setOpenModalKey(this.props.index)}><span>Delete</span></button>
                    </div >

                    {/* The update Modal  */}
                    <div className="modal" id="update">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title">Update Movie Details</h4>
                                    <button type="button" className="close" data-dismiss="modal" onClick={() => this.props.setOpenModalKey(-99)}>&times;</button>
                                </div>

                                {/* Modal body  */}
                                <div className="modal-body">
                                    <div><span>{'Year: '} </span><input type="text" name="year" value={this.state.year} ref='year' onChange={(e) => { this._validation('year'); this.setState({ 'year': this.refs.year.value }); }}></input>{!this.state.inputsValidation['year'] && <span className="error-message">Oops! Input invalid!</span>}</div>
                                    <div><span>{'Runtime (Minutes): '}</span><input type="text" name="runtime" value={this._getRuntime()} ref='runtime' onChange={(e) => { this._validation('runtime'); this.setState({ 'runtime': e.target.value }) }}></input>{!this.state.inputsValidation['runtime'] && <span className="error-message">Oops! Input invalid!</span>}</div>
                                    <div><span>{'Genre: '}</span><input type="text" name="genre" value={this._getGenreOrDirector('genre')} ref='genre' onChange={(e) => { this._validation('genre'); this.setState({ 'genre': e.target.value }) }}></input>{!this.state.inputsValidation['genre'] && <span className="error-message">Oops! Input invalid!</span>}</div>
                                    <div><span>{'Director: '}</span><input type="text" name="director" value={this._getGenreOrDirector('director')} ref='director' onChange={(e) => { this._validation('director'); this.setState({ 'director': e.target.value }) }}></input>{!this.state.inputsValidation['director'] && <span className="error-message">Oops! Input invalid!</span>}</div>
                                </div>

                                {/* Modal footer  */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss={this.state.isValid ? "modal" : ''} onClick={() => { if (this.state.isValid) { this.props.setOpenModalKey(-99); this._update(this.props.item.id) } }}>Update</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.props.setOpenModalKey(-99)}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The Delete Modal  */}
                    <div className="modal" id="delete">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title">Are you sure you want delete this movie?</h4>
                                    <button type="button" className="close" data-dismiss="modal" onClick={() => this.props.setOpenModalKey(-99)}>&times;</button>
                                </div>

                                {/* Modal footer  */}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss={this.state.isValid ? "modal" : ''} onClick={() => { this.props.setOpenModalKey(-99); this._delete(this.props.item.id); }}>Yes</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.props.setOpenModalKey(-99)}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
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

