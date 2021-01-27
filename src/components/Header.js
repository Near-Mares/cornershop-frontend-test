import React, { useState } from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
//redux
import {useDispatch} from 'react-redux';
import { searchCounter } from '../redux/actions/index'

function Header() {
  const [ focus, setFocus] = useState(false)
  const [ text, setText ] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    setFocus(false)
    setText('')
    return
  }

  const dispatch = useDispatch();

  return (
    <form className='header__form' onSubmit={handleSubmit}>
      <div 
        className={focus=== true & text==='' && `header__blurWindow`}
        data-testid='blurWindow'
      ></div>
      <div className={`header__search ${focus===true && 'searchOnFocus'}`}>
        <SearchIcon className='header__searchIcon'/>
                
        <input
          type="text"
          placeholder='Search Counters'
          className='header__searchInput'
          data-testid='headerInput'
          onFocus={() => setFocus(true)}
          onBlur={ e => {
            setText(e.target.value)
            dispatch(searchCounter(e.target.value))
            setTimeout(() => setFocus(false), 500)
          }}
          onChange={e => {
            setText(e.target.value)
            dispatch(searchCounter(e.target.value))
          }}
          value={text}
          ></input>
      </div>  
      {
        focus === true && (
        <button
          className='header__button'
          onClick= {() => {
            setText('');
            dispatch(searchCounter(''));
          }}
        >
          Cancel
        </button>)
      }  
      
    </form>
  )
}

export default Header
