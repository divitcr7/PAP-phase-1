import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingScreen from "./components/common/LoadingScreen";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer";
import { AuthProvider } from "./context/AuthContext";

const Home = lazy(() => import("./pages/Home"));
const Subscribe = lazy(() => import("./pages/Subscribe"));
const PropertyDetailsPage = lazy(() => import("./pages/Property"));
const PropertyList = lazy(() => import("./pages/PropertiesList"));
const Properties = lazy(() => import("./pages/Properties"));
const ContactPage = lazy(() => import("./pages/ContactUs"));
const AboutPage = lazy(() => import("./pages/AboutUs"));

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
    <AuthProvider>
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="about-us"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    <AboutPage />
                  </Suspense>
                }
              />
              <Route
                path="contact-us"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    <ContactPage />
                  </Suspense>
                }
              />
              <Route
                path="properties"
                element={
                  <Suspense fallback={<LoadingScreen />}>
                    <Properties />
                  </Suspense>
                }
              />
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
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
