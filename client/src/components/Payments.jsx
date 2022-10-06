import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Payments = () => {

    const { payments } = useSelector(state => state.payments)

    return (
        <div>
           <h4>Betalningar</h4>
          <ul>
            {payments && payments.map((payment, i) => {
              return (
                <li key={i}>
                  <p>{payment.user}</p>
                  <p>{payment.comment}</p>
                </li>
              )
            })}
          </ul>
        </div>
    )
}

export default Payments