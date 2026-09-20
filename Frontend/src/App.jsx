import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/login-page/LoginPage"
import HomePage from "./pages/home-page/HomePage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App