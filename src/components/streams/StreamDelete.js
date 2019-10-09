import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import {fetchStream, deleteStream} from '../../actions/index'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component{

    componentDidMount () {
        this.props.fetchStream(this.props.match.params.id)
    }

    renderAaction () {
        const { id }= this.props.match.params
        return ( 
            <React.Fragment>
                <button 
                    onClick={() => this.props.deleteStream(id)} 
                    className="ui button primary">Delete</button>
                    
                <Link to={'/'} className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }
    rendercontent() {
        if(!this.props.stream){
            return 'Are you sure you want to delete this stream'
        }
        return `Are you sure you want to delete this title:${this.props.stream.title}`
    }
    render(){
        return (
            <Modal 
                title="Delete Stream"
                content={this.rendercontent()}
                actions={this.renderAaction()} 
                onDismiss={() => history.push('/')}/>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}

}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);