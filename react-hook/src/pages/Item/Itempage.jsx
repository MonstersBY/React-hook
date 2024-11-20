import './Itempage.scss'

import { Link } from 'react-router-dom'
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

function CreateChain(url) {
  const [chainpoke, setChainpoke] = useState()
  const info = {}
  
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/'+ url.url)
    .then((response) => response.json())
    .then((data) => {
      setChainpoke(data)
    })
    .catch((err) => {
      console.log(err.message)
    })
  }, [])
  
  if(chainpoke) {
    return (
    <Link to={`/card/${chainpoke.id}`} onClick={() => window.location.href=`/card/${chainpoke.id}`} className='card evolution-chain'>
      <div className='card-name'>{chainpoke.name}</div>
      <img src={chainpoke.sprites.front_default} alt="" />
      <div className='card-type'>
          {chainpoke.types.map((item) => (
            <>
              <span className={item.type.name}>{item.type.name}</span>
            </>
          ))}
      </div>
    </Link>
    )

  }
}

function EvolutionChain({pokemonInfo})  {
  const [chain, setChain] = useState([])
  function FindUrl(data, chains) {
    for (let i = 0; i < data.evolves_to.length; i++) {
      FindUrl(data.evolves_to[i], chains)
    }
    return chains.push(data.species.url.split('/')[data.species.url.split('/').length - 2])
  }

  useEffect(() => {
    fetch(pokemonInfo.evolution_chain.url)
    .then((response) => response.json())
    .then((data) => {
      // data
      const chains = []
      FindUrl(data.chain, chains)
      setChain(chains.reverse())
    })
    .catch((err) => {
      console.log(err.message)
    })
  }, [])
  // console.log(chain);

  if(chain) {
    return (
      <>
        {chain.map((item) => (
          <CreateChain url={item}/>
        ))}
      </>
    )
  }
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


  if (pokemon.id && pokemonInfo.id) {

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
          <div className='evolution-title'>Evolution chain</div>
          <div className='evolution-chains'>
            <EvolutionChain pokemonInfo={pokemonInfo}/>
          </div>
        </div>
      </>
    )
  }
}
  
export default Item