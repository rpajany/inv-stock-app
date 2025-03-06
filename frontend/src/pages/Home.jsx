import React, { useState, useEffect } from 'react'

export const Home = () => {
  // Define the 5x5 grid locations (each sub-array represents a row)
  const locationValues = [
    ["R1_A1", "R1_A2", "R1_A3", "R1_A4", "R1_A5"],
    ["R1_B1", "R1_B2", "R1_B3", "R1_B4", "R1_B5"],
    ["R1_C1", "R1_C2", "R1_C3", "R1_C4", "R1_C5"],
    ["R1_D1", "R1_D2", "R1_D3", "R1_D4", "R1_D5"],
    ["R1_E1", "R1_E2", "R1_E3", "R1_E4", "R1_E5"],
  ];

  // Map to hold API data keyed by location
  const [apiDataMap, setApiDataMap] = useState({});
  // Tracks which matched locations have been "picked"
  const [pickedLocations, setPickedLocations] = useState(new Set());



  // Simulated API fetch
  useEffect(() => {
    const fetchData = async () => {
      const apiData = [
        {
          P_ID: 1,
          Rack: "R1",
          PART_NUMBER: "111-4356345",
          DESCRIPTION: "RUBBER PAD",
          STOCK_QTY: 100,
          LOCATION: "R1_A1",
          Date: "14-02-2025",
        },
        {
          P_ID: 2,
          Rack: "R1",
          PART_NUMBER: "111-2222222",
          DESCRIPTION: "COIL",
          STOCK_QTY: 50,
          LOCATION: "R1_A2",
          Date: "15-02-2025",
        },
        {
          P_ID: 2,
          Rack: "R1",
          PART_NUMBER: "111-2222222",
          DESCRIPTION: "COIL",
          STOCK_QTY: 50,
          LOCATION: "R1_A5",
          Date: "15-02-2025",
        },
        {
          P_ID: 2,
          Rack: "R1",
          PART_NUMBER: "111-555555",
          DESCRIPTION: "COIL",
          STOCK_QTY: 50,
          LOCATION: "R1_A4",
          Date: "15-02-2025",
        },
      ];

      // Create a mapping from LOCATION to the API record
      const dataMap = {};
      apiData.forEach((item) => {
        dataMap[item.LOCATION] = item;
      });
      setApiDataMap(dataMap);
    };

    fetchData();
  }, []);

  // Handler for when a button is clicked to mark the location as picked
  const markAsPicked = (location) => {
    setPickedLocations((prev) => new Set([...prev, location]));
  };



  return (
    <div className='p-4  '>
      <div className='w-auto p-2  rounded-md mb-2 border'>
        <div className='bg-gray-400 text-white p-2 rounded-md mb-2'>
          <h2 className='ml-2'>Rack - 1</h2>
        </div>



        {locationValues.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((location, colIndex) => {
              // Check if the current location exists in the API data mapping
              const isMatched = Object.prototype.hasOwnProperty.call(apiDataMap, location);
              // Set div background: blue for matched, gray for unmatched
              const divBgColor = isMatched ? "blue" : "gray";
              // If matched, get the PART_NUMBER; otherwise, display "N/A"
              const partNumber = isMatched ? apiDataMap[location].PART_NUMBER : "N/A";

              return (
                <div
                  key={colIndex}
                  className="w-24 h-24 mb-2 flex flex-col items-center justify-center rounded-lg shadow-lg text-white font-bold p-1"
                  style={{ backgroundColor: divBgColor }}
                >
                  <div>{location}</div>
                  <div className="text-xs bg-gray-300 text-green-600 p-1 rounded-sm">{partNumber}</div>
                  {/* Show the button only for matched locations */}
                  {isMatched && (
                    <button
                      onClick={() => markAsPicked(location)}
                      className={`mt-2 px-2 py-1 rounded ${pickedLocations.has(location)
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-black"
                        }`}
                    >
                      {pickedLocations.has(location) ? "Picked" : "Pick"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
