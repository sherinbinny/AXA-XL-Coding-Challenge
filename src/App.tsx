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
    try {
      const result = await testApiCall(input);
      setResponse(result);
    }
    catch (err) {
      setError("Uh-oh, something didn't go as planned.");
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
          resolve(`Welcome, ${input}!`);
        }
      }, 500);
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <input type="text" value={input} onChange={handleInputChange} placeholder="What's your name? We's like to greet you :) " style={{ marginBottom: "30px" }} />
      <button onClick={handleSubmit}>Looks good!</button>

      {loading && <p>Loading...</p>}
      {response && <div>{ response }</div>}
      {error && <div style={{ color: "red" }}>There's an error which is { error }</div>}

      <h3>History of Responses:</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            <strong>Name:</strong> {item.input} | <strong>Response:</strong> {item.response}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
