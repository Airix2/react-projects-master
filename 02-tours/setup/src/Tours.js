import React from 'react';
import Tour from './Tour';
const Tours = ({tourData, getTours, deleteTour}) => {
  return (
    <section>
      <div className='title'>
        <h2>Our Tours</h2>
        <div className='underline'></div>
      </div>
      { tourData.map((tour) => {
        return (
          <Tour key={tour.id} deleteTour={deleteTour} {...tour} />
        )
      })}
    </section>
  )
};

export default Tours;
