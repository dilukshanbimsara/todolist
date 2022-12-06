import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

function PopModal(props) {
  const [color, setColor] = useState('');


  useEffect(()=>{
    {props.status === true ? setColor('#ff3333') : setColor('#B00020')}

  },[props.status])

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
          style={{ backgroundColor: "white", border: "none" ,color:color}}
        >
          <Modal.Title> {props.title} </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "white",
            height: "fit-content",
            padding: "0",
            color:color
          }}
        >
          <div className="modal-body">{props.description} {props.start_date} {props.due_date}{props.message}</div>
          
        </Modal.Body>
        <Modal.Footer
          style={{ backgroundColor: "white", border: "none" }}
        ><button type="button" className="btn btn-secondary" onClick={props.handleClose}>Ok</button></Modal.Footer>
      </Modal>
    </>
  );
}

export default PopModal;
