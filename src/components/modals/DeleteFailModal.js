import React from 'react'
import './DeleteFailModal.css';
//redux
import {useSelector, useDispatch} from 'react-redux';
import {handleModal, deselectedCounter, refreshCounters} from '../../redux/actions/index';

function DeleteModal() {

	const dispatch =  useDispatch()	
	//const modalOpener = useSelector( state => state.handleModal	)
	const selectedCounters = useSelector( state => state.selectedCounters )

	const deleteCounters = () => {
		selectedCounters.forEach( counter => {
			fetch('/api/v1/counter', {
				method: 'delete',
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: counter.id })})
				.then(res => res.json())
				.then(res => {
					console.log(`counter deleted is "${res}"`)
					dispatch(refreshCounters(true))
					dispatch(deselectedCounter({ id: counter.id }))
				})
				.catch(err => {
					console.log(err)
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
							`Couldn't delete "${selectedCounters[0].title}"`
						): `Couldn't delete the counters selected`
					}
				</h2>
				<p>The internet connection appears to be offline.</p>
				<div className='modal__buttonWrapper'>
					<button
						className='modal__buttonRetry'
						onClick={() => 	{
							dispatch(handleModal({}))
							deleteCounters()
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

export default DeleteModal
