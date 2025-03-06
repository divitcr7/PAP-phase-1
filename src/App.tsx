import { Route, Routes } from "react-router";
// import { useContext } from "react";
// import { AuthContext } from "./context/authContext";
import Header from "./components/common/Header/Header";
import Subscribe from "./pages/Subscribe";

function App() {
  // const { isNewUser } = useContext(AuthContext);
  const isNewUser = true;

  if (isNewUser) {
    return <Subscribe />; // If new user, show WelcomePage only
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<>home</>} />
        <Route path="about" element={<>about</>} />
        <Route path="contact" element={<>contact</>} />
      </Routes>
    </>
  );
}

export default App;
