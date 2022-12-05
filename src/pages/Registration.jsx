// import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import styled from "styled-components";
import login from "../img/login.svg";
import user from "../img/user.svg";
import { auth } from "../components/firebase/firebase";
import PopModal from "../components/PopModal";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState(true);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const userSignIn = (e) => {
    e.preventDefault();
    console.log("inside function");

    if (confirm === password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          setMessage("Registration Succssful");
          setStatus(true);
          setTitle("Success");
          handleShow();
          navigate("/login");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log(errorCode + " " + errorMessage);
          const err = errorMessage.split("/").slice(1, 5);
          //   num.slice(0, 3);
          setMessage(err);
          setStatus(false);
          setTitle("Error");
          handleShow();
          // ..
        });
    } else {
      //   alert("Password does not match");
      setMessage("Password does not match");
      setStatus(false);
      setTitle("Error");
      handleShow();
    }
  };
  return (
    <>
      <MainContainer>
        <LoginBack>
          <img src={login} alt="loging"></img>
        </LoginBack>
        <LoginForm>
          <FormContainer>
            <form onSubmit={userSignIn}>
              <img src={user} alt="user" />
              <h2>User Registration</h2>

              <input
                type="email"
                placeholder="email"
                required
                value={email}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                  console.log(email);
                }}
              />
              <input
                type="password"
                placeholder="pssword"
                value={password}
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                  console.log(password);
                }}
                required
              />
              <input
                type="password"
                placeholder="confirm password"
                value={confirm}
                onChange={(e) => {
                  e.preventDefault();
                  setConfirm(e.target.value);
                  console.log(confirm);
                }}
                required
              />

              <LoginButton
              // data-bs-toggle="modal"
              // data-bs-target="#popModal"
              // data-bs-whatever="@mdo"
              // onClick={userSignIn}
              >
                Register
              </LoginButton>
            </form>
          </FormContainer>
        </LoginForm>
      </MainContainer>
      <PopModal
        message={message}
        status={status}
        title={title}
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      />
    </>
  );
};

export default Registration;

const LoginBack = styled.div`
  /* align-items: left; */
  max-width: 50%;
  max-height: 100vh;
  /* z-index: -1; */

  img {
    height: 99%;
  }
`;
const LoginForm = styled.div`
  width: 50%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: blue; */

  input {
    margin-bottom: 30px;
    border: none;
    outline: none;
    border-bottom: 1px solid;
    font-size: large;
  }
  img {
    width: 60px;
    margin-bottom: 20px;
    border-radius: 50%;
    border: 2px solid;
  }
  h2 {
    margin-bottom: 30px;
  }
`;

const MainContainer = styled.div`
  height: 100%;
  display: flex;
  /* justify-content: space-between; */
`;

const LoginButton = styled.button`
  margin-top: 20px;
  padding: 10px 25px;
  background-color: #29abe2;
  color: white;
  border: 1px solid black;
  cursor: pointer;
  font-size: large;

  &:hover {
    background-color: inherit;
    color: inherit;
    border: 2px solid #29abe2;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  height: max-content;
  background-color: #ffffff;
  /* margin: 20px; */
  padding: 40px;
  /* border-radius: 10px; */
  box-shadow: 0px -1px 15px -4px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px -1px 15px -4px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -1px 15px -4px rgba(0, 0, 0, 0.75);

  form {
    display: flex;
    flex-direction: column;
  }
`;
