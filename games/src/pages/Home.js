import React, { useContext, useState} from "react";
import { Link } from "react-router-dom";
import BookmarksContext from "./BookmarksContext";
 
const Home = () => {
    const { bookmarks, setBookmarks } = useContext(BookmarksContext);
 
    const [searchText, setSearchtext] = useState (''); // Ajouter cela
    // suite de la fonction...
 
    // On utilise un state pour garder nos données
    const [games, setGames] = useState([]);
 
const handleSearch = (e) => {
    e.preventDefault();
 
    const apiKey = 'e120dbbbcabe4175b4696383606d8339';
    const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURI(searchText)}`;
    fetch(url)
    .then(response => response.json() )
    .then( data => { setGames(data.results) } )
    .catch( () => { alert('Une erreur est survenue') } )
}
 
const isBookmarked = (id) => !!(bookmarks.find( bookmark => bookmark.id === id));
 
const addBookmark = (game) => {
    if (isBookmarked(game.id)) {
        // A supprimer
        const index = bookmarks.indexOf(game);
        const tmp = [...bookmarks];
        tmp.splice(index, 1);
        setBookmarks(tmp);
        } else {
        const tmp = [...bookmarks];
        tmp.push(game);
        setBookmarks(tmp);
        }
    }
 
 
    return (
        <> {/* Un fragment doit être ajouté pour me retourner qu'un seul composant */}
        <div className="text-center text-xl ">
        <form className="my-2 sm:w-full md:w-2/3 mx-auto flex items-center px-2 text-2x1" onSubmit={handleSearch} >
            

                <input type="text" className="form-control" autoFocus={true} onInput={ e => { setSearchtext(e.target.value) } } value={searchText} placeholder="Rechercher" />
                <button type="submit" className="bg-blue-700 rounded-r text-white px-4 py-2">Rechercher</button>
            
        </form>
        </div>
 
        {/* Ajoutons notre liste */}
        <div className="text-center text-xl">
        <Link className="bg-blue-700 rounded text-white px-4 py-2 mx-5" to={'/bookmarks'}>Favoris</Link>
        <Link className="bg-blue-700 rounded text-white px-4 py-2 mx-5" to={'/shop'}>Mon Magasin</Link>
        </div>
        <ul className="sm:w-full md:w-2/3 mx-auto px-2 text-2x1">
            {games.map(game => (
                <li className="py-2 px-4 border-b border-gray-500" key={game.id}>
                    <Link to={`/details/${game.slug}`} className="flex">
                    <img src={game.background_image} alt="" className="w-24 pr-2"/>
                    <div className="text-2x1 font-bold">{game.name}</div>
                    <div>{game.rating}</div>
                    </Link>
                    <button  className="flex-grow"
                    onClick={ () => { addBookmark(game) } }>
                    { isBookmarked(game.id) ? "★" : "☆" } </button>
                </li>
                
            ))}
        </ul>
        
        </>
    );
}
 
export default Home;