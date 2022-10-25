import React, { useState } from 'react';
import data from './data';
function App() {
  const [amount, setAmount] = useState(0)
  const [text, setText] = useState([])

  const getParagraphs = () => {
    let cant = amount;
    if (cant < 0) {
      cant = 1;
    } else if (cant > 8) {
      cant = 8;
    }

    let paragraph = data.filter((elem, i) => {
      if (i < cant) {
        return elem
      }
    })

    setText(paragraph)
  }
  
  return (
    <section className='section-center'>
      <h3>Tired of boring lorem ipsum?</h3>
      <form className='lorem-form'>
        <label>Paragraphs</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type='button' className='btn' onClick={getParagraphs}>Generate</button>
      </form>
      {text.map((elem) => {
        return (
          <p>{elem}</p>
        )
        
      })}
    </section>
    )
}

export default App;
