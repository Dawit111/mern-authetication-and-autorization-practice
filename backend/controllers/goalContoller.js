const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/ userModel')

//@desc Get goal
//@route GET/api/goals/:id
//@access private
const getGoals = asyncHandler(async(req, res)=> {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

//@desc Create goal
//@route POST/api/goals/:id
//@access private
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400) 
        throw new Error("pleas fill the text")
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

//@desc update goal
//@route PUT/api/goals/:id
//@access private
const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal to update not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    const user = await User.findById(req.user.id)

    //check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id)
    res.status(401)
    throw new Error('User not authorized')
    res.status(200).json(updatedGoal)
})

//@desc Delete goal
//@route DELETE/api/goals/:id
//@access private
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal to delete not found')
    }
    await goal.remove()
    res.status(200).json({id: req.params.id})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
} 