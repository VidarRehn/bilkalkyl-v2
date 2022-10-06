import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBookings } from '../redux/bookingsSlice'

const Bookings = () => {

    const dispatch = useDispatch()
    const { bookings } = useSelector(state => state.bookings)
  
    useEffect(() => {
      dispatch(getBookings())
    }, [])

    return (
        <div>
          <h4>Kommande bokningar</h4>
          <ul>
            {bookings && bookings.map((booking, i) => {
              return (
                <li key={i}>
                  <p>{booking.user}</p>
                  <p>{booking.startDate}</p>
                </li>
              )
            })}
          </ul>
        </div>
    )
}

export default Bookings