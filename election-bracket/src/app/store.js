import { configureStore } from '@reduxjs/toolkit'
import stateStatusReducer from '../reducers/stateStatus.ts'
export default configureStore({
  reducer: {
    stateStatus: stateStatusReducer,
  },
})