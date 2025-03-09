import { Route, Routes } from "react-router";
// import { useContext } from "react";
// import { AuthContext } from "./context/authContext";
import Header from "./components/common/Header/Header";
import Subscribe from "./pages/Subscribe";
import Home from "./pages/Home";
import Footer from "./components/common/Footer";

function App() {
  // const { isNewUser } = useContext(AuthContext);
  const isNewUser = false;

  if (isNewUser) {
    return <Subscribe />; // If new user, show WelcomePage only
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<>about</>} />
        <Route path="contact" element={<>contact</>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
