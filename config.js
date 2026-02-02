// config.js
module.exports = {
  database: {
    postgres: {
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      database: '3dprint_monitor',
      user: 'monitor_user',
      password: 'secure_password'
    },
    timescale: {
      host: process.env.TS_HOST || 'localhost',
      port: 5433
    }
  },
  
  mqtt: {
    broker: process.env.MQTT_BROKER || 'mqtt://localhost:1883',
    topics: {
      telemetry: 'printers/+/telemetry',
      commands: 'printers/+/commands',
      status: 'printers/+/status'
    }
  },
  
  websocket: {
    port: process.env.WS_PORT || 3001
  },
  
  api: {
    port: process.env.API_PORT || 3000
  }
};