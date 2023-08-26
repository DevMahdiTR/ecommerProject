import React, {useEffect, useRef, useState} from "react";
import {NavLink, Link, useNavigate, useLocation} from "react-router-dom";

import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import setting from "../images/setting.svg";
import { getPublicCategories} from "../service/categories/categoriesService";
import  ImageLogo from '../images/logoclickkfinal.png';
import {Menu} from "antd";
const Header = () => {
  const token = localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate()
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const handleLogout = () => {
    localStorage.clear()
    navigate('/login');

  };

  const handleLogin = () => {
    navigate('/login')
  };
  const getTitLe = ()=>{
    if (token){
      return 'out'
    }else{
      return 'in'
    }
  }
  function getItem(label, key, children, type) {
    return {
      key,
      label,
      children,
      type,
    };
  }
  useEffect(()=>{
    getPublicCategories().then(res => {
      setCategories(res.data)
    })
  },[])

  useEffect(()=>{
    getTitLe()
  },[token])

  const Items = categories.filter(v=>v.sous_categories.length > 0).map((item)=>{
    return (getItem(item.name, item.id , item.sous_categories.map((r)=>{
      return (getItem(r.name, r.id))
    })))


  })
const handleNavigate = ({key })=>{
  navigate(`/product?category=${key}`)
  }

  return (
    <div>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center justify-between">
            <div className="col-2">
                <img src={ImageLogo} onClick={()=>navigate('/')} className="w-20 h-12 cursor-pointer "/>
            </div>
            <div className="col-8">
              <div className=" d-flex align-items-center justify-between">
                {userData?.role !== 'Admin' && (
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Favories
                    </p>
                  </Link>
                </div>
                )}
                {userData?.role === 'Admin' && (
                    <div>
                      <div style={{cursor: "pointer"}} className="d-flex align-items-center gap-10 text-white">
                        <Link
                            to="/setting/categories"
                            className="d-flex align-items-center gap-10 text-white"
                        >
                          <img src={setting} alt="user" />
                          <p className="mb-0">Paramètre</p>
                        </Link>

                      </div>
                    </div>
                )}

                <div>
                  <div style={{cursor: "pointer"}} onClick={token? handleLogout : handleLogin} className="d-flex align-items-center gap-10 text-white">
                    <img src={user} alt="user" />
                    <p className="mb-0">log {getTitLe()}</p>
                  </div>

                </div>
                {userData?.role !== 'Admin' && (
                    <div>
                      <Link
                          to="/cart"
                          className="d-flex align-items-center gap-10 text-white"
                      >
                        <img src={cart} alt="cart" />
                      </Link>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      {!location.pathname.includes('/setting')  && (
          <header  className="header-bottom py-3">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12">
                  <div className="menu-bottom d-flex align-items-center gap-30">
                    <div>
                      <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                          <img src={menu} alt="" />
                          <span className="me-5 d-inline-block">
                        Catégories de boutique
                      </span>
                        </button>
                        {/*categories*/}

                        <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                        >
                          <Menu
                              onClick={handleNavigate}
                              style={{
                               backgroundColor: '#232f3e',
                                color: 'white'
                              }}
                              theme={'dark'}
                              mode="vertical"
                              items={Items}
                          />
                        </ul>
                      </div>
                    </div>
                    <div className="menu-links">
                      <div className="d-flex align-items-center gap-15">
                        <NavLink to="/">Acceuil</NavLink>
                        <NavLink to="/product">Notre magasin</NavLink>
{/*
                        <NavLink to="/contact">Contact</NavLink>
*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
      )}

    </div>
  );
};

export default Header;
