import express from 'express';
const router=express.Router();
import {Todo} from '../model/todos';
let todo:Todo[]=[];
router.get('/',(req,res,next)=>{
    res.status(200).json({todos:todo});
})
router.post('/todo',(req,res,next)=>{
    const newTodo:Todo={
        id:new Date().toISOString(),
        text:req.body.text
    }
    todo.push(newTodo);
    res.status(200).json({newtodo:newTodo});
})
router.put('/update/:todoId',(req,res,next)=>{
    const tId=req.params.todoId;
    const todoIndex= todo.findIndex(todoItem=> todoItem.id===tId);
    if(todoIndex>=0){
        todo[todoIndex]={ id:todo[todoIndex].id,text:req.body.text};
        return res.status(200).json({todo:todo});
    }
    res.status(404).json({message:'todoItem not found'});
})
router.delete('/delete/:todoId',(req,res,next)=>{
    todo=todo.filter((todoItem) =>todoItem.id !== req.params.todoId);
    res.status(200).json({message:'todo deleted',todo:todo})
})

export default router;