import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducers';
const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;