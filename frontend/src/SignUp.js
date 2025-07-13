import { useState } from "react";
import axios from "axios";
import Header from "./Components/Header";

export default function SignUp() {
  // useState with name,email,pass & passR to post data to severe in whith form and save new user in db
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  // use emailError to respons data in the sever any error with email or pass
  const [errorMsg, setErrorMsg] = useState("");
  // accept tracking the user click the submint to show errors if found
  const [accept, setAccept] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); //Page reload is prohibited.
    setAccept(true);
    setErrorMsg("");

    //Verify data before submitting
    const isValid =
      name.trim() !== "" && password.length >= 8 && password === passwordR;
    if (!isValid) return;
    //Send the request  name , email , pass , pass confirmation with post to the server
    try {
      const res = await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
        password_confirmation: passwordR,
      });
      //chiek the responts in the server and print error if found
      if (res.status === 200) {
        alert("Registration successful!");
        localStorage.setItem("email", email);
        window.location.pathname = "/";
      }
    } catch (err) {
      if (err.response?.status === 422) {
        setErrorMsg("Email is already in use.");
      } else if (err.response?.status === 400) {
        setErrorMsg("Passwords do not match.");
      } else {
        setErrorMsg("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2 className="auth-header">Register</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
          />
          {accept && name.trim() === "" && (
            <p className="auth-error">Name is required</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          {accept && password.length < 8 && (
            <p className="auth-error">Password must be at least 8 characters</p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordR}
            onChange={(e) => setPasswordR(e.target.value)}
            className="auth-input"
          />
          {accept && password !== passwordR && (
            <p className="auth-error">Passwords do not match</p>
          )}

          {errorMsg && <p className="auth-error">{errorMsg}</p>}

          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
