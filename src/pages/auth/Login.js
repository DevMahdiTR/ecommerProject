import React, {useState} from "react";
import {json, Link, useNavigate} from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import {LoginService} from "../../service/login/AuthService";

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const handleChangeEmail = (event)=>{
    setData({...data, email: event.target.value})
  }
  const handleChangePassword = (event)=>{
    setData({...data, password: event.target.value})
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    LoginService(data).then((res)=>{
        localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/')

    }).catch((e)=>{
      console.log(e)
    })
  }
  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form className="d-flex flex-column gap-15" onSubmit={handleSubmit}>
                <CustomInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onchangeValue={handleChangeEmail}
                />
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={data.password}
                  onchangeValue={handleChangePassword}
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      SignUp
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
