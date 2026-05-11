import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "./http";

export const api = {
  clients: {
    list: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return httpGet(`/api/clients${query ? `?${query}` : ""}`);
    },
    byId: (id) => httpGet(`/api/clients/${id}`),
    create: (payload) => httpPost("/api/clients", payload),
    update: (id, payload) => httpPut(`/api/clients/${id}`, payload),
    patch: (id, payload) => httpPatch(`/api/clients/${id}`, payload),
    remove: (id) => httpDelete(`/api/clients/${id}`),
    testWithoutTx: (payload) => httpPost("/api/clients/test-without-transaction", payload),
    testWithTx: (payload) => httpPost("/api/clients/test-with-transaction", payload)
  },
  cars: {
    list: () => httpGet("/api/cars"),
    byId: (id) => httpGet(`/api/cars/${id}`),
    byClient: (clientId) => httpGet(`/api/cars/client/${clientId}`),
    searchJpql: (params) => {
      const query = new URLSearchParams(params).toString();
      return httpGet(`/api/cars/search/jpql?${query}`);
    },
    create: (payload) => httpPost("/api/cars", payload),
    update: (id, payload) => httpPut(`/api/cars/${id}`, payload),
    remove: (id) => httpDelete(`/api/cars/${id}`),
    bulkSafe: (payload) => httpPost("/api/cars/bulk/safe", payload),
    bulkUnsafe: (payload) => httpPost("/api/cars/bulk/unsafe", payload)
  },
  mechanics: {
    list: () => httpGet("/api/mechanics"),
    byId: (id) => httpGet(`/api/mechanics/${id}`),
    create: (payload) => httpPost("/api/mechanics", payload),
    update: (id, payload) => httpPut(`/api/mechanics/${id}`, payload),
    remove: (id) => httpDelete(`/api/mechanics/${id}`)
  },
  services: {
    list: (category) => httpGet(category ? `/api/services?category=${encodeURIComponent(category)}` : "/api/services"),
    all: () => httpGet("/api/services/all"),
    byId: (id) => httpGet(`/api/services/${id}`),
    create: (payload) => httpPost("/api/services", payload),
    update: (id, payload) => httpPut(`/api/services/${id}`, payload),
    remove: (id) => httpDelete(`/api/services/${id}`),
    updateStatus: (id, payload) => httpPatch(`/api/services/${id}/status`, payload)
  },
  spares: {
    list: () => httpGet("/api/spares"),
    byId: (id) => httpGet(`/api/spares/${id}`),
    byPart: (partNumber) => httpGet(`/api/spares/part/${partNumber}`),
    byManufacturer: (manufacturer) => httpGet(`/api/spares/manufacturer/${manufacturer}`),
    lowStock: (minQuantity = 5) => httpGet(`/api/spares/low-stock?minQuantity=${minQuantity}`),
    create: (payload) => httpPost("/api/spares", payload),
    update: (id, payload) => httpPut(`/api/spares/${id}`, payload),
    remove: (id) => httpDelete(`/api/spares/${id}`)
  },
  orders: {
    list: () => httpGet("/api/orders"),
    byId: (id) => httpGet(`/api/orders/${id}`),
    byCar: (carId) => httpGet(`/api/orders/car/${carId}`),
    byClient: (clientId) => httpGet(`/api/orders/client/${clientId}`),
    byStatus: (status) => httpGet(`/api/orders/status/${encodeURIComponent(status)}`),
    byDateRange: (start, end) =>
      httpGet(`/api/orders/date-range?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`),
    create: (payload) => httpPost("/api/orders", payload),
    update: (id, payload) => httpPut(`/api/orders/${id}`, payload),
    cancel: (id) => httpPatch(`/api/orders/${id}/cancel`),
    complete: (id) => httpPatch(`/api/orders/${id}/complete`),
    updateStatus: (id, data) => httpPatch(`/api/orders/${id}/status`, data),
    remove: (id) => httpDelete(`/api/orders/${id}`)
  },
  carBrandModels: {
    list: () => httpGet("/api/car-brand-models"),
    create: (payload) => httpPost("/api/car-brand-models", payload)
  }
};