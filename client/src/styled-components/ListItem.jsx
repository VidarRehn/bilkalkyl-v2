import styled, { css } from 'styled-components'

const ListItem = styled.li`
    padding: 10px 20px;
    margin-top: 5px;
    background-color: #353535;
    list-style-type: none;
    display: flex;
    align-items: center;

    ${props => props.basic && css`
        background: transparent;
    `}

    >p:first-of-type {
        flex-basis: 35%;
    }

    p, div:not(.miniature) {
        flex-basis: 30%;
        font-size: 14px;
        display: flex;
        flex-direction: column;

        .percentage {
            font-size: 20px;
            font-weight: bold;
        }

        .in-brackets {
            font-size: 12px;
        }

    }

    .miniature {
        flex-basis: 30%;
        display: flex;
    }
    
    .header {
        font-size: 12px;
    }

`

export default ListItem