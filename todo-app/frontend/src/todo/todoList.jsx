import React from 'react'
import IconButton from '../template/iconButton'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { markAsDone, markAsPending, del } from './todoActions'

const TodoList = props => {

    const renderRows = () => {
        const list = props.list || []
        const key = 1;
        return list.map(todo => (                        
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone' : ''} >{todo.description}</td>
                <td>
                    <IconButton style='success' icon='check' onClick={() => props.markAsDone(todo._id, {...todo, done: true})} hide={todo.done} />
                    <IconButton style='warning' icon='undo' onClick={() => props.markAsPending(todo._id, {...todo, done: false})} hide={!todo.done} />
                    <IconButton style='danger' icon='trash-o' onClick={() => props.del(todo._id)} hide={!todo.done} />
                </td>
            </tr>
        ))
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Description</th>
                    <th className='tableActions'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({list: state.todo.list})
const mapDispatchToProps = dispatch => bindActionCreators({ markAsDone, markAsPending, del }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)