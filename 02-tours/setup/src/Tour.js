import React, { useState } from 'react';

const Tour = ({image, name, info, id, price, deleteTour}) => {
  const [readMore, setReadMore] = useState(false);


  return (
    <article className="single-tour" key={id}>
      <img src={image} alt="" />
      <footer>
        <div className='tour-info'>
          <h4>{name}</h4>
          <h4 className="tour-price">{price}</h4>
        </div>
        <p> 
          { readMore ? info : `${info.substring(0,200)}` } 
          <button onClick={() => setReadMore(!readMore)}>{ readMore ? "show less" : "read more"}</button>
        </p>
        <button className='delete-btn' value={id} onClick={(e) => deleteTour(e.target.value)}>Not Interested</button>
      </footer>
    </article>
  )
};

export default Tour;
