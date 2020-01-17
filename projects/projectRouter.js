const express = require('express')

const Projects = require('../data/helpers/projectModel.js')
const Actions = require('../data/helpers/actionModel.js')
const router = express.Router();

// post project(works)
router.post('/', validateProject, (req, res) => {

    let project = req.body

    Projects.insert(project)
        .then(addedProject => {
            res.status(200).json(addedProject)

        })
        .catch(err => {
            res.status(500).json({ error: "The project could not be added." })

        })
})

// post ith action(works)
router.post('/:id/actions', validateProjectId, validateAction, (req, res) => {

    let id = req.params.id
    let action = req.body

    Actions.insert({...action, project_id: id})
        .then(addedAction => {
            res.status(200).json(addedAction)

        })
        .catch(err => {
            res.status(500).json({ error: "The action information could not be added." })

        })
})

// get projects(works)
router.get('/', (req, res) => {

    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ error: "The projects information could not be retrieved." })

        })
})

// get ith project(works)
router.get('/:id', validateProjectId, (req, res) => {

    let id = req.params.id
    Projects.get(id)
        .then(project => {
            res.status(200).json(project)

        })
        .catch(err => {
            res.status(500).json({ error: "The project could not be retrieved." })

        })
})




// get ith action(works)
router.get('/:id/actions', validateProjectId, (req, res) => {

    let id = req.params.id
    Projects.getProjectActions(id)
        .then(projectAction => {
            res.status(200).json(projectAction)

        })
        .catch(err => {
            res.status(500).json({ error: "The posts could not be retrieved." })

        })
})
// delete ith project(works)
router.delete('/:id', validateProjectId, (req, res) => {

    let id = req.params.id

    Projects.remove(id)
        .then(deletedProject => {
            res.status(200).json(deletedProject)

        })
        .catch(err => {
            res.status(500).json({ error: "The project information could not be deleted." })

        })
})

// modify ith project(works)
router.put('/:id', validateProjectId, validateProject, (req, res) => {

    let id = req.params.id
    let project = req.body

    Projects.update(id, project)
        .then(updatedProject => {
            res.status(200).json(updatedProject)

        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be modified." })

        })
})

// validate project id
function validateProjectId(req, res, next) {

    let id = req.params.id
    Projects.get(id)
        .then(project => {

            // not used anywhere
            req.project = project
            next()
        })
        .catch(err => {
            res.status(400).json({ message: "invalid project id" })

        })
}
// validate project
function validateProject(req, res, next) {

    let { body } = req
    if(Object.keys(body).length === 0) {
        res.status(400).json({ message: "missing project data" })
    } else {
        let { name, description } = body

        if(!name) {
            res.status(400).json({ message: "missing required name field" })

            
        } else if(!description) {

            res.status(400).json({ message: "missing required description field" })

        } else {
            next()
        }
    }
}
// validate action
function validateAction(req, res, next) {

    let { body } = req

    if(Object.keys(body).length === 0) {
        res.status(400).json({ message: "missing action data" })
    } else {
        let { description, notes } = body
        if(!description) {
            res.status(400).json({ message: "missing required description field" })

        } else if(!notes) {
            res.status(400).json({ message: "missing required notes field" })

        } else {
            next()
        }
    }
}



module.exports = router