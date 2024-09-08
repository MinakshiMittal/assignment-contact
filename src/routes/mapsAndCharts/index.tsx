import { LeafletGraph } from "./LeafletGraph";
import CovidLineGraph from "./LineGraph";

export const MapsAndCharts = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row p-10 gap-10 lg:gap-20">
      {/* Line Graph Container */}
      <div className="w-full lg:w-1/2 h-[60vh] lg:h-[50vh] p-4 bg-white  rounded-lg">
        <CovidLineGraph />
      </div>
      {/* Map Container */}
      <div className="w-full lg:w-1/2 h-[60vh] lg:h-[50vh] p-4 bg-white rounded-lg">
        <LeafletGraph />
      </div>
    </div>
  );
};
