import React, { useState } from 'react';
import { DatePicker2 } from '../components';
import { RackView } from './RackView';
import { Get_MasterByPN_Service } from '../services/PickListService';
// css properties
const label_css = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
const input_css = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
const tbl_header = 'border border-slate-600  bg-gray-500 p-1';
const tbl_thead_tr = " text-white border-r-2  border-gray-300";
const tbl_thead_th = "px-6 py-2 border-r-2  border-gray-300";
const tbl_tbody_td = "border-r-2  border-gray-300 px-1";

export const PickList = () => {

    // const [date, setDate] = useState(new Date()); // date object
    const [searchValue, setSearchValue] = useState("");
    const [searchApi, setSearchApi] = useState([]);


    const handleSearchChange = (e) => {
        const { value } = e.target;
        console.log('value :', value);
        setSearchValue(value);
    }

    console.log('searchValue :', searchValue);

    const handleShow = async (e) => {
        e.preventDefault();

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
        <div >

            <div className='w-full border-2  rounded-md'>
                <div className='bg-gray-400 text-white p-2'>
                    <h2>PickList</h2>
                </div>

                <form>
                    <div className='grid grid-cols-3 gap-4 px-6'>
                        <div className="">
                            <label className="mr-2">Search PartNumber :</label>
                            <div className="flex items-center">
                                <input type="text"
                                    id="Search"
                                    name="Search"
                                    onChange={handleSearchChange}
                                    value={searchValue}
                                    placeholder="Search"
                                    className={`${input_css} w-30 `}
                                />

                                <button type="button"
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

                        <hr></hr>


                    </div>
                </form>

                {/* Racks */}
                <div className='p-2'>
                    <RackView searchApi={searchApi} setSearchValue={setSearchValue} />
                </div>



            </div>




        </div>
    )
}
