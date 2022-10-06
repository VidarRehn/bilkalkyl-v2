import styled, { css } from 'styled-components'

const UserBall = styled.div`
    margin-right: 10px;
    height: 35px;
    width: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
    color: white;

    ${props =>
        props.hej &&
        css`
          background-color: green;
        `};
`


export default UserBall