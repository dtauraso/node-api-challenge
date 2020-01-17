const express = require('express')

const Actions = require('../data/helpers/actionModel.js')

const router = express.Router()

// get actions
router.get('/', (req, res) => {

    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ error: "The projects information could not be retrieved." })

        })
})

// get ith action
router.get('/:id', validateActionId, (req, res) => {

    let id = req.params.id
    Actions.get(id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({ error: "The action could not be retrieved." })
        })
})


// delete ith action
router.delete('/:id', validateActionId, (req, res) => {

    let id = req.params.id
    Actions.remove(id)
        .then(deletedAction => {
            res.status(200).json(deletedAction)
        })
        .catch(err => {
            res.status(500).json({ error: "The action could not be deleted." })

        })
})


// modify ith action
router.put('/:id', validateActionId, (req, res) => {

    let id = req.params.id
    let action = req.body

    Actions.update(id, action)
        .then(updatedAction => {
            res.status(200).json(updatedAction)
        })
        .catch(err => {
            res.status(500).json({ error: "The action information could not be modified." })

        })
})
// validate ith action
function validateActionId(req, res, next) {

    let id = req.params.id
    Actions.get(id)
        .then(action => {
            // not used anywhere
            req.action = action
            next()
        })
        .catch(err => {
            res.status(400).json({ message: "invalid action id" })
        })
}
module.exports = router