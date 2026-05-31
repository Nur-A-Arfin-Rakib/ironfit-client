import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import PrivateRoute from "./routes/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Trainers from "./pages/Trainers/Trainers";
import TrainerDetails from "./pages/TrainerDetails/TrainerDetails";
import AddTrainer from "./pages/AddTrainer/AddTrainer";
import MyTrainers from "./pages/MyTrainers/MyTrainers";
import MyBookings from "./pages/MyBookings/MyBookings";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trainers" element={<Trainers />} />
                <Route path="/trainers/:id" element={<PrivateRoute><TrainerDetails /></PrivateRoute>} />
                <Route path="/add-trainer" element={<PrivateRoute><AddTrainer /></PrivateRoute>} />
                <Route path="/my-trainers" element={<PrivateRoute><MyTrainers /></PrivateRoute>} />
                <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
