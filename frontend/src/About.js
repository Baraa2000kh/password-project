import Header from "./Components/Header";
export default function About() {
  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          height: "100vh",
        }}
      >
        Hello to About
      </div>
    </div>
  );
}
