import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, deleteTodo } from "../redux/todoslice";
import "../assets/scss/list-todo.scss";

export default function List() {
  const { data, error, loading } = useSelector((state) => state.todos);
  const completed = data?.filter(todo => todo.completed);
  const incompleted = data?.filter(todo => !todo.completed);
  const dispatch = useDispatch();

  const remove = (id) => {
    dispatch(deleteTodo(id));
  };

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <>
      <ul>
        {data?.length > 0 &&
          data?.map((todo, index) => (
            <li className="todo-item" key={index}>
              <input
                type="checkbox"
                checked={todo?.completed}
                readOnly={true}
              />
              <span className="todo-name">{todo?.title}</span>
              <span className="delete-icon" onClick={() => remove(todo?.id)}>
                <svg
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M800 256h-576a30.08 30.08 0 0 0-32 32 30.08 30.08 0 0 0 32 32H256v576a64 64 0 0 0 64 64h384a64 64 0 0 0 64-64V320h32a30.08 30.08 0 0 0 32-32 30.08 30.08 0 0 0-32-32zM448 799.36a33.28 33.28 0 0 1-64 0v-384a33.28 33.28 0 0 1 64 0z m192 0a33.28 33.28 0 0 1-64 0v-384a33.28 33.28 0 0 1 64 0zM800 128H640v-32a32.64 32.64 0 0 0-32-32h-192a32 32 0 0 0-32 32V128H224a30.08 30.08 0 0 0-32 32 30.08 30.08 0 0 0 32 32h576a30.08 30.08 0 0 0 32-32 30.08 30.08 0 0 0-32-32z" />
                </svg>
              </span>
            </li>
          ))}
      </ul>
      {data?.length > 0 ? (
        <>
          <p style={{ marginTop: "10px" }}>
            Count: <strong>{data?.length}</strong>
          </p>
          <p style={{ marginTop: "10px" }}>
            Completed: <strong style={{ color: "green" }}>{completed?.length}</strong>
          </p>
          <p style={{ marginTop: "10px" }}>
            Incompleted: <strong style={{ color: "gray" }}>{incompleted?.length}</strong>
          </p>
        </>
      ) : (
        <p style={{ textAlign: "center" }}>Todolist not found..!</p>
      )}
      {loading && <p style={{ textAlign: "center" }}>loading..</p>}
      {error && (
        <p style={{ textAlign: "center", color: "red" }}>{error?.message}</p>
      )}
    </>
  );
}
