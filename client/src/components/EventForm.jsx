import styled, { css } from 'styled-components'

import { useNavigate } from "react-router"
import { useSelector, useDispatch } from 'react-redux'

import { getEvents } from '../redux/eventsSlice'
import { useState } from 'react'

const Form = styled.form`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    >div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 10px;

        .normal-inputs {
            flex-basis: 100%;

            >div{
                display: flex;
                flex-direction: column;

                label {
                    font-size: 12px;
                }

                input {
                    height: 30px;
                    padding: 0px 5px;
                    margin-bottom: 5px;
                }
            }
        }

        .checkboxes {
            flex-basis: 100%;
            padding: 12px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 10px;
        
            >div {
                display: flex;
                gap: 5px;
                justify-content: space-between;

                label {
                    font-size: 12px;
                }

                input[type='checkbox'] {
                    min-height: 30px;
                    min-width: 30px;
                }
            }
        }
    }

    button {
        margin-top: 10px;
        width: 100%;
        padding: 10px;
        border: none;
        background-color: #e076c2;
    }
`

const EventForm = ( {handleClick} ) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [loading, setLoading] = useState(false)
    const { users } = useSelector(state => state.users)
    const { lastMileage } = useSelector(state => state.events)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked')
        checkboxes.forEach(checkbox => {
            postNewEvent(checkbox.id)
        })
    }

    const postNewEvent = async (id) => {
        await fetch(`/api/users/${id}/events`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    eventDate: document.querySelector('#date').value,
                    mileageBefore: document.querySelector('#mileage-before').value,
                    mileageAfter: document.querySelector('#mileage-after').value,
                    distance: (document.querySelector('#mileage-after').value - document.querySelector('#mileage-before').value)
            })
        })
        dispatch(getEvents())
        handleClick(true)
    }

    return (
        <>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <div className='normal-inputs'>
                        <div>
                            <label htmlFor="date">Datum</label>
                            <input type="date" name="" id="date" />
                        </div>
                        <div>
                            <label htmlFor="mileage-before">Mätarställning innan</label>
                            <input type="number" name="" id="mileage-before" disabled value={lastMileage ? lastMileage : '-'} />
                        </div>
                        <div>
                            <label htmlFor="mileage-after">Mätarställning efter</label>
                            <input type="number" name="" id="mileage-after" />
                        </div>
                    </div>
                    <div className='checkboxes'>
                        {users && users.map((user, i) => {
                            return (
                                <div key={i} className='checkbox-container'>
                                    <label htmlFor="">{user.name}</label>
                                    <input type="checkbox" id={user._id} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <button>Registrera</button>
                {loading && <p>Loading...</p>}
            </Form>
        </>
    )
}

export default EventForm