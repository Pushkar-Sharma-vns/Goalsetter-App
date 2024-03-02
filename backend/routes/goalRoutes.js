const express = require('express')
const router = express.Router()

const {
    getGoals, 
    setGoal, 
    updateGoals, 
    deleteGoals
} = require('../controller/goalController')

const { 
    protect 
} = require('../middleware/authMiddleware') 


// router.get('/', getGoals)
// router.post('/', setGoals)
router.route('/').get(protect, getGoals).post(protect, setGoal)

// router.put('/:id', updateGoals)
// router.delete('/:id', deleteGoals)
router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals)


module.exports = router