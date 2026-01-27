import Navbar from "./components/Navbar";
import AppRoute from "./routes/AppRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <AppRoute />
      </main>
    </>
  );
};

export default App;
