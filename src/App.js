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

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async evt => {
    try {
      evt.preventDefault();
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
    const fields = Object.keys(formData);
    return fields.map(f => (
      <div key={f}>
        <label htmlFor={f}>{f[0].toUpperCase() + f.slice(1).replace("N", " N")}: </label>
        <input
          id={f}
          name={f}
          value={formData[f]}
          onChange={handleChange}
        />
      </div>
    ));
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
