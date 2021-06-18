import React from 'react';
import { connect } from 'react-redux';
import { addToCollection} from '../redux/actions/data';


class DataReader extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    reader = e => {
        e.preventDefault()
        let fileContent = document.getElementById('test-text').files[0];
        const fileReader = new FileReader();
        let content = null;
        fileReader.onload = event => {
            content = JSON.parse(event.target.result);
            console.log(content);
            this.props.addToCollection(content)
        }
        
        fileReader.readAsText(fileContent, 'UTF-8');
        return;
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
        addToCollection
    }
}
export default connect(mapStateToProps, mapDispatchToProps())(DataReader)
