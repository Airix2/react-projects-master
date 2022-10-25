import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const List = ({handleDelete, handleEdit, list}) => {
  return (
    <div className='grocery-container'>
      {list.map((item, index) => {
        const {id, title} = item
        return (
          <div key={id} className='grocery-item'>
            <label className='title'>{title}</label>
            <div>
              <button className='edit-btn' onClick={() => handleEdit(id)}><FaEdit /></button>
              <button className='delete-btn' onClick={() =>handleDelete(id)}><FaTrash /></button>
            </div> 
            
          </div> 
        )
      })}
    </div>
  )
}

export default List
