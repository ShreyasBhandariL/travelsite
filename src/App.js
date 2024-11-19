import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Components/MainPage";
import Places from "./Components/Places";
import Chatbot from "./Components/chatbot";
import PlaceDetails from "./Components/placeDetails";
import Footer from "./Components/Footer";
import Contact from "./Components/contact";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <MainPage />
                <Places />
                <Contact />
                <Footer />
                <Chatbot />
              </>
            }
          />
          <Route path="/place/:id" element={<PlaceDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
