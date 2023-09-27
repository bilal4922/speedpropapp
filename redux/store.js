// store.js
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { dataReducer } from './reducer';
import { addRestaurantReducer } from './reducer';

const rootReducer = {
  data: dataReducer,
  restaurant:addRestaurantReducer,
  // other reducers...
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
