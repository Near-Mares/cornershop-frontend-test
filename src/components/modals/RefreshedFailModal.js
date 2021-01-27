import React from 'react'
import './RefreshedFailModal.css';
//redux
import {useDispatch} from 'react-redux';
import {handleModal, refreshCounters} from '../../redux/actions/index';

function RefreshedFailModal() {
	const dispatch =  useDispatch()	

	return (
		<div className='mainScreen__empty' style={{zIndex: 2}}>
      <h3>Couldn't load the counters</h3>
      <p>The internet connection appears to be offline.</p>
      <button onClick={() => {
        dispatch(refreshCounters(true))
        dispatch(handleModal({type: 'refreshFail', isOpen: false}))
      }}
			>
				Retry
			</button>
    </div>  
	)
}

export default RefreshedFailModal
