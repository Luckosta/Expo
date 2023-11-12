import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/auth';
import profileReducer from '../slices/profile';

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
