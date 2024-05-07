'use client'
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from 'axios'; // Ensure axios is installed or use fetch API
import async from 'async';

const DashboardContainer = () => {
    const [rainingData, setRainingData] = useState(null);
    const [floradata, setFloraData] = useState(null);
    const [lysd, setLysdData] = useState(null);
    const [fanState, setFanState] = useState(false); // Assume fanState is a boolean for simplicity
    const [waterPumpState, setWaterPumpState] = useState(null);
    const [responses, setResponses] = useState([])

    useEffect(() => {
       
const fetchData = () => {
    async.parallel({
        rainingData: callback => axios.get('https://esp-backend.vercel.app/api/raining/get-raining').then(res => callback(null, res.data)).catch(callback),
        fanState: callback => axios.get('https://esp-backend.vercel.app/api/fanState/get-fanState').then(res => callback(null, res.data)).catch(callback),
        waterPumpState: callback => axios.get('https://esp-backend.vercel.app/api/waterPumpState/get-waterPumpState').then(res => callback(null, res.data)).catch(callback),
        floraData: callback => axios.get('https://esp-backend.vercel.app/api/flora/get-flora').then(res => callback(null, res.data)).catch(callback),
        lysdData: callback => axios.get('https://esp-backend.vercel.app/api/lysd/get-lysd').then(res => callback(null, res.data)).catch(callback)
    }, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return;
        }
        // Handle results here
        setResponses([results.rainingData, results.fanState, results.waterPumpState, results.floraData, results.lysdData]);
    });
}
        const intervalId = setInterval(fetchData, 2000); // Fetch every 2 seconds
        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);

    useEffect(() => {
        if (responses.length) {
            console.log(responses); // Log responses to see the structure and data
            setRainingData(responses[0] || null);
            setFanState(responses[1]?.isOpen);
            setWaterPumpState(responses[2] || null);
            setFloraData(responses[3] || null);
            setLysdData(responses[4] || null);
        }
    }, [responses]); // Only run this effect when `responses` changes

    const handleOnFan = async (event) => {
        event.preventDefault(); // Prevent default form behavior
        const newState = !fanState; // Toggle the current state
        try {
            await axios.post('https://esp-backend.vercel.app/api/fanstate/add-fanstate', {
                isOpen: newState,
            });
            setFanState(newState); // Update state only on successful API call
        } catch (error) {
            console.error('Failed to toggle fan state:', error);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } },
    };

    const formVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { delay: 0.5, duration: 1 } },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="lg:w-1/2 bg-red-50 rounded-xl text-xl flex flex-col gap-8 justify-center p-4 lg:p-24 m-auto"
        >

            <motion.form
                initial="hidden"
                animate="visible"
                variants={formVariants}
                className="flex flex-col gap-8 items-center mt-16"
            >
                <div>Flora Conductivity: {floradata?.conductivity} <br/> Created at: {floradata?.createdAt.toLocaleString()}</div>
                <div>Flora moisture: {floradata?.moisture} <br/> Created at: {floradata?.createdAt.toLocaleString()}</div>
                <div>Flora light: {floradata?.light} <br/> Created at: {floradata?.createdAt.toLocaleString()}</div>
                <div>Lywsd temp: {lysd?.temp} <br/> Created at: {lysd?.createdAt.toLocaleString()}</div>
                <div>Lywsd humidity: {lysd?.humidity} <br/> Created at: {lysd?.createdAt.toLocaleString()}</div>
                <div>Raining: {rainingData?.isRaining ? 'Yes' : 'No'} <br/> Created at: {rainingData?.createdAt.toLocaleString()}</div>
                {/* <div>Fan State: {fanState ? 'Turned ON' : 'Turned Off'} <br/> </div> */}
                <div>Water Pump State: {waterPumpState?.isOpen ? 'Open' : 'Closed'} <br/> Created at: {waterPumpState?.createdAt.toLocaleString()}</div>
                {/* <button
                    onClick={handleOnFan}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                    {fanState ? 'Turn Fan Off' : 'Turn Fan On'}
                </button> */}
            </motion.form>

        </motion.div>
    );
};

export default DashboardContainer;
