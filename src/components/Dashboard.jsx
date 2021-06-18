import React from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { updateChart } from '../redux/actions/charts';

import DataReader from './DataReader'

import ScoreChart from './charts/ScoreChart';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    

    /**
     * 
     */
    


    componentDidMount() {
        

    }

    render() {

       

        if (this.props.charts.noDataAvaialble === true) {
            return <> 
            <h1>
                looks like there are no data to track
            </h1>
            <DataReader/>
            </>
        }
      
        
        return <>
        <Row className="mb-3">
            <Col>
                <DataReader/>
            </Col>
        </Row>
        <Row className="mb-3">
            <Col>
                <h2>Charts with score based in time</h2>
            </Col>
        </Row>
        <Row>
            <Col>
                <ScoreChart list={this.props.charts.data.FCP} title='First Contentful Paint' label='Load time' color={['#0066cc']} vTitle='Time (in seconds)' description="First Contentful Paint marks the time at which the first text or image is painted. [Learn more](https://web.dev/first-contentful-paint/)."/>
            </Col>
        </Row>
        <Row>
            <Col>
                <ScoreChart list={this.props.charts.data.LCP} title='Largest Contentful Paint' label='Load time' color={['#f6a6cc']}  vTitle='Time (in seconds)' description="Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more](https://web.dev/lighthouse-largest-contentful-paint/)"/>
            </Col>
        </Row>
        <Row>
            <Col>
                <ScoreChart list={this.props.charts.data.FMP} title='First Meaningful Paint' label='Load time' color={['#caf80f']}  vTitle='Time (in seconds)' description="First Meaningful Paint measures when the primary content of a page is visible. [Learn more](https://web.dev/first-meaningful-paint/)."/>
            </Col>
        </Row>
        <Row>
            <Col>
                <ScoreChart list={this.props.charts.data.speedIndex} title='Speed Index' label='Load time' color={['#af0f22']}  vTitle='Time (in seconds)' description="Speed Index shows how quickly the contents of a page are visibly populated. [Learn more](https://web.dev/speed-index/)."/>
            </Col>
        </Row>

        <Row>
            <Col>
                <ScoreChart list={this.props.charts.data.blockingTime} title='Total Blocking Time' label='Load time' color={['#00fa21']}  vTitle='Time (in seconds)' description="Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more](https://web.dev/lighthouse-total-blocking-time/)."/>
            </Col>
        </Row>
        <Row>
            <Col>
                <ScoreChart list={this.props.charts.data.maxFID} title='Max Potential First Input Delay' label='Load time' color={['#f00ff0']}  vTitle='Time (in seconds)' description="The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more](https://web.dev/lighthouse-max-potential-fid/)."/>
            </Col>
        </Row>

        <Row>
            <Col>
                <ScoreChart list={this.props.charts.data.serverResponseTime} title='Reduce initial server response time' label='Load time' color={['#9f7a5b']}  vTitle='Time (in seconds)' description="Keep the server response time for the main document short because all other requests depend on it. [Learn more](https://web.dev/time-to-first-byte/)."/>
            </Col>
        </Row>

        <Row>
            <Col>
                <ScoreChart list={this.props.charts.data.interactive} title='Time to Interactive' label='Load time' color={['#1f7c5b']}  vTitle='Time (in seconds)' description="Time to interactive is the amount of time it takes for the page to become fully interactive. [Learn more](https://web.dev/interactive/)."/>
            </Col>
        </Row>
        <Row>
            <Col>
                <ScoreChart list={this.props.charts.data.mainThreadWork} title='Minimize main-thread work' label='Load time' color={['#00bbbb']}  vTitle='Time (in seconds)' description="Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/mainthread-work-breakdown/)"/>
            </Col>
        </Row>

        <Row>
            <Col>
                <ScoreChart list={this.props.charts.data.bootupTime} title='Reduce JavaScript execution time' label='Load time' color={['#aa00ff']}  vTitle='Time (in seconds)' description="Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/)."/>
            </Col>
        </Row>

        <Row>
            <Col>
                <ScoreChart list={this.props.charts.data.networkRTT} title='Network Round Trip Times' label='Load time' color={['#000000']}  vTitle='Time (in seconds)' description="Server latencies can impact web performance. If the server latency of an origin is high, it's an indication the server is overloaded or has poor backend performance. [Learn more](https://hpbn.co/primer-on-web-performance/#analyzing-the-resource-waterfall)."/>
            </Col>
        </Row>


        <hr/>

        <Row className="mb-3">
            <Col>
                <h2>Charts with score based in points</h2>
                <h5>score points x100,000</h5>
            </Col>
        </Row>

        <Row>
            <Col>
                <ScoreChart list={this.props.charts.data.CLS} title='Cumulative Layout Shift' label='CLS points' color={['#69c2af']}  vTitle='Points'  description="Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more](https://web.dev/cls/)."/>
            </Col>
        </Row>

        </>
    }
}



const mapStateToProps = state => {
    return {
        charts: state.charts,
        data: state.data
    }
}
const mapDispatchToProps = () => {
    return {
        updateChart
    }
}
export default connect(mapStateToProps, mapDispatchToProps())(Dashboard)


