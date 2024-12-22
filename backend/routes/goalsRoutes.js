const express = require('express');
const router = express.Router();
const { createGoal, getGoals, deleteGoal } = require('../Controller/goals'); 
router.post('/creategoal', createGoal);
router.get('/getgoals', getGoals);
router.delete('/deletegoal/:goalId', deleteGoal); 

module.exports = router;
