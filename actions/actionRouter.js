const express = require('express')

const Actions = require('../data/helpers/actionModel.js')

const router = express.Router()

router.get('/', (req, res) => {

    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ error: "The projects information could not be retrieved." })

        })
})

module.exports = router