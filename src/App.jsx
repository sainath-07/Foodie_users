import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./page/navigation";
import FirmCollection from "./components/FirmCollection";

const App = () => {
  

  return (
    <>
      
        <Routes>
          <Route path="/" element={<Navigation />} />
          <Route
            path="/products/:frimName/:firmId/:area"
            element={<FirmCollection />}
          />
        </Routes>
    </>
  );
};

export default App;
