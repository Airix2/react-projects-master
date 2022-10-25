import React, { useState } from 'react';
import data from './data';
import SingleQuestion from './Question';


function App() {
  const [questions, setQuestions] = useState(data)

  return (
    <main>
      <div className='container'>
        <h3>Questions And Answers About Login</h3>
        <section>
          {questions.map((elem) => {
            return (
              <SingleQuestion key={elem.id} {...elem} />
            )
          })}
        </section>

      </div>
    </main>
  )
}

export default App;
