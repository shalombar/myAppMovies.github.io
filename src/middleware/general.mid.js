import * as actions from '../actions/general.act';
import * as Functions from '../common/functions/functions';

const axios = require('axios');

export default store => next => action => {
    if (action.type == 'API') {
        const SERVER_ENDPOINT = "http://localhost:3000/moviesList";
        const OMDb_API = 'https://www.omdbapi.com/?apikey=81d51a00';

        let { type, method, index, newData, newDatas, id, currentDb, callback } = action.payload;

        let api = {
            'get': (data) => {
                store.dispatch(actions.api(type, data))

            },
            'post': (newMovie) => {
                store.dispatch(actions.api(type, newMovie))

            },
            'put': () => {
                store.dispatch(actions.api(type, newDatas))

            },
            'delete': () => {
                store.dispatch(actions.api(type, newDatas))
            }
        }

        if (type == 'ADD') {
            let title = newData.title.replace(' ', '+');

            axios.get(OMDb_API + '&t=' + title + '&y=' + newData.year).then((respone) => {
                if (respone.data.Response == 'False' || (!isNaN(respone.data.Title) && respone.data.Title != newData.title)) {
                    store.dispatch(actions.isCorrectMovieTitle(false))

                    return;
                }

                let newMovie = respone.data;

                newMovie['id'] = id;
                if (!Functions.isMovieExist(currentDb, newMovie.imdbID)) {
                    api[method](newMovie);
                    store.dispatch(actions.isMovieExist(false))
                    store.dispatch(actions.isCorrectMovieTitle(true))
                }
                else {
                    store.dispatch(actions.isMovieExist(true))
                }

                if (callback) {
                    callback(respone);
                }
            })
                .catch((err) => console.log(err))
        }
        else {
            api[method]();
        }
    }
    return next(action)
}