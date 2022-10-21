import styled, { css } from 'styled-components'

import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router"

import { getBookings } from '../redux/bookingsSlice'
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
        color: #282828;
        font-size: 14px;
        font-weight: bold;
    }
`

const RegisterBooking = ({handleClick}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { users } = useSelector(state => state.users)
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked')
        checkboxes.forEach(checkbox => {
            postNewBooking(checkbox.id)
        })
    }

    const postNewBooking = async (id) => {
        await fetch(`/api/users/${id}/bookings`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    startDate: document.querySelector('#start-date').value,
                    endDate: document.querySelector('#end-date').value,
                    comment: document.querySelector('#comment').value
            })
        })
        dispatch(getBookings())
        handleClick(true)
    }

    return (
        <>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <div className='normal-inputs'>
                        <div>
                            <label htmlFor="start-date">Startdatum</label>
                            <input type="date" name="" id="start-date" />
                        </div>
                        <div>
                            <label htmlFor="end-date">Slutdatum</label>
                            <input type="date" name="" id="end-date" />
                        </div>
                        <div>
                            <label htmlFor="comment">Kommentar</label>
                            <input type="text" name="" id="comment" />
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

export default RegisterBooking