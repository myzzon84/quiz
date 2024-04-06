import { useEffect, useState } from 'react';
import errorIcon from './images/error.png';
import okIcon from './images/ok.svg';

const Quiz = ({ questionsArr }) => {
    const [question, setQuestion] = useState(0);
    const [correct, setCorrect] = useState(
        new Array(questionsArr[question].answers.length).fill(null)
    );
    const [answers, setAnswers] = useState(
        new Array(questionsArr.length).fill(null)
    );
    const [end, setEnd] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const cloneObj = (obj) => {
        return JSON.parse(JSON.stringify(obj));
    };

    useEffect(() => {
        correct.forEach((item) => {
            if (item !== null) {
                let cloneAnswers = cloneObj(answers);
                cloneAnswers[question] = item;
                setAnswers(cloneAnswers);
            }
        });
    }, [correct]);

    useEffect(() => {
        let num = answers.filter((item) => {
            return item === true;
        });
        setCorrectAnswers(num.length);
        let temp = answers.filter((item) => {
            return item === null;
        });
        if (temp.length > 0) {
            return;
        } else {
            setEnd(true);
        }
    }, [answers]);

    const optionHandler = (index, arrItem) => {
        let selected = false;
        correct.forEach((item) => {
            if (item !== null) {
                selected = true;
            }
        });
        if (selected) {
            return;
        }
        const cloneCorrect = cloneObj(correct);
        cloneCorrect[index] = arrItem.isCorrect;
        setCorrect(cloneCorrect);
    };

    const nextOrReset = () => {
        let checkAnswer = correct.filter((item) => {
            return item !== null;
        });
        if (checkAnswer.length === 0) {
            return;
        }
        if (end) {
            setQuestion(0);
            setCorrect(
                new Array(questionsArr[question].answers.length).fill(null)
            );
            setAnswers(new Array(questionsArr.length).fill(null));
            setEnd(false);
        }
        setCorrect(new Array(questionsArr[question].answers.length).fill(null));
        if (question < questionsArr.length - 1) {
            setQuestion((question) => question + 1);
        } else {
            return;
        }
    };

    return (
        <div className={`w-[800px] mx-auto bg-[rgb(66,148,138)] p-[15px]`}>
            <div className={`w-full h-full bg-white rounded-2xl p-10`}>
                <div className={` text-[20px] text-[#4d8776] font-bold mb-5`}>
                    {`Question ${question + 1} of 3`}
                </div>
                <hr className={` border border-[#dcdcdc] mb-5`} />
                <div className={` text-[26px] font-medium mb-[50px]`}>
                    {questionsArr[question].question}
                </div>
                <ul className={` mb-5`}>
                    {questionsArr[question].answers.map((item, i) => {
                        return (
                            <li
                                className={`${
                                    correct[i] !== null
                                        ? correct[i]
                                            ? 'bg-[green] text-white text-[20px] font-semibold'
                                            : 'bg-[red] text-white text-[20px] font-semibold'
                                        : 'bg-[#cccccc]'
                                }  p-5 rounded-lg mb-3 last:mb-0 cursor-pointer`}
                                key={i}
                                onClick={() => optionHandler(i, item)}
                            >
                                {item.text}
                            </li>
                        );
                    })}
                </ul>
                <div
                    className={` bg-[#429488] w-min py-2 px-8 rounded-md cursor-pointer text-white text-[20px] mb-4`}
                    onClick={nextOrReset}
                >
                    {end ? 'Reset' : 'Next'}
                </div>
                <div className={`flex mb-5`}>
                    {answers.map((item, i) => {
                        return (
                            <div
                                className={` w-10 h-10 bg-[#cccccc] rounded-full mr-2 last:mr-0 p-[5px]`}
                                key={i}
                            >
                                <img
                                    className={``}
                                    src={
                                        item === null
                                            ? null
                                            : item
                                            ? okIcon
                                            : errorIcon
                                    }
                                    alt=''
                                />
                            </div>
                        );
                    })}
                </div>
                {end && (
                    <div
                        className={` text-[20px] font-semibold text-[#4d8776]`}
                    >
                        {`${correctAnswers} correct ${
                            correctAnswers === 1 ? 'answer' : 'answers'
                        } out of ${questionsArr.length}`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
