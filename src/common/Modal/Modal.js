import React, { Component } from 'react';
import * as Functions from '../functions/functions';

class Modal extends Component {
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

    componentWillReceiveProps(nextProps) {
        this.setState({
            "imdbID": nextProps.general.currentMovie.imdbID,
            year: nextProps.general.currentMovie.Year,
            runtime: nextProps.general.currentMovie.Runtime,
            genre: nextProps.general.currentMovie.Genre,
            director: nextProps.general.currentMovie.Director,
        })
    }

    componentDidUpdate() {
        let inputs = ['year', 'runtime', 'genre', 'director']
        if (this.state.year == '' && this.state.runtime == '' && this.state.genre == '' && this.state.director == '') {
            for (var i = 0; i < inputs.length; ++i) {
                this._removeInputErrorMesage(inputs[i]);
            }
            this._removeInputErrorMesage()
        }
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
        let newData = Object.assign(this.props.general.currentMovie, newDataToMerge);

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

        if (InputValidation.status == 'error') {
            this._addInputErrorMessage(inputCheck);
        }
        else if (InputValidation.status == 'ok') {
            if (this.refs[inputCheck].className.includes('invalid')) {
                this._removeInputErrorMesage(inputCheck);
            }
        }
    }

    _removeInputErrorMesage(inputCheck) {
        let { inputsValidation } = this.state;
        try {
            if (this.refs[inputCheck].className.includes('invalid')) {
                this.refs[inputCheck].classList.remove('invalid');
                inputsValidation[inputCheck] = true;
                this.setState({ isValid: true, inputsValidation })
            }
        }
        catch (err) { }

    }

    _addInputErrorMessage(inputCheck) {
        let { inputsValidation } = this.state;

        this.refs[inputCheck].classList.add('invalid');
        inputsValidation[inputCheck] = false;
        this.setState({ isValid: false, inputsValidation });
    }

    _getRuntime() {
        try {
            let runtime = this.state.runtime.split(' ');

            return runtime[0];
        }
        catch (err) { }

    }

    _getGenreOrDirector(inputType) {
        try {
            let input = this.state[inputType].split(',');

            input.forEach((item, index) => {
                if (item.charAt(0) == ' ') {
                    input[index] = item.substr(1);
                }
                input[index] = Functions.capitalizeFirstLetter(input[index])
            });

            return input.toString();
        }
        catch (err) { }

    }

    _clearForm() {
        this.setState({
            "imdbID": '',
            year: '',
            runtime: '',
            genre: '',
            director: ''
        })
    }

    _renderModal() {
        return (
            <div className="modalContainer">
                {/* The update Modal  */}
                <div className="modal" id="update">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            {/* Modal Header */}
                            <div className="modal-header">
                                <h4 className="modal-title">Update Movie Details</h4>
                                <button type="button" className="close" data-dismiss="modal" onClick={() => this._clearForm()}>&times;</button>
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
                                <button type="button" className="btn btn-danger" data-dismiss={this.state.isValid ? "modal" : ''} onClick={() => { if (this.state.isValid) { this._update(this.props.general.currentMovie.id) } }}>Update</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this._clearForm()}>Close</button>
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
                                <button type="button" className="close" data-dismiss="modal" >&times;</button>
                            </div>

                            {/* Modal footer  */}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss={this.state.isValid ? "modal" : ''} onClick={() => { this._delete(this.props.general.currentMovie.id); }}>Yes</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" >No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );


    }

    render() {
        return this._renderModal();
    }
}

export default (Modal);

