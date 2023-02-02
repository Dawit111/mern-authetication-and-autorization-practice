const express = require('express')
const router = express.Router()
const { 
        getGoals,
        setGoal,
        updateGoal, 
        deleteGoal,
    } = require('../controllers/goalContoller')

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)

//router.put('/:id', updateGoal)    example.. these are replaced by the code on the line 11 
//router.delete('/:id', deleteGoal)   example.. these are replaced by the code on the line 11 

module.exports = router