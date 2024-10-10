import { BrowserRouter, Routes, Route } from "react-router-dom";
import GradientDarkLandingPage from "./components/LandingPage";
import AuthComponent from "./components/Auth";
import ListingPage from "./components/ListingPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GradientDarkLandingPage />} />{" "}
        <Route path="/properties" element={<ListingPage />} />{" "}
        <Route path="/auth" element={<AuthComponent />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
