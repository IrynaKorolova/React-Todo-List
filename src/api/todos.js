import axios from 'axios';
import { BASE_URL } from './config';

const todosApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json; charset=utf-8',
  },
  timeout: 1000,
});

todosApi.interceptors.response.use(
  (response) => [null, response.data],
  (error) => [error, null]
);

export function getTodo(id) {
  return todosApi.get(`/todos/${id}`);
}
export function getTodos() {
  return todosApi.get(`/todos`);
}
export function createTodo(data) {
  return todosApi.post(`/todos`, data);
}
export function updateTodo(id, data) {
  return todosApi.patch(`/todos/${id}`, data);
}
export function deleteTodo(id) {
  return todosApi.delete(`/todos/${id}`);
}
