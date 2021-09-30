import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import Favorite from '../Favorite/Favorite';
import Search from '../Search/Search';



function App(props) {
  const dispatch = useDispatch();
  const reduxState = useSelector(reduxState => reduxState)

  const [newGiphy, setNewGiphy] = useState('');
  

  //On page load get favorites
  useEffect(() => {
    getFavorites();
  }, []);

  //Dispatch to saga for axios request
  const getFavorites = () => {
    dispatch({ type: 'GET_FAVORITES' })
  }


  // POSTs data to DB
  const handleClick = () => {
    dispatch({type: 'CREATE_GIPHY', payload: newGiphy})
    setNewGiphy('');
  }
  
  return (
    <div>
      <h1>Giphy Search!</h1>
      {/* routes go here */}
      <Router>
        <Route path="/" exact>
          <Search />
        </Route>
        <Route path="/favorite">
          <Favorite />
        </Route>
      </Router>
      </div>
      );
  }
      
  
export default App;
