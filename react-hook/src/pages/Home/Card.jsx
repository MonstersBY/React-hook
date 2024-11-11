import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

function Card ({url}) {
    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setPokemon(data)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }, [pokemon])

    if (pokemon.id) {
        return (
            <Link to={`/card/${pokemon.id}`} className='card'>
                <div className='card-name'>{pokemon.name}</div>
                <img src={pokemon.sprites.front_default} alt="" />
                <div className='card-type'>
                    {pokemon.types.map((item) => (
                        <>
                            <span className={item.type.name}>{item.type.name}</span>
                        </>
                    ))}
                </div>
            </Link>
        )
    }
}

export default Card