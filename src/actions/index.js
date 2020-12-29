import * as types from '../constants/ActionTypes'
import superagent from 'superagent'

const BASE_URL = 'http://localhost:10120'

// export const addTodo = text => ({ type: types.ADD_TODO, text })
export const addTodo = text => {
  return dispatch => {
    return superagent
      .post(`${BASE_URL}/items`)
      .send({ text: text, completed: false })
      .end((err, res) => {
        dispatch({ type: types.ADD_TODO, id: res.body.data.id, text: text, completed: false })
      })
  }
}

// export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const deleteTodo = id => {
  return dispatch => {
    return superagent
      .delete(`${BASE_URL}/items/${id}`)
      .end((err, res) => dispatch({ type: types.DELETE_TODO, id }))
  }
}

// export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const editTodo = (id, text) => {
  return dispatch => {
    return superagent
      .patch(`${BASE_URL}/items/${id}`)
      .send({ text: text })
      .end((err, res) => dispatch({ type: types.EDIT_TODO, id: id, text: text }))
  }
}

// Before click just toggled the state, now we need to pass correct state to back end
// export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeTodo = (id, state) => {
  return dispatch => {
    return superagent
      .patch(`${BASE_URL}/items/${id}`)
      .send({ completed: state })
      .end((err, res) => dispatch({ type: types.COMPLETE_TODO, id: id, completed: state }))
  }
}

// New get function
export const getTodos = () => {
  return dispatch => {
    return superagent
      .get(`${BASE_URL}/items`)
      .end((err, res) => {
        if (err)
          dispatch({ type: types.GET_TODOS, data: [] })
        else
          dispatch({ type: types.GET_TODOS, data: res.body.data })
      })
  }
}

// As BE is extremely general REST API we need to collect id's in the Front and do multiple updates

// export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const completeAll = items => {
  return dispatch => {
    var promises = items.map(item => {
      return new Promise((resolve, reject) => {
        superagent
          .patch(`${BASE_URL}/items/${item.id}`)
          .send({ completed: item.completed })
          .end((err, res) => resolve())
      })
    })
    Promise.all(promises).then(results => dispatch(({ type: types.COMPLETE_ALL })))
  }
}

// export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
export const clearCompleted = ids => {
  return dispatch => {
    var promises = ids.map(id => {
      return new Promise((resolve, reject) => {
        superagent
          .delete(`${BASE_URL}/items/${id}`)
          .end((err, res) => resolve())
      })
    })
    Promise.all(promises).then(results => dispatch(({ type: types.CLEAR_COMPLETED })))
  }
}
