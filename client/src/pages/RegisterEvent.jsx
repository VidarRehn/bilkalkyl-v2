
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'

const RegisterEvent = () => {

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
                                <input type="checkbox" />
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