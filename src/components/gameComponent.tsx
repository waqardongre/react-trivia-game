import { useEffect, useState } from "react"
import { QuestionComponent } from "./QuestionComponent"
import { LoadingComponent } from "./LoadingComponent"
import { gameService } from "../services/gameService"
import { ErrorComponent } from "./ErrorComponent"



export const GameComponent = () => {
    const [state, setState] = useState({
        data: {
            error: false,
            questionStr: "",
            optionsList: [],
            answerInd: 0,
            answer: "",
            result: "",
            resultClassName: "",
            isOver: false,
            nextQuestBtnlabel: "Loading...",
            isNextQuestBtnDisabled: false,
            questionLoaded: false
        },
        functions: {
            getQuestionFunction: () => getQuestionFunction(),
            questionIsLoadingFunction: () => questionIsLoadingFunction(),
            questionOptionHandleClickFunction: (i: any, data: any) => questionOptionHandleClickFunction(i, data),
            renderErrorFunction: (error: any) => renderErrorFunction(error)
        }
    })

    useEffect(()=> {
            state.functions.getQuestionFunction()
        },
        []
    )

    const questionIsLoadingFunction = () => {
        setState((previousState: any) => {
            return {
                ...previousState,
                data: {
                    ...previousState.data,
                    nextQuestBtnlabel: "Loading...",
                    isNextQuestBtnDisabled: true
                }
            }
        })
    }

    const getQuestionFunction = () => {
        state.functions.questionIsLoadingFunction()
        gameService.getQuestionFunction()
        .then(response => {
            const data: any = response['results'][0]
            if (data) {
                const questionStr = data.question
                const options = data.incorrect_answers 
                const optionsLength = options.length + 1
                const answer = data.correct_answer
                
                const answerInd = getRandAnswerInd(0, optionsLength - 1)
                let optionsList: any = []
                
                // Adding and randoming answer item in options array
                let j: number = 0
                for (let i = 0; i <  optionsLength; i ++) {
                    if (i === answerInd) {
                        optionsList.push({ 
                            option: answer, 
                            isChecked: false,
                            optionClasses: ""
                        })
                    }
                    else {
                        optionsList.push({ 
                            option: options[j], 
                            isChecked: false,
                            optionClasses: ""
                        })
                        j ++
                    }
                }
                
                setState((previousState: any) => {
                    return {
                        ...previousState,
                        data: {
                            ...previousState.data,
                            error: false,
                            questionStr: questionStr,
                            optionsList: optionsList,
                            answerInd: answerInd,
                            answer: answer,
                            result: "",
                            resultClassName: "",
                            isOver: false,
                            nextQuestBtnlabel: "Skip Question",
                            isNextQuestBtnDisabled: false,
                            questionLoaded: true
                        }
                    }
                })
            }
            else {
                state.functions.renderErrorFunction(response)
                console.error("Error in game.tsx getQuestionFunction()")
            }
        })
        .catch(error => {
            state.functions.renderErrorFunction(error)
            console.error("Error in game.tsx getQuestionFunction() : " + error)
        })
    }

    

    const renderErrorFunction = (errorMessage: any) => {
        setState((previousState: any) => {
            return {
                ...previousState,
                data: {
                    ...previousState.data,
                    error: true,
                    errorMessage: "Engineer's stats: " + errorMessage.toString(),
                    questionStr: "",
                    optionsList: [{}],
                    answerInd: 1,
                    answer: "",
                    resultClassName: "form-text",
                    isOver: false,
                    result: "You appear to be offline... You can't play Trivia Game until you're " +  
                    "connected to the internet.",
                    nextQuestBtnlabel: "Retry",
                    isNextQuestBtnDisabled: false,
                    questionLoaded: false
                }
            }
        })
    }



    const questionOptionHandleClickFunction = (i: any, state: any) => {
        const data = state.data
        let answerId = data.answerInd
        let answer = data.answer
        
        // Selecting and updatng background color classes of questionCheckBox option with its state properties
        let optionListNew = data.optionsList
        optionListNew[i].isChecked = true
        if (i === answerId) {
            optionListNew[i].optionClasses = " bg-success text-white "
        }
        else {
            optionListNew[i].optionClasses = " bg-danger text-white "
            optionListNew[answerId].optionClasses=" bg-success text-white "    
        }

        if (i === answerId) {
            setState((previousState: any) => {
                return {
                    ...previousState,
                    data: {
                        ...previousState.data,
                        optionsList: optionListNew,
                        result: "Result: Correct answer!",
                        resultClassName: "text-success",
                        isOver: true,
                        nextQuestBtnlabel: "Next Question",
                        isNextQuestBtnDisabled: false
                    }
                }
            })
        }
        else {
            setState((previousState: any) => {
                return {
                    ...previousState,
                    data: {
                        ...previousState.data,
                        optionsList: optionListNew,
                        result: "Result: Wrong! The correct answer is: " + answer,
                        resultClassName: "text-danger",
                        isOver: true,
                        nextQuestBtnlabel: "Next Question",
                        isNextQuestBtnDisabled: false
                    }
                }
            })
        }
    }
    
    const renderQuestion = () => {
        const data = state.data
        const questionLoaded = data.questionLoaded
        const error = data.error
        
        if (questionLoaded === true) {
            if (error === false) {
                return (
                    <QuestionComponent 
                    state={state}
                    />
                )
            }
        }
        else {
            if (error) {
                return (
                    <ErrorComponent state={state}/>
                )
            }
            else{
                return (
                    <LoadingComponent state={state}/>
                )
            }
        }
    }

    return (
        <div>
            <header className="d-flex flex-wrap py-3 mb-4 p-5 border-bottom">
                <a href="/react-trivia-game/" className="d-flex align-items-center me-md-auto text-dark text-decoration-none">
                    <span className="fs-3 ">Trivia Game</span>
                </a>
            </header>
        
            <div className="container">

                <div className="form-group d-flex gap-5 mb-4">
                    <div className="form-control">
                        {renderQuestion()}
                    </div>
                </div>
            </div>
        </div>
    )
}

const getRandAnswerInd = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}