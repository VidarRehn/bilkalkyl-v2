
import Header from "../components/Header"
import UpcomingBookings from "../components/UpcomingBookings"
import Stats from '../components/Stats'
import Buttons from '../components/Buttons'
import Latest from "../components/Latest"

import MobileContainer from "../styled-components/MobileContainer"

const Home = () => {

    return (
        <>
        <MobileContainer>
            <Header />
            <UpcomingBookings />
            <Latest />
            <Buttons />
            <Stats />
        </MobileContainer>
        </>
    )
}

export default Home