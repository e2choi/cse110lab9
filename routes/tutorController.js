const express = require('express');
const router = express.Router();
const getTutors = require('../model/getTutors');
const deleteTutor = require('../model/deleteTutor');
const createTutor = require('../model/createTutor');
const updateTutors = require('../model/updateTutors');

/* ADD CODE BELOW THIS */
router.get('/tutor_list', (req, res) => {
  getTutors(req.query.cseCourse)
  .then(doc => res.send(doc))
})

router.post('/tutor_list/update_tutor', (req, res) => {
  updateTutors(req.body.tutors, req.body.cseCourse);
})

router.post('/tutor_list/remove_tutor', (req, res) =>{
  deleteTutor(req.body.cseCourse, req.body.tutor);
})

router.post('/tutor_list/add_tutor', (req, res) =>{
  createTutor(req.body.name, req.body.years, req.body.cseCourse );
})

/* ADD CODE ABOVE THIS */

module.exports = router;