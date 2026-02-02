// store.js - Простое хранилище состояния
class Store {
  constructor() {
    this.state = {
      user: null,
      printers: [],
      notifications: [],
      settings: {}
    };
    this.subscribers = [];
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notify() {
    this.subscribers.forEach(callback => callback(this.state));
  }

  // Для разных страниц
  getPrinters() {
    return this.state.printers;
  }

  getPrinterById(id) {
    return this.state.printers.find(p => p.id === id);
  }
}

// Инициализируем один раз и используем везде
window.appStore = new Store();

// В dashboard.html
appStore.subscribe((state) => {
  updatePrinterTable(state.printers);
});

// В printer-detail.html
const printerId = getPrinterIdFromURL();
const printer = appStore.getPrinterById(printerId);