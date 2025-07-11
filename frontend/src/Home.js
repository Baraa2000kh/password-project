import Header from "./Components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">Welcome to the Home Page</h1>
        </div>
      </div>
    </div>
  );
}
