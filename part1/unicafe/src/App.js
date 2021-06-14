import React, { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <FeedbackButtons
        setGood={setGood}
        setNeutral={setNeutral}
        setBad={setBad}
      />
      <h2>statistics</h2>

      {good || neutral || bad ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const FeedbackButtons = ({ setGood, setNeutral, setBad }) => {
  return (
    <>
      <h2>give feedback</h2>
      <Button title="good" setState={setGood} />
      <Button title="neutral" setState={setNeutral} />
      <Button title="bad" setState={setBad} />
    </>
  );
};

const Button = ({ setState, title }) => {
  return (
    <button
      onClick={() => {
        setState((prev) => prev + 1);
      }}
    >
      {title}
    </button>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={good + neutral + bad} />
        <Statistic
          text="average"
          value={(good - bad) / (good + neutral + bad)}
        />
        <Statistic
          text="positive"
          value={(good / (good + neutral + bad)) * 100 + "%"}
        />
      </tbody>
    </table>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export default App;
