import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Navigate ,useNavigate } from 'react-router-dom';
import styled from "styled-components";
import login from "../img/login.svg";
import user from "../img/user.svg";
import { auth } from "../components/firebase/firebase";
import PopModal from "../components/PopModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(true);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate()

  const userSignIn = (e) => {
    e.preventDefault()
    console.log("inside function");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // alert("user logged in")
        const user = userCredential.user;
        console.log(user.email);
     
        navigate('/home')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode + " " + errorMessage);
        const err = errorMessage.split(":").slice(1,5);
        //   num.slice(0, 3);
          setMessage(err);
          setStatus(false);
          setTitle("Error");
          handleShow()
      });
  };
  // const listAllUsers = (nextPageToken) => {
  //   // List batch of users, 1000 at a time.
  //   getAuth()
  //     .listUsers(1000, nextPageToken)
  //     .then((listUsersResult) => {
  //       listUsersResult.users.forEach((userRecord) => {
  //         console.log('user', userRecord.toJSON());
  //       });
  //       if (listUsersResult.pageToken) {
  //         // List next batch of users.
  //         listAllUsers(listUsersResult.pageToken);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('Error listing users:', error);
  //     });
  // };
  // // Start listing users from the beginning, 1000 at a time.
  // listAllUsers();
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
              <h2>User Login</h2>

              <input
                type="email"
                placeholder="email"
                value={email}
                required
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

              <LoginButton >Login</LoginButton>
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

export default Login;

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
  form{
    display: flex;
    flex-direction: column;
  }
`;

