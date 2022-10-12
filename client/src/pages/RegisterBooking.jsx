import { useSelector } from "react-redux"
import styled, { css } from 'styled-components'

const RegisterBooking = () => {

    const { users } = useSelector(state => state.users)

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
    }

    return (
        <>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <h2>Ny Bokning</h2>
                <div>
                    <label htmlFor="start-date">Startdatum</label>
                    <input type="date" name="" id="start-date" />
                </div>
                <div>
                    <label htmlFor="end-date">Slutdatum</label>
                    <input type="date" name="" id="end-date" />
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
                    <label htmlFor="comment">Kommentar</label>
                    <input type="text" name="" id="comment" />
                </div>
                <button>Registrera</button>
            </Form>
        </>
    )
}

export default RegisterBooking