import React from 'react'
import './Search.scss'

export const Search = () => (
  <div className='search-container'>
    <input type='text' className='search-input'></input>
    <button type="button" className='btn search-btn'>Search</button>
  </div>
)

export default Search
