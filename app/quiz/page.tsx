'use client';

import * as React from 'react';

import { quizArr } from '@/components/quizArr';
import { Button } from '@/components/ui/button';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState<string[]>([]);
  const [showResults, setShowResults] = React.useState(false);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [showCorrect, setShowCorrect] = React.useState(false);

  const handleNext = () => {
    if (currentQuestion < quizArr.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowCorrect(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowCorrect(false);
    }
  };

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => [...prev, answer]);
    if (answer === quizArr[currentQuestion].correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
    }
    setShowCorrect(true);
    setTimeout(() => {
      if (currentQuestion === quizArr.length - 1) {
        setShowResults(true);
      } else {
        handleNext();
      }
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="drop-shadow-md border-2 px-10 py-10 rounded-xl w-1/2 flex flex-col gap-4 items-center">
        {/* header */}
        <h1>
          {currentQuestion + 1} из {quizArr.length}
        </h1>
        <h1 className="text-2xl">{quizArr[currentQuestion].question}</h1>

        {/* body */}
        <ul className="flex flex-col gap-2 items-center">
          {quizArr[currentQuestion].answers.map((answer, index) => (
            <li key={index}>
              <Button
                variant="outline"
                className={
                  showCorrect
                    ? answer === quizArr[currentQuestion].correctAnswer
                      ? 'bg-green-500'
                      : 'bg-red-500'
                    : answers[currentQuestion] === answer
                    ? 'bg-green-500'
                    : ''
                }
                onClick={() => handleAnswer(answer)}
              >
                {answer}
              </Button>
            </li>
          ))}
        </ul>

        {/* footer */}
        <div className="flex w-full justify-between">
          <Button onClick={handlePrev}>Назад</Button>
          <Button onClick={handleNext}>Далее</Button>
        </div>
      </div>
      {showResults && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-2xl mb-4">Квиз завершен!</h2>
            <p>
              Вы ответили правильно на {correctAnswers} из {quizArr.length} вопросов.
            </p>
            <a href="/">
              <Button className="mt-4">Вернуться на главную</Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
