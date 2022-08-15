import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    education: "",
    experience: "",
    frontend: "",
    backend: ""
  });

  const handleInputChange = evt => {
    const { name, value } = evt.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    console.log(formData);
  };

  const handleOptionChange = evt => {
    const { name, value } = evt.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: Number(value)
    }));
    setTimeout(() => {
      console.log(formData);
    }, 1000);
  };

  const handleSubmit = async evt => {
    try {
      evt.preventDefault();
      console.log(JSON.parse(JSON.stringify(formData)));
      const response = await fetch("http://localhost:3001/survey/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };


  const renderFormFields = () => {
    const fillInFields = Object.keys(formData).slice(0, 2);
    const fillIn = fillInFields.map(f => (
      <div key={f}>
        <label htmlFor={f}>{f[0].toUpperCase() + f.slice(1).replace("N", " N")}: </label>
        <input
          id={f}
          name={f}
          value={formData[f]}
          onChange={handleInputChange}
        />
      </div>
    ));

    const optionFields = (
      <div>
        <div>
          <label>
            What is your level of experience?
            <select name="experience" value={formData.experience} onChange={handleOptionChange}>
              <option>Choose an option</option>
              <option value="0">Less than one year</option>
              <option value="1">Less than five years</option>
              <option value="2">Less than 10 years</option>
              <option value="3">Less than 15 years</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            What is your education level?
            <select name="education" value={formData.education} onChange={handleOptionChange}>
              <option>Choose an option</option>
              <option value="0">Self Taught</option>
              <option value="1">Bootcamp</option>
              <option value="2">College</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            What is your level of experience working frontend?
            <select name="frontend" value={formData.frontend} onChange={handleOptionChange}>
              <option>Choose an option</option>
              <option value="0">Poor</option>
              <option value="1">Average</option>
              <option value="2">Good</option>
              <option value="3">Excellent</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            What is your level of experience working backend?
            <select name="backend" value={formData.backend} onChange={handleOptionChange}>
              <option>Choose an option</option>
              <option value="0">Poor</option>
              <option value="1">Average</option>
              <option value="2">Good</option>
              <option value="3">Excellent</option>
            </select>
          </label>
        </div>
      </div>
    );

    return (
      <div>
        {fillIn}
        {optionFields}
      </div>
    );

  };
  return (
    <div>
      <form className="survey-form" onSubmit={handleSubmit}>
        <h2>Fill out the survey!</h2>
        {renderFormFields()}
        <button className="survey-button">Submit!</button>
      </form>
    </div>
  );
}

export default App;
