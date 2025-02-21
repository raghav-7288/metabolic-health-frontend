import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    basicDetails: { age: "", gender: "", bmi: "" },
    ffqResponses: [],
    pssScore: 0,
    otherScales: {},
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      basicDetails: { ...formData.basicDetails, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/submit", formData);
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting data");
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Basic Details</h2>
          <input type="number" name="age" placeholder="Age" onChange={handleChange} />
          <input type="text" name="gender" placeholder="Gender" onChange={handleChange} />
          <input type="number" name="bmi" placeholder="BMI" onChange={handleChange} />
          <button onClick={() => setStep(2)}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Food Frequency Questionnaire</h2>
          <button onClick={() => setStep(3)}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Perceived Stress Scale</h2>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default App;
