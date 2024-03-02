const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')


//@desc Get goals
//@route Get /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

//@desc Set goals
//@route Post /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)//.json({message: 'Please add a Text field'})
        throw new Error('Please add a Text field.')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(goal)
})

//@desc Update goals
//@route Update /api/goals
//@access Private
const updateGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(401)
        throw new Error('Goal not found!')
    }

    const user = await User.findById(req.user.id)

    // Check if user exists
    if(!user) {
        res.status(401)
        throw new Error('User does not exist.')
    }

    // Checking if user is the same user is associated with goal user.
    if(goal.user.toString() !== req.user.id){
        console.log(user.id)
        res.status(401)
        throw new Error('You are not authorised to access the goal.')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { 
                            new: true
                        })

    // debugger;

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

    const user = await User.find({ email: req.user.email })

    // Check if user exists
    if(!user) {
        res.status(401)
        throw new Error('User does not exist.')
    }

    // Checking if user is the same user is associated with goal user.
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('You are not authorised to access the goal.')
    }

    await goal.deleteOne()
    
    res.status(200).json({ message: `Delete goals ${req.params.id}` })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoals,
    deleteGoals,
}