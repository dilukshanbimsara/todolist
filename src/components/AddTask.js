import React, { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import axios from "axios";
import TaskCategory from "./TaskCategory";
import PieChart from "./PieChart";

export const ChangeContext = createContext();

function AddTask() {
  const [get, setGet] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [dataArr, setDataArr] = useState([]);
  const [project, setProject] = useState("");
  const [change, setChange] = useState(true);

  let dataSet = [];
  const today = moment().format("yyyy-MM-DD");
  const { id } = useParams();
  const handleDate = (e) => {
    e.preventDefault();
    console.log(e);

    setDate(e.target.value);
    console.log(e.target.value);
  };

  const clearform = (e) => {
    e.preventDefault();
    // setProject("");
    setTitle("");
    setDescription("");
    setDate("");
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/project/edit/" + id)
      .then((res) => {
        // console.log(get);
        setGet(res.data.task);
        setProject(res.data);
        console.log(res.data._id);
        get?.map((item, index) => {
          dataSet[index] = {
            title: item.title,
            description: item.description,
            due_date: item.due_date,
            start_date: item.start_date,
            status: item.status,
            id: item.id,
            //   start_date:
          };
        });

        // console.log("inside use effect : " +JSON.stringify(dataSet));
        setDataArr(dataSet);
        setTitle("");
        setDescription("");
        setDate("");
      })
      .catch((err) => console.log(err));
  }, [change]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      id: Math.floor(Math.random() * 10000),
      title: title,
      description: description,
      due_date: date,
      start_date: today,
      status: "todo",
    };
    // console.log(task);
    get.push(task);
    // console.log("new get : " + JSON.stringify(get));

    axios
      .post("http://localhost:4000/project/taskUpdate/" + id, get)
      .then((res) => {
        // console.log(res.data);
        setChange(!change);
        // window.location.reload()
      });
  };

  const todoCount = get?.filter(function (item) {
    if (item.status === "todo") {
      return true;
    } else {
      return false;
    }
  }).length;

  const progressCount = get?.filter(function (item) {
    if (item.status === "progress") {
      return true;
    } else {
      return false;
    }
  }).length;
  const doneCount = get?.filter(function (item) {
    if (item.status === "done") {
      return true;
    } else {
      return false;
    }
  }).length;


  console.log(dataSet);
  // console.log(todoCount)
  const data = [
    ["Task", "Status"],

    ["Done", doneCount],
    ["To-Do", todoCount],
    ["In Progress", progressCount],
  ];

  
  const options = {
    title: "Project Progress",
  };

  // console.log("Data array : " + dataArr);
  return (
    <>
      <Header>
        <h1>{project.project_title}</h1>
        <p>{project.project_description}</p>
      </Header>

      <Detail>
        <h6>{project.start_date} </h6> <h6> to </h6> <h6>{project.due_date}</h6>
      </Detail>
      <PageUp>
        <Left>
          <PieChart data={data} options={options} />
        </Left>
        <Right>
          <TodoForm>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
              <FormItem>
                <label>Task Name</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    e.preventDefault();
                    setTitle(e.target.value);
                  }}
                  className="form-control"
                  placeholder=""
                  required
                />
              </FormItem>
              <FormItem>
                <label>Descriptionn</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => {
                    e.preventDefault();
                    setDescription(e.target.value);
                  }}
                  className="form-control"
                  placeholder=""
                  required
                />
              </FormItem>
              <FormItem>
                <label className="form-label">Due Date</label>
                <input
                  type={"date"}
                  min={today.toString()}
                  max={project.due_date}
                  onChange={handleDate}
                  className="form-control"
                  value={date}
                  required
                />
              </FormItem>
              <FormButton>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
                <button
                  type="reset"
                  className="btn btn-secondary"
                  onClick={clearform}
                >
                  Clear
                </button>
              </FormButton>
            </form>
          </TodoForm>
        </Right>
      </PageUp>

      {/* {if(change !== )} */}
      <ChangeContext.Provider value={{change , setChange}}>
        <TaskCategory data={dataArr} p_id={id} />
      </ChangeContext.Provider>
    </>
  );
}

export default AddTask;

const TodoForm = styled.div`
  width: 100%;
  height: auto;
  background-color: aliceblue;
  /* border-radius: 10px; */
  margin: auto;
  color: #5c6469;
`;

const FormItem = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 90%;
  border-radius: 10px;
  /* background-color: white; */
  padding: 10px;
  margin: auto;
  margin-top: 10px;
  /* justify-content: flex-start; */
  /* margin: auto; */

  input {
    width: 99%;
    border: none;
    border-bottom: 1px solid;
    outline: none;
    font-size: large;
  }

  label {
    text-align: left;
  }
`;

const FormButton = styled.div`
  /* background-color: white; */
  display: flex;
  justify-content: end;
  width: 90%;
  border-radius: 10px;
  /* background-color: white; */
  padding: 10px;
  margin: auto;
  margin-top: 10px;

  button {
    margin: 5px;
  }
`;

const PageUp = styled.div`
  /* background-color: black; */
  width: 90%;
  display: flex;
  margin: auto;
`;
const Left = styled.div`
  background-color: aliceblue;
  width: 40%;
`;
const Right = styled.div`
  width: 60%;
`;

const Detail = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 400px;
  margin: auto;
`;

const Header = styled.div`
  color: #5c6469;
`;
