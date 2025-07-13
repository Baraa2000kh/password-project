import { Link } from "react-router-dom";

export default function Header() {
  const email = localStorage.getItem("email");
  //logout function
  function handleLogOut() {
    window.localStorage.removeItem("email");
    window.localStorage.getItem("userId");
    window.location.pathname = "/";
  }
  //Check user status
  const isLoggedIn = window.localStorage.getItem("email");

  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/" className="header-link">
          Home
        </Link>
        <Link to="/Password" className="header-link">
          Password Management
        </Link>
        <Link to="/about" className="header-link">
          About
        </Link>
      </div>

      <div className="header-right">
        {/* The !isLoggedIn condition checks if the user is not logged in to show them the Register and login  or LogOut links.*/}
        {!isLoggedIn ? (
          <>
            <Link to="/register" className="header-link">
              Register
            </Link>
            <Link to="/login" className="header-link">
              Login
            </Link>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <p> Welcam {email}</p>
            <button onClick={handleLogOut} className="logout-btn">
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
