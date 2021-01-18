import React from 'react';
import { render, screen } from '../testWithRedux';
import Footer from '../components/Footer';
import '@testing-library/jest-dom/extend-expect';


test( '<Footer /> renders correctly', () => {
    render(<Footer />)

    const plusButton = screen.getByTestId('buttonPlus')
    expect( plusButton ).toBeInTheDocument()
    expect( plusButton.tagName ).toBe('BUTTON')
    expect( plusButton.textContent ).toBe('+')

})