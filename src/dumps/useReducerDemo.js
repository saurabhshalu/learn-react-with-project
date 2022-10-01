import { useState, useReducer } from "react";
import "./styles.css";

const reducer = (state = { todos: [], totoalCount: 0 }, action) => {
  // if(action.type === 'add_todo') {
  //   return state;
  // }else if(action.type === 'remove_todo') {
  //   return state;
  // }
  //return state;

  switch (action.type) {
    case "add_todo":
      const newTodos = [...state.todos];
      newTodos.push(action.payload);
      return { todos: newTodos, totalCount: state.totoalCount + 1 };
    // return {
    //   todos: [...state.todos, action.payload],
    //   totalCount: state.totalCount + 1
    // };
    case "remove_todo":
      return {
        totalCount: state.totalCount - 1,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
export default function App() {
  const initialState = {
    todos: [],
    totoalCount: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  //const [todos, setTodos] = useState([]);
  //const [totalCount, setTotalCount] = useState(0);

  const [input, setInput] = useState("");

  return (
    <div className="App">
      <h1>Todos</h1>
      <input
        type="text"
        placeholder="enter todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={() => {
          // setTodos((old) => [
          //   ...old,
          //   {
          //     id: old.length === 0 ? 1 : old[old.length - 1].id + 1,
          //     text: input
          //   }
          // ]);
          dispatch({
            type: "add_todo",
            payload: {
              id:
                state.todos.length === 0
                  ? 1
                  : state.todos[state.todos.length - 1].id + 1,
              text: input,
            },
          });
        }}
      >
        Add
      </button>
      {state.todos.map((item) => (
        <div key={item.id}>
          {item.text}
          <button
            onClick={() => {
              dispatch({ type: "remove_todo", payload: item.id });
              //setTodos((old) => old.filter((i) => item.id !== i.id));
            }}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
}