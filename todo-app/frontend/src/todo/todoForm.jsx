import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { changeDescription, search, add, clear } from './todoActions'
import IconButton from '../template/iconButton'

class TodoForm extends React.Component {

    constructor(props){
        super(props)

        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount(){
        this.props.search('sort=-createdAt')
    }

    keyHandler(e){
        const { add, search, clear, description } = this.props
        if (e.key === 'Enter') {
            e.shiftKey ? search(this.props.description ? `sort=-createdAt&description__regex=/${description}/` : 'sort=-createdAt') : add({ description })
        } else if (e.key === 'Escape') {
            clear()
        }
    }

    render() {
        return (
            <div role='form' className='todoForm'>
                <Row>
                    <Col xs={12} sm={9} md={10}>            
                        <input 
                            id='description' 
                            value={this.props.description}
                            className='form-control' 
                            placeholder='Add task' 
                            onKeyUp={this.keyHandler}
                            onChange={this.props.changeDescription}></input>
                    </Col>                    
                    <Col xs={12} sm={3} md={2}>                        
                        <IconButton style='primary' icon='plus' onClick={() => this.props.add({ description: this.props.description })}/>
                        <IconButton style='info' icon='search' onClick={() => this.props.search(this.props.description ? `sort=-createdAt&description__regex=/${this.props.description}/` : 'sort=-createdAt')}/>
                        <IconButton style='default' icon='close' onClick={this.props.clear}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({description: state.todo.description })
const mapDispatchToProps = dispatch => 
    bindActionCreators({ changeDescription, search, add, clear }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)