import { useNavigate } from "react-router"
import styled, { css } from 'styled-components'

import Button from "../styled-components/Button"
import SectionContainer from "../styled-components/SectionContainer"

const ButtonsContainer = styled.div`
    max-width: 480px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Buttons = () => {

    const navigate = useNavigate()

    return (
        <SectionContainer>
        <h4>Registrera</h4>
        <ButtonsContainer className="buttons-container">
            <Button onClick={() => navigate('/register-event')}>
                <i className="fa-solid fa-car-side"></i>
                <p className="type">Körning</p>
            </Button>
            <Button onClick={() => navigate('/register-payment')}>
                <i class="fa-regular fa-credit-card"></i>
                <p className="type">Betalning</p>
            </Button>
            <Button onClick={() => navigate('/register-booking')}>
                <i class="fa-regular fa-calendar"></i>
                <p className="type">Bokning</p>
            </Button>
        </ButtonsContainer>
        </SectionContainer>
    )
}

export default Buttons