import * as actions from '../actions/general.act';
import * as Functions from '../common/functions/functions';

const axios = require('axios');

export default store => next => action => {
    if (action.type == 'API') {
        const SERVER_ENDPOINT = "http://localhost:3000/moviesList";
        const OMDb_API = 'http://www.omdbapi.com/?apikey=81d51a00';

        let { type, method, index, newData, newDatas, id, currentDb } = action.payload;

        let api = {
            'get': () => {
                axios.get(SERVER_ENDPOINT).then((res) => {
                    store.dispatch(actions.api(type, res.data))
                })
                    .catch((err) => console.log(err))
            },
            'post': (newMovie) => {
                axios.post((SERVER_ENDPOINT), newMovie).then((res) => {
                    store.dispatch(actions.api(type, newMovie))
                })
                    .catch((err) => console.log(err))
            },
            'put': () => {
                axios.put((SERVER_ENDPOINT + '/' + index + '/'), newData).then((res) => {
                    store.dispatch(actions.api(type, newDatas))
                })
                    .catch((err) => console.log(err))
            },
            'delete': () => {
                axios.delete(SERVER_ENDPOINT + '/' + index + '/').then((res) => {
                    store.dispatch(actions.api(type, newDatas))
                })
                    .catch((err) => console.log(err))
            }
        }

        if (type == 'ADD') {
            let title = newData.title.replace(' ', '+');

            axios.get(OMDb_API + '&t=' + title + '&y=' + newData.year).then((respone) => {
                let newMovie = respone.data;

                newMovie['id'] = id;
                if (!Functions.isMovieExist(currentDb, newMovie.imdbID)) {
                    api[method](newMovie);
                    store.dispatch(actions.isMovieExist(false))
                }
                else {
                    store.dispatch(actions.isMovieExist(true))
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