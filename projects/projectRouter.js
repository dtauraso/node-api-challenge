const express = require('express')

const Projects = require('../data/helpers/projectModel.js')

const router = express.Router();

router.get('/', (req, res) => {

    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ error: "The projects information could not be retrieved." })

        })
})
module.exports = router