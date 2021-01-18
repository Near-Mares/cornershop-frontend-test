import React from 'react';
import './Footer.css';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { newCounter, handleModal } from '../redux/actions/index';
import SharePopoverModal from './modals/SharePopoverModal';


function Footer() {

	const countersSelected = useSelector( state => state.selectedCounters )
	const modal = useSelector( state => state.handleModal)
	const dispatch = useDispatch()

	return (
		<div className='mainScreen__footer'>
			<hr className='mainScreen__separator'/>
			{	countersSelected.length !== 0 ? (
				<div className='footer__buttonWraper'>
					<button
						data-testid='buttonTrash'
						className='mainScreen__footerButton trash'
						style={{backgroundColor: 'white', color: 'red'}}
						onClick={() => dispatch(handleModal({ type: 'delete', isOpen: true}))}
					>
						<i className='bx bx-trash bx-sm' ></i>
					</button>
					<button
						data-testid='buttonShare'
						className='mainScreen__footerButton share'
						style={{backgroundColor: 'white', color: 'black'}}
						onClick={() => {
							if ( modal.type === 'share' & modal.isOpen ===true ) {
								dispatch(handleModal({type: 'share',isOpen: false}))
							} else {
								dispatch(handleModal({type: 'share',isOpen: true}))
							}
						}}
					>
						<i className='bx bx-upload bx-sm '></i>
					</button>
				</div>
				) : null
			}
			<button
				data-testid='buttonPlus'
				className='mainScreen__footerButton plusSign'
				onClick={() => dispatch(newCounter(true))}
			>
				+
			</button>
		</div>
	)
}

export default Footer