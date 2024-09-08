import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="lg:w-1/12 w-full bg-white flex lg:flex-col lg:justify-start  lg:items-center items-center border-r shadow-md lg:px-0 px-2 py-4 gap-4 lg:gap-0 lg:space-y-2 font-semibold text-sm text-purple-600">
      <a className="cursor-pointer" href='/'>
        Contacts
      </a>

      <a
        className="cursor-pointer"
        href='/maps-and-charts' >
        Maps & Charts
      </a>
    </div>
  );
};
