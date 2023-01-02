import List from "./Components/List";
import AddTodo from "./Components/AddTodo";
import Title from "./Components/Title";
import "./assets/scss/App.scss";

function App() {
  return (
    <>
      <Title/>
      <AddTodo/>
      <List/>
    </>
    
  );
}

export default App;