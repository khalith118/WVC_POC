import { ILoginForm } from '../models/Profile';
import API from './config'

// User Authendication
export const login = (user:ILoginForm) => API.post(`/api/auth/login`, user); 