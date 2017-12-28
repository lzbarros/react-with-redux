import Axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

module.exports = {
    add(data){
        return Axios.post(URL, data)
    },
    
    search(data){
        return Axios.get(URL + '?' + data)
    },

    delete(id, callBack){
        return Axios.delete(URL + '/' + id)
    },

    put(id, data){
        return Axios.put(URL + '/' + id, data)
    }
}