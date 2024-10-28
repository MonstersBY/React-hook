import './Homepage.scss';

import React, { useState, useEffect } from 'react';
import Card from './Card'

function Homepage() {
    const [list, setList] = useState([]);
    const [count, setCount] = useState();

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20')
        .then((response) => response.json())
        .then((data) => {
            setList(data.results);
            setCount(data.count)
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);

    return (
        <div className='homepage'>
            <h1>Pokemon cards</h1>
            <div className='homepage-list'>
            {list.map((item) => (
                <Card url={item.url}/>
            ))}
            </div>
        </div>
    );
}
  
export default Homepage;