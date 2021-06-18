import React from 'react';
import { connect } from 'react-redux';
import { addToCollection} from '../redux/actions/data';
import { updateChart } from '../redux/actions/charts';

class DataReader extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    reader = e => {
        e.preventDefault()
        const self = this;
        let fileContent = document.getElementById('test-text').files[0];

        const fileName = Number(fileContent.name.replace('.json',''))
        for(let i = 0; i < this.props.data.dataCollection.length; i++){
            const current = this.props.data.dataCollection[i]
            if(current.msDate === fileName){
                alert('same file')
                return
            }
        }
    

        const fileReader = new FileReader();
        let content = null;
        fileReader.onload = event => {
            content = JSON.parse(event.target.result);
            console.log(content);
            this.props.addToCollection(content)
            this.requestData();
        }
        
        fileReader.readAsText(fileContent, 'UTF-8');
        return;
    }

    requestData = () => {
        const result = this.props.data.dataCollection

        console.info(`Results size: ${result.length}`)
        const dateList = this.getDate(result);

        let data = {
            //inputLatency: this.generateRegisterBasedOnTimeScore(result, dateList, 'estimated-input-latency'),
            FCP: this.generateRegisterBasedOnTimeScore(result, dateList, 'first-contentful-paint'),
            LCP: this.generateRegisterBasedOnTimeScore(result, dateList, 'largest-contentful-paint'),
            FMP: this.generateRegisterBasedOnTimeScore(result, dateList, 'first-meaningful-paint'),
            blockingTime: this.generateRegisterBasedOnTimeScore(result, dateList, 'total-blocking-time'),
            maxFID: this.generateRegisterBasedOnTimeScore(result, dateList, 'max-potential-fid'),
            CLS: this.generateRegisterBasedOnTimeScore(result, dateList, 'cumulative-layout-shift', 100000),
            serverResponseTime: this.generateRegisterBasedOnTimeScore(result, dateList, 'server-response-time'),
            interactive: this.generateRegisterBasedOnTimeScore(result, dateList, 'interactive'),
            // firstCpuIdle: this.generateRegisterBasedOnTimeScore(result, dateList, 'first-cpu-idle'),
            mainThreadWork: this.generateRegisterBasedOnTimeScore(result, dateList, 'mainthread-work-breakdown'),
            bootupTime: this.generateRegisterBasedOnTimeScore(result, dateList, 'bootup-time'),
            networkRTT: this.generateRegisterBasedOnTimeScore(result, dateList, 'network-rtt'),
            speedIndex: this.generateRegisterBasedOnTimeScore(result, dateList, 'speed-index'),
        }

        this.props.updateChart(data)

    }

    generateRegisterBasedOnTimeScore = (results, dateList, auditName, multipler = null) => {
        let list = [], dataList = [];
        for (let i = 0; i < results.length; i++) {
            console.info(`audit name: ${auditName}`)
            let result = results[i].lighthouseAuditsResult[auditName];

            let numericUnit = result.numericUnit;
            if (multipler !== null){
                list.push(result.numericValue*multipler);
            } else if(numericUnit==='millisecond'){
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

            list.push(`${result.date} ${result.time}`)
        }
        return list;
    }

    render(){
        return <>
        <form onSubmit={e=>this.reader(e)}>
            <input id="test-text" type="file" accept=".json"/>
            <input id="test-btn" type="submit"/>
        </form>
        </>
    }
} 

const mapStateToProps = state => {
    return {
        data: state.data
    }
}
const mapDispatchToProps = () => {
    return {
        addToCollection,
        updateChart
    }
}
export default connect(mapStateToProps, mapDispatchToProps())(DataReader)
