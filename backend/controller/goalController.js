const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

//@desc Get goals
//@route Get /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()

    res.status(200).json(goals)
})

//@desc Set goals
//@route Set /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)//.json({message: 'Please add a Text field'})
        throw new Error('Please add a Text field.')
    }

    const goal = await Goal.create({
        text: req.body.text,
    })

    res.status(200).json(goal)
})

//@desc Update goals
//@route Update /api/goals
//@access Private
const updateGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found!')
    }
    // console.log(req.body);
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)
})

//@desc Delete goals
//@route Delete /api/goals
//@access Private
const deleteGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found!')
    }
    // console.log(goal)
    await goal.deleteOne()
    
    res.status(200).json({ message: `Delete goals ${req.params.id}` })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoals,
    deleteGoals,
}