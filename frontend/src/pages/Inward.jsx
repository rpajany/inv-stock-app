import React, { useEffect, useState } from 'react';
import { DatePicker2 } from '../components';
import { RackView } from './RackView';
import { SingleRackView } from './SingleRackView';
import { TransactMenu } from './TransactMenu';
import { Get_MasterByPN_Service } from '../services/PickListService';
// css properties
const label_css = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
const input_css = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
const tbl_header = 'border border-slate-600  bg-gray-500 p-1';
const tbl_thead_tr = " text-white border-r-2  border-gray-300";
const tbl_thead_th = "px-6 py-2 border-r-2  border-gray-300";
const tbl_tbody_td = "border-r-2  border-gray-300 px-1";

export const Inward = () => {

    // const [date, setDate] = useState(new Date()); // date object
    const [searchValue, setSearchValue] = useState(""); // store search PartNumber
    const [searchApi, setSearchApi] = useState([]); // store all master data


    const handleSearchChange = (e) => {

        const { value } = e.target;
        console.log('value :', value);
        setSearchValue(value);

    }


    useEffect(() => {
        handle_SearchPart();
    }, [searchValue])

    const handleKeyDown = async (e) => {

        console.log('e.key :', e.key)

        if (e.key === 'Enter') {

            if (searchValue === '') {
                return;
            }


            handle_SearchPart();

            // try {
            //     const result = await Get_MasterByPN_Service(searchValue);
            //     console.log('result :', result);
            //     if (result) {
            //         setSearchApi(result);
            //     }

            // } catch (error) {

            // }

        }


    }

    console.log('searchValue :', searchValue);

    const handleShow = async (e) => {

        e.preventDefault();

        if (searchValue === '') {
            return;
        }

        handle_SearchPart();

        // try {
        //     const result = await Get_MasterByPN_Service(searchValue);
        //     console.log('result :', result);
        //     if (result) {
        //         setSearchApi(result);
        //     }

        // } catch (error) {

        // }

    }

    const handle_SearchPart = async (e) => {


        if (searchValue === '') {
            return;
        }



        try {
            const result = await Get_MasterByPN_Service(searchValue);
            console.log('result :', result);
            if (result) {
                setSearchApi(result);
            }

        } catch (error) {

        }
    }
    console.log('searchValue :', searchValue);
    console.log('searchApi :', searchApi);

    return (
        <div className='bg-green-200 h-full '>



            <div className='w-full   rounded-md '>
                <div className='bg-gray-400 text-white p-2 '>
                    <h2>Material Inward</h2>
                </div>

                <div className='mt-4 px-6'>
                    <TransactMenu setSearchValue={setSearchValue} />

                </div>

                <hr></hr>

                <form  >
                    <div className='grid grid-cols-3 gap-4 px-6 mt-4'>
                        <div className="">
                            <label className="mr-2">Search PartNumber :</label>
                            <div className="flex items-center">
                                <input type="text"
                                    id="Search"
                                    name="Search"
                                    onKeyDown={handleKeyDown}
                                    onChange={handleSearchChange}
                                    value={searchValue}
                                    placeholder="Search"
                                    className={`${input_css} w-30 `}
                                />

                                <button type="submit"
                                    id=""
                                    name=""
                                    onClick={handleShow}
                                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md ml-2"

                                >Show</button>
                            </div>

                        </div>
                        {/* <div>
                            <label htmlFor='Pick_UID' className={`${label_css}`}>Pick_UID</label>
                            <input
                                type="text"
                                id="Pick_UID"
                                name="Pick_UID"
                                // onChange={}
                                value={1}
                                className={`${input_css} w-30 cursor-not-allowed`}
                            />
                        </div> */}

                        {/* <div>
                            <DatePicker2 title={'Pick Date'} date={date} setDate={setDate} />
                        </div> */}




                    </div>
                </form>

                {/* Single Racks view */}
                <div className='p-2'>
                    <SingleRackView searchApi={searchApi} setSearchValue={setSearchValue} TranType="INWARD" />
                </div>

                {/* Multi Racks view */}
                <div className='p-2'>
                    <RackView searchApi={searchApi} setSearchValue={setSearchValue} TranType="INWARD" />
                </div>



            </div>




        </div>
    )
}
