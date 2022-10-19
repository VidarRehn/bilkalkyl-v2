import styled, { css } from 'styled-components'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import SectionContainer from '../styled-components/SectionContainer'

import { getBookings } from '../redux/bookingsSlice'

const Container = styled.div`
    display: flex;
    justify-content: space-between;

    button {
        background-color: transparent;
        border: none;
    }

    i {
        color: #d6d6d6;
        font-size: 20px;
        margin-right: 10px;
    }
`

const ListItem = styled.li`
    padding: 10px;
    margin-top: 5px;
    background-color: #353535;
    list-style-type: none;
    display: flex;
    align-items: center;

    >* {
        padding: 0px 5px;
    }

    >p:first-of-type {
        flex-basis: 35%;
    }

    >p:nth-of-type(2) {
        flex-basis: 60%;
        font-size: 12px;
    }

    button {
        flex-basis: 5%;
        justify-self: flex-end;
        background-color: transparent;
        border: none;
        color: #d6d6d6;
        font-size: 16px;
    }
`

const UpcomingBookings = () => {

    const dispatch = useDispatch()

    const { bookings } = useSelector(state => state.bookings)
    const [upcoming, setUpcoming] = useState(null)
    const [showUpcoming, setShowUpcoming] = useState(false)

    const getUpcoming = () => {
        const today = new Date().getTime()
        const upcoming = bookings.filter(booking => {
            let date = new Date(booking.startDate).getTime()
            return date > today
        })
        setUpcoming(upcoming)
    }

    const removeBooking = async (user, bookingId) => {
        let isExecuted = window.confirm('Är du säker på att du vill ta bort denna bokning?')
        if (isExecuted) {
            await fetch(`api/users/${user}/bookings/${bookingId}`, {method: 'put'})
            dispatch(getBookings())
            setShowUpcoming(false)
        }
    }

    useEffect(() => {
        if (bookings) {
            getUpcoming()
        }
    }, [bookings])

    return (
        <>
        <SectionContainer>
            <Container>
                <h4>Kommande bokningar</h4>
                <button onClick={() => setShowUpcoming(!showUpcoming)}>
                    {showUpcoming ? <i className="fa-solid fa-circle-chevron-up"></i> : <i className="fa-solid fa-circle-chevron-down"></i>}
                </button>
            </Container>
            {showUpcoming && (
            <ul>
                {upcoming && upcoming.length >0 ? upcoming.map((booking, i) => {
                    console.log(booking)
                    return (
                        <ListItem key={i}>
                            <p className={(booking.user === 'Vidar & Esther') ? 'vidar' : (booking.user === 'Carita & Filip') ? 'carita' :(booking.user === 'Harriet & Jon-Erik') ? 'pappa' : null}>{booking.user}</p>
                            <p>{`${booking.startDate} - ${booking.endDate}`}</p>
                            <button onClick={() => removeBooking(booking.user, booking.id)}><i className="fa-solid fa-trash-can"></i></button>
                            {/* <p>{booking.comment}</p> */}
                        </ListItem>
                    )
                }) : <ListItem>Inga kommande bokningar</ListItem>}
            </ul>
            )}
        </SectionContainer>
        </>
    )
}

export default UpcomingBookings