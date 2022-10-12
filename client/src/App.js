import './App.css'

import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Home from './pages/Home'
import RegisterEvent from './pages/RegisterEvent';
import RegisterBooking from './pages/RegisterBooking';
import RegisterPayment from './pages/RegisterPayment';

import { getBookings } from './redux/bookingsSlice'
import { getPayments } from './redux/paymentsSlice'
import { getEvents } from './redux/eventsSlice'
import { getUsers } from './redux/usersSlice'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getUsers())
      dispatch(getPayments())
      dispatch(getEvents())
      dispatch(getBookings())
    }, [])


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
