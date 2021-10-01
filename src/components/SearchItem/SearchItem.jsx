import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';



// image is name of props
function SearchItem(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const newFavorite = () => {
        dispatch({type: 'CREATE_GIPHY', payload: props.image})
        history.push('/favorite');
    }

    return(
        <div className="item">
            <p><img src={props.image} /></p>
            <br />
            <button onClick={() => newFavorite()}>Favorite</button>
        </div>
    )
}

export default SearchItem;