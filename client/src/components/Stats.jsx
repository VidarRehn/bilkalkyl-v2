import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Pie, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

import SectionContainer from '../styled-components/SectionContainer'
import ListItem from '../styled-components/ListItem'

const Stats = () => {

    const { users } = useSelector(state => state.users)
    const { payments } = useSelector(state => state.payments)
    const { events } = useSelector(state => state.events)

    const [paymentsChartData, setPaymentsCharttData] = useState(null) 
    const [eventsChartData, setEventsCharttData] = useState(null) 
    const [stats, setStats] = useState(null)
    
    useEffect(() => {
        if (users && payments && events) {
            setStats({
                // remove "Harriet & Jon-Erik"
                stats: users.filter(user => user.name !== 'Harriet & Jon-Erik').map(user => {
                let payments = user.payments.map(payment => payment.amountPaid)
                let paid = payments.reduce((a, b) => a + b, 0)
                let events = user.events.map(event => event.mileageAfter - event.mileageBefore)
                let driven = events.reduce((a, b) => a + b)
                return {
                    name: user.name,
                    driven: driven,
                    paid: paid
                }
            }),
            totalPaid: payments.map(payment => payment.amountPaid).reduce((a,b) => a+b),
            totalDriven: events.map(event => event.mileageAfter - event.mileageBefore).reduce((a,b) => a+b)
            })
            setPaymentsCharttData({
                // remove "Harriet & Jon-Erik"
                labels: users.filter(user => user !== 'Harriet & Jon-Erik').map(user => user.name),
                datasets: [{
                    label: 'Betalt',
                    data: users.filter(user => user !== 'Harriet & Jon-Erik').map(user => {
                        let initial = 0
                        let payments = user.payments.map(payment => payment.amountPaid)
                        let reduced = payments.reduce((a, b) => a + b, initial)
                        return reduced
                    }),
                    backgroundColor: [
                        "#e3e24b",
                        "#37db78",
                    ],
                    borderWidth: [5],
                    borderColor: ['#303030']
                }]
            })
            setEventsCharttData({
                // remove "Harriet & Jon-Erik"
                labels: users.filter(user => user.name !== "Harriet & Jon-Erik").map(user => user.name),
                datasets: [{
                    label: 'Förbrukat',
                    data: users.filter(user => user.name !== "Harriet & Jon-Erik").map(user => {
                        let initial = 0
                        let payments = user.events.map(event => {
                            return event.mileageAfter - event.mileageBefore
                        })
                        let reduced = payments.reduce((a, b) => a + b, initial)
                        return reduced
                    }),
                    backgroundColor: [
                        "#e3e24b",
                        "#37db78",
                    ],
                    borderWidth: [5],
                    borderColor: ['#303030']
                }]
            })
        }
    }, [users, payments, events])

    return (
        <>
        <SectionContainer>
            <h4>Statistik</h4>
            <ul className='stats'>
                {stats && stats.stats.map(user => {
                    return (
                        <ListItem>
                            <strong className={(user.name === 'Vidar & Esther') ? 'vidar' : (user.name === 'Carita & Filip') ? 'carita' :(user.name === 'Harriet & Jon-Erik') ? 'pappa' : null}>{user.name}</strong>
                            <div>
                                <p>Förbrukning</p>
                                <p>{user.driven} km <span>{Math.round((user.driven / stats.totalDriven)*100)}%</span></p>
                            </div>
                            <div>
                                <p>Betalt</p>
                                <p>{user.paid} SEK <span>{Math.round((user.paid / stats.totalPaid)*100)}%</span></p>
                            </div>
                        </ListItem>
                    )
                })}
            </ul>
            <div className='charts'>
                {paymentsChartData && 
                <Doughnut 
                    data={paymentsChartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: 'Betalt'
                            },
                            legend: {
                                display: false
                            }
                        },
                        cutout: 15
                    }}
                />}
                 {eventsChartData && 
                <Doughnut 
                    data={eventsChartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: 'Förbrukning'
                            },
                            legend: {
                                display: false
                            }
                        },
                        cutout: 15
                    }}
                />}
            </div>
        </SectionContainer>
        </>
    )
}

export default Stats