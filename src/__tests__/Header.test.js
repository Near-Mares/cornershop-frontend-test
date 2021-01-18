import React from 'react';
import { render, screen } from '../testWithRedux';
import Header from '../components/Header';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';


test( '<Header /> renders correctly', () => {
    render(<Header />)
    const inputSearch = screen.getByTestId('headerInput')
    expect(inputSearch).toBeInTheDocument()
    userEvent.click(inputSearch)
    expect(screen.queryByTestId('blurWindow')).toBeInTheDocument()
    
})