import './App.css'

import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import RegisterEvent from './pages/RegisterEvent';
import RegisterBooking from './pages/RegisterBooking';
import RegisterPayment from './pages/RegisterPayment';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register-event' element={<RegisterEvent />}/>
        <Route path='/register-payment' element={<RegisterPayment />}/>
        <Route path='/register-booking' element={<RegisterBooking />}/>
      </Routes>

    </div>
  );
}

export default App;
