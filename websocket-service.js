// websocket-service.js - Единый сервис для всех страниц
class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect(token) {
    this.socket = new WebSocket(`ws://localhost:3001?token=${token}`);
    
    this.socket.onopen = () => {
      console.log('WebSocket подключен');
      this.emit('connected', { timestamp: Date.now() });
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.emit(data.type, data.payload);
    };

    this.socket.onclose = () => {
      console.log('WebSocket отключен');
      setTimeout(() => this.connect(token), 5000); // Переподключение
    };
  }

  subscribeToPrinter(printerId) {
    this.send({
      type: 'subscribe-printer',
      payload: { printerId }
    });
  }

  sendCommand(command) {
    this.send({
      type: 'send-command',
      payload: command
    });
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  emit(event, data) {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }

  send(data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }
}

// Использовать во всех страницах
const wsService = new WebSocketService();
export default wsService;