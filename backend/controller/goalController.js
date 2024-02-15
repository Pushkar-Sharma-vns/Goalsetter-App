const asyncHandler = require('express-async-handler')

//@desc Get goals
//@route Get /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get goals'})
})

//@desc Set goals
//@route Set /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.Text) {
        res.status(400)//.json({message: 'Please add a Text field'})
        throw new Error('Please add a Text field.')
    }

    res.status(200).json({ message: 'Set goals'})
})

//@desc Update goals
//@route Update /api/goals
//@access Private
const updateGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update goals ${req.params.id}` })
})

//@desc Delete goals
//@route Delete /api/goals
//@access Private
const deleteGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete goals ${req.params.id}` })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoals,
    deleteGoals,
}