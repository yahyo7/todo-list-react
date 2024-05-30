
import React, {useState,useEffect} from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  // state to implement editing functionality
  const [todoEditing, setTodoEditing] = useState(null);

  // Add the handlesubmit code here
  function handleSubmit(e) {
    e.preventDefault(); // check input is valid or not

    let todo = document.getElementById('todoAdd').value
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };

    if (newTodo.text.length>0) {
      setTodos([...todos].concat(newTodo));
    } else {
      alert('Enter a Valid Task');
    }

    document.getElementById('todoAdd').value = ""
  }
  
  // the deleteToDo 
function deleteTodo(id) {
  let updateTodos = [...todos].filter((todo) => todo.id !==id);
  setTodos(updateTodos)
}
  
  // the toggleComplete 
function toggleComplete(id) {
  let updateTodos = [...todos].map((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  setTodos(updateTodos);
}
  
  // the submitEdits 
  function submitEdits(newtodo) {
    const updateTodos = [...todos].map( (todo)=> {
      if (todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value;
      }
      return todo;
    });
    setTodos(updateTodos);
    setTodoEditing(null);
  }


  // store tasks added in the local storage
  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

useEffect(() => {
    if(todos.length > 0) {
        const json = JSON.stringify(todos);
        localStorage.setItem("todos", json);
    }
  }, [todos]);
  
return(
<div id="todo-list">
  <h1>Todo List</h1>
  <form onSubmit={handleSubmit}>
    <input type="text" id="todoAdd"/>
    <button type='submit'>Add Todo</button>
  </form>

  {todos.map( (todo) =>
  <div className="todo" key={todo.id}>
    <div className="todo-text">
      
      {/* checkbox completed*/}
      <input type="checkbox" id="completed" checked={todo.completed} onChange={()=> toggleComplete(todo.id)}/>
      {/* if it is in edit mode, display input box, else display text*/}
      {todo.id === todoEditing ? 
      (<input 
        type='text'
        id={todo.id}
        defaultValue={todo.text}/>) :
        (<div>{todo.text}</div>)
      }
    </div>
    <div className="todo-actions">
    {todo.id === todoEditing ?
    (
      <button onClick={() => submitEdits(todo)}>Submit Edits</button>
    ) :
    (
      <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
    )
    }

    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
  </div>
  </div>
  )}
</div>
);
};
export default App;
