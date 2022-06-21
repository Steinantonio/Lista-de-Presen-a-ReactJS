import React, { useState, useEffect } from 'react'
import './styles.css'
import { Card } from '../../components/Card'
import { v4 as uuidv4 } from 'uuid';



export function Home() {

  const [studentName, setStudentName] = useState(); // primeiro elemento do estado é o valor 
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' }); // interface ou DTO seria usado aqui em ambiente TS 

  function handleAddStudent() {

    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br",
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
    }

    setStudents(prevState => [...prevState, newStudent]); // utiliza spread para mergear as listas
  };

  useEffect(() => {  //executado automaticamente assim que a interface e componente for renderizado

    async function fetchData() {
      const response = await fetch('https://api.github.com/users/Steinantonio');
      const data = await response.json();

      setUser({
        name: data.login,
        avatar: data.avatar_url
      })
    }
    fetchData();
  }, [])

  return (
    <div className='container'>

      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto perfil" />
        </div>
      </header>

      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={event => setStudentName(event.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>Adicionar</button>

      {students.map(student => (
        <Card
          name={student.name}
          time={student.time}
          key={uuidv4()}
        />
      ))}

    </div>
  )
}
