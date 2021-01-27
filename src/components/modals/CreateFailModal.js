import React from 'react'
import './CreateFailModal.css';
//redux
import { useDispatch} from 'react-redux';
import {handleModal} from '../../redux/actions/index';

function CreateFailModal() {

	const dispatch =  useDispatch()	
	
	return (
		<div className= 'modal'>
			<div className='modal__card'>
				<h2>Couldn't create counter</h2>
				<p>The internet connection appears to be offline.</p>
				<div className='modal__buttonWrapper'>
					<button
						className='modal__buttonDismiss'
						onClick={() => dispatch(handleModal({}))}>
						Dismiss
					</button>
				</div>
			</div>
					
		</div>
	)
}

export default CreateFailModal
