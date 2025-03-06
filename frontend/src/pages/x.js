import React, { useState, useEffect } from 'react'

export const RackView = () => {
    // Helper function: Generate a 5x5 grid of locations for a given rack (e.g., "R1" or "R2")
    const getLocationsForRack = (rack) => {
        const rows = ["A", "B", "C", "D", "E"];
        const cols = [1, 2, 3, 4, 5];
        return rows.map((letter) =>
            cols.map((num) => `${rack}_${letter}${num}`)
        );
    };

    // State for API data and mapping (by Location)
    const [apiData, setApiData] = useState([]);
    const [apiDataMap, setApiDataMap] = useState({});

    // Tracks which locations have been picked
    const [pickedLocations, setPickedLocations] = useState(new Set());

    // State for modal
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


    // Simulated API fetch
    useEffect(() => {
        const fetchData = async () => {
            const data = [
                {
                    P_ID: 1,
                    Rack: "R1",
                    Part_Number: "111-4356345",
                    Description: "RUBBER PAD",
                    Stock_Qty: 100,
                    Location: "R1_A1",
                    Date: "14-02-2025",
                },
                {
                    P_ID: 2,
                    Rack: "R2",
                    Part_Number: "111-2222222",
                    Description: "COIL",
                    Stock_Qty: 50,
                    Location: "R2_A1",
                    Date: "15-02-2025",
                },

                {
                    P_ID: 4,
                    Rack: "R3",
                    Part_Number: "111-3333",
                    Description: "COIL3",
                    Stock_Qty: 50,
                    Location: "R3_A5",
                    Date: "15-02-2025",
                },
            ];
            setApiData(data);

            // Build a mapping from Location to its API record for quick lookup
            const mapping = {};
            data.forEach((record) => {
                mapping[record.Location] = record;
            });
            setApiDataMap(mapping);
        };

        fetchData();
    }, []);

    // Get unique racks from the API data (e.g., ["R1", "R2"])
    const uniqueRacks = Array.from(new Set(apiData.map((record) => record.Rack)));

    // Open modal for a given record
    const openModal = (record) => {
        setSelectedRecord(record);
        setModalOpen(true);
    };

    // Close modal and reset selected record
    const closeModal = () => {
        setModalOpen(false);
        setSelectedRecord(null);
    };

    // Handler for submitting (saving) the picked record to backend
    const handleSubmit = async () => {
        if (!selectedRecord) return;
        setIsSubmitting(true);
        try {
            // Simulate API call delay (replace with your API call)
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // On success, mark the location as picked
            setPickedLocations((prev) => new Set([...prev, selectedRecord.Location]));
            closeModal();
        } catch (error) {
            console.error("Error saving data:", error);
            // Optionally, handle error (e.g., display a message)
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 grid grid-cols-3 gap-4">
            {uniqueRacks.map((rack) => {
                // Generate the 5x5 grid for the current rack
                const grid = getLocationsForRack(rack);
                return (
                    <div key={rack} className="mb-8 border-2 border-gray-800 rounded-md">

                        <div className="flex flex-col gap-2">
                            <h2 className="px-2 py-1 text-xl font-bold mb-2 bg-gray-500 text-white">Rack - {rack}</h2>
                            {grid.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex gap-2 p-1">
                                    {row.map((location, colIndex) => {
                                        // Check if an API record exists for this location
                                        const isMatched = Object.prototype.hasOwnProperty.call(apiDataMap, location);
                                        // Background color: blue if matched, gray otherwise
                                        const divBgColor = isMatched ? "blue" : "gray";
                                        // Display Part_Number if available, else "N/A"
                                        const partNumber = isMatched ? apiDataMap[location].Part_Number : "N/A";

                                        return (
                                            <div
                                                key={colIndex}
                                                className="w-24 h-24 flex flex-col items-center justify-center rounded-lg shadow-lg text-white font-bold p-1"
                                                style={{ backgroundColor: divBgColor }}
                                            >
                                                <div>{location}</div>
                                                <div className="text-xs">{partNumber}</div>
                                                {isMatched && (
                                                    <button
                                                        type="button"
                                                        onClick={() => openModal(apiDataMap[location])}
                                                        disabled={pickedLocations.has(location)}
                                                        className={`mt-2 px-2 py-1 rounded ${pickedLocations.has(location)
                                                            ? "bg-green-500 text-white cursor-not-allowed"
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
                );
            })}

            {/* Modal */}
            {modalOpen && selectedRecord && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                        <h3 className="text-xl font-bold mb-4">Record Details</h3>
                        <div className="mb-2">
                            <strong>P_ID:</strong> {selectedRecord.P_ID}
                        </div>
                        <div className="mb-2">
                            <strong>Rack:</strong> {selectedRecord.Rack}
                        </div>
                        <div className="mb-2">
                            <strong>Part Number:</strong> {selectedRecord.Part_Number}
                        </div>
                        <div className="mb-2">
                            <strong>Description:</strong> {selectedRecord.Description}
                        </div>
                        <div className="mb-2">
                            <strong>Stock Qty:</strong> {selectedRecord.Stock_Qty}
                        </div>
                        <div className="mb-2">
                            <strong>Location:</strong> {selectedRecord.Location}
                        </div>
                        <div className="mb-4">
                            <strong>Date:</strong> {selectedRecord.Date}
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 rounded bg-gray-300 text-black"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className={`px-4 py-2 rounded ${isSubmitting ? "bg-gray-400" : "bg-blue-500 text-white"
                                    }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
