import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Contacts } from "./routes/contacts/Contacts";
import { MapsAndCharts } from "./routes/mapsAndCharts";

function App() {
  return (
    <div className="h-screen w-full flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4">
          <Routes>
            <Route path="/" element={<Contacts />} />
            <Route path="/maps-and-charts" element={<MapsAndCharts />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
