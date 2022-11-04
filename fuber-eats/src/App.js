import './App.css';
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Delivery from "./pages/Delivery";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Home /> */}
      <Routes>
        {/* <Delivery/> */}
        <Route
          path="/"
          element={
            <Home
              style={{
                backgroundImage:
                  "url(https://files.slack.com/files-pri/T0351JZQ0-F04900ZRTSB/fast-food.png)",
              }}
            />
          }
        />
        <Route path="/delivery" element={<Delivery />} />
      </Routes>
    </div>
  );
}

export default App;
