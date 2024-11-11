import './Itempage.scss'

import React, { useState, useEffect } from 'react'
import { Pagination} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

function CreateSlider({sprites})  {
  const slides = Object.values(sprites).filter((item) => typeof item === 'string')
    
  return (
    <>
      <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      >
        {slides.map((slide) => (
          <SwiperSlide>
            <img src={slide} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

function Item() {
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
      fetch('https://pokeapi.co/api/v2/pokemon/'+ window.location.pathname.split('/')[2])
      .then((response) => response.json())
      .then((data) => {
          setPokemon(data)
          // pokemon-species/4/
      })
      .catch((err) => {
          console.log(err.message)
      })
  }, [])

  if (pokemon.id) {

    return (
      <div className="pokemon">
        <h1>{pokemon.name}</h1>
        <div className='pokemon-container'>
          <div className='pokemon-photo'>
            
            <CreateSlider sprites={pokemon.sprites}/>
          </div>
          <div className='pokemon-type card-type'>
            {pokemon.types.map((item) => (
              <>
                <span className={item.type.name}>{item.type.name}</span>
              </>
            ))}
          </div>
          <div className='pokemon-stats'>
            {pokemon.stats.map((item) => (
              <>
                <div className='pokemon-stats--item'>
                  <strong>{item.stat.name}:</strong><span>{item.base_stat}</span>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
  
export default Item