import React from 'react'
import {  Link } from "react-router-dom";

const Lobby = () => {
  return (
    <div>
      <button><Link to="/lobby" >Home</Link></button>
      <button><Link to="/options" >Asserts</Link></button>
      <button><Link to="/game" >Game</Link></button>
    </div>
  )
}

export default Lobby
