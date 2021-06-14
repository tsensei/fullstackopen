import React, { useEffect, useState } from "react";

const App = () => {
  const [mostVoted, setMostVoted] = useState(0);
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));
  useEffect(() => {
    console.log(votes.length);
    console.log(votes);
    let max = 0;
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > votes[max]) {
        max = i;
      }
    }
    setMostVoted(max);
  }, [votes]);

  const setSelectedRandom = () => {
    let random = Math.floor(Math.random() * anecdotes.length);

    setSelected(random);
  };
  const castVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;

    setVotes(newVotes);
  };
  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected] ?? 0} votes</div>
      <button onClick={castVote}>vote</button>
      <button onClick={setSelectedRandom}>next ancedote</button>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVoted]}</div>
    </>
  );
};

export default App;
