import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../redux/usersSlice'

const List = () => {

  const dispatch = useDispatch()
  const { users } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

    return (
        <div>
        this is users
        </div>
    )
}

export default List