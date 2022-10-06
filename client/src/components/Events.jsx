import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEvents } from '../redux/eventsSlice'

const Events = () => {

    const dispatch = useDispatch()
    const { events } = useSelector(state => state.events)
  
    useEffect(() => {
      dispatch(getEvents())
    }, [])

    return (
        <div>
          <h4>Körningar</h4>
          <ul>
            {events && events.map((event, i) => {
              return (
                <li key={i}>
                  <p>{event.user}</p>
                  <p>{event.mileageBefore}</p>
                </li>
              )
            })}
          </ul>
        </div>
    )
}

export default Events