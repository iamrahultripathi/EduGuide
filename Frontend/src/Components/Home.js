import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = ({ prediction, setPrediction })=>{
    const navigate = useNavigate();

    const onSubmitHandler = (event) => {
      event.preventDefault();
      const GRE_total = document.getElementById("GRE-total");
      const Verbal = document.getElementById("Verbal");
      const Quants = document.getElementById("Quants");
      const Gpa = document.getElementById("Gpa");
      const TOEFL = document.getElementById("TOEFL");
      const AWA = document.getElementById("AWA");
      const Tier = document.getElementById("Tier");
      const Publications = document.getElementById("Publications");
      const Work_ex = document.getElementById("Work-ex");
      const X_new = [
        [
          parseInt(GRE_total.value),
          parseInt(Verbal.value),
          parseInt(Quants.value),
          parseInt(AWA.value),
          parseInt(TOEFL.value),
          parseFloat(Gpa.value), // Use parseFloat to handle decimal values
          parseInt(Tier.value),
          parseInt(Work_ex.value),
          parseInt(Publications.value),
          0
        ]
      ];
      // console.log(X_new);
  
  
      // Assuming you have some variable named 'dataToSend'
      // const X_new = [[0.862745, 0.857143, 0.739130, 0.833333, 1.000000, 0.886650, 1.0, 0.5, 0.0, 0.0]];
      // const X_new = [[322,165,157,4,106,9.32,3,2,3,0]];
  fetch('http://127.0.0.1:4000/api/predict', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ X_new: X_new })
      })
      .then(response => response.json())
      .then(data => {
          // Handle response from Flask if needed
          // console.log(data);
          setPrediction(data);
          navigate('./predict');
      })
      .catch(error => {
          // Handle error if request fails
          console.error('Error:', error);
      });
    }
    return(
    <form onSubmit={onSubmitHandler}>
    <div className="Home">
        <div className="form-group">
        <label className="form-label">GRE total</label>
        <input type="number" className="form-control" id="GRE-total" required/>
        </div>

        <div className="form-group">
          <label className="form-label">Verbal</label>
          <input type="number" className="form-control" required id="Verbal"/>
        </div>

        <div className="form-group">
          <label className="form-label">Quants</label>
          <input type="number" className="form-control" required id="Quants"/>
        </div>

        <div className="form-group">
          <label className="form-label">AWA</label>
          <input type="number" step="any" className="form-control" required id="AWA"/>
        </div>

        <div className="form-group">
          <label className="form-label">TOEFL</label>
          <input type="number" className="form-control" required id="TOEFL"/>
        </div>

        <div className="form-group">
          <label className="form-label">GPA</label>
          <input type="number" step="any" className="form-control" required id="Gpa"/>
        </div>

        <div className="form-group">
          <label className="form-label">Tier</label>
            <select className="form-select" aria-label="Default select example" required id="Tier">
              
              <option value="3">1</option>
              <option value="2">2</option>
              <option value="1">3</option>
            </select>
        </div>

        <div className="form-group">
          <label className="form-label">Work Experience</label>
            <select className="form-select" aria-label="Default select example" required id="Work-ex">
              <option value="0">0</option>
              <option value="1">1</option>  
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
        </div>

        <div className="form-group">
          <label className="form-label">Number of published papers</label>
          <input type="number" className="form-control" required id="Publications"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </div>
</form>);
}
export default Home;