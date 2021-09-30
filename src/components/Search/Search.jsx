import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchItem from '../SearchItem/SearchItem'

function Search(){
    const [newSearch, setNewSearch] = useState('')
    const [results, setResults] = useState([]);

    const handleSubmit = (event) =>{
        event.preventDefault()
        axios.post('/api/giphy', {search: newSearch})
        .then(response => {
            console.log(response.data)
            console.log(response.data[0].images.original.url)
            setResults(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    
    return (
        <>
        <form onSubmit={handleSubmit}>
        <input placeholder="Search" type='text' value={newSearch} onChange={(event) => setNewSearch(event.target.value)} />
        <input type='submit' value='Submit New Search' />
        </form>
        <div className="images-wrapper">
        {results.map((gif) => (
            <SearchItem key={gif.images.original.url} image={gif.images.original.url}/>
         ))}
        </div>
        </>
    )
}



export default Search;