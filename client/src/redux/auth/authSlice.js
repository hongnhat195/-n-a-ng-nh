import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthAPI } from '../../services/auth';
import { utils } from '../../helpers';

const { setAuthToken } = utils;

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  errorLogin:{
    userError:'',
    passError:'',
  },
  errorRegister:{
    userError:'',
    emailError:'',
    passError:'',
  }
};

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const res = await AuthAPI.loadUser();
  // console.log('user: ', res.data);
  return res.data;
});

export const registerUser = createAsyncThunk('auth/registerUser', async ({ username, email, password }) => {
  const res = await AuthAPI.registerUser({ username, email, password });

  // console.log(res.data);
  return res.data;
});

export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }) => {
  const res = await AuthAPI.loginUser({ username, password });
  // console.log(res.data)
  return res.data;
});

export const checkLogin = createAsyncThunk('auth/checkLogin', async ({ username, password }) => {
  
  const res = await AuthAPI.checkLogin({ username, password });
  if(username===''){res.data.userError='Can not empty this field!!.'}
  if(password===''){res.data.passError='Can not empty this field!!.'}
  // console.log(res.data)
  return res.data;
});

export const checkRegister = createAsyncThunk('auth/checkRegister', async ({ username,email, password }) => {
  
  const res = await AuthAPI.checkRegister({ username,email, password });
  if(username===''){res.data.userError='Can not empty this field!!.'}
  if(email===''){res.data.emailError='Can not empty this field!!.'}
  if(password===''){res.data.passError='Can not empty this field!!.'}
  // console.log(res.data)
  return res.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      console.log('logged out...');
      // state.user = null;
      // state.token = null;
      // state.isAuthenticated = false;
      // state.loading = false;

      return {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        errorLogin:{
          userError:'',
          passError:'',
        },
        errorRegister:{
          userError:'',
          emailError:'',
          passError:'',
        },
      };
    },
    // changeImage(state,action){
    //   return {
    //     token:state.token,
    //     isAuthenticated:state.isAuthenticated,
    //     loading:state.loading,
    //     user:{username:state.user.username,email:state.user.email,password:state.user.password,avatar_img:action.payload},
    //     errorLogin:state.errorLogin,
    //     errorRegister:state.errorRegister
    //   }
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadUser.fulfilled, (state, action) => ({
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      }))
      .addCase(checkLogin.fulfilled, (state, action) => ({
        ...state,
        errorLogin:action.payload,
      }))
      .addCase(checkRegister.fulfilled, (state, action) => ({
        ...state,
        errorRegister:action.payload,
      }))
      .addCase(registerUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          token: action.payload.token,
          isAuthenticated: true,
          loading: false,
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          token: action.payload.token,
          isAuthenticated: true,
          loading: false,
        };
      });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
