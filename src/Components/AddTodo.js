import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/todoslice";
import "../assets/scss/add-todo.scss";

export default function AddTodo() {
  const [value,setValue] = useState("");
  const {data} = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const addNewTodo = () => {
    if(value.length === 0){
      alert("please write something in input")
    }else if(data?.some(todo => todo.title === value)){
      alert("such a record already exists")
      setValue("");
    }
    else{
      dispatch(addTodo(value));
      setValue("");
    } 
  }
  
  return (
    <div className="add-todo-container">
      <input type="text" name="" id="" placeholder="New Task" value={value} onChange={({target}) => setValue(target.value)}/>
      <button onClick={addNewTodo}>Add</button>
    </div>
  )
}
