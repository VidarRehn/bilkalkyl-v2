import './App.css'

import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Home from './pages/Home'

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
      </Routes>

    </div>
  );
}

export default App;
