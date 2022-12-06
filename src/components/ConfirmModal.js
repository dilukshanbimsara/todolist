import { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import  DeleteContext  from "./AddProject";

function ConfirmModal(props) {
const {remove, setRemove} = useContext(DeleteContext)

  const [color, setColor] = useState("");
  const handleOk = () => {
    axios
      .get("http://localhost:4000/project/delete/" + props.project_id)
      .then((res) => {
        console.log(res.data);
        window.location.reload()
      });
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "white", border: "none", color: color }}
        >
          <Modal.Title>
            {" "}
            {props.title} {" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "white",
            height: "fit-content",
            padding: "0",
            color: "#ff3333",
          }}
        >
          <div className="modal-body">{props.message}</div>
          {/* {props.message} */}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "white", border: "none" }}>
          <button type="button" className="btn btn-danger" onClick={handleOk}>
            Delete
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={props.handleClose}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
