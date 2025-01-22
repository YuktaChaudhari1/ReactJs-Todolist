import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {
  let[todolist,setTodolist]=useState([]);
  

  let saveTodoList=(event)=>{
    event.preventDefault();
    
    let toname=event.target.toname.value.trim();

    if(toname && !todolist.some((item)=> item.name === toname)){
    
     setTodolist([...todolist,{name:toname,status:false}]);
     event.target.reset(); //clear the input field
    }else{
      alert(" Task Already Exits or is empty....");
    }
    
  };
  let list = todolist.map((item,index)=>{
    return(
   <Todolistitem value={item.name} key={index}  status={item.status}indexnum={index} todolist={todolist} setTodolist={setTodolist}/>
    )
  })
  return (
    <div className="App">
      <div>
        <h1  className="Header">Create Your Todo-List</h1>
        <div className="mainbox">
          <form onSubmit={saveTodoList}>
          <input type="text" name="toname" placeholder="What are your task for today"/>
          <button>Add</button>
          </form>
        </div>
       <div className='ecd'>
        <ul>
         {list}
        </ul>
       </div>
      </div>
    </div>
  );
}

export default App;

function Todolistitem({value,status,indexnum,todolist,setTodolist})
{
let [isEditing,setIsediting]=useState(false);
let [editValue,setEditvalue]=useState(value)

  let deleteRow=()=>{
    let  finalData=todolist.filter((v,i)=>i!=indexnum)
    setTodolist(finalData)
  };

  let checkStatus = () => {
   let updateList =  todolist.map((item,i)=>
  i=== indexnum ? { ...item,status: !item.status} :item );
  
  setTodolist(updateList);
  };

let handleEdit = ()=>{
  if(isEditing){
    let updateList =[...todolist];
    updateList[indexnum].name =editValue.trim() || value;
    setTodolist(updateList);
    }
    setIsediting(!isEditing);
}

  return(
    <li>
      { isEditing? (
        <input type="text" value={editValue}
         onChange={(e)=> setEditvalue(e.target.value)}
         />) :(
       <span className={status ? 'completetodo':''} >
        {indexnum+1}) {value}</span>)}

      <div className='btn-group'>
    <button id='edit' onClick={handleEdit}>{isEditing ? "Save" : "Edit "}</button>
    <button id='complete' onClick={checkStatus}>Complete</button>
    <button id='delete' onClick={deleteRow}>Delete</button>

    </div>
   
    </li>
  )
}