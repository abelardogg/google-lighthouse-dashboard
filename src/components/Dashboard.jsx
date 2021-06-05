import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FCP from './charts/FCP';
import LCP from './charts/LCP';
import FMP from './charts/FMP';




class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestUrl: null,
            data: {
                FCP: [],
                LCP: [],
                FMP: [],
            }
        };
    }

    requestData = () => {
        fetch('http://localhost:3004/data')
            .then(res => res.json())
            .then(result => {
                console.info(`Results size: ${result.length}`)
                const dateList = this.getDate(result);
                const fcpList = this.getFcp(result, dateList);
                const lcpList = this.getLCP(result, dateList);
                const fmpList = this.getFMP(result, dateList);

                let data = {
                    FCP: fcpList,
                    LCP: lcpList,
                    FMP: fmpList,
                }
                
                this.setState({ data: data })
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

    getFcp = (results, dateList) => {
        let list = [], dataList = [];
        for (let i = 0; i < results.length; i++) {
            let result = results[i].audits["first-contentful-paint"];
            list.push(Number(result.displayValue.replace('s', '')))
        }

        for (let i = 0; i < list.length; i++) {
            const dataByDate = [
                dateList[i], 
                list[i]
            ];
            dataList.push(dataByDate);
        }

        return dataList;
    }

    getLCP = (results, dateList) => {
        let list = [], dataList = [];
        for (let i = 0; i < results.length; i++) {
            let result = results[i].audits["largest-contentful-paint"];
            list.push(Number(result.displayValue.replace('s', '')))
        }

        for (let i = 0; i < list.length; i++) {
            const dataByDate = [
                dateList[i], 
                list[i]
            ];
            
            dataList.push(dataByDate);
        }
        
        return dataList;
    }

    getFMP = (results, dateList) => {
        let list = [], dataList = [];
        for (let i = 0; i < results.length; i++) {
            let result = results[i].audits["first-meaningful-paint"];
            list.push(Number(result.displayValue.replace('s', '')))
        }

        for (let i = 0; i < list.length; i++) {
            const dataByDate = [
                dateList[i], 
                list[i]
            ];
            dataList.push(dataByDate);
        }
        return dataList;
    }

    componentDidMount() {
        this.requestData()

    }

    render() {
        if (this.state.data.FCP.length === 0) {
            return null;
        }
      

        
        return <>
        <Row>
            <Col>
                <FCP list={this.state.data.FCP}/>
            </Col>
        </Row>
        <Row>
            <Col>
                <LCP list={this.state.data.LCP}/>
            </Col>
        </Row>
        <Row>
            <Col>
                <FMP list={this.state.data.FMP}/>
            </Col>
        </Row>
        </>
    }
}

export default Dashboard;
