import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import moment from "moment";

function ViewModal(props) {
  const [err, setErr] = useState("");
  // const [color , setColor] = useState("re")
  const today = moment().format("yyyy-MM-DD");

  useEffect(() => {
    if (props.due_date === today && props.status !== "done") {
      setErr("Task must done today!!");
      // setColor('red')
    } else {
      // setColor('white')
      setErr("");
    }
  }, []);
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: "white" }}>
          <Modal.Title> </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "white",
            border: "none",
            backgroundColor: "aliceblue",
            color: "#5c6469",
          }}
        >
          {/* <div className="modal-body">{props.description} {props.start_date} {props.due_date}</div> */}
          <Title>
            <h4>{props.title}</h4>
          </Title>
          <Description>
            <h6>{props.description}</h6>
          </Description>
          <Date>
            <h6>{props.start_date}</h6>
            <h6>To</h6>
            <h6>{props.due_date}</h6>
            <br></br>
            
          </Date>
          <Description>
          <p style={{ color: "red" }}>{err}</p>
          </Description>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "white", border: "none" }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={props.handleClose}
          >
            Ok
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewModal;

const Title = styled.div`
  width: 90%;
  margin: auto;
  /* background-color: aliceblue; */
  text-align: center;
`;
const Description = styled.div`
  width: 90%;
  margin: auto;
  text-align: center;
`;

const Date = styled.div`
  width: 90%;
  margin: auto;
  /* background-color: aliceblue; */
  display: flex;
  justify-content: space-around;
`;
