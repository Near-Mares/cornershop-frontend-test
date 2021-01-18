import React from 'react';
import { render, screen } from '../testWithRedux';
import Home from '../layouts/Home';
import '@testing-library/jest-dom/extend-expect';


test( '<Home /> renders correctly', () => {
    render(<Home />)
   
    expect(screen.getByTestId('logo')).toBeInTheDocument()

    const welcome = screen.getByTestId('welcome')
    expect(welcome).toBeInTheDocument()
    expect(welcome.tagName).toBe('P')
    expect(welcome.textContent).toBe('Welcome to counters')

    const phrase = screen.getByTestId('phrase')
    expect(phrase).toBeInTheDocument()
    expect(phrase.tagName).toBe('P')
    expect(phrase.textContent).toBe('Capture cups of lattes, frapuccinos or anything else that can be counted')

    const anchor = screen.getByTestId('anchor') 
    expect(anchor).toBeInTheDocument()
    expect(anchor.tagName).toBe('A')

    const start = screen.getByTestId('start')
    expect(start).toBeInTheDocument()
    expect(start.textContent).toBe('Get started')
    expect(start.tagName).toBe('BUTTON')

})