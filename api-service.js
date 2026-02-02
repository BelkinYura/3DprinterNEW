// api-service.js
class ApiService {
  constructor(baseURL = 'http://localhost:3000/api') {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Методы для разных страниц
  async getPrinters() {
    return this.request('/printers');
  }

  async getPrinter(id) {
    return this.request(`/printers/${id}`);
  }

  async getTelemetry(printerId, from, to) {
    return this.request(
      `/telemetry/${printerId}?from=${from}&to=${to}`
    );
  }

  async sendCommand(printerId, command) {
    return this.request(`/printers/${printerId}/commands`, {
      method: 'POST',
      body: JSON.stringify(command)
    });
  }

  async generateReport(params) {
    return this.request('/reports/generate', {
      method: 'POST',
      body: JSON.stringify(params)
    });
  }
}

// Использовать во всех страницах
window.apiService = new ApiService();