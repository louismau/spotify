import React from 'react'

export default function Play ({ handleSubmit }) {
  return (
    <button
      className='btn btn-green'
      onClick={handleSubmit}>
      Play
    </button>
  )
}