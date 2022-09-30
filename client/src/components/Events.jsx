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
        <div>this is events</div>
    )
}

export default Events