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



// favoriteGiphy reducer
const favoriteGiphyReducer = (state = [], action) => {
    switch (action.type) {
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

    


}




//
const sagaMiddleware = createSagaMiddleware();
//
//create store
const storeInstance = createStore(
    combineReducers({
        //reducers go here
        favoriteGiphyReducer,
    }),
    applyMiddleware(sagaMiddleware, logger),
);



sagaMiddleware.run(watcherSaga);


ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
