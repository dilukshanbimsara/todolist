import React, { useState } from "react";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

// import moment from "moment";
// import axios from "axios";
import ViewModal from "./ViewModal";

function Task(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = () => {
    handleShow();
  };
  return (
    <>
      <CardContainer>
        <Left>
          {props.status === "todo" ? (
            <>
              <Icons onClick={props.handleRight} type="disabled">
                <AiOutlineRight />
              </Icons>
            </>
          ) : (
            <>
              <Icons onClick={props.handleLeft}>
                <AiOutlineLeft />
              </Icons>
            </>
          )}
        </Left>
        <Middle>
          <h4>{props.title}</h4>
          <Buttons>
            <Icons onClick={props.handleDelete}>
              <MdDelete />
            </Icons>
            <Icons onClick={handleEdit}>
              <FaEdit />
            </Icons>
          </Buttons>
        </Middle>
        <Left>
          {props.status === "done" ? (
            <>
              <Icons onClick={props.handleLeft}>
                <AiOutlineLeft />
              </Icons>
            </>
          ) : (
            <>
              <Icons onClick={props.handleRight}>
                <AiOutlineRight />
              </Icons>
            </>
          )}
        </Left>
      </CardContainer>
      <ViewModal
        message={"Do you want delete task!"}
        status={props.status}
        title={props.title}
        description={props.description}
        handleClose={handleClose}
        handleShow={handleShow}
        start_date={props.start_date}
        due_date={props.due_date}
        show={show}
        // project_id={project_id}
      />
    </>
  );
}

export default Task;

const CardContainer = styled.div`
  width: 95%;
  margin: auto;
  /* height: 100px; */
  background-color: white;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
  padding-bottom: 10px;
`;

const Icons = styled.a`
  cursor: pointer;
  color: #7c91f2;
`;

const Middle = styled.div`
  width: 50%;
  color: #5c6469;
`;

const Left = styled.div`
  width: 25%;
  /* background-color: aliceblue; */
  font-size: xx-large;
  margin: auto;
`;
