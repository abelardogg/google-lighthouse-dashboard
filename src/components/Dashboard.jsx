import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TimeScoreChart from './charts/TimeScoreChart';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestUrl: null,
            data: {
                FCP: [],
                LCP: [],
                FMP: [],
                inputLatency: [],
                blockingTime: [],
                maxFID: []
            }
        };
    }

    requestData = () => {
        fetch('http://localhost:3004/data')
            .then(res => res.json())
            .then(result => {
                console.info(`Results size: ${result.length}`)
                const dateList = this.getDate(result);

                let data = {
                    inputLatency: this.generateRegisterBasedOnTimeScore(result, dateList, 'estimated-input-latency'),
                    FCP: this.generateRegisterBasedOnTimeScore(result, dateList, 'first-contentful-paint'),
                    LCP: this.generateRegisterBasedOnTimeScore(result, dateList, 'largest-contentful-paint'),
                    FMP: this.generateRegisterBasedOnTimeScore(result, dateList, 'first-meaningful-paint'),
                    blockingTime: this.generateRegisterBasedOnTimeScore(result, dateList, 'total-blocking-time'),
                    maxFID: this.generateRegisterBasedOnTimeScore(result, dateList, 'max-potential-fid'),

                }
                
                this.setState({ data: data })
            });
    }

    /**
     * 
     */
    generateRegisterBasedOnTimeScore = (results, dateList, auditName) => {
        let list = [], dataList = [];
        for (let i = 0; i < results.length; i++) {
            let result = results[i].audits[auditName];
            let timeUnit = result.displayValue.split(/\s/)[1];
            let score = Number(result.displayValue.split(/\s/)[0].replace(/[\.,]/g,''));
            if(timeUnit==='ms'){
                list.push(score/1000);
            } else if(timeUnit==='s'){
                list.push(score);
            } else {
                console.error(`The following value for ${auditName} can'tbe formatted: ${result.displayValue}`)
            }
        }

        for (let i = 0; i < list.length; i++) {
            const dataByDate = [
                dateList[i], 
                list[i]
            ];
            dataList.push(dataByDate);
        }

        return dataList;
    };

    getDate = results => {
        let list = [];
        for (let i = 0; i < results.length; i++) {
            let result = results[i]

            list.push(`${new Date(result.fetchTime).toLocaleString().split(' ')[0]}`)
        }
        return list;
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
                <h2>Charts with score based in time</h2>
            </Col>
        </Row>
        <Row>
            <Col>
                <TimeScoreChart list={this.state.data.FCP} title='First Contentful Paint' label='Load time' color={['#0066cc']}/>
            </Col>
        </Row>
        <Row>
            <Col>
                <TimeScoreChart list={this.state.data.LCP} title='Largest Contentful Paint' label='Load time' color={['#f6a6cc']}/>
            </Col>
        </Row>
        <Row>
            <Col>
                <TimeScoreChart list={this.state.data.FMP} title='First Meaningful Paint' label='Load time' color={['#caf80f']}/>
            </Col>
        </Row>
        <Row>
            <Col>
                <TimeScoreChart list={this.state.data.inputLatency} title='Estimated Input Latency' label='Load time' color={['#fac190']}/>
            </Col>
        </Row>
        <Row>
            <Col>
                <TimeScoreChart list={this.state.data.blockingTime} title='Total Blocking Time' label='Load time' color={['#00fa21']}/>
            </Col>
        </Row>
        <Row>
            <Col>
                <TimeScoreChart list={this.state.data.maxFID} title='Max Potential First Input Delay' label='Load time' color={['#f00ff0']}/>
            </Col>
        </Row>

        </>
    }
}

export default Dashboard;


