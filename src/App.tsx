import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import LoadingScreen from "./components/common/LoadingScreen";
// import { useContext } from "react";
// import { AuthContext } from "./context/authContext";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer";

// Lazy-load components
const Home = lazy(() => import("./pages/Home"));
const Subscribe = lazy(() => import("./pages/Subscribe"));

function App() {
  // const { isNewUser } = useContext(AuthContext);
  const isNewUser = false;

  if (isNewUser) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Subscribe />
      </Suspense>
    ); // If new user, show WelcomePage only
  }

  return (
    <>
      <Header />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<>about</>} />
          <Route path="contact" element={<>contact</>} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
