import Header from "../../Components/Header";
export default function Home() {
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
        Hello to Home
      </div>
    </div>
  );
}
