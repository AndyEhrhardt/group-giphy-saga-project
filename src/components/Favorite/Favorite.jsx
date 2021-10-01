import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteItem from '../FavoriteItem/FavoriteItem';

function Favorite () {
// PUT route?
    const [categorySort, setCategorySort] = useState('none')
    const favoriteList = useSelector(store => store.favoriteGiphyReducer);
    const dispatch = useDispatch();
    console.log(favoriteList);
    const getFavorite = () => {
        dispatch({type: 'GET_FAVORITES'})
    }
    console.log(favoriteList)
    useEffect(() => {
        console.log('favorite works');
        getFavorite();
    }, []);
    const sortCategory = (event) => {
        setCategorySort(event.target.value);
    }

    return (
        <>
            
            <button value="1" onClick={(event) => sortCategory(event)}>Funny</button>            
            <button value="2" onClick={(event) => sortCategory(event)}>Cohort</button>            
            <button value="3" onClick={(event) => sortCategory(event)}>Cartoon</button>            
            <button value="4" onClick={(event) => sortCategory(event)}>NSFW</button>           
            <button value="5" onClick={(event) => sortCategory(event)}>Meme</button> 
           
            <ul>
                {favoriteList.map((favorite) => (
                    <>
                        {categorySort === "none" ?
                        (<FavoriteItem key={favorite.id} id={favorite.id} url={favorite.url} catId={favorite.category_id}/>) : 
                        categorySort === `${favorite.category_id}` ?
                        <FavoriteItem key={favorite.id} id={favorite.id} url={favorite.url} catId={favorite.category_id}/> :
                        <p></p>
                        }
                    </>
                ))}
            </ul>    
        </>


    )
}

export default Favorite;