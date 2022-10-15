import styled, { css } from 'styled-components'

import { useSelector, useDispatch } from 'react-redux'

import { getPayments } from '../redux/paymentsSlice'
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

const PaymentForm = ({handleClick}) => {
    
    const dispatch = useDispatch()

    const { users } = useSelector(state => state.users)
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked')
        checkboxes.forEach(checkbox => {
            postNewPayment(checkbox.id)
        })
    }

    const postNewPayment = async (id) => {
        await fetch(`/api/users/${id}/payments`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    paymentDate: document.querySelector('#date').value,
                    amountPaid: document.querySelector('#amount').value,
                    comment: document.querySelector('#comment').value
            })
        })
        dispatch(getPayments())
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
                            <label htmlFor="amount">Summa</label>
                            <input type="number" name="" id="amount" />
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

export default PaymentForm