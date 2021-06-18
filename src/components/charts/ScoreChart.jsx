import React from 'react';
import Chart from "react-google-charts";

export default function ScoreChart(props){
    let arr = [['date', props.label]];
    arr = arr.concat(props.list)
    // debugger
    return <>
        <div>
            <h5>{props.title}</h5>
            <h6>{props.description}</h6>

        </div>
        <div style={{ display: 'flex', maxWidth: '100%' }}>
                <Chart
                    width={'100%'}
                    height={300}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={arr}
                    options={{
                        //title: props.title,
                        description: '',
                        chartArea: { width: '80%' },
                        hAxis: {
                            title: 'Date',
                            minValue: 0,
                        },
                        vAxis: {
                            title: props.vTitle,
                        },
                        colors: props.color
                    }}
                    legendToggle
                />
            </div>
    </>;
}