
import './style.css'
import Trash from '../../assets/trash.svg'
import { use } from 'react'
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'

function Home() {
  const [users, setUsers] = useState([])
  const inputNameText = useRef()
  const inputEmailText = useRef()
  const inputAgeText = useRef()

  async function getUsers() {
    const usersResponse = await api.get('/users')
    setUsers(usersResponse.data)
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`)
    getUsers()
    
  }

  async function createUsers() {
    await api.post('/users', {
      name : inputNameText.current.value,
      email : inputEmailText.current.value,
      age : parseInt(inputAgeText.current.value)
    })

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input type="text" placeholder='Nome' name='name' ref={inputNameText} />
        <input type="email" placeholder='E-mail' name="email" ref={inputEmailText} />
        <input type="number" placeholder='Idade' name="age" min={0} ref={inputAgeText}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome : <span>{user.name}</span></p>
            <p>Idade : <span>{user.age}</span></p>
            <p>Email : <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}> <img src={Trash} /></button>
        </div>
      ))}

    </div>

  )
}

export default Home
