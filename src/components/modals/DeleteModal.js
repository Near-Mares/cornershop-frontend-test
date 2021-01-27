import React from 'react'
import './DeleteModal.css';
//redux
import {useSelector, useDispatch} from 'react-redux';
import {handleModal, deselectedCounter, refreshCounters} from '../../redux/actions/index';

function DeleteModal() {

	const dispatch =  useDispatch()	
	const selectedCounters = useSelector( state => state.selectedCounters )

	const deleteCounters = () => {
		selectedCounters.forEach( counter => {
			fetch('/api/v1/counter', {
				method: 'delete',
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: counter.id })})
				.then(res => res.json())
				.then(res => {
					dispatch(refreshCounters(true))
					dispatch(deselectedCounter({ id: counter.id }))
				})
				.catch(err => {
					dispatch(handleModal({type: 'deleteFail', isOpen: true}))
				})
		})
	}

	return (
		<div className= 'modal'>
			<div className='modal__trash'>
				<h2>
					{
						selectedCounters.length === 1 ? (
							`Delete the "${selectedCounters[0].title}" counter?`
						): `Delete the counters selected?`
					}
				</h2>
				<p>This cannot be undone.</p>
				<div className='modal__buttonWrapper'>
					<button
						className='modal__buttonCancel'
						onClick={() => 	dispatch(handleModal({}))}
						>
						Cancel
					</button>
					<button
						className='modal__buttonDelete'
						onClick={() => {
							deleteCounters()
							dispatch(handleModal({}))
						}}
					>
						Delete
					</button>
				</div>
			</div>
					
		</div>
	)
}

export default DeleteModal
