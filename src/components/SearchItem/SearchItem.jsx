import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// image is name of props
function SearchItem(props) {
    const dispatch = useDispatch();

    const newFavorite = () => {
        dispatch({type: 'CREATE_GIPHY', payload: props.image})
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