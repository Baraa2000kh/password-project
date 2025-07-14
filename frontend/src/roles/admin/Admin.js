import axios from "axios";
import Header from "../../Components/Header";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  //this to save data in formted to users
  const [users, setUsers] = useState([]);
  //get users from the server
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users`)
      .then((response) => {
        //save data to frmatted obj
        const formatted = response.data.map((item) => ({
          id: item._id,
          name: item.name,
          email: item.email,
        }));
        //save to user obj
        setUsers(formatted);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]);
      });
  }, []);

  return (
    <div>
      <Header />
      <div
        style={{
          maxWidth: "600px",
          margin: "40px auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          fontFamily: "sans-serif",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Admin Dashboard</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                Name
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #eee" }}
                  >
                    {user.name}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #eee" }}
                  >
                    {user.email}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
