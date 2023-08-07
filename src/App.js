import { Route, Routes } from "react-router-dom";
import EditTask from "./Component/EditTask";
import Home from "./Component/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Edit/:id" element={<EditTask />} />
      </Routes>
    </div>
  );
}

export default App;
