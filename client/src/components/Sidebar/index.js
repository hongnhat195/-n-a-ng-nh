import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import ana_avatar from "../../assets/img/avatar_1.png"
import logo from "../../assets/img/logo.png"
import {render} from 'react-dom';
import AvatarUploader from './supAvatar';
import { useDispatch, useSelector } from 'react-redux';
import store from "../../redux/store";
import { loadUser } from "../../redux/auth/authSlice";
import { authActions } from '../../redux/auth/authSlice';
function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const dispatch = useDispatch();
  useEffect(() => store.dispatch(loadUser()), []);
  const { user,isAuthenticated } = useSelector((state) => state.auth);
  return (
    <aside class="w-64 border-r-2	" aria-label="Sidebar" style={{backgroundColor:"#B6D7A8"}}>
      <div class="overflow-y-auto h-screen py-4 px-3  rounded dark:bg-gray-800">
        <ul class="space-y-2">
          <li>
            <a href="/">
              <img src={logo}
                style={{marginLeft:'60px'}}
                alt=""
                width="80"
                height="60" />
            </a>
            <span className="ml-3 font-extrabold text-2xl	" style={{color:"#7DB500"}}>
                <span style={{color:'#5A8200'}}>Smart </span>
                Garden
              </span>
              <br/>
              <hr
        style={{
            marginTop:'15px',
            color: 'gray',
            height: 5
        }}
    />
          </li>
          <li>
            <figure class="md:flex items-center	">
              <AvatarUploader class="w-16 h-16 rounded-full"
              size={70}
              uploadURL="http://127.0.0.1:5000/api/auth/upload"
              // fileType={ ("image/png") || ("image/jpg") }
              name={isAuthenticated && user? user.username : 'Anonymous'}
              customHeaders={{'Content-Type': 'application/json'}}
              defaultImg={(user)?((user.avatar_img!='')?user.avatar_img:ana_avatar):ana_avatar}
              // onFinished={(false,()=>{dispatch(authActions.changeImage(user.avatar_img))})}
              onFinished={(false,()=>{
                setTimeout(() => {
                  window.location.reload(false);
                }, 1000)
                // dispatch(authActions.changeImage(user.avatar_img)),
                })}
              />
              <div class="pt-6 md:p-6 text-center md:text-left space-y-4">
                <figcaption class="font-medium">
                  <div class="text-sky-500 dark:text-sky-400 font-bold">
                     { isAuthenticated && user? user.username : 'Anonymous'} 
                  </div>
                  <div class="text-slate-700 dark:text-slate-500">
                  { isAuthenticated && user? user.email : 'UnknownEmail'} 
                  </div>
                </figcaption>
              </div>
            </figure>
          </li>
          <li>
            <p className="text-lg font-bold">Thao tác</p>
            <a
              href="/control"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/3126/3126489.png" width="30px"/>
              <span class="flex-1 ml-3 whitespace-nowrap">
                Điều khiển thiết bị
              </span>
            </a>
          </li>
          <li>
            <p className="text-lg font-bold">Thông số môi trường</p>
            <Link
              to="/temperature"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/3815/3815449.png" width="30px"/>
              <span class="flex-1 ml-3 whitespace-nowrap">Nhiệt độ</span>
            </Link>
          </li>
          <li>
            <Link
              to="/moisture"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img src="https://cdn-icons-png.flaticon.com/512/6634/6634686.png" width="30px"/>
              <span class="flex-1 ml-3 whitespace-nowrap">Độ ẩm đất</span>
            </Link>
          </li>
          <li>
            <Link
              to="/sound"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img src="https://img.icons8.com/external-icongeek26-outline-colour-icongeek26/344/external-sound-music-icongeek26-outline-colour-icongeek26.png" width="30px"/>
              <span class="flex-1 ml-3 whitespace-nowrap">
                Cường độ âm thanh
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/light"
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img src="https://img.icons8.com/neon/344/experimental-sun-neon.png" width="30px"/>
              <span class="flex-1 ml-3 whitespace-nowrap">
                Cường độ ánh sáng
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
