import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import login from "../img/login.svg";

import styled from "styled-components";

function Navbar(props) {
  const auth = getAuth();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            {/* <img src={login} alt="loging"></img> */}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to={!props.user ? "/login" : "/home"}
                  className="nav-link active"
                >
                  Home
                </Link>
              </li>
            </ul>
            <span className="navbar-text">
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/login" className="nav-link active">
                      {props.user ? (
                        <>
                          <Button
                            //   className="btn btn-link"
                            onClick={() => {
                              signOut(auth)
                                .then(() => {
                                  // Sign-out successful.
                                })
                                .catch((error) => {
                                  // An error happened.
                                });
                            }}
                          >
                            Sign out
                          </Button>
                        </>
                      ) : (
                        "Login"
                      )}
                    </Link>
                  </li>

                  {props.user ? (
                    <></>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link to="/registration" className="nav-link active">
                          Registration
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

const Button = styled.button`
  border: none;
  background-color: none;

  &:hover {
    color: inherit;
    /* font-weight: bold; */
  }
`;
