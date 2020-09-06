import notebooks from './notebooks';
import sidebar from './sidebar';
import theme from './theme';
import { combineReducers } from '@reduxjs/toolkit'
export default combineReducers({
    notebooks,
    sidebar,
    theme
})