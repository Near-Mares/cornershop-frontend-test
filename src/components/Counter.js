import React, { useState } from 'react';
import './Counter.css';
import { useSelector, useDispatch } from 'react-redux';
import {selectedCounter, deselectedCounter, refreshCounters, operation, handleModal} from '../redux/actions/index';



function Counter({counter}) {
	const dispatch = useDispatch();
	const { title, count, id } = counter
	//numCount is a parallel state count
	const [ numCount, setNumCount ] = useState( count )
	const [ isSelected, setIsSelected ] = useState(false)
	const [ disabled, setDisabled ] = useState(false)

	const sumCount = () => {
		fetch('/api/v1/counter/inc', {
			method: 'post',
			headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: id })})
			.then(res => res.json())
			.then(res => {
				console.log(`${res.id} incremented by one`)
				dispatch(refreshCounters(true))
				setNumCount(count)
			})
			.catch(err => {
				console.log(err)
				dispatch(handleModal({type: 'updateFail', isOpen: true}))
			})
		}
		
	const substractCount = () => {
		if( count <= 0 || disabled === true) {
		console.log('number cannot be decremented yet')
		return 
		} else {
			fetch('/api/v1/counter/dec', {
				method: 'post',
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: id })})
				.then(res => res.json())
				.then(res => {
					console.log(`${res.id} decremented by one`)
					dispatch(refreshCounters(true))
					setNumCount(count)
					setDisabled(false)
				})
				.catch(err => {
					console.log(err)
					dispatch(handleModal({type: 'updateFail', isOpen: true}))
				})
		}

	}
	
	//send to global state the selected an deselected counters
	const select = e => {
		setIsSelected(!isSelected)
		if( isSelected === false ) {
			dispatch(selectedCounter({id: id, title: title, count: count}))
			console.log(`selected item id is ${id}`)
		} else {
			dispatch(deselectedCounter({id: id, title: title, count: count}))
			console.log(`deselected item id is ${id}`)
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
							//setDisabled(true)
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