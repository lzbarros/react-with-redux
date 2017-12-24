import React from 'react'
import PageHeader from '../template/pageHeader'
import TodoService from '../services/todo'
import TodoForm from './todoForm'
import TodoList from './todoList'

export default class Todo extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            description: '', 
            list: [] 
        }

        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.refresh = this.refresh.bind(this)

        this.refresh();
    }

    handleChange(e){
        let id = e.target.id;
        let value = e.target.value;

        this.setState({...this.state, [id]: value})        
    }

    handleSearch(){
        this.refresh(this.state.description)
    }

    handleClear(){        
        this.refresh()
    }

    handleAdd(e){                
        e.preventDefault()        
        let self = this
        let description = this.state.description;
        TodoService.addTask({description}, (data) => {            
            self.refresh()                        
        });
    }

    handleDelete(todo){
        let self = this
        TodoService.delete(todo._id, (data) => {
            self.refresh(self.state.description)
        })
    }

    handleMarkAsDone(todo){
        let self = this
        TodoService.put(todo._id, {...todo, done: true}, (data) => {
            self.refresh(self.state.description)
        })
    }

    handleMarkAsPending(todo){
        let self = this
        TodoService.put(todo._id, {...todo, done: false}, (data) => {
            self.refresh(self.state.description)
        })
    }

    refresh(description = ''){        
        let self = this
        const search = description ? `&description__regex=/${description}/` : ''
        TodoService.refresh('sort=-createdAt' + search, (data) => {            
            self.setState({...this.state, description: description, list: data})
        });        
    }

    render() {
        return (
            <div>
                <PageHeader name='Tasks' small='Register' />
                <TodoForm 
                    description={this.state.description} 
                    handleSearch={this.handleSearch}
                    handleAdd={this.handleAdd} 
                    handleChange={this.handleChange} 
                    handleClear={this.handleClear}
                />
                <TodoList 
                    list={this.state.list} 
                    handleDelete={this.handleDelete} 
                    handleMarkAsDone={this.handleMarkAsDone} 
                    handleMarkAsPending={this.handleMarkAsPending}                    
                />
            </div>
        )
    }
}

