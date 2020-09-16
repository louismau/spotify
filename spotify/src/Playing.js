import React from 'react'

export default function Playing ({handleWin, handleNext, points, cover}) {
    return (
      <React.Fragment>
        <img src={cover} width='300' className='cover'/>
        <input 
          className='input'
          type='text' 
          placeholder='Your guess' 
          onChange={handleWin}></input>
        <p>Score: {points} </p>
        <button className='btn' onClick={handleNext}>
          Next
        </button>
      </React.Fragment>
      )
}