import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AppRoute from "./routes/AppRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <AppRoute />
      </main>
      <Footer />
    </>
  );
};

export default App;
