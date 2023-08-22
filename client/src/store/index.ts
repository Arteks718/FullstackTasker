import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './slices/usersSlice'
import tasksReducer from './slices/tasksSlice'

const reducer = {
  usersData: usersReducer,
  tasksData: tasksReducer
}

const store = configureStore({ reducer })

export default store