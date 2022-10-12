import { useNavigate } from "react-router"
import styled, { css } from 'styled-components'

import SectionContainer from "../styled-components/SectionContainer"

const ButtonsContainer = styled.div`
    max-width: 480px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Button = styled.button`
    border: none;
    padding: 5px 10px;
    background-color: transparent;
    font-size: 40px;
    color: #e076c2;

    .type {
      font-size: 14px;
    }
`

const Buttons = () => {

    const navigate = useNavigate()

    return (
        <SectionContainer>
        <ButtonsContainer className="buttons-container">
            <Button onClick={() => navigate('/register-event')}>
                <i className="fa-solid fa-car-side"></i>
                <p className="type">Ny körning</p>
            </Button>
            <Button onClick={() => navigate('/register-payment')}>
                <i className="fa-regular fa-credit-card"></i>
                <p className="type">Ny betalning</p>
            </Button>
            <Button onClick={() => navigate('/register-booking')}>
                <i className="fa-regular fa-calendar"></i>
                <p className="type">Boka bil</p>
            </Button>
        </ButtonsContainer>
        </SectionContainer>
    )
}

export default Buttons