import Axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

module.exports = {
    addTask(data, callBack){
        Axios.post(URL, data).then( 
            resp => {
                callBack(resp.data)
            }
        )
    },
    
    refresh(data, callBack){
        Axios.get(URL + '?' + data).then(
            resp => {                 
                callBack(resp.data);
            }
        )
    },

    delete(id, callBack){
        Axios.delete(URL + '/' + id).then(
            resp => {
                callBack(resp.data)
            }
        )
    },

    put(id, data, callBack){
        Axios.put(URL + '/' + id, data).then(
            resp => {
                callBack(resp.data)
            }
        )
    }
}