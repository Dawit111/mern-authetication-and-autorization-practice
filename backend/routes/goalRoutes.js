const express = require('express')
const router = express.Router()
const { 
        getGoals,
        setGoal,
        updateGoal, 
        deleteGoal,
    } = require('../controllers/goalContoller')
const { protect } = require('../middleware/authMiddleware')


router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

//router.put('/:id', updateGoal)    example.. these are replaced by the code on the line 11 
//router.delete('/:id', deleteGoal)   example.. these are replaced by the code on the line 11 

module.exports = router