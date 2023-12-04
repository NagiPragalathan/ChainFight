import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Result from './components/Result.jsx'
import './styles/index.css'
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Router>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/result" exact element={<Result />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
