import Header from "../components/Header"
import List from "../components/List"
import Bookings from "../components/Bookings"
import Events from "../components/Events"


const Home = () => {
    return (
        <>
        <Header />
        <Events />
        <Bookings />
        <List />
        </>
    )
}

export default Home