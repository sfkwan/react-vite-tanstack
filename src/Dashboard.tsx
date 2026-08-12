import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {users.map((user) => (
          <Link to={`/dashboard/${user.id}`} key={user.id}>
            <h1>{user.name}</h1>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
