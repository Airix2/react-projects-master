import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  const seePrevious = () => {
    setIndex((oldIndex) => {
      let newIndex = oldIndex-1
      if (oldIndex === 0) {
        newIndex = people.length-1
      }
      return newIndex
    })
  }
  const seeNext = () => {
    setIndex((oldIndex) => {
      let newIndex = oldIndex+1
      if (oldIndex === people.length-1) {
        newIndex = 0
      }
      return newIndex
    })
  }

  // useEffect(() => {
  //   const lastIndex = people.length -1;
  //   if (index < 0) {
  //     setIndex(lastIndex)
  //   } else if (index > lastIndex) {
  //     setIndex(0)
  //   }
  // }, [index, people])

  useEffect(() => {
    let slider = setInterval(() => {
      seeNext()
    }, 3000)
    return () => clearInterval(slider)
  }, [index])
  
  
  return (
    <section className='section'>
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, i) => {
          const {id, name, title, image, quote} = person;
          let position = 'nextSlide'
          if (i === index) {
            position = 'activeSlide';
          } else if (i === index-1 || (index === 0 && i === people.length-1 )) {
            position = 'lastSlide'
          }

          return (
            <article 
            className={
              position
            }
            key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className='title'>{title}</p>
              <p className='text'>{quote}</p>
              <FaQuoteRight className='icon'/>
            </article>
          )
        })}
        <button className='prev' onClick={seePrevious}><FiChevronLeft /></button>
        <button className='next' onClick={seeNext}><FiChevronRight /></button>
      </div>
    </section>
  )
}

export default App;
