import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ListItem from '../styled-components/ListItem'

const Bookings = () => {

    const { bookings } = useSelector(state => state.bookings)

    return (
        <div>
          <h4>Kommande bokningar</h4>
          <ul>
            {bookings && bookings.map((booking, i) => {
              return (
                <ListItem key={i}>
                  <p>{booking.user}</p>
                  <p>{booking.startDate}</p>
                </ListItem>
              )
            })}
          </ul>
        </div>
    )
}

export default Bookings