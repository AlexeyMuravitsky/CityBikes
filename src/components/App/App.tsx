import { BrowserRouter, Routes, Route } from "react-router-dom";
import NetworksList from "../NetworksList/NetworksList";
import Favorites from "../Favorites/Favorites";
import NotFound from "../NotFound/NotFound";
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NetworksList />} />
        <Route path="/favorites/" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
