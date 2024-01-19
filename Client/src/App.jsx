import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterTicket from "./pages/RegisterTicket";
import RegisterAgent from "./pages/RegisterAgent";

function App() {
  return (
    //Setting up Router Environment
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterTicket />} />
        <Route path="/supportAgent" element={<RegisterAgent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
