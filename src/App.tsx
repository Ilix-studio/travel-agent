import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./mainComponents/HomePage/Home";
import { Destinations } from "./mainComponents/Admin/Destination";
import { AdminDashboard } from "./mainComponents/Admin/AdminDashboard";
import DriverForm from "./mainComponents/User/DriverForm";
import { PlanTrips } from "./mainComponents/Important/PlanTrips";
import VehicleForm from "./mainComponents/Important/VehicleForm";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/destinations' element={<Destinations />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/driver' element={<DriverForm />} />
        <Route path='/trips' element={<PlanTrips />} />
        <Route path='/vehicle' element={<VehicleForm />} />
      </Routes>
    </>
  );
};

export default App;
