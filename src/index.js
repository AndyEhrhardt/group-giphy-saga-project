import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects' 
import logger from 'redux-logger';
import axios from 'axios';


//GET saga function
function* getFavorites(){
    try{
        console.log('Sagas are workin');
        const favoritesResponse = yield axios.get('/api/favorite');
        console.log(favoritesResponse.data);
        const favActionForReducer = { type: 'SET_FAVORITES', payload: favoritesResponse.data};
        yield put (favActionForReducer);
    }catch(err){
        console.log('ERROR'. err);
    }
}


//POST saga function
function* createGiphy(action) {
    try {
        console.log('saga createGiphy wired!');
        console.log(action.payload);
        yield axios.post('/api/favorite', {url: action.payload}) 
        yield put({ type: 'GET_FAVORITES'})   
    } catch(error) {
        console.log(error);  
    }
}

// sort by function 
function* sortBy(action) {
    try {
        console.log('saga createGiphy wired!');
        console.log(action.payload);
        yield axios.post('/api/favorite', action.payload) 
        yield put({ type: 'GET_FAVORITES'})   
    } catch(error) {
        console.log(error);  
    }
}

// add category
function* addCategory(action) {
    try {
        console.log('saga createGiphy wired!');
        console.log(action.payload);
        yield axios.put(`/api/favorite/${action.payload}`, {catId: action.catId}) 
        yield put({ type: 'GET_FAVORITES'})   
    } catch(error) {
        console.log(error);  
    }
}


// favoriteGiphy reducer
const favoriteGiphyReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_FAVORITES':
            return [...state, action.payload]
        case 'SET_FAVORITES':
            return action.payload;
        default:
            return state;
    }
}


// categories reducer
const giphyCategoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CATEGORY':
            return [...state, action.payload]
        case 'SET_CATEGORY':
            return action.payload
        default:
            return state;
    } 
}

// sortBy reducer
const sortByReducer = (state = [], action ) => {
    switch(action.type) {
        case 'ADD_FAVORITES':
            return [...state, action.payload]
        case 'SET_FAVORITES':
            return action.payload
        default:
            return state;
    }
}

//Watcher Saga
function* watcherSaga() {
    //GET_FAVORITES takeEvery
    yield takeEvery('GET_FAVORITES', getFavorites);
    //ADD_FAVORITES takeEvery
    yield takeEvery('CREATE_GIPHY', createGiphy);
    
    yield takeEvery('ADD_CATEGORY', addCategory);

    yield takeEvery('SORT_BY', sortBy);

}




//
const sagaMiddleware = createSagaMiddleware();
//
//create store
const storeInstance = createStore(
    combineReducers({
        //reducers go here
        favoriteGiphyReducer,
        giphyCategoryReducer

    }),
    applyMiddleware(sagaMiddleware, logger),
);



sagaMiddleware.run(watcherSaga);


ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
