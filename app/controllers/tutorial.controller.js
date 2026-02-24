import db from "../models/index.js";
 
const Op = db.Sequelize.Op;
const Tutorial = db.tutorials;
 
// Create and Save a new Tutorial
export const create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }
 
    // Create a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    };
 
    // Save Tutorial in the database
    Tutorial.create(tutorial)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial.",
            });
        });
};
 
// Retrieve all Tutorials
export const findAll = (req, res) => {
    // Allow a filter condition via query parameter
    const title = req.query.title;
    const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
 
    Tutorial.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};
 
// Find a single Tutorial by ID
export const findOne = (req, res) => {
    const id = req.params.id;
 
    // Find Tutorial by primary key
    Tutorial.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id,
            });
        });
};
 
// Update a Tutorial by ID
export const update = (req, res) => {
    const id = req.params.id;
 
    // Update the Tutorial with the specified ID
    Tutorial.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num === 1) {
                res.send({
                    message: "Tutorial was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id,
            });
        });
};
 
// Delete a Tutorial by ID
export const deleteOne = (req, res) => {
    const id = req.params.id;
 
    // Delete the Tutorial with the specified ID
    Tutorial.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num === 1) {
                res.send({
                    message: "Tutorial was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id,
            });
        });
};
 
// Delete all Tutorials
export const deleteAll = (req, res) => {
    // Delete all Tutorials
    Tutorial.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials.",
            });
        });
};
 
// Find all published Tutorials
export const findAllPublished = (req, res) => {
    // Find all Tutorials with published = true
    Tutorial.findAll({ where: { published: true } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};