export default (state = {}, action) => {
    state = {
        moviesList: [],
        openModalKey: -99,
        isMovieExist: false,
        currentMovie: {},
        isCorrectMovieTitle: true,
        ...state
    }
    switch (action.type) {
        case 'GET_MOVIES_LIST':
            let moviesList = action.payload;

            return {
                ...state,
                moviesList: moviesList
            }
        case 'SET_OPEN_MODAL_KEY':
            let openModalKey = action.payload;

            return {
                ...state,
                openModalKey: openModalKey
            }
        case 'UPDATE':
            let newData = action.payload;

            return {
                ...state,
                moviesList: newData
            }
        case 'DELETE':
            newData = action.payload;

            return {
                ...state,
                moviesList: newData
            }
        case 'ADD':
            let currnetMoviesList = state.moviesList;
            let addData = action.payload;

            currnetMoviesList.push(addData);

            return {
                ...state,
                moviesList: currnetMoviesList
            }
        case 'IS_MOVIE_EXIST':
            let isMovieExist = action.payload;

            return {
                ...state,
                isMovieExist: isMovieExist
            }
        case 'SET_CURRENT_MOVIE':
            let currentMovie = action.payload;

            return {
                ...state,
                currentMovie: currentMovie
            }
        case 'IS_CORRECT_MOVIE_TITLE':
            let isCorrectMovieTitle = action.payload;

            return {
                ...state,
                isCorrectMovieTitle: isCorrectMovieTitle
            }
        default:
            return state
    }
    return state;
}