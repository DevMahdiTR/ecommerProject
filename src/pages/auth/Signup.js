import React, {useEffect, useState} from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import {useNavigate} from "react-router-dom";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import {LoginService, RegisterService} from "../../service/login/AuthService";
const Signup = () => {
  const navigate = useNavigate()
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const [data, setData] = useState({
    email: '',
    password: '',
    c_password: '',
    name: ''
  })
  const [error, setError] = useState({
    email: '',
    password: '',
    c_password: '',
  });
  const handleSubmit = (e)=>{
    e.preventDefault()
    RegisterService(data).then((res)=>{
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/')

    }).catch((e)=>{
      console.log(e)
    })
  }
  const handleChangeEmail = (event)=>{
    setData({...data, email: event.target.value})
    if (!data.email.match(validRegex)){
      setError({...error, email: 'please enter a valid email'})
    }else {
      setError({...error, email: ''})
    }
  }
  const handleChangePassword = (event)=>{
    setData({...data, password: event.target.value})
    console.log(event.target.value.length)
    if (event.target.value.length < 8 ){
      setError({...error, password: 'The password field must be at least 8 characters'})
    }else {
      setError({...error, password: ''})

    }
  }
  const handleChangeName = (event)=>{
    setData({...data, name: event.target.value})
  }
  const handleChangeConfirmPassword = (event)=>{
    setData({...data, c_password: event.target.value})
    if (event.target.value !== data.password){
      setError({...error, c_password: 'password  not match'})
    }
    else {
      setError({...error, c_password: ''})
    }
  }
  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form action="src/pages" onSubmit={handleSubmit} className="d-flex flex-column gap-15">
                <CustomInput
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={data.name}
                    onchangeValue={handleChangeName}
                />
                <CustomInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onchangeValue={handleChangeEmail}
                    errorText={error.email}
                />
                <CustomInput
                  type="password"
                  name="mobile"
                  placeholder="password"
                  value={data.password}
                  minValue={8}
                  onchangeValue={handleChangePassword}
                  errorText={error.password}
                />
                <CustomInput
                  type="password"
                  name="c_password"
                  placeholder="Confirm Password"
                  value={data.c_password}
                  minValue={8}
                  onchangeValue={handleChangeConfirmPassword}
                  errorText={error.c_password}

                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button
                        disabled={!Object.values(error).every(value => value.length === 0) || !Object.values(data).every(value => value.length > 0)}
                        className="button border-0" type={"submit"}>Sign Up</button>
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

export default Signup;
