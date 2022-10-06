import styled, { css } from 'styled-components'

const Button = styled.button`
    background-color: red;

    ${props =>
        props.primary &&
        css`
          background-color: green;
        `};
`

export default Button