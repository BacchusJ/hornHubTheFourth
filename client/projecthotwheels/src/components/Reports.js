import React, {Component} from 'react';
import '../stylesMenu/styleM.css'

export class Reports extends Component {

constructor() {
  super()

  this.state = {
    reports: [],
    plate:'',
    state:'',
    email:'',

  }
}


  componentDidMount(){
      this.populateAllReports ()

  }



//the function below will display on our React page the items entered
populateAllReports = () => {

  fetch('http://localhost:8000/api/reports')
  .then(response => response.json())
  .then(json => {
    console.log('json', json)
    this.setState({
      reports: json.sort((function(a, b){
        return new Date(b.createdAt) - new Date(a.createdAt)
      }))
    })
  })
}

handleTextchange = (e) => {

this.setState({
  [e.target.name]: e.target.value
})
}

handleSaveClick = () => {

  fetch('http://localhost:8000/api/reports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      plate:this.state.plate,
      state:this.state.state,
      email:this.state.email,
    })
  }).then(response => response.json())
    .then(result => {
      if(result.success) {
        //go fetch the books and display them on REACT page
        this.populateAllReports()
      }else {
        //show error
      }
    })
}


//this is what renders the items on to my REACT page.
render() {

  let style = {
    listStyle: "none",
    width: "40%"
  };

  let reports = this.state.reports
  let reportItems = reports.map((report) => {
    return(
      <div style={style}>
      <br/>
      <li>{report.plate}</li>
      <li>{report.state}</li>
      <li>{report.email}</li>
      <br/>
      <hr/>
      </div>
    )
  })
  return(
    <div className="mainRep">
    <center><h1 className="mkRep">Make a report for your missing vehicle.</h1></center>
        <center><div>
          <input onChange ={this.handleTextchange} placeholder ="Enter License Plate"type ="text" name="plate"/>
          <input onChange ={this.handleTextchange}placeholder ="Enter State"type ="text" name="state"/>
          <input onChange ={this.handleTextchange}placeholder ="Email"type ="text" name="email"/>
          <button onClick={this.handleSaveClick}>Submit</button>
          {reportItems}
    </div></center>

    </div>

  )

    // <div>
    //   <h1>Hot Wheels</h1>
    //   <div>
    //     <h2>Report a missing vehicle</h2>
    //   <input placeholder ="Enter License Plate"type ="text" plate="Enter License Plate"/>
    //   <input placeholder ="Enter State"type ="text" state="State"/>
    //   </div>
    //
    //
    // </div>



}
}
