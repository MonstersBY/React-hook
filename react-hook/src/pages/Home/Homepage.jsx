import './Homepage.scss'

import React, { useState, useEffect } from 'react'
import Card from './Card'

const Pagination = ({
    itemsPerPage,
    totalItem,
    setCurrentPage,
    currentPage,
  }) => {
    const pageNumbers = []
    const arrPagin = []
  
    for (let i = 1; i <= Math.ceil(totalItem / itemsPerPage); i++) {
      pageNumbers.push(i)
    }
    for (let i = -2; i <= 2; i++) {
        if(currentPage + i + 1 > 0 && currentPage + i + 1 < Math.ceil(totalItem / itemsPerPage)){
            arrPagin.push(currentPage + i + 1)
        }
        arrPagin.find((page) => page === 1)

    }
    if(!arrPagin.find((page) => page === 1)) {
        arrPagin.unshift(1)
    }
    if(!arrPagin.find((page) => page === Math.ceil(totalItem / itemsPerPage))) {
        arrPagin.push(Math.ceil(totalItem / itemsPerPage))
    }
  
    const paginate = (pageNumber, e) => {
      e.preventDefault()
      
      setCurrentPage(pageNumber-1)
    }
  
    return (
      <nav>
        <ul className="pagination">
          {arrPagin.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === (number-1) ? "active" : ""}`}
            >
              <a
                onClick={(e) => paginate(number, e)}
                href=""
                className="page-link"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
}

function Homepage() {
    const [list, setList] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage] = useState(20)
    const [count, setCount] = useState()

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${currentPage * itemsPerPage}&limit=${itemsPerPage}`)
        .then((response) => response.json())
        .then((data) => {
            setList(data.results)
            setCount(data.count)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }, [currentPage, itemsPerPage])
    

    return (
        <div className='homepage'>
            <h1>Pokemon cards</h1>
            <div className='homepage-list'>
            {list.map((item) => (
                <Card url={item.url}/>
            ))}
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItem={count}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    )
}
  
export default Homepage