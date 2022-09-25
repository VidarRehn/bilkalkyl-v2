import { useState, useEffect } from 'react'

const List = () => {

  const [users, setUsers] = useState()

  const getUsers = async () => {
    const response = await fetch('https://bilkalkyl-v2.herokuapp.com/api/users')
    const data = await response.json()
    return data
  }

  useEffect(() => {
    getUsers().then(data => setUsers(data))
  }, [])

    return (
        <div>
        {users && users.map(user => <p>{user.name}</p>)}
        </div>
    )
}

export default List