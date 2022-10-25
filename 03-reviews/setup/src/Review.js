import React, { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {
  const [index, setIndex] = useState(0)
  const {name, job, image, text} = people[index]

  const checkNumber = (number) => {
    if (number > people.length -1) {
      return 0
    }
    if (number < 0) {
      return people.length-1
    }
    return number
  }

  const nextIndex = () => {
    setIndex((index) => {
      let newIndex = checkNumber(index+1)
      return newIndex
    });
  }
  const prevIndex = () => {
    setIndex((index) => {
      let newIndex = checkNumber(index-1)
      return newIndex
    });
  }
  const randomPerson = () => {
    let randomIndex = Math.floor(Math.random() * people.length);
    if (randomIndex === index) {
      randomIndex = checkNumber(index +1);
    }
    setIndex(randomIndex)
  }

  return (
    <article className='review'>
      <div className='img-container'>
        <img className='person-img' src={image} alt={name} />
        <span className='quote-icon'>
          <FaQuoteRight />
        </span>
      </div>
      
      <h4 className='author'>{name}</h4>
      <p className='job'>{job}</p>
      <p className='info'>{text}</p>
      <div className='button-container'>
        <button onClick={prevIndex} className="prev-btn" ><FaChevronLeft /></button>
        <button onClick={nextIndex} className="next-btn" ><FaChevronRight /></button>
      </div>
      <button onClick={randomPerson} className="random-btn" >Surprise me</button>
    </article>
  )
};

export default Review;
