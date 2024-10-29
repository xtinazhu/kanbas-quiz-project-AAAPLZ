export default function TodoItem({ todo, deleteTodo, setTodo }: {
  todo: { id: string; title: string };
  deleteTodo: (id: string) => void;
  setTodo: (todo: { id: string; title: string }) => void;
}) {
  return (
    <li key={todo.id} className="list-group-item">
      <button onClick={() => deleteTodo(todo.id)}
              id="wd-delete-todo-click" className="btn btn-danger me-2 float-end"> 
              Delete </button>
      <button onClick={() => setTodo(todo)}
              id="wd-set-todo-click" className="btn btn-primary me-2 float-end"> 
              Edit </button>
      {todo.title}    </li>);}