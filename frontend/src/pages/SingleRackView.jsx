import React, { useEffect, useState } from 'react'
import { Load_RackData_Service } from '../services/SingleRackService';
import { Load_MasterList, Save_Transaction_Service } from '../services/RackViewService';


// css properties
const label_css = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
const input_css = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';


export const SingleRackView = ({ searchApi, setSearchValue, TranType }) => {


    const [rackData, setRackData] = useState([]);
    // const [selectedItem, setSelectedItem] = useState(null); // To store selected item
    // const [pickedItems, setPickedItems] = useState(new Set()); // Store picked items

    // Tracks which matched locations have been "picked"
    const [pickedLocations, setPickedLocations] = useState(new Set());

    // State for modal
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null); // save record
    const [isSubmitting, setIsSubmitting] = useState(false);

    console.log('rackData :', rackData)
    console.log('selectedRecord :', selectedRecord)
    console.log('pickedLocations :', pickedLocations)



    useEffect(() => {

        let isMounted = true; // Prevent state update on unmount

        const Load_RackData = async () => {
            if (Array.isArray(searchApi) && searchApi.length > 0) {

                console.log('searchApi :', searchApi)
                const { Rack } = searchApi[0] || {};
                try {
                    const result = await Load_RackData_Service(Rack);
                    console.log('Load_RackData result :', result)
                    if (result) {
                        setRackData(result);
                    }
                } catch (error) {
                    console.error('Error loading rack data:', error);
                }
            }

        }

        Load_RackData();

        // Clear pickedLocations when searchApi changes
        setPickedLocations(new Set());

        return () => {
            isMounted = false; // Cleanup to avoid memory leaks
        };

    }, [searchApi])

    // Extract all Locations from searchApi for quick lookup
    const searchApiLocations = new Set(searchApi.map(item => item.Location));

    // Grouping data by Row and sorting columns / Groups data by Row (A, B, etc.).
    const groupedData = rackData.reduce((acc, item) => {
        if (!acc[item.Row]) {
            acc[item.Row] = [];
        }
        acc[item.Row].push(item);
        return acc;
    }, {});

    // Sorting each row's items based on Col number / Sorts each row's items by Col (1, 2, 3...).
    Object.keys(groupedData).forEach(row => {
        groupedData[row].sort((a, b) => parseInt(a.Col) - parseInt(b.Col));
    });

    // Find max number of columns in any row
    const maxColCount = Math.max(...Object.values(groupedData).map(row => row.length), 5); // Default to 5 if empty



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

    // Handle submit (mark item as picked)
    // const handleSubmit = () => {
    //     if (selectedItem) {
    //         setPickedItems(prev => new Set([...prev, selectedItem.Location]));
    //         setSelectedItem(null); // Close modal
    //     }
    // };



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

            //   await Load_MasterData(); // reload masterList

        } catch (error) {
            console.error("Error saving data:", error);
            // Optionally, handle error (e.g., display a message)
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className='m-4'>
            <div className="border-2  border-blue-300 mt-4 w-full rounded-md ">
                <div className="bg-sky-300 text-black px-2 py-1 text-lg font-bold">
                    <h5 className="text-2xl font-bold">Rack: {rackData.length > 0 ? rackData[0].Rack : 'N/A'}</h5>
                </div>
                <div className="p-2">
                    {Object.keys(groupedData).sort().map(row => (
                        <div key={row} className="mb-4 ">
                            <h3 className="text-md font-semibold mb-2">Row: {row}</h3>
                            <div className={`grid grid-cols-${maxColCount} gap-2`}>
                                {groupedData[row].map((item, index) => {

                                    const isMatched = searchApiLocations.has(item.Location); // Check if location matches searchApi

                                    const selectedRecord = {
                                        ...item, // Spread existing masterData fields
                                        //PK_ID: isMatched ? isMatched.PK_ID : null, // Add P_ID if exists
                                        // Pick_Qty: isMatched ? isMatched.Pick_Qty : null, // Add Pick_Qty if exists
                                        Type: TranType, // INWARD / OUTWARD
                                        Transact_Qty: 1,
                                    };

                                    return (
                                        <div key={index}
                                            className={`flex flex-col px-2 w-24 h-20 rounded-md text-center
                ${isMatched ? "bg-blue-600 text-white" : "bg-gray-400 text-black"}`}
                                        >
                                            <div>{item.Location}</div>
                                            <div className="text-xs bg-white text-black rounded-sm">{item.Part_Number}</div>
                                            {isMatched && (
                                                <button
                                                    className={`mt-2 rounded-md px-1 ${pickedLocations.has(item.Location)
                                                        ? "bg-green-500 text-white cursor-not-allowed"
                                                        : "bg-yellow-400 text-black"
                                                        }`}
                                                    // onClick={() => setSelectedItem(item)}
                                                    onClick={() => openModal(selectedRecord)}
                                                    disabled={pickedLocations.has(item.Location)}
                                                >
                                                    {pickedLocations.has(item.Location) ? "Picked" : "Pick"}
                                                </button>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal Dialog */}
                {modalOpen && selectedRecord && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-green-200  rounded-md shadow-lg w-1/3 relative ">

                            <div className='bg-green-600 text-white px-2 py-1 flex items-center'>
                                {/* Close Button (X) at Top Right */}
                                <button
                                    className="absolute top-0 right-3 text-xl  text-gray-600 hover:text-black"
                                    onClick={closeModal}
                                >
                                    x
                                </button>

                                <h2 className="text-lg   ">Part Details</h2>
                            </div>

                            <div className='grid grid-cols-2 p-2'>
                                <div><strong>Location</strong></div> <div>: {selectedRecord.Location}</div>
                                <div><strong>Part Number</strong></div> <div>: {selectedRecord.Part_Number}</div>
                                <div><strong>Description</strong></div> <div>: {selectedRecord.Description}</div>
                                <div><strong>Stock Qty</strong></div> <div>: {selectedRecord.Stock_Qty} No's</div>

                            </div>


                            <div className="flex mb-4 bg-yellow-400 px-3 py-2 m-2  rounded-md">
                                <div>
                                    <label htmlFor="Transact_Qty" className={`mr-2 text-lg `}>Enter Transact_Qty :</label>
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
                               
                                <button
                                    className="bg-green-500 text-white  px-2 rounded-md w-50"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>


                            {/* Submit Button at Bottom Right */}
                            {/* <div className="flex justify-end mt-4 mb-4 p-2">
                                
                            </div> */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
