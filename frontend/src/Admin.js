import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const dummyUsers = [
      { id: 1, name: "Baraa", email: "baraa@example.com" },
      { id: 2, name: "Ayser", email: "Ayser@example.com" },
      { id: 3, name: "Omar", email: "omar@example.com" },
    ];
    setUsers(dummyUsers);
  }, []);

  return (
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
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
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
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {user.name}
                </td>
                <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                  {user.email}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: "center", padding: "20px" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
