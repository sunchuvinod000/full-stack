import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      users: [],
      id: 0,
      name: '',
      email: '',
      password: ''

    };
    this.nameChange = this.nameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    
  }
  componentDidMount() {
    axios.get('/read').then((res) => {
 
      this.setState({
        users: res.data,
        id: 0,
        name: '',
        email: '',
        password: ''
      })

    })


  }
  nameChange(event) {
    this.setState({name: event.target.value});
  }
  emailChange(event) {
    this.setState({email: event.target.value});
  }
  passwordChange(event) {
    this.setState({password: event.target.value});
  }
  handleSubmit(event, id) {
    
    event.preventDefault();
    if (id === 0) {
      
      axios.post('/', { id: this.state.id, name: this.state.name, email: this.state.email, password: this.state.password }).then((res)=>{
        alert(res.data)
        this.componentDidMount()
      })
      
      
    
    }
    else {
      axios.put(`/${id}`, { id: this.state.id, name: this.state.name, email: this.state.email, password: this.state.password }).then((res)=>{
        alert(res.data)
        this.componentDidMount()
      })
        
      
    }
  }

 editapi(id){
   const url = `/${id}`
   axios.get(url).then((res)=>{
     
     this.setState({
       id: res.data[0].id,
       name: res.data[0].name,
       email: res.data[0].email,
       password: res.data[0].password
     }
     )
    
   })
   

 }



  deleteapi(id) {
  
    const url = `/${id}`
    axios.delete(url).then((res) =>{
      alert(res.data)
      this.componentDidMount()
    })
    

     
 
   
  }
  render() {


    return (
      <div className="App">
        <div className="card-panel teal lighten-2"><h5>CURD Operations using NODE REACT & SQL</h5></div>

        <div className="row">
          <div className="col   offset-s1">
            <form onSubmit={(e) => { this.handleSubmit(e, this.state.id ) }} >
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input type="text" id="autocomplete-input1" value={this.state.name} onChange={this.nameChange} />
                <label htmlFor="autocomplete-input">Name</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input type="email" id="autocomplete-input2" value={this.state.email} onChange={this.emailChange} />
                <label htmlFor="autocomplete-input">email</label>
              </div>
              <div className="input-field col s12 ">
                <i className="material-icons prefix">vpn_key</i>
                <input type="password" id="autocomplete-input3" value={this.state.password} onChange={this.passwordChange} />
                <label htmlFor="autocomplete-input">password</label>
              </div>

              <div>
                <button className="btn waves-effect waves-light " type="submit" name="action" onClick={(e) => { this.handleSubmit(e, this.state.id) }}>Submit
                  <i className="material-icons right">send</i>
                </button>
              </div>

            </form>

          </div>
          <div className="col s5 ">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                 
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>

                {this.state.users.map((person) =>

                  <tr key={person.id}>
                    <td>{person.name}</td>
                    <td>{person.email}</td>
                    <td>{person.password}</td>
                    <td>
                      <button className="btn waves-effect waves-light " type="submit" name="action" onClick={(e) => { this.editapi(person.id) }}>
                  <i className="material-icons center">edit</i>
                      </button>

                    </td>
                    <td>
                      <button className="btn waves-effect waves-light " type="submit" name="action" onClick={(e) => { this.deleteapi(person.id) }}>
                          <i className="material-icons center">delete</i>
                      </button>

                    </td>


                  </tr>
                )}




              </tbody>
            </table>


          </div>

        </div>



      </div>
    );
  }
}

export default App;
