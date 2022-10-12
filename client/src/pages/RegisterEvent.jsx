import styled, { css } from 'styled-components'

import { useNavigate } from "react-router"
import { useSelector, useDispatch } from 'react-redux'

import { getEvents } from '../redux/eventsSlice'

const RegisterEvent = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { users } = useSelector(state => state.users)
    const { lastMileage } = useSelector(state => state.events)

    const Form = styled.form`
        display: flex;
        flex-direction: column;
        align-items: center;

        h2 {
            margin-top: 50px;
        }

        button {
            width: 200px;
            padding: 10px;
            border: none;
            background-color: #e076c2;
        }

        >* {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;

            input:not(input[type='checkbox']) {
                width: 200px;
                padding: 10px;
                margin-top: 5px;
            }

            .checkbox-container {
                margin-top: 5px;
                width: 200px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                input[type='checkbox'] {
                    height: 35px;
                    width: 35px;
                }
            }
        }
    `

    const handleSubmit = (e) => {
        e.preventDefault()
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
        navigate('/')
    }

    return (
        <>
            <Form>
                <h2>Ny körning</h2>
                <div>
                    <label htmlFor="date">Datum</label>
                    <input type="date" name="" id="date" />
                </div>
                <div>
                    {users && users.map((user, i) => {
                        return (
                            <div key={i} className='checkbox-container'>
                                <label htmlFor="">{user.name}</label>
                                <input type="checkbox" id={user._id} />
                            </div>
                        )
                    })}
                </div>
                <div>
                    <label htmlFor="mileage-before">Mätarställning innan</label>
                    <input type="number" name="" id="mileage-before" disabled value={lastMileage ? lastMileage : '-'} />
                </div>
                <div>
                    <label htmlFor="mileage-after">Mätarställning efter</label>
                    <input type="number" name="" id="mileage-after" />
                </div>
                <button>Registrera</button>
            </Form>
        </>
    )
}

export default RegisterEvent