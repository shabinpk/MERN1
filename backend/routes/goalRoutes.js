const express=require('express')
const {getGoalsCtrl,createGoalsCtrl,updateGoalsCtrl,deleteGoalsCtrl} = require('../controllers/goalCtrl')
const { protect } = require('../middleware/authMiddleware')
const goalRoutes=express.Router()

//method1
goalRoutes.route('/').get(protect,getGoalsCtrl).post(protect,createGoalsCtrl)
goalRoutes.route('/:id').put(protect,updateGoalsCtrl).delete(protect,deleteGoalsCtrl)
//method2 (using middlewares)
// goalRoutes.get('/',getGoalsCtrl)
// goalRoutes.post('/',createGoalsCtrl)
// goalRoutes.put('/:id',updateGoalsCtrl)
// goalRoutes.delete('/:id',deleteGoalsCtrl)


module.exports=goalRoutes