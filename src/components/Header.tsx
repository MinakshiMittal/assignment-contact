import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-purple-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          {location.pathname.includes("/maps-and-charts")
            ? "Maps and Charts"
            : "Contacts"}
        </h1>
      </div>
    </header>
  );
};
