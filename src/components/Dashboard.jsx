import React from 'react';
import Chart from "react-google-charts";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestUrl: null,
            data: []
        };
    }

    requestData = () => {
        fetch('http://localhost:3004/data')
            .then(res => res.json())
            .then(result => {
                console.info(`Results size: ${result.length}`)
                const dateList = this.getDate(result);
                const fcpList = this.getFcp(result);
                const lcpList = this.getLCP(result);
                const fmpList = this.getFMP(result);

                let dataList = [];
                for (let i = 0; i < result.length; i++) {
                    const dataByDate = [
                        dateList[i], 
                        fcpList[i],
                        lcpList[i],
                        fmpList[i]
                    ];
                    dataList.push(dataByDate);
                }
                this.setState({ data: dataList })
            });
    }

    getDate = results => {
        let list = [];
        for (let i = 0; i < results.length; i++) {
            let result = results[i]

            list.push(`${new Date(result.fetchTime).toLocaleString().split(' ')[0]}`)
        }
        return list;
    }

    getFcp = results => {
        let list = [];
        for (let i = 0; i < results.length; i++) {
            let result = results[i].audits["first-contentful-paint"];
            list.push(Number(result.displayValue.replace('s', '')))
        }
        return list;
    }

    getLCP = results => {
        let list = [];
        for (let i = 0; i < results.length; i++) {
            let result = results[i].audits["largest-contentful-paint"];
            list.push(Number(result.displayValue.replace('s', '')))
        }
        return list;
    }

    getFMP = results => {
        let list = [];
        for (let i = 0; i < results.length; i++) {
            let result = results[i].audits["first-meaningful-paint"];
            list.push(Number(result.displayValue.replace('s', '')))
        }
        return list;
    }

    componentDidMount() {
        this.requestData()

    }

    render() {
        if (this.state.data.length == 0) {
            return null;
        }
        let arr = [
            ['m', 'FCP', 'LCP', 'FMP'],
        ]

        arr = arr.concat(this.state.data)
        return <>

            <div style={{ display: 'flex', maxWidth: '100%' }}>
                <Chart
                    width={400}
                    height={300}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={arr}
                    options={{
                        title: this.state.requestUrl,
                        chartArea: { width: '30%' },
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
        </>
    }
}

export default Dashboard;
