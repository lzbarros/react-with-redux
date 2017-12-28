import TodoService from '../services/todo'

export const changeDescription = e => ({
    type: 'DESCRIPTION_CHANGED',
    payload: e.target.value
})

export const search = (search) => {
    let request = TodoService.search(search ? search : '')

    return {
        type: 'TODO_SEARCHED',
        payload: request
    }
}

export const clear = e => {
    return dispatch => {
        TodoService.search('sort=-createdAt')
            .then(resp => dispatch( {type: 'TODO_SEARCHED', payload: resp }))
            .then(resp => dispatch({type: 'DESCRIPTION_CHANGED', payload: ''}))
    }
}

export const add = (data) => {
    return dispatch => {
        TodoService.add(data)
            .then( resp => dispatch({type: 'TODO_ADDED', payload: resp}))        
            .then(resp => dispatch(search('sort=-createdAt')))
    }
}

export const markAsDone = (id, data) => {
    return dispatch => {
        TodoService.put(id, data)            
            .then(resp => dispatch(search('sort=-createdAt')))
    }
}

export const markAsPending = (id, data) => {
    return dispatch => {
        TodoService.put(id, data)                   
            .then(resp => dispatch(search('sort=-createdAt')))
    }
}

export const del = (id) => {
    return dispatch => {
        TodoService.delete(id)            
            .then(resp => dispatch(search('sort=-createdAt')))
    }
}