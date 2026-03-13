import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";   // ✅ ADD THIS LINE
import Home from "./pages/Home.jsx";
import EmailConfirmed from "./pages/EmailConfirmed.jsx";
import ReportItem from "./pages/ReportItem";
import ItemDetails from "./pages/ItemDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email-confirmed" element={<EmailConfirmed />} />
        <Route path="/home" element={<Home />} />
        <Route path="/report" element={<ReportItem />} />
        <Route path="/item/:id" element={<ItemDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
