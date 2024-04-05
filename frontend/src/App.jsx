import { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`)
      .then((res) => {
        console.log(res.data);
        setUsersData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {usersData &&
        usersData?.map((user) => <p key={user.id}>{user.first_name}</p>)}
    </div>
  );
}

export default App;
