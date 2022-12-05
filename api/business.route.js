const express = require("express");
const businessRoutes = express.Router();

let Project = require("./business.model");

//store
businessRoutes.route("/add").post(function (req, res) {
  let project = new Project(req.body);
  project
    .save()
    .then((project) => {
      res.status(200).json({ project: "project added successfully" });
    })
    .catch((err) => {
      res.status(400).send("unable to save to databse");
    });
});

//get projects

businessRoutes.route("/").get(function (req, res) {
  Project.find(function (err, project) {
    if (err) console.log(err);
    else {
      res.json(project);
    }
  });
});

//get specific data
businessRoutes.route("/edit/:id").get(function (req, res) {
  let id = req.params.id;
  Project.findById(id, function (err, project) {
    if (err) console.log(err);
    else {
      res.json(project);
    }
  });
});

//update task array
businessRoutes.route("/taskUpdate/:id").post(function (req, res) {
  Project.findById(req.params.id, function (err, project) {
    if (!project) res.status(404).send("data is not found");
    else {
      console.log("body " + JSON.stringify(req.body));
      project.task = req.body;

      project
        .save()
        .then((project) => {
          res.json("Update Complete");
        })
        .catch((err) => {
          res.status(400).send("unable to update database");
        });
    }
  });
});

businessRoutes.route("/update/:id").post(function (req, res) {
  Project.findById(req.params.id, function (err, project) {
    if (!project) res.status(404).send("data is not found");
    else {
      project.project_title = req.body.project_title;
      project.project_description = req.body.project_description;

      project
        .save()
        .then((project) => {
          res.json("Update Complete");
        })
        .catch((err) => {
          res.status(400).send("unable to update database");
        });
    }
  });
});

businessRoutes.route("/get/:id").get(function (req, res) {
  let owner = req.params.id;
  Project.find({ owner: owner }, function (err, project) {
    if (err) console.log(err);
    else res.json(project);
  });
});

//delete project
businessRoutes.route("/delete/:id").get(function (req, res) {
  Project.findByIdAndRemove({ _id: req.params.id }, function (err, project) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});

module.exports = businessRoutes;
