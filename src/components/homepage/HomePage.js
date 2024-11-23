import React, {
    useState,
    useEffect
} from 'react';
import {
    Chart
} from 'react-google-charts';
import axios from 'axios';
import {
    downloadFile
   
} from '../utils/downloadFile';
import { timerConvert } from '../utils/dateFormat';
// export const data = [
//     ['Days', 'high-temp', 'low-temp'],
//     ['MON', 28, 16],
//     ['TUE', 26, 15],
//     ['WED', 29, 16],
//     ['THU', 25, 17],
//     ['FRI', 34, 17],
//     ['SAT', 34, 15],
//     ['SUN', 31, 23],
//     ['MON', 29, 15],
//     ['TUE', 25, 16],
//     ['WED', 32, 16],
//     ['THU', 31, 20],
//     ['FRI', 35, 15],
//     ['SAT', 25, 20],
//     ['SUN', 29, 21],
//     ['MON', 28, 23],
//     ['TUE', 29, 15],
//     ['WED', 25, 15],
//     ['THU', 25, 17],
//     ['FRI', 32, 24],
//     ['SAT', 32, 17],
//     ['SUN', 31, 19],
//     ['MON', 35, 20],
//     ['TUE', 35, 17],
//     ['WED', 27, 23],
//     ['THU', 28, 16],
//     ['FRI', 31, 23],
//     ['SAT', 25, 23],
//     ['SUN', 30, 22],    
//     ['MON', 29, 17],
//     ['TUE', 30, 15],
//     ['WED', 25, 21],
//     ['THU', 34, 16],
//     ['FRI', 27, 20],
//     ['SAT', 30, 18],
//     ['SUN', 30, 18],
//     ['MON', 20, 10],
//     ['TUE', 31, 23],
//     ['WED', 31, 16],
//     ['THU', 30, 18],
//     ['FRI', 28, 15],
//     ['SAT', 35, 23],
//     ['SUN', 27, 20],
//     ['MON', 27, 19],
//     ['TUE', 32, 17],
//     ['WED', 29, 17],
//     ['THU', 29, 24],
//     ['FRI', 29, 19],
//     ['SAT', 25, 22]
// ];

export const options = {
    title: 'Temperature',
    subtitle: 'Temperature in different days',
    curveType: 'function',
    legend: {
        position: 'bottom'
    },
    hAxis: {
        title: "Date",
        format: "MMM dd, yyyy", // Custom date format
      },
      vAxis: {
        title: "Temp",
        format: "0°F", // Custom date format
      },

};


const HomePage = () => {
    // State for form data
    let [formData, setFormData] = useState({
        fromdate: "",
        todate: ""
    });

    // State for fetched data
    const [fetchedData, setFetchedData] = useState('');

    // Handle input changes
    const handleChanges = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Get today's date in MM-DD-YYYY format
    function getfulldate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}-${date}-${year}`;
    }

    // Fetch data for report generation
    async function getData() {
        try {
            let res = await axios.post('http://15.206.212.135:3001/iot/tempall', formData, {
                responseType: 'blob',
            });
            res = res.data;
            console.log(res);
            downloadFile(res, `temperature-report-${getfulldate()}.xlsx`);
        } catch (err) {
            console.log(err.response);
            if (err.response.status === 300) {
                alert('Select between dates');
            }
        }
    }

    // Fetch chart data
    let fetchChartData = async () => {
        try {
            let res = await axios.get('http://15.206.212.135:3001/iot/temp');
            console.log(res);
            res = res.data;

            let data = res.data;
            console.log(data);
            const chartData = [
                ['Date', 'High-temp', 'Low-temp'],
                ...data.map(item => [
                    timerConvert(item.created_at),
                    Number(item.max_temperature),
                    Number(item.min_temperature)
                ])
            ];
            setFetchedData(chartData);
        } catch (err) {
            console.log(err);
            setFetchedData([
                ['Days', 'high-temp', 'low-temp']
            ]);
        }
    };

    // Fetch data on component mount
    useEffect( () => {
        fetchChartData(); 
    },[0] );

    // Generate report on form submission
    const generateReport = (e) => {
        e.preventDefault();
        getData();
    }
    return (
        
        <div>
          <Chart 
           chartType="LineChart"
           data={ fetchedData } 
           options={options}
           width="100%"
           height="700px"
           legendToggle
          />
          <form className='w-1/2 m-auto bg-white p-4 my-8 rounded-2xl' id='reportGen' onSubmit={generateReport}> 
               <div className='neugen-input-group mb-0'> 
                   <label className='neugen-label'>Select from Date</label>
                   <input className='neugen-input focus:outline-none border-2 border-indigo-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 bg-gray-200' name='fromdate' type='date'value={formData.fromdate} onChange={handleChanges} placeholder='Enter the from date' required/>
               </div>
               <div className='neugen-input-group mb-0'> 
                   <label className='neugen-label'>Select last Date</label>
                   <input className='neugen-input focus:outline-none border-2 border-indigo-600  focus:invalid:border-pink-500 focus:invalid:ring-pink-500 bg-gray-200' name='todate' type='date'value={formData.todate} onChange={handleChanges} placeholder='Enter the last date' required/>
               </div>
               <div className="flex justify-center"><button type='submit' className='neugen-button border-2 border-indigo-600 p-3 rounded-2xl'>Generate Report</button></div>
          </form>
          </div>
       )
}
export default HomePage;