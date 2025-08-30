'use client';

import { useState, useEffect } from 'react';
import elements from '@/data/elements';

interface Question {
  id: number;
  question: string;
  correctAnswer: string;
  options: string[];
  type: 'symbol' | 'atomic_number' | 'group';
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalQuestions] = useState(10);

  // Gerar perguntas aleatórias
  const generateQuestions = () => {
    const newQuestions: Question[] = [];
    const shuffledElements = [...elements].sort(() => Math.random() - 0.5);

    for (let i = 0; i < totalQuestions; i++) {
      const element = shuffledElements[i];
      const questionTypes: Array<'symbol' | 'atomic_number' | 'group'> = ['symbol', 'atomic_number', 'group'];
      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

      let question: Question;

      switch (questionType) {
        case 'symbol':
          question = {
            id: i,
            question: `Qual é o símbolo do elemento ${element.name}?`,
            correctAnswer: element.symbol,
            options: generateOptions(element.symbol, 'symbol'),
            type: 'symbol'
          };
          break;
        case 'atomic_number':
          question = {
            id: i,
            question: `Qual o número atômico do elemento ${element.name}?`,
            correctAnswer: element.number.toString(),
            options: generateOptions(element.number.toString(), 'atomic_number'),
            type: 'atomic_number'
          };
          break;
        case 'group':
          question = {
            id: i,
            question: `A que grupo pertence o elemento ${element.name}?`,
            correctAnswer: element.group.toString(),
            options: generateOptions(element.group.toString(), 'group'),
            type: 'group'
          };
          break;
      }

      newQuestions.push(question);
    }

    setQuestions(newQuestions);
  };

  // Gerar opções de resposta
  const generateOptions = (correctAnswer: string, type: string): string[] => {
    const options = [correctAnswer];

    if (type === 'symbol') {
      // Para símbolos, usar símbolos de outros elementos
      const otherSymbols = elements
        .filter(el => el.symbol !== correctAnswer)
        .map(el => el.symbol)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      options.push(...otherSymbols);
    } else if (type === 'atomic_number') {
      // Para números atômicos, usar números aleatórios
      while (options.length < 4) {
        const randomNum = Math.floor(Math.random() * 118) + 1;
        if (!options.includes(randomNum.toString())) {
          options.push(randomNum.toString());
        }
      }
    } else if (type === 'group') {
      // Para grupos, usar grupos aleatórios
      while (options.length < 4) {
        const randomGroup = Math.floor(Math.random() * 18) + 1;
        if (!options.includes(randomGroup.toString())) {
          options.push(randomGroup.toString());
        }
      }
    }

    return options.sort(() => Math.random() - 0.5);
  };

  // Iniciar novo quiz
  const startQuiz = () => {
    generateQuestions();
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  // Responder pergunta
  const answerQuestion = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  // Próxima pergunta
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  // Inicializar quiz ao carregar a página
  useEffect(() => {
    startQuiz();
  }, []);

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando quiz...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = '';
    let colorClass = '';

    if (percentage >= 90) {
      message = 'Excelente! Você é um mestre da tabela periódica!';
      colorClass = 'text-green-600';
    } else if (percentage >= 70) {
      message = 'Muito bom! Você conhece bem os elementos!';
      colorClass = 'text-blue-600';
    } else if (percentage >= 50) {
      message = 'Bom! Continue estudando para melhorar!';
      colorClass = 'text-yellow-600';
    } else {
      message = 'Continue praticando! A química é fascinante!';
      colorClass = 'text-red-600';
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Quiz Concluído!</h1>

            <div className="mb-8">
              <div className="text-6xl font-bold text-primary mb-4">{score}/{totalQuestions}</div>
              <div className={`text-xl font-semibold ${colorClass}`}>{percentage}%</div>
              <p className="text-gray-600 mt-2">{message}</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={startQuiz}
                className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
              >
                <i className="fas fa-redo mr-2"></i>
                Reiniciar Quiz
              </button>

              <a
                href="/tabela"
                className="block w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                <i className="fas fa-table mr-2"></i>
                Ver Tabela Periódica
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho do Quiz */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <i className="fas fa-question-circle text-primary mr-3"></i>
            Quiz da Tabela Periódica
          </h1>
          <p className="text-gray-600 text-lg">
            Teste seus conhecimentos sobre os elementos químicos!
          </p>
        </div>

        {/* Progresso */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">
              Pergunta {currentQuestionIndex + 1} de {totalQuestions}
            </span>
            <span className="text-primary font-semibold">
              Pontuação: {score}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Pergunta */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            {currentQuestion.question}
          </h2>

          {/* Opções */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => answerQuestion(option)}
                disabled={isAnswered}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 font-semibold ${isAnswered
                    ? option === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : option === selectedAnswer && option !== currentQuestion.correctAnswer
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 bg-gray-50 text-gray-500'
                    : 'border-gray-300 bg-white hover:border-primary hover:bg-primary-50 text-gray-700'
                  }`}
              >
                <span className="inline-block w-8 h-8 rounded-full bg-gray-200 text-gray-600 text-center mr-3">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
                {isAnswered && option === currentQuestion.correctAnswer && (
                  <i className="fas fa-check text-green-600 ml-2"></i>
                )}
                {isAnswered && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                  <i className="fas fa-times text-red-600 ml-2"></i>
                )}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {isAnswered && (
            <div className={`mt-6 p-4 rounded-lg text-center ${selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <div>
                  <i className="fas fa-check-circle text-2xl mb-2"></i>
                  <p className="font-semibold">Correto! Parabéns!</p>
                </div>
              ) : (
                <div>
                  <i className="fas fa-times-circle text-2xl mb-2"></i>
                  <p className="font-semibold">
                    Incorreto. A resposta correta é: <strong>{currentQuestion.correctAnswer}</strong>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Botão Próxima */}
        {isAnswered && (
          <div className="text-center">
            <button
              onClick={nextQuestion}
              className="bg-primary text-white py-3 px-8 rounded-lg hover:bg-primary-dark transition-colors font-semibold text-lg"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  <i className="fas fa-arrow-right mr-2"></i>
                  Próxima Pergunta
                </>
              ) : (
                <>
                  <i className="fas fa-flag-checkered mr-2"></i>
                  Ver Resultados
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
