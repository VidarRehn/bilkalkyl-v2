import styled, { css } from 'styled-components'

const ListItem = styled.li`
    padding: 10px 20px;
    margin-top: 5px;
    background-color: #353535;
    list-style-type: none;
    display: flex;
    align-items: center;

    p:first-of-type {
        flex-basis: 40%;
    }

    p {
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
    
    .header {
        font-size: 12px;
    }

`

export default ListItem