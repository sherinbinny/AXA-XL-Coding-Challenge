import React, { useState } from 'react';
import './App.css';

const App = () => {

  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ input: string, response: string }[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSubmit = async () => {
    setError(null);
    setResponse(null);
    setLoading(true);

    const sanitizedInput = input.trim();
  
    if(sanitizedInput.length === 0)
    {
      setError("please enter your name");
      setLoading(false);
      return;
    }
    else if(sanitizedInput.length > 30)
    {
      setError("name cannot be longer than 30 characters");
      setLoading(false);
      return;
    }

    try {
      const result = await testApiCall(sanitizedInput);
      setResponse(result);
      setHistory((prev) => [...prev, { input: sanitizedInput, response: result }]);
      setInput('');
    }
    catch (err) {
      setError("Uh-oh, something didn't go as planned.");
    }
    finally {
      setLoading(false);
    }
  }

  const testApiCall = (input: string) : Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(input === "error")
        {
          reject("Error!");
        }
        else
        {
          resolve(`Welcome, ${input}! We're happy to have you here.`);
        }
      }, 500);
    });
  };

  return (
    <div className="app-container">
      <h2>Welcome to the Greeting App!</h2>
      <input type="text" value={input} onChange={handleInputChange} placeholder="What's your name? We'd like to greet you :) " className="input-field"/>
      <button onClick={handleSubmit} className="submit-button">Looks good!</button>

      {loading && (
        <div className="loading-container">
          <span className="loading-text">Loading...</span>
        </div>
      )}
      {response && <div className="response">{ response }</div>}
      {error && <div className="error">Uh-oh, { error } :)</div>}

      {history.length > 0 && (
        <div className="history-container">
          <h3>List of responses</h3>
          <table className="history-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{entry.input}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
