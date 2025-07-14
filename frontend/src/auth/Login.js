import { useState } from "react";
import axios from "axios";
import Header from "../Components/Header";

export default function Login() {
  //Use useState to email , password to post to sevrer date
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // use emailError to respons data in the sever any error with email
  const [emailError, setEmailError] = useState(null);
  // accept tracking the user click the submint to show errors if found
  const [accept, setAccept] = useState(false);

  async function Submit(e) {
    e.preventDefault(); //Prevent page reload
    setAccept(true);
    setEmailError(null);
    //stop fun if passord less then 8 numbers or char
    if (password.length < 8) return;

    //Send data to the server use post
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });

      //If login is successful, the email & userId is saved to localStorage, and the user is directed to the home page.
      if (res.status === 200) {
        window.localStorage.setItem("userId", res.data.userId);
        window.localStorage.setItem("email", email);
        window.localStorage.setItem("isAdmin", res.data.isAdmin);
        window.location.pathname = "/";
      }
      //If login fails, an error code (e.g. 401 or 400) is stored.
    } catch (err) {
      setEmailError(err.response?.status);
    }
  }

  return (
    <div>
      <Header />
      <div className="auth-container">
        <form onSubmit={Submit} className="auth-form">
          <h2 className="auth-header">Login</h2>

          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />

          {accept && (emailError === 401 || emailError === 400) && (
            <p className="auth-error">Incorrect email or password</p>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />

          {password.length < 8 && accept && (
            <p className="auth-error">
              Password must be more than 8 characters
            </p>
          )}

          <div className="auth-submit">
            <button type="submit" className="auth-button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
