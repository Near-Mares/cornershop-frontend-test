import React, { useEffect } from 'react'
import './SharePopoverModal.css';
//redux
import { useSelector, useDispatch } from 'react-redux';
import {handleModal} from '../../redux/actions/index';

function SharePopoverModal() {
	const dispatch =  useDispatch();
	const selected = useSelector( state => state.selectedCounters);

	useEffect(() => {
		selected.length === 0 && (
			dispatch(handleModal({type:'share',isOpen: false}))
		)
		// eslint-disable-next-line
	}, [selected]);

	return (
		<div className={`shareContainer ${selected.length === 0 && 'hidden'}`}>
		<div className='containerLeft'>
			<p>
				{
					selected.length === 1 ? (
						`share 1 counter`
					):(
						`share ${selected.length} counters`
					)
				} 
			</p>
			<button 
				className='containerLeft__button'
				onClick={() => dispatch(handleModal({type: 'share', isOpen: false}))}
			>
				Copy
			</button>
		</div>

		<div className='containerRight'>
			{
				selected.map( counter => (
					<p key={counter.id}>
						{`${counter.count} x ${counter.title}`}
					<br></br></p>
				))
			}
		</div>
		
	</div>
	)
}

export default SharePopoverModal
