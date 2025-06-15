import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from './reducers/index.js'
import { BrowserRouter } from 'react-router'

const picPickerStore = configureStore({
  reducer: rootReducer
})

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store = {picPickerStore}>
    <BrowserRouter>
      <App />
      <Toaster containerStyle={{
        top: "30px",
        left: "-800px",
       
        position: "absolute",

      }}/>
    </BrowserRouter>
  </Provider>
  // {/* </StrictMode>, */}
)
