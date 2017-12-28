import React from 'react'
import PageHeader from '../template/pageHeader'
import TodoService from '../services/todo'
import TodoForm from './todoForm'
import TodoList from './todoList'

export default class Todo extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <PageHeader name='Tasks' small='Register' />
                <TodoForm />
                <TodoList />
            </div>
        )
    }
}

