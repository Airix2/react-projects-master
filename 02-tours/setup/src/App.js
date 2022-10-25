import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tourData, setTourData] = useState([]);

  const getTours = async() => {
    setIsLoading(true)
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTourData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const deleteTour = (id) => {
    const updatedTours = tourData.filter((tour) => tour.id !== id)
    setTourData(updatedTours)
  }

  useEffect(() => {
    getTours()
  }, [])

    useEffect(() => {
    console.log("logging tours: ", tourData)
  }, [tourData])

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }

  if (tourData.length < 1) {
    return (
      <main>
        <section>
          <div className='title'>
            <h2>No Tours Left</h2>
            <button type='button' onClick={getTours} className="btn">Refresh</button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <Tours tourData={tourData} getTours={getTours} deleteTour={deleteTour} />
    </main>
  )
}

export default App
