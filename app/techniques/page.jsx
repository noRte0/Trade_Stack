'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Gtimeframe from '../components/g-timeframe/Gtimeframe';
import Gprofitloss from '../components/g-profitloss/Gprofitloss';
import MostUsedTechniques from '../components/g-mostuse/Gmostuse';
import Glongshort from '../components/g-longshort/Glongshort';
import Glongshortcount from '../components/g-longshortcount/Glongshortcount';
import Gtechniquesprofit from '../components/g-techniquesprofit/Gtechniquesprofit';
import Gcontractamount from '../components/g-contractamount/Gcontractamount';
import Gcontractwinlose from '../components/g-contractwinlose/Gcontractwinlose';
import Gcontractprofitloss from '../components/g-contractprofitloss/Gcontractprofitloss';
import Gwinlose from '../components/g-winlose/Gwinlose';
import ExportButton from '../components/exportbutton/ExportButton';

export default function Techniques_handle() {
    const { data: session, status } = useSession();
    const [technique, setTechnique] = useState("");
    const [Contract, setContract] = useState("");
    const [LongShort, setLongShort] = useState("");
    const [Leverage, setLeverage] = useState("");
    const [lotsize, setlotsize] = useState("");
    const [EntryPrice, setEntryPrice] = useState("");
    const [ExitPrice, setExitPrice] = useState("");
    const [Pip, setPip] = useState("");
    const [Note, setNote] = useState("");
    const [Timeframe, setTimeframe] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const [summary, setSummary] = useState([]);

    const [tradeData, setTradeData] = useState([]);
    //----------------------------winrate/breakeven/lose------------------------------------------//
    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await fetch('/api/trade-techniques'); //default method จะเป็น GET ถ้าไม่ใส่ 
                if (res.ok) {
                    const data = await res.json();
                    setSummary(data);
                } else {
                    const errorMessage = await res.json();
                    setError(errorMessage.message);
                }
            } catch (error) {
                setError("An error occurred while fetching data.");
            }
        };
        //----------------logout cleardata------------------------//
        if (status === 'authenticated') {
            fetchSummary();
            fetchTradeData();
        } else if (status === 'unauthenticated') {
            setSummary([]);
            setTradeData([]);
        }
    }, [status]);
    //---------------------------techniques-detail-------------------------------------------//
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!technique || !result) {
            setError("Technique and result are required");
            return;
        }

        try {
            const res = await fetch("/api/trade-techniques/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    technique,
                    Contract,
                    LongShort,
                    Leverage,
                    lotsize,
                    EntryPrice,
                    ExitPrice,
                    Pip,
                    Note,
                    Timeframe,
                    result
                })
            });

            if (res.ok) {
                const form = e.target;
                setError("");
                form.reset();
                // Refresh summary after successful submission
                fetchSummary();
            } else {
                const errorMessage = await res.json();
                setError(errorMessage.message);
                console.log("Add techniques failed:", errorMessage);
            }

        } catch (error) {
            console.log("Error during Add techniques", error);
        }
    }
    //---------------------------graph-detail-------------------------------------------//
    const fetchTradeData = async () => {
        try {
            const res = await fetch("/api/graphplot/");
            if (!res.ok) throw new Error('Failed to fetch data');
            const data = await res.json();
            setTradeData(data);
        } catch (error) {
            console.error('Error fetching trade data:', error);
        }
    };
    //-----------------------------frontend/html/css--------input-----------------------------//
    return (

        <div>
            <div className='container mx-auto py-5 pb-6 flex'>
                <div className='pr-4'>
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className='bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-1'>
                                {error}
                            </div>
                        )}
                        <input onChange={(e) => setTechnique(e.target.value)} type="text" className='block bg-gray-300 p-2 mt-1 rounded-md' placeholder='Enter technique' /><br />
                        <input onChange={(e) => setContract(e.target.value)} type="text" className='block bg-gray-300 p-2 mt-1 rounded-md' placeholder='Enter contract' /><br />
                        <input onChange={(e) => setLongShort(e.target.value)} type="text" className='block bg-gray-300 p-2 mt-1 rounded-md' placeholder='Enter long/short' /><br />
                        <input onChange={(e) => setLeverage(e.target.value)} type="text" className='block bg-gray-300 p-2 mt-1 rounded-md' placeholder='Enter leverage' /><br />
                        <input onChange={(e) => setlotsize(e.target.value)} type="text" className='block bg-gray-300 p-2 mt-1 rounded-md' placeholder='Enter lotsize' /><br />
                        <input onChange={(e) => setEntryPrice(e.target.value)} type="text" className='block bg-gray-300 p-2 mt-1 rounded-md' placeholder='Enter entry price' /><br />
                        <input onChange={(e) => setExitPrice(e.target.value)} type="text" className='block bg-gray-300 p-2 mt-1 rounded-md' placeholder='Enter exit price' /><br />
                        <input onChange={(e) => setPip(e.target.value)} type="text" className='block bg-gray-300 p-2 mt-1 rounded-md' placeholder='Enter pip' /><br />
                        <input onChange={(e) => setNote(e.target.value)} type="text" className='block bg-gray-300 p-2 mt-1 rounded-md' placeholder='Enter note' /><br />
                        <input onChange={(e) => setTimeframe(e.target.value)} type="text" className='block bg-gray-300 p-2 mt-1 rounded-md' placeholder='Enter timeframe' /><br />
                        <input onChange={(e) => setResult(e.target.value)} type="text" className='block bg-gray-300 p-2 mt-1 rounded-md' placeholder='Enter result' /><br />
                        <button type='submit' className='transition ease-in-out delay-150 bg-white-500 p-2 rounded-full text-black shadow-lg hover:bg-gradient-to-r from-sky-500 to-yellow-500  hover:text-white duration-300 hover:scale-110 '>Save your journey</button>
                    </form>
                </div>
                <hr className='pl-1 bg-gradient-to-t from-sky-500 to-yellow-500 h-dvh w-0' />
                {/* //------------------------history---------------------------------// */}
                <div className='container mx-auto py-2 pb-6 flex flex-col items-start h-screen w-screen '>
                    <div className='overflow-x-auto'> {/* //-overflow กับ h-screen w-screen ทำงานด้วยกัน// */}
                        <table className='text-center table-auto border-separate border-spacing-x-1 '>
                            <thead>
                                <tr>
                                    <th className='px-3 py-2'>Technique</th>
                                    <th className='px-3 py-2'>Contract</th>
                                    <th className='px-3 py-2'>LongShort</th>
                                    <th className='px-3 py-2'>Leverage</th>
                                    <th className='px-3 py-2'>lot/size</th>
                                    <th className='px-3 py-2'>EntryPrice</th>
                                    <th className='px-3 py-2'>ExitPrice</th>
                                    <th className='px-3 py-2'>Pip</th>
                                    <th className='px-3 py-2'>Note</th>
                                    <th className='px-3 py-2'>Timeframe</th>
                                    <th className='px-3 py-2'>result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {summary.map((item, index) => (
                                    item.details.map((detail, detailIndex) => (
                                        <tr key={`${index}-${detailIndex}`}>
                                            <td className='px-3 py-2'>{item.technique}</td>
                                            <td className='px-3 py-2'>{detail.Contract}</td>
                                            <td className='px-3 py-2'>{detail.LongShort}</td>
                                            <td className='px-3 py-2'>{detail.Leverage}</td>
                                            <td className='px-3 py-2'>{detail.lotsize}</td>
                                            <td className='px-3 py-2'>{detail.EntryPrice}</td>
                                            <td className='px-3 py-2'>{detail.ExitPrice}</td>
                                            <td className='px-3 py-2'>{detail.Pip}</td>
                                            <td className='px-3 py-2'>{detail.Note}</td>
                                            <td className='px-3 py-2'>{detail.Timeframe}</td>
                                            <td className='px-3 py-2'>{detail.result}</td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex flex-col justify-end h-full w-full'>
                        <div className='py-3 px-4 flex justify-end'>
                            <ExportButton />
                        </div>
                    </div>
                </div>
            </div>

            <hr className='block max-w-screen-xl mx-auto text-black shadow-md rounded-xl bg-opacity-90 bg-gradient-to-r from-blue-500 to-yellow-500 h-1' />
            {/* //------------------------summary---------------------------------// */}

            <div className='text-bold text-center font-extrabold pb-4 pt-2'>SUMMARY</div>
            <table className='table-auto mx-auto border-separate border-spacing-x-20 border border-slate-500 pt-2 pb-2 text-center'>
                <thead>
                    <tr>
                        <th>Technique</th>
                        <th>Win %</th>
                        <th>Breakeven %</th>
                        <th>Lose %</th>
                    </tr>
                </thead>
                <tbody>
                    {summary.map((item, index) => (
                        <tr key={index}>
                            <td>{item.technique}</td>
                            <td>{item.win}</td>
                            <td>{item.breakeven}</td>
                            <td>{item.lose}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <MostUsedTechniques />
            <Gwinlose tradeData={tradeData} />
            <Gtechniquesprofit tradeData={tradeData} />
            <Gtimeframe tradeData={tradeData} />
            <Gprofitloss tradeData={tradeData} />
            <Glongshortcount tradeData={tradeData} />
            <Glongshort tradeData={tradeData} />
            <Gcontractamount tradeData={tradeData} />
            <Gcontractwinlose tradeData={tradeData} />
            <Gcontractprofitloss tradeData={tradeData} />
        </div>

    )
}
