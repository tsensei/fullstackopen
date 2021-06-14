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
    <>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <ShowAll good={good} neutral={neutral} bad={bad} />
          <ShowAverage good={good} neutral={neutral} bad={bad} />
          <ShowPositive good={good} neutral={neutral} bad={bad} />
        </tbody>
      </table>
    </>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const ShowAll = ({ good, neutral, bad }) => {
  return (
    <>
      <tr>
        <td>all</td>
        <td>{good + neutral + bad}</td>
      </tr>
    </>
  );
};
const ShowAverage = ({ good, neutral, bad }) => {
  const score = (good - bad) / (good + neutral + bad);
  return (
    <>
      <tr>
        <td>average</td>
        <td>{score ? score : 0}</td>
      </tr>
    </>
  );
};
const ShowPositive = ({ good, neutral, bad }) => {
  const positive = (good / (good + neutral + bad)) * 100;
  return (
    <>
      <tr>
        <td>postive</td>
        <td>{positive ? positive : 0}%</td>
      </tr>
    </>
  );
};

export default App;
