import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

const Details = () => {
    const {slug} = useParams();

    const [game, setGame] = useState({});

    useEffect( () => {
         const apiKey = '0cde099c6cc14589a2e4e62fdb04061b';
         const url = `https://api.rawg.io/api/games/${slug}?key=${apiKey}`;
         fetch(url)
         .then(response => response.json() )
         .then( data => { setGame(data) } )
         .catch( (e) => { alert('Une erreur est survenue : ', e) } )
    },[]);

    
    return (
        <>
        <h1>Ceci est la page du jeu {game.name}</h1>
        <img src={game.background_image} alt=""/>
        <p>{game.description_raw}</p>
        </>
    );
}

export default Details;