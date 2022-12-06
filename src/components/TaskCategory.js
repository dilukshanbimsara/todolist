import styled from "styled-components";
import React, { useState, useEffect, useContext, createContext } from "react";
import Task from "./Task";
import axios from "axios";
import ConfirmModal from "./ConfirmModal";
import { ChangeContext } from "./AddTask";

export const ConfirmContext = createContext();

function TaskCategory(props) {
  const { change, setChange } = useContext(ChangeContext);

  const [todo, setTodo] = useState("");
  const [progress, setProgress] = useState("");
  const [done, setDone] = useState("");
  const [get, setGet] = useState([]);
  const [chage, setChane] = useState(true);
  const [show, setShow] = useState(false);

  const [confirm, setConfirm] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const approve = () => {
    setConfirm(true);
  };
  const reject = () => setConfirm(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/project/edit/" + props.p_id)
      .then((res) => {
        // console.log(get);
        setGet(res.data.task);

        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [chage, props.data]);

  const handleDelete = (e, task_id) => {
    // handleShow();
    // alert(task_id + " " + props.p_id + " " + confirm);
    // console.log(get);

    const filtered = get.filter((obj) => {
      return obj.id !== task_id;
    });

    console.log("filtered " + filtered);
    let id = props.p_id;

    // if(confirm){
    axios
      .post("http://localhost:4000/project/taskUpdate/" + id, filtered)
      .then((res) => {
        setConfirm(false);
        console.log(res.data);
        reject();
        setChane(!chage);
      });
    // }

    //
  };

  const handleEdit = (e, task_id) => {
    handleShow();
  };

  const handleRight = (e, task_id) => {
    const filtered = get.filter((obj) => {
      return obj.id === task_id;
    });

    const newArr = get.filter((obj) => {
      return obj.id !== task_id;
    });

    console.log("filtered " + JSON.stringify(filtered));
    console.log("filtered " + filtered[0].id);

    if (filtered[0].status === "todo") {
      filtered[0].status = "progress";
      newArr.push(filtered[0]);
    } else if (filtered[0].status === "progress") {
      filtered[0].status = "done";
      newArr.push(filtered[0]);
    }

    let id = props.p_id;
    axios
      .post("http://localhost:4000/project/taskUpdate/" + id, newArr)
      .then((res) => {
        console.log(res.data);
        // window.location.reload();
        setChane(!chage);
        setChange(!change);
      });
  };

  const handleLeft = (e, task_id) => {
    // alert(task_id);
    const filtered = get.filter((obj) => {
      return obj.id === task_id;
    });

    const newArr = get.filter((obj) => {
      return obj.id !== task_id;
    });

    if (filtered[0].status === "done") {
      filtered[0].status = "progress";
      newArr.push(filtered[0]);
    } else if (filtered[0].status === "progress") {
      filtered[0].status = "todo";
      newArr.push(filtered[0]);
    }

    let id = props.p_id;
    axios
      .post("http://localhost:4000/project/taskUpdate/" + id, newArr)
      .then((res) => {
        console.log(res.data);
        setChane(!chage);
        setChange(!change);
      });
  };

  return (
    <>
      <MainContainer>
        <SubContainer>
          <h3>To-Do {props.description}</h3>
          <h6>Count : {props.todoCount}</h6>
          <Form>
            <input
              placeholder="Search title"
              onChange={(e) => {
                setTodo(e.target.value);
              }}
            />
          </Form>

          {get
            ?.filter((item) => {
              return todo.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(todo) ||
                    item.due_date.includes(todo);
            })
            .map((item, index) => (
              <>
                {item.status === "todo" ? (
                  <>
                    <Task
                      handleRight={(e) => handleRight(e, item.id)}
                      handleLeft={(e) => handleLeft(e, item.id)}
                      handleDelete={(e) => handleDelete(e, item.id)}
                      start_date={item.start_date}
                      due_date={item.due_date}
                      id={item.id}
                      title={item.title}
                      p_id={props.p_id}
                      description={item.description}
                      status={item.status}
                      // todoCount={todoCount}
                    />
                  </>
                ) : (
                  ""
                )}
              </>
            ))}
        </SubContainer>
        <SubContainer>
          <h3>In-Progress</h3>
          <h6>Count : {props.progressCount}</h6>
          <Form>
            <input
              placeholder="Search title"
              onChange={(e) => {
                setProgress(e.target.value);
              }}
            />
          </Form>
          {get
            ?.filter((item) => {
              return progress.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(progress) ||
                    item.due_date.includes(progress) ;
            })
            .map((item, index) => (
              <>
                {item.status === "progress" ? (
                  <Task
                    handleRight={(e) => handleRight(e, item.id)}
                    handleLeft={(e) => handleLeft(e, item.id)}
                    handleDelete={(e) => handleDelete(e, item.id)}
                    start_date={item.start_date}
                    due_date={item.due_date}
                    id={item.id}
                    title={item.title}
                    p_id={props.p_id}
                    description={item.description}
                    status={item.status}
                  />
                ) : (
                  ""
                )}
              </>
            ))}
        </SubContainer>
        <SubContainer>
          <h3>Done</h3>
          <h6>Count : {props.doneCount}</h6>
          <Form>
            <input
              placeholder="Search title"
              onChange={(e) => {
                setDone(e.target.value);
              }}
            />
          </Form>
          {get
            ?.filter((item) => {
              return done.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(done) ||
                    item.due_date.includes(done);
            })
            .map((item, index) => (
              <>
                {item.status === "done" ? (
                  <Task
                    handleRight={(e) => handleRight(e, item.id)}
                    handleLeft={(e) => handleLeft(e, item.id)}
                    handleDelete={(e) => handleDelete(e, item.id)}
                    start_date={item.start_date}
                    due_date={item.due_date}
                    id={item.id}
                    title={item.title}
                    p_id={props.p_id}
                    status={item.status}
                    description={item.description}
                  />
                ) : (
                  ""
                )}
              </>
            ))}
        </SubContainer>
      </MainContainer>

      <ConfirmContext.Provider value={{ confirm, setConfirm }}>
        <ConfirmModal
          message={"Do you want delete task!"}
          status={"status"}
          title={"Delete"}
          handleClose={handleClose}
          handleShow={handleShow}
          approve={approve}
          reject={reject}
          show={show}
          description={props.description}
          p_id={props.p_id}
        />
      </ConfirmContext.Provider>
    </>
  );
}

export default TaskCategory;

const MainContainer = styled.div`
  width: 90%;
  background-color: aliceblue;
  display: flex;
  justify-content: space-around;
  margin: auto;
  padding-top: 10px;
`;

const SubContainer = styled.div`
  width: 30%;
  height: auto;
  background-color: #bac8ff;
  border-radius: 10px;
  color: #5c6469;
`;
const Form = styled.div`
  width: 90%;
  height: 27px;
  border-radius: 10px;
  background-color: white;
  margin: auto;
  margin-top: 10px;
  input {
    width: 95%;
    /* border-radius: 10px; */
    /* height: px; */
    border: none;
    border-bottom: 1px solid;
    outline: none;
    font-size: medium;
  }
`;
