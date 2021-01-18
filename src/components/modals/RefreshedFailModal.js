import React from 'react'
import './RefreshedFailModal.css';
//redux
import {useSelector, useDispatch} from 'react-redux';
import {handleModal, deselectedCounter, refreshCounters} from '../../redux/actions/index';

function RefreshedFailModal() {

	const dispatch =  useDispatch()	
	//const modalOpener = useSelector( state => state.handleModal	)

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
