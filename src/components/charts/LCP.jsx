import React from 'react';
import Chart from "react-google-charts";

export default function LCP(props){
    let arr = [['date', 'LCP']];
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
                        title: 'Largest Contentful Paint',
                        chartArea: { width: '80%' },
                        hAxis: {
                            title: 'Lighthouse metrics',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Time (in seconds)',
                        },
                    }}
                    legendToggle
                />
            </div>
    </>;
}