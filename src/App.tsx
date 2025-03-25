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
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Welcome to the Greeting App!</h2>
      <input type="text" value={input} onChange={handleInputChange} placeholder="What's your name? We's like to greet you :) " style={{ marginBottom: "30px", width: "100%", padding: "8px" }} />
      <button onClick={handleSubmit} style={{ display: "block", width: "100%", padding: "8px" }}>Looks good!</button>

      {loading && <p>Loading...</p>}
      {response && <div>{ response }</div>}
      {error && <div style={{ color: "red" }}>Uh-oh, { error } :)</div>}

      <h3>List of names you entered:</h3>
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
