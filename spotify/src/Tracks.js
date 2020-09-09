import React from 'react'

export default function Tracks ({ tracks }) {
  return (
    <ul id='tracks'>
      {tracks.map((track)=> (
        <li key={track.id}>
          {track.name}
        </li>
      ))}
    </ul>
  ) 
}