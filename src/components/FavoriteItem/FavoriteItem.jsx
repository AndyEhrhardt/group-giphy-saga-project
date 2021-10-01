import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// image is name of props
function FavoriteItem(props) {
    const dispatch = useDispatch();
    const [category, setCategory] = useState('none')
    const addCategory = (event) => {
        console.log(event.target.value)
        dispatch({type: 'ADD_CATEGORY', payload: props.id, catId: event.target.value})
    }
    useEffect(() => {
        checkCat();
    }, []);
    console.log(props.catId)
    const checkCat = () => {
        switch (props.catId) {
            case 1:
                setCategory('Funny');
            break;
            case 2:
                setCategory('Cohort');
                break;
            case 3:
                setCategory('Cartoon');
                break;
            case 4:
                setCategory('NSFW');
                break;
            case 5:
                setCategory('Meme');
                break;
            default:
        }
    }
    
   
    return(
        <div className="item">
            <p><img src={props.image} /></p>
            <br />
            <p>Add Category</p>
            <img src={props.url}/>
            {category === "none" ? (
            <>
            <button value="1" onClick={(event) => addCategory(event)}>Funny</button>            
            <button value="2" onClick={(event) => addCategory(event)}>Cohort</button>            
            <button value="3" onClick={(event) => addCategory(event)}>Cartoon</button>            
            <button value="4" onClick={(event) => addCategory(event)}>NSFW</button>           
            <button value="5" onClick={(event) => addCategory(event)}>Meme</button> 
            </>
            ) : <p>{category}</p>}
        </div>
    )
}

export default FavoriteItem;