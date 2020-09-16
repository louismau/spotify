import React from 'react'

export default function Restart ({handleReset}) {
    return (
      <button className='btn' onClick={handleReset}>
        Restart
      </button>
    )
}