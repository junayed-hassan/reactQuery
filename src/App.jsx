import CreateUsers from "./components/CreateUsers";
import UserDetails from "./components/UserDetails";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="flex gap-5 m-4">
      <CreateUsers/>
      <UserList/>
      <UserDetails id={1}/>
    </div>
  );
}

export default App;
