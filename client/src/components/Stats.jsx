import styled, { css } from 'styled-components'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

import SectionContainer from '../styled-components/SectionContainer'

const ListItem = styled.li`
    padding: 10px;
    margin-top: 5px;
    background-color: #353535;
    list-style-type: none;
    display: flex;
    align-items: center;

    ${props => props.basic && css`
        background: transparent;
    `}

    >* {
        padding: 0px 5px;
    }

    >p {
        flex-basis:30%;
        display: flex;
        flex-direction: column;
    }

    >p:first-of-type {
        flex-basis: 35%;
    }

    .percentage {
        font-size: 20px;
        font-weight: bold;
    }

    .in-brackets {
        font-size: 12px;
    }
    
    .header {
        font-size: 12px;
    }

`

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
                <ListItem basic>
                    <p className='header'></p>
                    <p className='header'>Förbrukning</p>
                    <p className='header'>Betalt</p>
                </ListItem>
                {stats && stats.stats.map((user, i) => {
                    return (
                        <ListItem key={i}>
                            <p className={(user.name === 'Vidar & Esther') ? 'vidar' : (user.name === 'Carita & Filip') ? 'carita' :(user.name === 'Harriet & Jon-Erik') ? 'pappa' : null}>{user.name}</p>
                            <p><span className='percentage'>{Math.round((user.driven / stats.totalDriven)*100)}%</span> <span className='in-brackets'>({user.driven} km)</span></p>
                            <p><span className='percentage'>{Math.round((user.paid / stats.totalPaid)*100)}%</span> <span className='in-brackets'>({user.paid} SEK)</span></p>
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