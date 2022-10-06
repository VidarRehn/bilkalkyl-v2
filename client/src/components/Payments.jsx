import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPayments } from '../redux/paymentsSlice'

const Payments = () => {

    const dispatch = useDispatch()
    const { payments } = useSelector(state => state.payments)
  
    useEffect(() => {
      dispatch(getPayments())
    }, [])

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