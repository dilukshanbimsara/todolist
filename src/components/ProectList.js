import styled from "styled-components";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function ProjectList(props) {
  const [search, setSearch] = useState("");

  return (
    <>
      <CardContiner>
        <Form>
          <input
            placeholder="Search title"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Form>
        {props.dataSet
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.title.toLowerCase().includes(search);
          })
          .map(({ id, title, owner, due_date, start_date }) => (
            <>
            
              <ProjectCard key={id}>
                <h3>{title}</h3>
                {/* <h6>{owner} </h6> */}
                <h5>{due_date}</h5>
                <h6>to</h6>
                <h5>{start_date}</h5>
                <Link to={"/project/" + id} className="d-grid gap-2">
                  <button type="button" className="btn btn-primary">
                    Info
                  </button>
                </Link>

                <button
                  type="submit"
                  className="btn btn-danger"
                  onClick={() => {
                    props.handleDelete(id);
                  }}
                >
                  Delete
                </button>
              </ProjectCard>
            </>

            // </>
          ))}
      </CardContiner>
    </>
  );
}

export default ProjectList;

const CardContiner = styled.div`
  width: 90%;
  height: auto;
  background-color: aliceblue;
  /* overflow-x:scroll; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  padding-top: 20px;
`;

const ProjectCard = styled.div`
  width: 200px;
  /* height: 400px; */
  background-color: #71cdf1;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  color: #1f3a4c;

  h5 {
    margin: 4px;
  }
  h6 {
    margin: 0;
  }
  button {
    margin-top: 4px;
  }
  
`;

// const Button = styled.button`
//   width: 100px;
//   height: 40px;
//   background-color: white;
//   cursor: pointer;
//   border-radius: 10px;
//   margin: auto;
// `;

const Form = styled.div`
  width: 90%;
  height: 40px;
  border-radius: 10px;
  background-color: white;
  margin: auto;
  margin-top: 10px;
  input {
    width: 95%;
    /* border-radius: 10px; */
    height: 35px;
    border: none;
    outline: none;
    font-size: large;
  }
`;
