import React from 'react'
import './DeleteFailModal.css';
//redux
import {useSelector, useDispatch} from 'react-redux';
import {handleModal, refreshCounters} from '../../redux/actions/index';

function UpdateFailModal() {

	const dispatch =  useDispatch()	
	const {title, count, id, type} = useSelector( state => state.operation)

	const retryOperation = () => {
		if( type === 'add') {
			fetch('/api/v1/counter/inc', {
				method: 'post',
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: id })})
				.then(res => res.json())
				.then(res => {
					console.log(`${res.id} incremented by one`)
					dispatch(refreshCounters(true))
				})
				.catch(err => {
					console.log(err)
					dispatch(handleModal({type: 'updateFail',isOpen: true}))
				})
		} else if (type !=='add' & count > 0 ) {
			fetch('/api/v1/counter/dec', {
				method: 'post',
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: id })})
				.then(res => res.json())
				.then(res => {
					console.log(`${res.id} decremented by one`)
					dispatch(refreshCounters(true))
				})
				.catch(err => {
					console.log(err)
					dispatch(handleModal({type: 'updateFail',isOpen: true}))
				})
		}
	}

	return (
		<div className= 'modal'>
			<div className='modal__trash'>
				<h2>
					{ type === 'add' ? `Couldn't update "${title}" to ${count + 1}` : `Couldn't update "${title}" to ${count - 1}`}
				</h2>
				<p>The internet connection appears to be offline.</p>
				<div className='modal__buttonWrapper'>
					<button
						className='modal__buttonRetry'
						onClick={() => 	{
							retryOperation()
							dispatch(handleModal({}))
						}}
						>
							Retry
					</button>
					<button
						className='modal__buttonDismiss'
						onClick={() => {
							dispatch(handleModal({}))
						}}
					>
						Dismiss
					</button>
				</div>
			</div>
					
		</div>
	)
}

export default UpdateFailModal
