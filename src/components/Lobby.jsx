import React from 'react'
import { Link } from 'react-router-dom'

const Lobby = () => {
  return (
    <div>
      <button><a href="home" >Home</a></button>
      <button><a href="/elements" >Asserts</a></button>
      <button><a href="/game" >Game</a></button>
    </div>
  )
}

export default Lobby
