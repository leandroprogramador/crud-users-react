
import './style.css'
import Trash from '../../assets/trash.svg'
import { use } from 'react'
import api from '../../services/api'
import { useEffect, useState } from 'react'

function Home() {
  const[users, setUsers] = useState([])

  async function getUsers() {
   const usersResponse = await api.get('/users')
   setUsers(usersResponse.data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
     <form>
      <h1>Cadastro de Usuários</h1>
      <input type="text" placeholder='Nome' name='name' />
      <input type="email" placeholder='E-mail' name="email"  />
      <input type="number" placeholder='Idade' name="age" min={0} />
      <button type="button">Cadastrar</button>
     </form>

{users.map(user =>(
   <div key={user.id} className='card'>
      <div>
        <p>Nome : <span>{user.name}</span></p>
        <p>Idade : <span>{user.age}</span></p>
        <p>Email : <span>{user.email}</span></p>
      </div>
      <button> <img src={Trash} /></button>
     </div>
))}
    
    </div>

  )
}

export default Home
