import { useState } from "react"
import styled, { css } from 'styled-components'

import BookingForm from "./BookingForm"
import EventForm from "./EventForm"
import PaymentForm from "./PaymentForm"

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
    
    const [showForm, setShowForm] = useState(false)

    const handleClick = (x) => {
        if (!showForm) {
            setShowForm(x)
        } else {
            setShowForm(false)
        }

    }

    return (
        <SectionContainer>
        <ButtonsContainer className="buttons-container">
            <Button onClick={() => handleClick(<EventForm handleClick={handleClick}/>)}>
                <i className="fa-solid fa-car-side"></i>
                <p className="type">Ny körning</p>
            </Button>
            <Button onClick={() => handleClick(<PaymentForm handleClick={handleClick} />)}>
                <i className="fa-regular fa-credit-card"></i>
                <p className="type">Ny betalning</p>
            </Button>
            <Button onClick={() => handleClick(<BookingForm handleClick={handleClick} />)}>
                <i className="fa-regular fa-calendar"></i>
                <p className="type">Boka bil</p>
            </Button>
        </ButtonsContainer>
        {showForm && showForm}
        </SectionContainer>
    )
}

export default Buttons