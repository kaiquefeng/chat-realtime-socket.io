const express = require('express')()
const server = require('http').createServer(express)
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log(`Socket conectado: ${socket.id}`)
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })
})

server.listen(4000, () => console.log('Servidor iniciado na porta 4000'))