import React, { Component, Fragment } from 'react'
import './styles.css';
import { connect } from 'react-redux';
import { addName } from './actions/actionCreators';
// import { initialize, dataModule } from './initialize'

// initialize();

// const posts = dataModule.dataset("tasks")

const dummyList = [{
  id: 1,
  name: "Meeting",
  deadline: "2019-08-02"
}]

class App extends Component {

  state = {
    name: '',
    list: [],
    deadline: ''
  }

  componentWillMount() {
    this.getTasks()
  }

  addTask = async () => {
    const { name, list } = this.state
    // const subList = await posts.insert([{ name }]).execute()
    const subList = [{
      id: Math.random(),
      name,
      deadline: ""
    }]
    if (subList.length > 0) this.setState({ list: [...list, ...subList] })
  }

  getTasks = async () => {
    // const list = await posts.select().execute()
    const list = dummyList
    if (list.length > 0) this.setState({ list })
  }

  deleteTask = async id => {
    const { list } = this.state
    // const deletedList = await posts.delete().where(field => field("id").isLike(id)).execute()
    const deletedList = list.filter(item => item.id === id)
    if (deletedList.length > 0) this.setState({ list: list.filter(item => item.id !== deletedList[0].id) })
  }

  updateTask = async (id, name, deadline) => {
    const { list } = this.state
    // const updatedList = await posts.update([{ name, deadline }]).where(field => field("id").isLike(id)).execute()
    const updatedList = [{ id, name, deadline }]
    if (updatedList.length > 0) this.setState({ list: list.map(item => item.id === updatedList[0].id ? updatedList[0] : item) })
  }

  update = id => {
    const { list } = this.state
    const data = list.filter(value => value.id === id)[0]
    this.updateTask(id, data.name, data.deadline)
    this.setState({ deadline: '' })
  }

  render() {
    const { list, deadline } = this.state
    return (
      <main className='container'>
        <h1 className='header'> Task Manager</h1>
        <label className='labelStyle'><span className='notesEmoji' role="img" aria-label="notes">&#128221;</span>Add Task:  &nbsp;</label>
        <div>
          <input className='inputStyle' onChange={e => this.setState({ name: e.target.value })} />
          <button className='buttonStyle' onClick={this.addTask}>Add</button>
        </div>
        <ol>
          {list.map(item =>
            <li><input className='listInput' onChange={e => this.setState({ list: list.map(value => value.id === item.id ? { ...value, name: e.target.value } : value) })} value={item.name} />
              {(item.deadline || deadline === item.id) ? <input className='listInputDeadline' value={item.deadline} onChange={e => this.setState({ list: list.map(value => value.id === item.id ? { ...value, deadline: e.target.value } : value) })} type="date" defaultValue={item.deadline} /> :
                <button className='itemButton' onClick={() => this.setState({ deadline: item.id })}>Add Deadline</button>}
              <button className='itemButton' onClick={() => this.update(item.id)}>Update</button>
              <button className='itemButton' style={{ color: 'red' }} onClick={() => this.deleteTask(item.id)}>X</button></li>
          )}
        </ol>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  name: state.name,
  list: state.list,
  deadline: state.deadline
});

const mapDispatchToProps = dispatch => ({
  addName: (name) => dispatch(addName(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);