import React from 'react';
import { render, screen } from '../testWithRedux';
import '@testing-library/jest-dom/extend-expect';
import MainScreen from '../layouts/MainScreen' 

test( '<MainScreen /> renders correctly', () => {
    render( <MainScreen /> )
})