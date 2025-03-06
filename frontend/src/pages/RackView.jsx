import React, { useState, useEffect } from 'react';
import { Load_MasterList, Save_Transaction_Service } from '../services/RackViewService';

// css properties
const label_css = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
const input_css = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';

export const RackView = ({ searchApi, setSearchValue, TranType }) => {


    // State for API data and mapping (by Location)
    const [masterData, setMasterData] = useState([]);
    const [pickData, setPickData] = useState([]);

    // Tracks which matched locations have been "picked"
    const [pickedLocations, setPickedLocations] = useState(new Set());

    // State for modal
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


    // load Master location...
    const Load_MasterData = async () => {
        // const data = [
        //     {
        //         M_ID: 1,
        //         Rack: "R1",
        //         Part_Number: "111-4356345",
        //         Description: "RUBBER PAD",
        //         Stock_Qty: 100,
        //         Location: "R1_A1",
        //         Date: "14-02-2025",
        //     },
        //     {
        //         M_ID: 7,
        //         Rack: "R1",
        //         Part_Number: "111-4356345",
        //         Description: "RUBBER PAD",
        //         Stock_Qty: 100,
        //         Location: "R1_A2",
        //         Date: "14-02-2025",
        //     },
        //     {
        //         M_ID: 8,
        //         Rack: "R1",
        //         Part_Number: "111-4356345",
        //         Description: "RUBBER PAD",
        //         Stock_Qty: 100,
        //         Location: "R1_A3",
        //         Date: "14-02-2025",
        //     },
        //     {
        //         M_ID: 9,
        //         Rack: "R1",
        //         Part_Number: "111-4356345",
        //         Description: "RUBBER PAD",
        //         Stock_Qty: 100,
        //         Location: "R1_A4",
        //         Date: "14-02-2025",
        //     },
        //     {
        //         M_ID: 10,
        //         Rack: "R1",
        //         Part_Number: "111-4356345",
        //         Description: "RUBBER PAD",
        //         Stock_Qty: 100,
        //         Location: "R1_A5",
        //         Date: "14-02-2025",
        //     },
        //     {
        //         M_ID: 1,
        //         Rack: "R1",
        //         Part_Number: "111-4356345",
        //         Description: "RUBBER PAD",
        //         Stock_Qty: 100,
        //         Location: "R1_B1",
        //         Date: "14-02-2025",
        //     },
        //     {
        //         M_ID: 7,
        //         Rack: "R1",
        //         Part_Number: "111-4356345",
        //         Description: "RUBBER PAD",
        //         Stock_Qty: 100,
        //         Location: "R1_B2",
        //         Date: "14-02-2025",
        //     },
        //     {
        //         M_ID: 8,
        //         Rack: "R1",
        //         Part_Number: "111-4356345",
        //         Description: "RUBBER PAD",
        //         Stock_Qty: 100,
        //         Location: "R1_B3",
        //         Date: "14-02-2025",
        //     },
        //     {
        //         M_ID: 9,
        //         Rack: "R1",
        //         Part_Number: "111-4356345",
        //         Description: "RUBBER PAD",
        //         Stock_Qty: 100,
        //         Location: "R1_B4",
        //         Date: "14-02-2025",
        //     },
        //     {
        //         M_ID: 10,
        //         Rack: "R1",
        //         Part_Number: "111-4356345",
        //         Description: "RUBBER PAD",
        //         Stock_Qty: 100,
        //         Location: "R1_B5",
        //         Date: "14-02-2025",
        //     },

        //     {
        //         M_ID: 2,
        //         Rack: "R2",
        //         Part_Number: "1",
        //         Description: "COIL",
        //         Stock_Qty: 50,
        //         Location: "R2_A1",
        //         Date: "15-02-2025",
        //     },
        //     {
        //         M_ID: 2,
        //         Rack: "R2",
        //         Part_Number: "2",
        //         Description: "COIL",
        //         Stock_Qty: 50,
        //         Location: "R2_A2",
        //         Date: "15-02-2025",
        //     },
        //     {
        //         M_ID: 2,
        //         Rack: "R2",
        //         Part_Number: "3",
        //         Description: "COIL",
        //         Stock_Qty: 50,
        //         Location: "R2_A3",
        //         Date: "15-02-2025",
        //     },

        //     {
        //         M_ID: 2,
        //         Rack: "R2",
        //         Part_Number: "4",
        //         Description: "COIL",
        //         Stock_Qty: 50,
        //         Location: "R2_A4",
        //         Date: "15-02-2025",
        //     },
        //     {
        //         M_ID: 2,
        //         Rack: "R2",
        //         Part_Number: "5",
        //         Description: "COIL",
        //         Stock_Qty: 50,
        //         Location: "R2_A4",
        //         Date: "15-02-2025",
        //     },
        //     {
        //         M_ID: 4,
        //         Rack: "R3",
        //         Part_Number: "111-3333",
        //         Description: "COIL3",
        //         Stock_Qty: 50,
        //         Location: "R3_A5",
        //         Date: "15-02-2025",
        //     },
        // ];
        const data = await Load_MasterList();
        setMasterData(data);


    };

    // Simulated API fetch
    useEffect(() => {

        const pickMaterial_Mapping = async () => {
            try {
                // const data = [
                //     {
                //         PK_ID: 1,
                //         Rack: "R1",
                //         Part_Number: "111-4356345",
                //         Description: "RUBBER PAD",
                //         Pick_Qty: 5,
                //         Location: "R1_A1",
                //         Date: "14-02-2025",
                //     },
                //     {
                //         PK_ID: 7,
                //         Rack: "R1",
                //         Part_Number: "111-4356345",
                //         Description: "RUBBER PAD",
                //         Pick_Qty: 2,
                //         Location: "R1_A2",
                //         Date: "14-02-2025",
                //     },

                //     {
                //         PK_ID: 2,
                //         Rack: "R2",
                //         Part_Number: "111-2222222",
                //         Description: "COIL",
                //         Pick_Qty: 1,
                //         Location: "R2_A1",
                //         Date: "15-02-2025",
                //     },


                // ];

                // Build a mapping from Location to its API record for quick lookup
                if (searchApi !== '') {
                    const data = searchApi;
                    const mapping = {};
                    data.forEach((record) => {
                        mapping[record.Location] = record;
                    });
                    setPickData(mapping);
                }


            } catch (error) {

            }
        }



        pickMaterial_Mapping();
        Load_MasterData();

    }, [searchApi]);


    // console.log('masterData :', masterData)

    // Group API data by Rack
    const groupedData = masterData.reduce((acc, record) => {
        const { Rack } = record; // extracts the Rack property using destructuring
        if (!acc[Rack]) {
            acc[Rack] = []; // If the key does not exist, it initializes that key with an empty array 
        }

        acc[Rack].push(record); // Add the Record is then pushed into the array corresponding to that Rack:

        return acc; // Return the Accumulator

    }, {}); // initial value of an empty object 

    // console.log('groupedData :', groupedData)
    // console.log('selectedRecord :', selectedRecord)



    // Open modal for a given record
    const openModal = (record) => {
        setSelectedRecord(record);
        setModalOpen(true);
    };

    // Close modal and reset selected record
    const closeModal = () => {
        setSearchValue(""); // clear search textbox on success
        setModalOpen(false);
        setSelectedRecord(null);
    };

    const handle_ModalChange = (e) => {

        const { name, value } = e.target;
        console.log('name', name)
        console.log('value', value)

        setSelectedRecord((prev) => ({
            ...prev,
            [name]: value,
        }));


    };


    console.log('selectedRecord :', selectedRecord)

    // Handler for submitting (saving) the picked record to backend
    const handleSubmit = async () => {
        if (!selectedRecord) return;



        setIsSubmitting(true);
        try {
            // Simulate API call delay (replace with your API call)
            // await new Promise((resolve) => setTimeout(resolve, 1000));


            const result = await Save_Transaction_Service(selectedRecord);




            // On success, mark the location as picked
            setPickedLocations((prev) => new Set([...prev, selectedRecord.Location]));

            closeModal();

            await Load_MasterData(); // reload masterList

        } catch (error) {
            console.error("Error saving data:", error);
            // Optionally, handle error (e.g., display a message)
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className=" p-4 grid grid-cols-3 gap-2">
                {Object.entries(groupedData).map(([rack, records]) => (
                    <div key={rack} className=" h-full border-2 border-sky-300 rounded-md">
                        <div className="bg-sky-300 px-2">
                            <h5 className="text-2xl font-bold mb-2">Rack - {rack}</h5>
                        </div>

                        <div className="  grid grid-cols-5 gap-2 p-1">
                            {records.map((record) => {
                                const isMatched = pickData[record.Location]; // Check if Location exists in pickData

                                const selectedRecord = {
                                    ...record, // Spread existing masterData fields
                                    //PK_ID: isMatched ? isMatched.PK_ID : null, // Add P_ID if exists
                                    // Pick_Qty: isMatched ? isMatched.Pick_Qty : null, // Add Pick_Qty if exists
                                    Type: TranType, // INWARD / OUTWARD
                                    Transact_Qty: 1,
                                };

                                return (
                                    <div
                                        // style={{ width: "150px", height: "100px"}}
                                        key={record.M_ID}
                                        className={` ${isMatched ? "bg-blue-600" : "bg-gray-400"
                                            } text-white   p-2 rounded-md text-center W-32 H-20`}
                                    >
                                        <div>{record.Location}</div>
                                        <div className="text-xs bg-white text-black rounded-sm">{record.Part_Number}</div>

                                        {isMatched && (
                                            <button
                                                onClick={() => openModal(selectedRecord)}
                                                disabled={pickedLocations.has(record.Location)}
                                                className={`mt-2 px-2 py-1 rounded text-sm sm:text-base md:text-lg lg:text-xl w-full sm:w-auto ${pickedLocations.has(record.Location)
                                                    ? "bg-green-500 text-white cursor-not-allowed"
                                                    : "bg-yellow-500 text-black"
                                                    }  transition duration-300 ease-in-out transform hover:scale-105 disabled:hover:scale-100`}
                                            >
                                                {pickedLocations.has(record.Location) ? "Picked" : "Pick"}
                                            </button>
                                        )}

                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Modal */}
                {modalOpen && selectedRecord && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
                        <div className="bg-white   rounded-md  shadow-lg w-80">
                            <div className="bg-gray-400 text-white px-2 py-1 rounded-t-md flex justify-between items-center">
                                <span className="text-xl font-bold ">{TranType.toLowerCase()} Details</span>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-2 rounded  text-xl  bg-slate-500 text-white text-center"
                                    disabled={isSubmitting}
                                >
                                    x
                                </button>
                            </div>

                            <div className="px-3 mb-3 mt-2">

                                <form>
                                    <div className="mb-2">
                                        <strong>MS_ID:</strong> {selectedRecord.MS_ID}
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
                                    {/* <div className="mb-2">
                                    <strong>Date :</strong> {selectedRecord.Date}
                                </div> */}

                                    {/* <div className="mb-2">
                                    <strong>Pick Qty :</strong> {selectedRecord.Pick_Qty}
                                </div> */}

                                    <div className="mb-4 bg-yellow-400 px-3 py-2   rounded-md">
                                        <span htmlFor="Transact_Qty" className={`mr-2 text-lg`}>Enter Transact_Qty :</span>
                                        <input
                                            type="number"
                                            id="Transact_Qty"
                                            name="Transact_Qty"

                                            onChange={handle_ModalChange}
                                            value={selectedRecord.Transact_Qty}
                                            min="1"
                                            required
                                            className={`${input_css} w-full`} />
                                    </div>


                                    <div className="flex justify-end gap-2">

                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            className={`px-4 py-2 rounded ${isSubmitting || selectedRecord.Transact_Qty < 1 ? "bg-gray-400" : "bg-blue-500 text-white"
                                                }`}
                                            disabled={isSubmitting || selectedRecord.Transact_Qty < 1}
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit"}
                                        </button>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
