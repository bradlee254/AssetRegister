import api from './api';

export const AuthService = {
  
  async login(data: {
    email: string; password: string
  }){
    const response = await api.post('/login', data)

    const token = response.data.token;
    const user = response.data.user;

    if(!token){
      throw new Error('No token received');
    }
    if(user){
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    }
    return response.data;
  },

  register: (data:{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    return api.post('/register', data)
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  get user(){
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  isAuthenticated(){
    return !!localStorage.getItem('token');
  }
}
