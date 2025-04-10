import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingScreen from "./components/common/LoadingScreen";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer";

const Home = lazy(() => import("./pages/Home"));
const Subscribe = lazy(() => import("./pages/Subscribe"));
const PropertyDetailsPage = lazy(() => import("./pages/Property"));
const PropertyList = lazy(() => import("./pages/PropertiesList"));

function App() {
  const isNewUser = false;

  if (isNewUser) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Subscribe />
      </Suspense>
    );
  }

  return (
    <>
      <ErrorBoundary>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Home />
              </Suspense>
            }
          />
          <Route path="about" element={<>about</>} />
          <Route path="contact" element={<>contact</>} />
          <Route
            path=":propertyName"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <PropertyList />
              </Suspense>
            }
          />
          <Route
            path=":propertyName/:unitTitle"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <PropertyDetailsPage />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </ErrorBoundary>
    </>
  );
}

export default App;
