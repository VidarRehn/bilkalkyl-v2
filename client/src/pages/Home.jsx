import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

import { getBookings } from '../redux/bookingsSlice'
import { getPayments } from '../redux/paymentsSlice'
import { getEvents } from '../redux/eventsSlice'
import { getUsers } from '../redux/usersSlice'

import Header from "../components/Header"
import UpcomingBookings from "../components/UpcomingBookings"
import Stats from '../components/Stats'
import Buttons from '../components/Buttons'

import MobileContainer from "../styled-components/MobileContainer"

const Home = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getPayments())
        dispatch(getEvents())
        dispatch(getBookings())
      }, [])

    return (
        <>
        <MobileContainer>
            <Header />
            <UpcomingBookings />
            <Buttons />
            <Stats />
            {/* <Bookings /> */}
            {/* <Events /> */}
            {/* <Payments /> */}
        </MobileContainer>
        </>
    )
}

export default Home