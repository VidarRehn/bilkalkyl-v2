import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import ListItem from '../styled-components/ListItem'
import UserBall from '../styled-components/UserBall'
import SectionContainer from '../styled-components/SectionContainer'

const UpcomingBookings = () => {

    const { bookings } = useSelector(state => state.bookings)
    const [upcoming, setUpcoming] = useState(null)

    const getUpcoming = () => {
        const today = new Date().getTime()
        const upcoming = bookings.filter(booking => {
            let date = new Date(booking.startDate).getTime()
            return date > today
        })
        setUpcoming(upcoming)
    }

    useEffect(() => {
        if (bookings) {
            getUpcoming()
        }
    }, [bookings])

    return (
        <>
        <SectionContainer>
            <h4>Kommande bokningar</h4>
            <ul>
                {upcoming && upcoming.map((booking, i) => {

                    let startDay = new Date(booking.startDate).getDate()
                    let startMonth = new Date(booking.startDate).toLocaleString('default', {month: 'short'})
                    let endDay = new Date(booking.startDate).getDate()
                    let endMonth = new Date(booking.startDate).toLocaleString('default', {month: 'short'})
                    return (
                        <ListItem key={i}>
                            <UserBall>XX</UserBall>
                            <div>
                                <strong>{booking.comment}</strong>
                                <p>{`${startDay} ${startMonth} - ${endDay} ${endMonth}`}</p>
                            </div>
                            {/* <button>remove</button> */}
                        </ListItem>
                    )
                })}
            </ul>
        </SectionContainer>
        </>
    )
}

export default UpcomingBookings