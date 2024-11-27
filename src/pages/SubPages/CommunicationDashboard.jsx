import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
function CommunicationDashboard() {
  const themeColor = useSelector((state)=> state.theme.color)
    const engagementOptions = {
        chart: {
          type: 'column',  // Changed to 'column'
        },
        title: {
          text: '',
        },
        xAxis: {
          categories: ['Poll Response Rate', 'Forum Post Count', 'Chat Bot Interaction Count'],
        },
        yAxis: {
          title: {
            text: 'Counts',
          },
        },
        series: [
          {
            name: 'Engagement',
            data: [75, 150, 300],
            color: themeColor,
          },
        ],
    };
    const participationOptions = {
        chart: {
          type: 'column',  // Changed to 'column'
        },
        title: {
          text: '',
        },
        xAxis: {
          categories: ['Active Users', 'Average Participation Time'],
        },
        yAxis: {
          title: {
            text: 'Counts',
          },
        },
        series: [
          {
            name: 'Participation',
            data: [120, 35],
            color: themeColor,
          },
        ],
      };
    
  return (
    <section>
        <div className="w-full flex mx-3 flex-col overflow-hidden mb-5">
            <div className='md:grid grid-cols-2 gap-8 my-5'>
                <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold mb-4 ">Engagement Metrics</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-100 p-4 rounded">
                            <h3 className="text-md font-semibold">Poll Response Rate</h3>
                            <p className="text-xl">75%</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded">
                            <h3 className="text-md font-semibold">Forum Post Count</h3>
                            <p className="text-xl">150</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded">
                            <h3 className="text-md font-semibold">Chat Bot Interaction Count</h3>
                            <p className="text-xl">300</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 shadow rounded-lg my-5">
                        <HighchartsReact highcharts={Highcharts} options={engagementOptions} />
                    </div>
                </div>
                <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Participation Metrics</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-100 p-4 rounded">
                            <h3 className="text-md font-semibold">Active Users </h3>
                            <p className="text-xl">120</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded">
                            <h3 className="text-md font-semibold">Average Participation Time</h3>
                            <p className="text-xl">35 mins</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 shadow rounded-lg my-5">
                        <HighchartsReact highcharts={Highcharts} options={participationOptions} />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CommunicationDashboard