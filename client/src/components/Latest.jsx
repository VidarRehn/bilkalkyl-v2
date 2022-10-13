import styled, { css } from 'styled-components'
import { useState } from "react"
import { useSelector } from 'react-redux'

import SectionContainer from "../styled-components/SectionContainer"

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
        margin-right: 18px;
    }
`

const ListItem = styled.li`
    padding: 10px 20px;
    margin-top: 5px;
    background-color: #353535;
    list-style-type: none;
    display: flex;
    align-items: center;


    div {
        flex-basis: 30%;
        display: flex;
        align-items: center;

        i {
            margin-right: 5px;
        }
    }

    >p:first-of-type {
        flex-basis: 35%;
    }

    >p:nth-of-type(2) {
        flex-basis: 30%;
        font-size: 12px;
    }

    .miniature {

        p {
            font-size: 12px;
        }
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

const Latest = () => {

    const [showLatest, setShowLatest] = useState(false)
    const { events } = useSelector(state => state.events)
    const { payments } = useSelector(state => state.payments)

    return (
        <SectionContainer>
            <Container>
                <h4>Senaste händelser</h4>
                <button onClick={() => setShowLatest(!showLatest)}>
                {showLatest ? <i className="fa-solid fa-circle-chevron-up"></i> : <i className="fa-solid fa-circle-chevron-down"></i>}
                </button>
            </Container>
            {showLatest && (
                <>
                <ListItem>
                    <p className={(events[0].user === 'Vidar & Esther') ? 'vidar' : (events[0].user === 'Carita & Filip') ? 'carita' :(events[0].user === 'Harriet & Jon-Erik') ? 'pappa' : null}>{events[0].user}</p>
                    <p>{events[0].eventDate}</p>
                    <div className='miniature'>
                        <i className="fa-solid fa-car-side"></i>
                        <p>{(events[0].mileageAfter - events[0].mileageBefore)} km</p>                        
                    </div>
                    <button><i className="fa-solid fa-trash-can"></i></button>
                </ListItem>
                <ListItem>
                    <p className={(events[1].user === 'Vidar & Esther') ? 'vidar' : (events[1].user === 'Carita & Filip') ? 'carita' :(events[1].user === 'Harriet & Jon-Erik') ? 'pappa' : null}>{events[1].user}</p>
                    <p>{events[1].eventDate}</p>
                    <div className='miniature'>
                        <i className="fa-solid fa-car-side"></i>
                        <p>{(events[1].mileageAfter - events[1].mileageBefore)} km</p>                        
                    </div>
                    <button><i className="fa-solid fa-trash-can"></i></button>
                </ListItem>
                <ListItem>
                    <p className={(payments[0].user === 'Vidar & Esther') ? 'vidar' : (payments[0].user === 'Carita & Filip') ? 'carita' :(payments[0].user === 'Harriet & Jon-Erik') ? 'pappa' : null}>{payments[0].user}</p>
                    <p>{payments[0].paymentDate}</p>
                    <div className='miniature'>
                        <i className="fa-regular fa-credit-card"></i>
                        <p>{payments[0].amountPaid} SEK</p>                        
                    </div>
                    <button><i className="fa-solid fa-trash-can"></i></button>
                </ListItem>
                <ListItem>
                    <p className={(payments[1].user === 'Vidar & Esther') ? 'vidar' : (payments[1].user === 'Carita & Filip') ? 'carita' :(payments[1].user === 'Harriet & Jon-Erik') ? 'pappa' : null}>{payments[1].user}</p>
                    <p>{payments[1].paymentDate}</p>
                    <div className='miniature'>
                        <i className="fa-regular fa-credit-card"></i>
                        <p>{payments[1].amountPaid} SEK</p>                        
                    </div>
                    <button><i className="fa-solid fa-trash-can"></i></button>
                </ListItem>
                </>
            )}
        </SectionContainer>
    )
}

export default Latest