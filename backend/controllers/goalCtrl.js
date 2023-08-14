const asyncHandler=require('express-async-handler')
const Goal = require('../model/goalModel')
const User = require('../model/userModel')


const getGoalsCtrl=asyncHandler(async (req,res)=>{
    const goals=await Goal.find({user:req.user.id})
    res.status(200).json(goals)
})

const createGoalsCtrl=asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('enter some data in the field bro')
    }
    const goal=await Goal.create({
        text:req.body.text,
        user:req.user.id
    })
    res.status(200).json(goal)
})

const updateGoalsCtrl=asyncHandler(async (req,res)=>{
    const goal=await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error(`no such goal found`)
    }
    const user=await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error("User not found")
    }
    if(goal.user.toString()!==user.id){
        res.status(401)
        throw new Error("you are unauthorized to edit this goal")
    }
    const updatedGoal=await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true //to return the modified document and not just the original
    })
    res.status(200).json(updatedGoal)
})

const deleteGoalsCtrl=asyncHandler(async (req,res)=>{
    const goal=await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error(`no such goal found`)
    }
    const user=await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error("User not found")
    }
    if(goal.user.toString()!==user.id){
        res.status(401)
        throw new Error("you are unauthorized to delete this goal")
    }
    await goal.deleteOne()
    res.status(200).json({
        message:`Delete goal ${req.params.id}`
    })
    // const deletedGoal=await Goal.findByIdAndDelete(req.params.id,req.body,{
    //     new:false//to avoid returning the modified document but only the original one
    // })
    // res.status(200).json({
    //     message:`deleted goals successfully`
    // }) //other method
})
module.exports={getGoalsCtrl,createGoalsCtrl,updateGoalsCtrl,deleteGoalsCtrl};