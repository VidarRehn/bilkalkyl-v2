import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

import SectionContainer from '../styled-components/SectionContainer'

const Stats = () => {

    const { users } = useSelector(state => state.users)
    const { payments } = useSelector(state => state.payments)
    const { events } = useSelector(state => state.events)

    const [paymentsChartData, setPaymentsCharttData] = useState(null) 
    const [eventsChartData, setEventsCharttData] = useState(null) 
    
    useEffect(() => {
        if (users) {
            setPaymentsCharttData({
                labels: users.map(user => user.name),
                datasets: [{
                    label: 'Betalt',
                    data: users.map(user => {
                        let initial = 0
                        let payments = user.payments.map(payment => payment.amountPaid)
                        let reduced = payments.reduce((a, b) => a + b, initial)
                        return reduced
                    }),
                    backgroundColor: [
                        "#ffbb11",
                        "#50AF95",
                        "#2a71d0"
                    ]
                }]
            })
            setEventsCharttData({
                labels: users.map(user => user.name),
                datasets: [{
                    label: 'Förbrukat',
                    data: users.map(user => {
                        let initial = 0
                        let payments = user.events.map(event => {
                            return event.mileageAfter - event.mileageBefore
                        })
                        let reduced = payments.reduce((a, b) => a + b, initial)
                        return reduced
                    }),
                    backgroundColor: [
                        "#ffbb11",
                        "#50AF95",
                        "#2a71d0"
                    ]
                }]
            })
        }
    }, [users])

    return (
        <>
        <SectionContainer>
            <h4>Statistik</h4>
            <div className='charts'>
                {paymentsChartData && 
                <Pie 
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
                        }
                    }}
                />}
                 {eventsChartData && 
                <Pie 
                    data={eventsChartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: 'Förbrukat'
                            },
                            legend: {
                                display: false
                            }
                        }
                    }}
                />}
            </div>
        </SectionContainer>
        </>
    )
}

export default Stats