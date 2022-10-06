import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import SectionContainer from '../styled-components/SectionContainer'
import ListItem from '../styled-components/ListItem'

const Events = () => {

    const { events } = useSelector(state => state.events)

    return (
        <SectionContainer>
          <h4>Körningar</h4>
          <ul>
            {events && events.map((event, i) => {
              return (
                <ListItem key={i}>
                  <p>{event.user}</p>
                  <p>{event.mileageBefore}</p>
                </ListItem>
              )
            })}
          </ul>
        </SectionContainer>
    )
}

export default Events