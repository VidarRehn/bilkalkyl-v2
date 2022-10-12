import styled, { css } from 'styled-components'

const Button = styled.button`
    border: none;
    padding: 5px 10px;
    background-color: transparent;
    font-size: 40px;
    color: #e076c2;

    .type {
      font-size: 14px;
    }

    /* ${props =>
        props.primary &&
        css`
          background-color: green;
        `}; */
`

export default Button