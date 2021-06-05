import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ScoreChart from './charts/ScoreChart';


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
                maxFID: [],
                CLS: [],
                serverResponseTime: [],
                interactive: [],
                firstCpuIdle: [],
                mainThreadWork: [],
                bootupTime: [],
                networkRTT: [],
                speedIndex: []
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
                    CLS: this.generateRegisterBasedOnTimeScore(result, dateList, 'cumulative-layout-shift'),
                    serverResponseTime: this.generateRegisterBasedOnTimeScore(result, dateList, 'server-response-time'),
                    interactive: this.generateRegisterBasedOnTimeScore(result, dateList, 'interactive'),
                    firstCpuIdle: this.generateRegisterBasedOnTimeScore(result, dateList, 'first-cpu-idle'),
                    mainThreadWork: this.generateRegisterBasedOnTimeScore(result, dateList, 'mainthread-work-breakdown'),
                    bootupTime: this.generateRegisterBasedOnTimeScore(result, dateList, 'bootup-time'),
                    networkRTT: this.generateRegisterBasedOnTimeScore(result, dateList, 'network-rtt'),
                    speedIndex: this.generateRegisterBasedOnTimeScore(result, dateList, 'speed-index'),
                    

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
            let numericUnit = result.numericUnit;
            
            if(numericUnit==='millisecond'){
                list.push(result.numericValue/1000);
            } else if(numericUnit==='second' || numericUnit === 'unitless'){
                list.push(result.numericValue);
            } else {
                console.error(`The following value for ${auditName} can't be formatted: ${result.displayValue}`)
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
        <Row className="mb-3">
            <Col>
                <h2>Charts with score based in time</h2>
            </Col>
        </Row>
        <Row>
            <Col>
                <ScoreChart list={this.state.data.FCP} title='First Contentful Paint' label='Load time' color={['#0066cc']} vTitle='Time (in seconds)' description="First Contentful Paint marks the time at which the first text or image is painted. [Learn more](https://web.dev/first-contentful-paint/)."/>
            </Col>
        </Row>
        <Row>
            <Col>
                <ScoreChart list={this.state.data.LCP} title='Largest Contentful Paint' label='Load time' color={['#f6a6cc']}  vTitle='Time (in seconds)' description="Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more](https://web.dev/lighthouse-largest-contentful-paint/)"/>
            </Col>
        </Row>
        <Row>
            <Col>
                <ScoreChart list={this.state.data.FMP} title='First Meaningful Paint' label='Load time' color={['#caf80f']}  vTitle='Time (in seconds)' description="First Meaningful Paint measures when the primary content of a page is visible. [Learn more](https://web.dev/first-meaningful-paint/)."/>
            </Col>
        </Row>
        <Row>
            <Col>
                <ScoreChart list={this.state.data.speedIndex} title='Speed Index' label='Load time' color={['#af0f22']}  vTitle='Time (in seconds)' description="Speed Index shows how quickly the contents of a page are visibly populated. [Learn more](https://web.dev/speed-index/)."/>
            </Col>
        </Row>
        <Row>
            <Col>
                <ScoreChart list={this.state.data.inputLatency} title='Estimated Input Latency' label='Load time' color={['#fac190']}  vTitle='Time (in seconds)' description="Estimated Input Latency is an estimate of how long your app takes to respond to user input, in milliseconds, during the busiest 5s window of page load. If your latency is higher than 50 ms, users may perceive your app as laggy. [Learn more](https://web.dev/estimated-input-latency/)."/>
            </Col>
        </Row>
        <Row>
            <Col>
                <ScoreChart list={this.state.data.blockingTime} title='Total Blocking Time' label='Load time' color={['#00fa21']}  vTitle='Time (in seconds)' description="Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more](https://web.dev/lighthouse-total-blocking-time/)."/>
            </Col>
        </Row>
        <Row>
            <Col>
                <ScoreChart list={this.state.data.maxFID} title='Max Potential First Input Delay' label='Load time' color={['#f00ff0']}  vTitle='Time (in seconds)' description="The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more](https://web.dev/lighthouse-max-potential-fid/)."/>
            </Col>
        </Row>

        <Row>
            <Col>
                <ScoreChart list={this.state.data.serverResponseTime} title='Reduce initial server response time' label='Load time' color={['#9f7a5b']}  vTitle='Time (in seconds)' description="Keep the server response time for the main document short because all other requests depend on it. [Learn more](https://web.dev/time-to-first-byte/)."/>
            </Col>
        </Row>

        <Row>
            <Col>
                <ScoreChart list={this.state.data.interactive} title='Time to Interactive' label='Load time' color={['#1f7c5b']}  vTitle='Time (in seconds)' description="Time to interactive is the amount of time it takes for the page to become fully interactive. [Learn more](https://web.dev/interactive/)."/>
            </Col>
        </Row>

        <Row>
            <Col>
                <ScoreChart list={this.state.data.firstCpuIdle} title='First CPU Idle' label='Load time' color={['#901b50']}  vTitle='Time (in seconds)' description="First CPU Idle marks the first time at which the page's main thread is quiet enough to handle input.  [Learn more](https://web.dev/first-cpu-idle/)."/>
            </Col>
        </Row>

        <Row>
            <Col>
                <ScoreChart list={this.state.data.mainThreadWork} title='Minimize main-thread work' label='Load time' color={['#00bbbb']}  vTitle='Time (in seconds)' description="Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/mainthread-work-breakdown/)"/>
            </Col>
        </Row>

        <Row>
            <Col>
                <ScoreChart list={this.state.data.bootupTime} title='Reduce JavaScript execution time' label='Load time' color={['#aa00ff']}  vTitle='Time (in seconds)' description="Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/)."/>
            </Col>
        </Row>

        <Row>
            <Col>
                <ScoreChart list={this.state.data.networkRTT} title='Network Round Trip Times' label='Load time' color={['#000000']}  vTitle='Time (in seconds)' description="Server latencies can impact web performance. If the server latency of an origin is high, it's an indication the server is overloaded or has poor backend performance. [Learn more](https://hpbn.co/primer-on-web-performance/#analyzing-the-resource-waterfall)."/>
            </Col>
        </Row>


        <hr/>

        <Row className="mb-3">
            <Col>
                <h2>Charts with score based in points</h2>
            </Col>
        </Row>

        <Row>
            <Col>
                <ScoreChart list={this.state.data.CLS} title='Cumulative Layout Shift' label='CLS points' color={['#69c2af']}  vTitle='Points'  description="Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more](https://web.dev/cls/)."/>
            </Col>
        </Row>

        </>
    }
}

export default Dashboard;


