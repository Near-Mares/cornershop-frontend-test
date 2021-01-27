import React, { useState } from 'react';
import './Counter.css';
import { useDispatch } from 'react-redux';
import {
	selectedCounter,
	deselectedCounter,
	refreshCounters,
	operation,
	handleModal
} from '../redux/actions/index';

function Counter({counter}) {
	const dispatch = useDispatch();
	const { title, count, id } = counter
	const [ isSelected, setIsSelected ] = useState(false)
	const [ disabled, setDisabled ] = useState(false)

	const sumCount = () => {
		fetch('/api/v1/counter/inc', {
			method: 'post',
			headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: id })})
			.then(res => res.json())
			.then(res => {
				dispatch(refreshCounters(true))
			})
			.catch(err => {
				console.log(err)
				dispatch(handleModal({type: 'updateFail', isOpen: true}))
			})
		}
		
	const substractCount = () => {
		if( count <= 0 || disabled === true) {
			dispatch(handleModal({type: 'updateFail', isOpen: true}))
		return 
		} else {
			fetch('/api/v1/counter/dec', {
				method: 'post',
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: id })})
				.then(res => res.json())
				.then(res => {
					dispatch(refreshCounters(true))
					setDisabled(false)
				})
				.catch(err => {
					dispatch(handleModal({type: 'updateFail', isOpen: true}))
				})
		}

	}
	
	//send to global state the selected an deselected counters
	const select = e => {
		setIsSelected(!isSelected)
		if( isSelected === false ) {
			dispatch(selectedCounter({id: id, title: title, count: count}))
		} else {
			dispatch(deselectedCounter({id: id, title: title, count: count}))
		}
	}

	const avoidClickPropagation = e => {
		e.stopPropagation()
		return
	}


	return (
		<div className='counter' onClick={e => select(e)}>
			<div className={`selectedContainer ${isSelected === true ? 'selected': null}`} key={id} >
				<div className='counter__title'>
					{title}
				</div>

				<div className='counter__count' onClick={e => avoidClickPropagation(e)}>
					<button
						disabled={`${disabled===true ? 'disabled' : ''}`}
						onClick={() => {
							dispatch(operation({title:title, count: count, id: id, type: 'substract'}))
							substractCount()
						}}
						style={{
							color:`${count === 0 ? 'rgba(0,0,0,0.2)': ' #ff9500'}`
						}}
					>-</button>
					<h2
						style={{
							color: `${count === 0 ? 'rgba(0,0,0,0.2)': 'black'}`
						}}
					>
						{count}
					</h2>
					<button 
						onClick={(e) => {
							dispatch(operation({title:title, count: count, id: id, type: 'add'}))
							sumCount(e)
						}}
					>+</button>
				</div>
			</div>
		</div>
	)
}

export default Counter