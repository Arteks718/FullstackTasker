import axios from "axios";
import { TypeTask } from "../types";
const httpClient = axios.create({ baseURL: "http://localhost:5000/api" });

export const getHttpUsers = () => httpClient.get('/users')
export const deleteHttpUsers = (userId:number) => httpClient.delete(`/users/${userId}`)

export const createHttpTask = (task: TypeTask) => httpClient.post(`/tasks`, task)
export const getHttpTasks = () => httpClient.get('/tasks')
export const updateHttpTask = (task: TypeTask) => httpClient.patch(`/tasks/${task.id}`, task)
export const deleteHttpTask = (taskId:number) => httpClient.delete(`/tasks/${taskId}`)
export const deleteAllHttpTask = () => httpClient.delete(`/tasks`)
