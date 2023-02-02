const asyncHandler = require('express-async-handler')

const getGoals = asyncHandler(async(req, res)=> {
    res.status(200).json({message: 'get goals'})
})

const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400) 
        throw new Error("pleas fill the text")
    }
    res.status(200).json({message: 'set goals'})
})

const updateGoal = asyncHandler(async(req, res) => {
    res.status(200).json({message: `update goals ${req.params.id}`})
})

const deleteGoal = asyncHandler(async(req, res) => {
    res.status(200).json({message: `delete goals ${req.params.id}`})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
} 