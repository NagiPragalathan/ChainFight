import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Result from './components/Result.jsx'
import './styles/index.css'
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Router>
    <Provider store={store}>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/result" exact element={<Result />} />
      </Routes></Provider>
    </Router>
    
  </React.StrictMode>
)
