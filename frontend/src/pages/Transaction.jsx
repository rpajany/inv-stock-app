import React, { useState, useEffect } from 'react';
import { ReactDateRangePicker, DataTableVIew } from '../components';
import { Load_Transact_Service } from '../services/TransactionService';

export const Transaction = () => {

    const [dateRangeNow, setDateRangeNow] = useState({});
    const [gridData, setGridData] = useState([]); // []

    const [isSubmitting, setIsSubmitting] = useState(false); // Track Form submission state
    const [isLoading, setIsLoading] = useState(false);

    // load table data ..
    const load_Data = async () => {
        try {
            if (dateRangeNow?.startDate && dateRangeNow?.endDate) {
                setIsLoading(true);
                const outputData = await Load_Transact_Service(dateRangeNow);
                setGridData(outputData || []);
            }
        } catch (error) {
            console.log('Audit, load_Data Error :', error);
        } finally {
            setIsLoading(false);
        }
    }


    // load data
    useEffect(() => {
        load_Data();

    }, [dateRangeNow])




    // table column ...
    const columns = [
        {
            name: 'TR_ID',
            selector: row => row.TR_ID,
            sortable: true
        },
        {
            name: 'Part_Number',
            selector: row => row.Part_Number,
            sortable: true
        },
        {
            name: 'Description',
            selector: row => row.Description,
            cell: row => (
                <div title={row.Description} style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {row.Description}
              </div>
            ),
            sortable: true
        },

        // {
        //   name: 'Rev_No',
        //   selector: row => row.Rev_No,
        //   sortable: true
        // },
        // {
        //   name: 'Rev_Date',
        //   selector: row => row.Rev_Date,
        //   sortable: true
        // },

        {
            name: 'Type',
            // selector: row => row.Type,
            selector: row =>
                <span
                    className={`px-2 py-4 text-white rounded-full  cursor-pointer ${row.Type === 'INWARD' ? 'bg-green-400' :
                        row.Type === 'OUTWARD' ? 'bg-red-400' :
                            'bg-gray-400' // Default color
                        }`}

                >{row.Type}</span>,
            sortable: true
        },
        {
            name: 'Stock_Qty',
            selector: row => row.Stock_Qty,
            sortable: true
        },
        {
            name: 'Transact_Qty',
            selector: row => row.Transact_Qty,
            sortable: true
        },
        {
            name: 'Hand_Qty',
            selector: row => row.Hand_Qty,
            sortable: true
        },
        {
            name: 'Date_Transact',
            selector: row => row.Date_Transact,
            sortable: true
        },
        // {
        //     name: 'Status',
        //     // selector: row => row.Status,
        //     selector: row =>
        //         <span
        //             className={`px-2 py-4 text-white rounded-full  cursor-pointer ${row.Status === 'APPROVED' ? 'bg-green-400' :
        //                 row.Status === 'PENDING' ? 'bg-blue-400' :
        //                     row.Status === 'REJECTED' ? 'bg-red-400' :
        //                         // row.Status === 'CANCEL' ? 'bg-yellow-400' :
        //                         row.Status === 'OPEN' ? 'bg-blue-600' :
        //                             'bg-gray-400' // Default color
        //                 }`}

        //         >{row.Status}</span>,

        //     sortable: true
        // },
        {
            name: 'Actions',
            cell: (row) => (
                <div className='flex p-1 '>
                    {/* <button onClick={() => handleView(row)} className='bg-blue-300 p-2 rounded-sm mr-1'><span><LuView /></span></button>
                    <button onClick={() => handleExport(row)} className={`${row.Status === 'APPROVED' ? 'cursor-pointer' : 'cursor-not-allowed'} bg-green-400 p-2 rounded-sm mr-1`}><span><TbFileExport /></span></button>


                    <button
                        onClick={() => handleEdit(row)}
                        className={`${row.Status === 'APPROVED' ? 'cursor-not-allowed' : 'cursor-pointer'} bg-yellow-300 p-2 rounded-sm mr-1`}
                        disabled={row.Status === 'APPROVED' ? true : false}>
                        <span><FaEdit />
                        </span>
                    </button>



                    < button onClick={() => handleDelete(row)} className='bg-red-500 p-2 rounded-sm' > <RiDeleteBin2Line /></button > */}
                </div >
            ),
            ignoreRowClick: true, // Prevent triggering row click event when clicking buttons
            allowoverflow: true, // Ensure the buttons are visible - "allowOverflow"
            // button: true, // Makes it clear they are buttons
        }
    ]


    return (
        <>
            <div className='border-2 rounded-sm'>
                <div className='bg-gray-400 text-white p-2 rounded-t-sm'>Transaction Report</div>
                <div className='h-screen p-4 bg-green-100 rounded-lg'>
                    {/*  Content for Tab 1  */}
                    <div className='flex mb-4'>

                        <ReactDateRangePicker setDateRangeNow={setDateRangeNow} />
                    </div>
                    <DataTableVIew tbl_title={''} columns={columns} apiData={gridData} />
                </div>

            </div>
        </>
    )
}
