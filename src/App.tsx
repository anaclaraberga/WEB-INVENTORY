import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard } from './pages/dashboard/dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Router>
          <Route path="/" element={<Dashboard />} />
        </Router>
      </Routes>
    </BrowserRouter>
  )
}

export default App
