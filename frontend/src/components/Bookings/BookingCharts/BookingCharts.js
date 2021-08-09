import React from 'react';
import {Bar,Line,Doughnut,PolarArea} from 'react-chartjs';
import './BookingCharts.css';

const BOOKING_BUCKETS = {
    'Cheap': {
        min: 0,
        max: 100
    },
    'Normal': {
        min: 100,
        max: 200
    },
    'Expensive': {
        min: 200,
        max: 1000
    }
};
const bookingCharts = props => {
    const chartData = {labels: [],datasets: []};
    const chartLineData = {labels: [],datasets: []};
    let chartDoughnutData=[];
    let chartPolarData=[];
    let values=[];
    for(const bucket in BOOKING_BUCKETS){
        const filteredBookingsCount = props.bookings.reduce((prev,current) => {
            if(current.event.price > BOOKING_BUCKETS[bucket].min && 
                current.event.price < BOOKING_BUCKETS[bucket].max){
                return prev + 1
            } else {
                return prev;
            }
            
        },0);
        values.push(filteredBookingsCount);
        chartData.labels.push(bucket);      
        chartData.datasets.push({
            //label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: values
        });
        chartLineData.labels.push(bucket);
        chartLineData.datasets.push(
                {
                    //label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: values
                },
                {
                    //label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: values
                }
            );
        chartDoughnutData = [
            {
                value: 6,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Expensive"
            },
            {
                value: 3,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Normal"
            },
            {
                value: 4,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Cheap"
            }
        ];
        chartPolarData = [
            {
                value: 6,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Expensive"
            },
            {
                value: 3,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Normal"
            },
            {
                value: 4,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Cheap"
            }
                 
        ];
        values=[...values];
        values[values.length - 1] = 0;

    }

    return( <React.Fragment>
                    <Bar data={chartData}/>
                    <div className="chart">
                       <Line data={chartLineData}/>
                    </div>
                    <div className="doughnut">
                        <Doughnut data={chartDoughnutData} />
                    </div>
                    <div className="chart">
                        <PolarArea data={chartPolarData} />
                    </div>
            </React.Fragment>);

};

export default bookingCharts;