import React from 'react';
import Chart from "react-google-charts";

export default function FCP(props){
    let arr = [['date', 'FCP']];
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
                        title: 'First Contentful Paint',
                        chartArea: { width: '80%' },
                        hAxis: {
                            title: 'Lighthouse metrics',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Time (in seconds)',
                        },
                        colors: ['#ff0000']
                    }}
                    legendToggle
                />
            </div>
    </>;
}