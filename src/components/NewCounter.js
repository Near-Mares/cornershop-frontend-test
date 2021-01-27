import React,{ useState } from 'react';
import './NewCounter.css';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { newCounter, sendNewCounter, handleModal } from '../redux/actions/index';


function NewCounter() {
	const [ examples, setExamples] = useState(false)
	const [counterTitle, setCounterTitle] = useState('')
	const [ createAnimation, setCreateAnimation ] = useState(false)
	// Redux
	const shown = useSelector( state => state.newCounter )
	const dispatch = useDispatch();

	//examples of options object for rendering
	const exampleOptions = [
		['Cups of coffee', 'Glasses of water', 'Jugs of beer', 'Soda cans', 'Energy bottles'],
		['Hot-dogs', 'Cupcakes eaten', 'Chicken wings', 'Snacks in the bag', 'French fries'],
		['Times sneezed', 'Naps', 'Day dreaming', 'Clothes bought', 'Favors done']
	]

	//closes examples and sets input value selected
	const handleExamples = e => {
		setExamples(!examples)
		setCounterTitle(e.target.innerText)
	}

	//dispatches the server response when postin new counter
	const handleSubmit = e => {
		e.preventDefault()
		if( counterTitle.trim()!== '') {
			setCreateAnimation(true)
			fetch('/api/v1/counter', {
				method: 'post',
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: counterTitle })})
				.then(res => res.json())
				.then(res => {
					res.title && dispatch(sendNewCounter(res))
					setTimeout(setCreateAnimation(false), 1000)
					setCounterTitle('')
				})
				.catch(err => {
					setCreateAnimation(false)
					dispatch(handleModal({type: 'createFail', isOpen: true}))
				})
		}
	}

	return (
		<div className={shown === true ? 'container' : 'container__hidden'}>
			<div className={ shown === true ? 'card' : 'card__hidden'}>
				{
					examples === true ? (
						<div className='card__header'>
							<div className='card__headerIcon'>
								<button 
									className='card__headerIconX' 
									onClick={e => {
										dispatch(newCounter(false))
										handleExamples(e)
									}}
								>
									<i className='bx bx-x bx-sm'></i>
								</button>
							</div>
							<div className='card__headerTitle'>Examples</div>
						</div>
					) : (
						<div className='card__header'>
							<div className='card__headerIcon'>
								<button
								className='card__headerIconX'
								onClick={() => dispatch(newCounter(false))}
								>
									<i className='bx bx-x bx-sm'></i>
								</button>
							</div>
							<div className='card__headerTitle'>Create Counter</div>
							<div className='card__headerButton'>
								<button
									className='card__headerButtonSave'
									style={{
										backgroundColor: `${counterTitle===''?'#ff95003b':'#ff9500'}`
									}}
									onClick={handleSubmit}
								>
									Save
								</button>
							</div>
							
							{
								createAnimation === true ? (
									<div className='create__refreshing'>
										<div className='create__refreshingIcon'>
										<i className='bx bxs-circle bx-tada outer' style={{color: 'rgba(255,149,0,0.2)'}}></i>
										<i className='bx bxs-circle bx-burst center' style={{color:'rgba(255,149,0,0.44)'}}></i>
										<i className='bx bxs-circle bx-tada inner' style={{color:'#ff9500'}}></i>
										</div>
									</div>
								) : null
							}
						</div>
					)
				}      
				{
					examples === false ? (
						<div className='card__main'>
							<div className='card__mainTitle'>Name</div>
							<form className='card__mainInput' onSubmit={handleSubmit}>
								<input
									type="text"
									placeholder='Cups of Coffee'
									className='card__mainInputText'
									onChange={e => setCounterTitle(e.target.value)}
									value={counterTitle}
									autoFocus
								/>
							</form>
							<div className='card__mainSubtitle'>
								Give it a name. Creative block? See &nbsp;
								<u><span  onClick={(e) => handleExamples(e)}>examples</span></u>
							</div>
						</div>
								
					) : (
						<div className='card__main'>
							<div className='card__mainExamplesTitle'>
								Select an example to add it to your counters.
							</div>
							
							<div className='card__examples'>
								<div className='card__examplesType'>Drinks</div>

								<div className='card__examplesOptions'>
									{
										exampleOptions[0].map( (drink, i) => (
											<button
												className='card__examplesOption'
												onClick={(e) => handleExamples(e)}
												key={`0${i}`}
											>
												{drink}
											</button>
										))
									}
								</div>
							</div>

							<div className='card__examples'>
								<div className='card__examplesType'>Food</div>

								<div className='card__examplesOptions'>
									{
										exampleOptions[1].map( (food, i) => (
											<button
												className='card__examplesOption'
												onClick={(e) => handleExamples(e)}
												key={`1${i}`}
											>
												{food}
											</button>
										))
									}
								</div>
							</div>

							<div className='card__examples'>
								<div className='card__examplesType'>Misc</div>

								<div className='card__examplesOptions'>
								{
										exampleOptions[2].map( (misc, i) => (
												<button
													className='card__examplesOption'
													onClick={(e) => handleExamples(e)}
													key={`2${i}`}
												>
													{misc}
												</button>
										))
									}
								</div>
							</div>
						</div>
					)
				}
					

			</div>
		</div>
	)
}

export default NewCounter
