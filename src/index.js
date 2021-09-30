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
    //try{
    yield console.log('Sagas are workin')
    //}catch(err){

    //}
}


//POST saga function



// favoriteGiphy reducer
const favoriteGiphyReducer = (state = [], action) => {
    return state;
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
