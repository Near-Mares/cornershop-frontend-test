import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className='home'>

    	<div className='home__logo' data-testid='logo'></div>

			<div className='home__title'>
				<div className='home__titleUp'>
					<p data-testid='welcome'>Welcome to counters</p>
				</div>

				<div className='home__titleDown'>
					<p data-testid='phrase'>Capture cups of lattes, frapuccinos or anything else that can be counted</p>
				</div>
			</div>

			<div className='home__start'>
				<a href='/main' data-testid='anchor'>
					<button className='home__startButton' data-testid='start'>Get started</button>
				</a>
			</div>
            
  	</div>
  )
}

export default Home