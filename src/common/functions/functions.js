export const yearValidation = (val) => {
    if (isNaN(val) || val.length != 4 || val < 0) {
        return {
            status: 'error',
            msg: 'year is not valid'
        }
    }
    return { status: 'ok' }
}

export const runtimeValidation = (val) => {
    if (isNaN(val) || val < 0) {
        return {
            status: 'error',
            msg: 'year is not valid'
        }
    }
    return { status: 'ok' }
}

export const genreValidation = (val) => {
    let letters = /^[A-Za-z]{2,}\s[A-Za-z-']{3,}$/;
    let genre = val.split(',');
    let filterGenre = ['romance', 'action', 'adventure', 'honor', 'western', 'documentary', 'crime', 'science fiction', 'war', 'mystery', 'comedy', 'biographical', 'parody', 'melodrama', 'family', 'drama'];
    let result = false;

    genre.forEach((item, index) => {
        if (item.charAt(0) == ' ') {
            genre[index] = item.substr(1);
        }
    });

    for (var i = 0; i < genre.length; ++i) {
        result = false;
        for (var j = 0; j < filterGenre.length; ++j) {
            if (genre[i].toUpperCase() === filterGenre[j].toUpperCase()) {
                result = true;
                j = filterGenre.length;
            }
        }
        if (!result) {
            return {
                status: 'error',
                msg: 'input is not valid'
            }
        }
    }

    return { status: 'ok' }
}

export const directorValidation = (val) => {
    let letters = /^[A-Za-z]{2,}\s[A-Za-z-']{2,}$/;
    let director = val.split(',');
    let filterDirector = [];

    director.forEach((item, index) => {
        if (item.charAt(0) == ' ') {
            director[index] = item.substr(1);
        }
    });

    filterDirector = director.filter((item, index) => {
        return !letters.test(item)
    })

    if (filterDirector.length > 0) {
        return {
            status: 'error',
            msg: 'input is not valid'
        }
    }
    return { status: 'ok' }
}

export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const cleanStringFromJunk = (stringArray) => {
    let regex = /^[A-Za-z']{1,}$/;

    for (var i = 0; i < stringArray.length; ++i) {
        if (!regex.test(stringArray[i]) && isNaN(stringArray[i]) && stringArray[i] != ' ') {
            stringArray.splice(i, 1);
            --i;
        }
    }
    return stringArray;
}

export const cleanNumberAtMiddleOfWord = (stringArray) => {
    let regex = /^[A-Za-z']{1,}$/;

    for (var i = 0; i < stringArray.length - 1; ++i) {
        if (!regex.test(stringArray[i]) && stringArray[i] != ' ') {
            stringArray.splice(i, 1);
            --i;
        }
    }
    return stringArray;
}

export const arrayToString = (stringArray) => {
    let output = stringArray.toString();

    output = output.replace(/,/g, '');

    return output;
}

export const setUpperlowerCase = (stringArray) => {
    stringArray[0] = stringArray[0].toUpperCase();
    for (var i = 1; i < stringArray.length; ++i) {
        if (!isNaN(stringArray[i])) {
            stringArray[i] = stringArray[i].toLowerCase();
        }
        if (stringArray[i] == ' ') {
            stringArray[++i] = stringArray[i].toUpperCase();
        }
    }

    return stringArray;
}

export const isMovieExist = (movieList, id) => {
    for (var item in movieList) {
        if (movieList[item].imdbID == id)
            return true;
    }

    return false;
}

export const isMovieExistByTitle = (movieList, title) => {
    for (var item in movieList) {
        if (movieList[item].Title.toUpperCase() == title.toUpperCase())
            return true;
    }

    return false;
}