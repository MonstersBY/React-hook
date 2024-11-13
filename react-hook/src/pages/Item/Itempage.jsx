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
  const [pokemonInfo, setPokemonInfo] = useState([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/'+ window.location.pathname.split('/')[2])
    .then((response) => response.json())
    .then((data) => {
      setPokemon(data)
    })
    .catch((err) => {
      console.log(err.message)
    })
  }, [])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon-species/'+ window.location.pathname.split('/')[2])
    .then((response) => response.json())
    .then((data) => {
      setPokemonInfo(data)
    })
    .catch((err) => {
      console.log(err.message)
    })
    
  }, [])

  // useEffect(() => {
  //   fetch('https://pokeapi.co/api/v2/pokemon-species/'+ window.location.pathname.split('/')[2])
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setPokemonInfo(data)
  //   })
  //   .catch((err) => {
  //     console.log(err.message)
  //   })
  // }, [])

  function Collap(e) {
    if (e.target.classList.contains("active")) {
      e.target.classList.remove("active")
    } else {
      e.target.classList.add("active")
    }
  }


  if (pokemon.id && pokemonInfo) {

    return (
      <>
        <div className="pokemon">
          <h1>{pokemon.name}</h1>
          <div className='pokemon-container'>
            <div className='pokemon-left'>
              <div className='pokemon-flavor'>
                <div className='pokemon-flavor__top collap_btn' onClick={Collap}>Open flavor text</div>
                <div className='pokemon-flavor__bottom collap_list'>
                  {pokemonInfo.flavor_text_entries.map((item)=>
                    item.language.name == 'en' ? <span>{item.flavor_text}</span> : <></>
                  )}
                </div>
              </div>
            </div>
            <div className='pokemon-right'>
              <div className='pokemon-photo'>

                <CreateSlider sprites={pokemon.sprites} />
              </div>
              <div className='pokemon-type card-type'>
                {pokemon.types.map((item) => (
                  <span className={item.type.name}>{item.type.name}</span>
                ))}
              </div>
              <div className='pokemon-stats'>
                {pokemon.stats.map((item) => (
                  <div className='pokemon-stats--item'>
                    <strong>{item.stat.name}:</strong><span>{item.base_stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='evolution'>
          <div className='evolution-item'>
            <div className='evolution-item__name'>name</div>
            <div className='evolution-item__img'>name</div>
          </div>
        </div>
      </>
    )
  }
}
  
export default Item