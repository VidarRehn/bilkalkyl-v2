import Header from "../components/Header"
import List from "../components/List"
import Bookings from "../components/Bookings"
import Events from "../components/Events"
import Payments from "../components/Payments"


const Home = () => {
    return (
        <>
        <Header />
        <Bookings />
        <Events />
        <Payments />
        <List />
        </>
    )
}

export default Home