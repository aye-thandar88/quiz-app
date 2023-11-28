import React, { useState } from "react";
import "./index.scss";
import { resultInitialState } from "./constants";
import Timer from "./Timer";

const Quiz = ({ questions }) => {
  const [currentQues, setCurrentQues] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [name, setName] = useState();
  const [inputAns, setInputAns] = useState("");
  const [showTimer, setShowTimer] = useState(true);

  const { question, choices, correctAnswer, type } = questions[currentQues];
  const finalQues = currentQues === questions.length - 1;

  const onAnswerClick = (choice, index) => {
    setAnswerIdx(index);
    if (choice === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onNextClick = (finalAns) => {
    setAnswerIdx(null);
    setShowTimer(false);
    setResult((prev) =>
      finalAns
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswer + 1,
            wrongAnswers: prev.wrongAnswers,
          }
        : {
            ...prev,
            correctAnswers: prev.correctAnswers,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (finalQues) {
      setCurrentQues(0);
      setShowResult(true);
    } else {
      setCurrentQues((prev) => prev + 1);
    }

    setTimeout(() => {
      setShowTimer(true);
    });
  };

  const onTryAgainClick = () => {
    setResult(resultInitialState);
    setShowResult(false);
  };

  const handleTimeUp = () => {
    setAnswer(false);
    onNextClick(false);
  };

  const handleInputChange = (e) => {
    setInputAns(e.target.value);

    if (inputAns === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const handleSave = () => {
    alert("Already saved!");
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          {showTimer && <Timer duration={10} onTimeup={handleTimeUp} />}
          {/* question section */}
          <div className="quiz-question">
            <div className="quiz-no">
              <h2>{currentQues + 1}</h2>
              <h4>/{questions.length}</h4>
            </div>
            <h2>{question}</h2>
          </div>

          {/* answer section */}
          {type === "FIB" ? (
            <div className="ans-input">
              <input value={inputAns} onChange={handleInputChange} />
            </div>
          ) : (
            <div>
              <ul>
                {choices?.map((choice, index) => (
                  <li
                    onClick={() => onAnswerClick(choice, index)}
                    key={index}
                    className={answerIdx === index ? "selected-answer" : null}
                  >
                    {choice}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* footer section */}
          <div className="quiz-footer">
            <button
              onClick={() => onNextClick(answer)}
              disabled={answerIdx === null && !inputAns}
              className={
                answerIdx === null && !inputAns ? "button-disabled" : ""
              }
            >
              {finalQues ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className="result-container">
          <h2>Result</h2>
          <p>
            Total Questions : <span>{questions.length}</span>
          </p>
          <p>
            Total Scores : <span>{result.score}</span>
          </p>
          <p>
            Correct Answers : <span>{result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers : <span>{result.wrongAnswers}</span>
          </p>
          <button onClick={onTryAgainClick}>Try Again</button>

          <br />
          <h2>Enter your name below to save your score!</h2>
          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
