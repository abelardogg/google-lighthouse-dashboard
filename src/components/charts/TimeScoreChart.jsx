import React from 'react';
import Chart from "react-google-charts";

export default function TimeScoreChart(props){
    let arr = [['date', props.label]];
    arr = arr.concat(props.list)
    // debugger
    return <>
        <div style={{ display: 'flex', maxWidth: '100%' }}>
                <Chart
                    width={'100%'}
                    height={300}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={arr}
                    options={{
                        title: props.title,
                        chartArea: { width: '80%' },
                        hAxis: {
                            title: 'Date',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Time (in seconds)',
                        },
                        colors: props.color
                    }}
                    legendToggle
                />
            </div>
    </>;
}