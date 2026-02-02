// server.js - Основной сервер
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { PrismaClient } = require('@prisma/client');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const prisma = new PrismaClient();

// REST API для данных
app.use(express.json());

// WebSocket для реального времени
io.on('connection', (socket) => {
  console.log('Клиент подключен');
  
  // Подписка на телеметрию принтера
  socket.on('subscribe-printer', (printerId) => {
    socket.join(`printer-${printerId}`);
  });
  
  // Отправка команды
  socket.on('send-command', async (command) => {
    // Сохраняем команду в БД
    await prisma.command.create({
      data: {
        printerId: command.printerId,
        command: command.type,
        parameters: command.params,
        userId: command.userId,
        status: 'pending'
      }
    });
    
    // Отправляем команду на принтер через MQTT
    mqttClient.publish(`printers/${command.printerId}/commands`, JSON.stringify(command));
  });
});