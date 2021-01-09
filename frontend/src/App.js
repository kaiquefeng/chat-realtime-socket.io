import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'

import './styles.scss';

const socket = io.connect('http://localhost:4000/')

function App() {
  const [state, setData] = useState({message: '', name: ''})
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.on('messageSend', ({ name, message }) => {
      setChat([...chat, { name, message }])
      console.log(socket)
    })
  }) 

  const onTextChange = e => {
    setData({ ...state, [e.target.name]: e.target.value })

  }

  const messageSubmit = e => {
    e.preventDefault()
    const { name, message } = state
    socket.emit('messageSend', { name, message })
    setData({ message: '', name })
    setChat([...chat, { name, message }])
  }

  const renderMessage = () => {
    return chat.map(({ name, message }, index) => (
      <div className="message" key={index}>
        <span className="name">{name}</span>
        <p className="text">{message}</p>
      </div>
    ))
  }

  return (
    <div className="chat-page">
      <div className="container-chat">
        <div className="card-message">
          {renderMessage()}
        </div>

        <div className="form-chat ">
        <form className="form" onSubmit={messageSubmit}>
          <div className="input-item">
            <input 
              type="text" 
              name="name" 
              value={state.name} 
              onChange={onTextChange}
              placeholder="Nome"/>
          </div>
          <div className="input-item">
            <input 
              type="text" 
              name="message" 
              value={state.message} 
              onChange={onTextChange}
              placeholder="Escreva sua mensagem"/>

            <button type="submit">enviar</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default App;
