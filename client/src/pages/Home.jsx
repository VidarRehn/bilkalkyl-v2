
import Header from "../components/Header"
import UpcomingBookings from "../components/UpcomingBookings"
import Stats from '../components/Stats'
import Buttons from '../components/Buttons'

import MobileContainer from "../styled-components/MobileContainer"

const Home = () => {

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