import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import moment from "moment";
import ProjectList from "./ProectList";
import ConfirmModal from "./ConfirmModal";
import styled from "styled-components";

export const DeleteContext = createContext();

function AddProject(props) {
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [get, setGet] = useState([]);
  const [change, setChange] = useState(true);
  const [show, setShow] = useState(false);
  const [project_id, setProject_id] = useState(null);
  const [remove, setRemove] = useState("remove");
  let dataSet = [];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const today = moment().format("yyyy-MM-DD");
  const handleProject = (e) => {
    e.preventDefault();
    setProject(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleDate = (e) => {
    e.preventDefault();
    console.log(e);
    // let ndate = moment(e.target[0].value).format("DD-MM-YYYY");

    setDate(e.target.value);
    console.log(e.target.value);
  };

  const handleDelete = (id) => {
    alert(id);
    setProject_id(id);
    handleShow();
  };

  const clearform = (e) => {
    e.preventDefault();
    setProject("");
    setDescription("");
    setDate("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      project_title: project,
      project_description: description,
      due_date: date,
      start_date: today,
      owner: props.owner,
      task: [],
    };
    axios.post("http://localhost:4000/project/add", data).then((res) => {
      console.log(res.data);
      setChange(!change);
    });
    console.log(data);
    setProject("");
    setDescription("");
    setDate("");
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/project/get/" + props.owner)
      .then((res) => {
        setGet(res);
        console.log(get);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [change]);

  get.data?.map((item, index) => {
    dataSet[index] = {
      id: item._id,
      title: item.project_title,
      description: item.project_description,
      due_date: item.due_date,
      start_date: item.start_date,
      owner: item.owner,
    };
  });
  console.log(dataSet)

  return (
    <>
      <Form>
        <h2>Create Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Project Title</label>
            <input
              type="text"
              value={project}
              onChange={handleProject}
              className="form-control"
              id="exampleFormControlInput1"
              placeholder=""
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              value={description}
              onChange={handleDescription}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input
              type={"date"}
              min={today.toString()}
              onChange={handleDate}
              className="form-control"
              value={date}
              required
            />
          </div>
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
      </Form>

      <ProjectList
        dataSet={dataSet}
        handleDelete={(e) => handleDelete(e)}
        owner={props.owner}
      />

      <DeleteContext.Provider value={{remove,setRemove}}>
        <ConfirmModal
          message={"Do you want delete task!"}
          status={"status"}
          title={"Delete"}
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
          project_id={project_id}
        />
      </DeleteContext.Provider>
    </>
  );
}

export default AddProject;

const Form = styled.div`
  width: 90%;
  margin: auto;
  background-color: aliceblue;

  form {
    width: 90%;
    margin: auto;
    align-items: flex-start;
  }
  div {
    label {
      text-align: left;
      width: 100%;
    }
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
