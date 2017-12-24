import React from 'react'
import { Row, Col } from 'react-bootstrap'
import IconButton from '../template/iconButton'

export default props => {

    const keyHandler = (e) => {
        if (e.key === 'Enter') {
            e.shiftKey ? props.handleSearch(e) : props.handleAdd(e)
        } else if (e.key === 'Escape') {
            props.handleClear(e)
        }
    }

    return (
        <div role='form' className='todoForm'>
            <Row>
                <Col xs={12} sm={9} md={10}>            
                    <input 
                        id='description' 
                        value={props.description}
                        className='form-control' 
                        placeholder='Add task' 
                        onKeyUp={keyHandler}
                        onChange={props.handleChange}></input>
                </Col>                    
                <Col xs={12} sm={3} md={2}>                        
                    <IconButton style='primary' icon='plus' onClick={props.handleAdd}/>
                    <IconButton style='info' icon='search' onClick={props.handleSearch}/>
                    <IconButton style='default' icon='close' onClick={props.handleClear}/>
                </Col>
            </Row>
        </div>
    )
}