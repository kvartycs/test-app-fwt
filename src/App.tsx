import { useState } from "react";
import "./App.scss";
import { Header, Filters, Gallery, Pagination } from "./components";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="App">
      <div className="container">
        <Header />
        <Filters />
        <Gallery currentPage={currentPage} />
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default App;
