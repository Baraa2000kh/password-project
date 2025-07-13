import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Components/Header";

export default function Home() {
  // passwords i need in order to Get passwords User
  const [passwords, setPasswords] = useState([]);

  // website & password I need this to Post a new Password.
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");

  // Get UserId from localStorage b.c I need link new password & website (one to many)
  const userId = localStorage.getItem("userId");

  // Get all passwords to User
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/passwords/${userId}`)
      .then((response) => {
        const formatted = response.data.map((item) => ({
          id: item._id,
          site: item.website,
          password: item.password,
          show: false,
        }));
        setPasswords(formatted);
      })
      .catch((err) => {
        console.error("Error fetching passwords:", err);
      });
  }, [userId]);

  // Post & send new Password
  const handleAddPassword = async (e) => {
    e.preventDefault();

    if (!website || !password) {
      alert("Please fill in the Website and password");
      return;
    }

    //post pass,wibsiet&UserID
    try {
      const response = await axios.post("http://localhost:8000/api/passwords", {
        userId,
        website,
        password,
      });
      //get response date new passwrd in the server
      const newPass = response.data;
      // update state Passwords to new password posted in the form
      setPasswords([
        ...passwords,
        {
          id: newPass._id,
          site: newPass.website,
          password: newPass.password,
          show: false,
        },
      ]);
      //remov valu in the form
      setWebsite("");
      setPassword("");
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Error");
    }
  };

  //this fun Toggle the show pass or hide pss
  const toggleShow = (id) => {
    setPasswords(
      passwords.map((p) => (p.id === id ? { ...p, show: !p.show } : p))
    );
  };

  return (
    <div>
      <Header />
      <div className="password-container">
        <h2 className="password-title">Saved Passwords</h2>
        <form onSubmit={handleAddPassword} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Add Password</button>
        </form>

        <table className="password-table">
          <thead>
            <tr>
              <th>Website</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {passwords.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.site}</td>
                <td>{entry.show ? entry.password : "********"}</td>
                <td>
                  <button onClick={() => toggleShow(entry.id)}>
                    {entry.show ? "Hide" : "Show"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
