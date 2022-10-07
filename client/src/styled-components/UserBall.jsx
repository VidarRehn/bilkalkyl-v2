import styled, { css } from 'styled-components'

const UserBall = styled.div`
    margin-right: 15px;
    height: 35px;
    width: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: pink;

    /* ${props =>
        props.hej &&
        css`
          background-color: green;
        `}; */
`


export default UserBall