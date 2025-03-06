import React, { useState } from 'react';
import { Get_MasterByName_Service } from '../services/TransactMenuService';
import { toast } from 'react-toastify';

// css properties
const label_css = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
const input_css = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';

export const TransactMenu = ({ setSearchValue }) => {

    // const nameSearch_InitialData = {
    //     Line: '',
    //     Machine: '',
    //     Classification: '',
    //     Part_Name: ''

    // }

    const nameSearch_InitialData = Object.freeze({
        Line: '',
        Machine: '',
        Classification: '',
        Part_Name: ''
    });

    const [nameSearch, setNameSearch] = useState(nameSearch_InitialData);

    const handle_SearchByName = (e) => {
        if (!e || !e.target) return; // Prevents errors if called incorrectly

        const { name, value } = e.target;

        // Ensure name Matches a Valid Key in nameSearch
        if (!(name in nameSearch_InitialData)) {
            console.warn(`Unexpected key: ${name}`);
            return;
        }

        setNameSearch((preve) => ({
            ...preve,
            [name]: value
        }))

        {/* 4. Ensure setNameSearch is Called with the Correct State Update
Using prev inside setNameSearch is correct, but make sure it always returns a valid object.
🔹 Fix: (This is fine in your code, but just double-check that prev is never undefined): */}
        // setNameSearch((prev) => prev ? { ...prev, [name]: value } : nameSearch_InitialData);
    }

    // btn submit
    const handle_btnClick_SearchByName = async () => {

        if (!nameSearch.Line || !nameSearch.Machine || !nameSearch.Part_Name || !nameSearch.Classification) {
            toast.error('Some fields are empty')
            console.warn("Some fields are empty");
            return;
        }

        try {
            const result = await Get_MasterByName_Service(nameSearch);
            // console.log('result : ', result);

            if (result) {
                if (result && result.data.length > 0) {
                    const { Part_Number } = result.data[0];
                    setSearchValue(Part_Number);
                }

            } else {
                console.warn("Get_MasterByName No matching data found");
            }

        } catch (error) {
            console.error("Error handle_btnClick_SearchByName :", error);
        }


    }

    return (
        <>
            <div className='grid grid-cols-5 gap-2 mb-4  items-center'>

                {/* <div>
                    <label>Select</label>
                    <select className={`${input_css} w-40`}>
                        <option>M/C Spares</option>
                        <option>Tools</option>
                        <option>Common Spares</option>
                        <option>QR Code</option>
                    </select>
                </div> */}


                <div>
                    <label htmlFor='Line'>Line</label>
                    <select
                        id="Line"
                        name="Line"
                        onChange={handle_SearchByName}
                        value={nameSearch.Line}
                        className={`${input_css} w-40`}>
                        <option value="">-- SELECT --</option>
                        <option value="SMG">SMG</option>
                        <option value="STM">STM</option>
                        <option value="SMT">SMT</option>
                        <option value="Rotor">Rotor</option>
                        <option value="Stator">Stator</option>
                        <option value="pulser">pulser</option>
                    </select>
                </div>

                <div>
                    <label htmlFor='Machine'>M/C List</label>
                    <select
                        id="Machine"
                        name="Machine"
                        onChange={handle_SearchByName}
                        value={nameSearch.Machine}
                        className={`${input_css} w-40`}>
                        <option value="">-- SELECT --</option>
                        <option value="INSPECTION M/C">INSPECTION M/C</option>
                        <option value="SYSTHESIS WINDING M/C">SYSTHESIS WINDING M/C</option>
                        <option value="GT CRIMPING MACHINE">GT CRIMPING M/C</option>
                        <option value="YEJP CRIMPING M/C">YEJP CRIMPING M/C</option>
                        <option value="OVEN">OVEN</option>
                        <option value="TERMINAL PRESSING">TERMINAL PRESSING</option>

                    </select>
                </div>

                <div>
                    <label htmlFor='Classification'>Classification</label>
                    <select
                        id="Classification"
                        name="Classification"
                        onChange={handle_SearchByName}
                        value={nameSearch.Classification}
                        className={`${input_css} w-40`}>

                        <option value="">-- SELECT --</option>
                        <option>M/C Spares</option>
                        <option>Tools</option>
                        <option>Consumables</option>
                        <option>Common Spares</option>

                    </select>
                </div>

                <div>
                    <label htmlFor='Part_Name'>Material Name / Spare List</label>
                    <select
                        id="Part_Name"
                        name="Part_Name"
                        onChange={handle_SearchByName}
                        value={nameSearch.Part_Name}
                        className={`${input_css} w-full`}>
                        <option value="">-- SELECT --</option>
                        <option value="24VDC 4CO Relay">24VDC 4CO Relay</option>
                        <option value="24VDC 4CO  Relay base">24VDC 4CO  Relay base</option>


                    </select>
                </div>

                <div className='mt-6 ml-2'>
                    <button
                        type='button'
                        onClick={handle_btnClick_SearchByName}
                        className={`bg-blue-500 text-white px-2 py-1 rounded-md   hover:bg-blue-400 hover:cursor-pointer`}
                    >Search</button>
                </div>

            </div>

        </>
    )
}
