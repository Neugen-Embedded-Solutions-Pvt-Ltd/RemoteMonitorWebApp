import React, {
    useState,
    useEffect
} from 'react';
import {
    Chart
} from 'react-google-charts';
import Api from "../utils/api";
import {
    downloadFile
   
} from '../utils/downloadFile';
import { timerConvert } from '../utils/dateFormat';
 
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
    };
    // Fetch data for report generation
    async function getData() {
        try {
            let res = await Api.post("/iot/temperature-report", formData, {
              responseType: "blob",
            });
            res = res.data;
            
            downloadFile(res, `temperature-report-${getfulldate()}.xlsx`);
        } catch (err) {
            if (err.response.status === 300) {
                alert('Select between dates');
            }
        }
    }

    // Fetch chart data
    let fetchChartData = async () => {
        try {
            
            let res = await Api.get("/iot/temperature");
            res = res.data;
            console.log(res.data.records)
            let data = res.data.records;
            const chartData = [
                ['Date', 'High-temp', 'Low-temp'],
                ...data.map(item => [
                    timerConvert(item.createdAt),
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
    },[] );

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