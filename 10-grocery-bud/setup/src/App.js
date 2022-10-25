import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(list)
  }
  else {
    return []
  }
}

function App() {
  const [list, setList] = useState(getLocalStorage())
  const [text, setText] = useState("")
  const [editing, setEditing] = useState(-1)
  const [alert, setAlert] = useState({type: '', msg: ''})

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      showAlert('danger', "Name needed")
    } else if (editing === -1) {
        let newList = {id: new Date().getTime().toString(), title: text }
        setList([...list, newList])
        showAlert('success', "Item adeed to the list")
        setText("")
    } else {
      let newList = list.map((elem) => {
        if (elem.id === editing) {
          return {...elem, title: text}
        } else {
          return elem
        }
      })
      setList(newList)
      setEditing(-1)
      showAlert('success', "Value changed")
      setText("")
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert()
    }, 2000);
    return () => clearTimeout(timeout)
  }, [list])

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  

  const showAlert = (type = '', msg = '') => {
    setAlert({type, msg });
  };

  
  const handleClear = () => {
    setList([])
    showAlert('danger', 'Emptied List')
  }

  const handleEdit = (id) => {
    let item = list.find((item) => {
      if (item.id === id) {
        return item
      }
      return null
    })
    setEditing(item.id)
    setText(item.title)
  }

  const handleDelete = (id) => {
    let result = list.filter((item, i) => {
      if (id !== item.id) {
        return item
      }
      return null
    })
    console.log(result)
    showAlert('danger', 'Item Removed')
    setList(result)
  }

  return (
    <section className='section-center'>
      {
        alert.msg !== "" && <Alert {...alert} />
      }
      <form className='grocery-form' onSubmit={handleSubmit}>
        <h3>Grocery Bud</h3>
        <div className='form-control'>
          <input type="text" className='grocery' value={text} onChange={(e) => setText(e.target.value)} />
          <button className='submit-btn'>{editing === -1 ? "Submit" : "Edit"}</button>
        </div>
      </form>
      <List handleEdit={handleEdit} handleDelete={handleDelete} list={list} />
      <button className='clear-btn' onClick={handleClear}>Clear Items</button>
    </section>
  )
}

export default App
