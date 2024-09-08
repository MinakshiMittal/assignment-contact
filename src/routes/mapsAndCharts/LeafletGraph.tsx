import axios from "axios";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useQuery } from "react-query";
import "tailwindcss/tailwind.css";

// Define interfaces for the API responses
interface CountryData {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
  };
  cases: number;
  deaths: number;
  recovered: number;
}

interface GlobalData {
  cases: number;
  deaths: number;
  recovered: number;
}

// Fetch global data
const fetchGlobalData = async (): Promise<GlobalData> => {
  const response = await axios.get<GlobalData>(
    "https://disease.sh/v3/covid-19/all"
  );
  return response.data;
};

// Fetch country data
const fetchCountryData = async (): Promise<CountryData[]> => {
  const response = await axios.get<CountryData[]>(
    "https://disease.sh/v3/covid-19/countries"
  );
  return response.data;
};

export const LeafletGraph = () => {
  const { data: globalData } = useQuery("globalData", fetchGlobalData);
  const {
    data: countryData,
    isLoading,
    error,
  } = useQuery("countryData", fetchCountryData);

  if (isLoading)
    return <p className="text-center mt-4 text-gray-600">Loading data...</p>;
  if (error)
    return <p className="text-center mt-4 text-red-500">Error fetching data</p>;

  const markerIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <div className="relative">
        <MapContainer
          center={[0, 20]}
          zoom={3}
          className="w-full h-[70vh] md:h-[60vh] rounded-md overflow-hidden shadow-md"
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {countryData?.map((country) => (
            <Marker
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
              icon={markerIcon}
            >
              <Popup>
                <div className="text-sm text-gray-700">
                  <strong className="text-lg">{country.country}</strong>
                  <br />
                  <span className="text-blue-600">Active Cases:</span>
                  {country.cases - (country.deaths + country.recovered)}
                  <br />
                  <span className="text-green-600">Recovered:</span>
                  {country.recovered}
                  <br />
                  <span className="text-red-600">Deaths:</span> {country.deaths}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Global Cases:
          <span className="font-bold text-blue-600">
            {globalData?.cases.toLocaleString()}
          </span>
        </p>
        <p className="text-gray-600">
          Recovered:
          <span className="font-bold text-green-600">
            {globalData?.recovered.toLocaleString()}
          </span>
        </p>
        <p className="text-gray-600">
          Deaths:
          <span className="font-bold text-red-600">
            {globalData?.deaths.toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};
