import React from "react"
import QuestionComponent from "./questionComponent"
import { gameService } from "../services/gameService"



class GameComponent extends React.Component <any, any> {

    constructor(props: any) {
        super(props)
        this.state = {
          data: null
        }
        this.getQuestionFunction()
    }

    questionIsLoadingFunction() {
        this.setState((previousState: any) => {
            return {
                data: {
                    ...previousState.data,
                    nextQuestBtnlabel: "Loading...",
                    isNextQuestBtnDisabled: true
                }
            }
        })
    }

    getQuestionFunction() {
        gameService.getQuestionFunction()
        .then(response => {
            const data: any = response['results'][0]
            if (data) {
                const questionStr = data.question
                const options = data.incorrect_answers 
                const optionsLength = options.length + 1
                const answer = data.correct_answer
                
                const answerInd = getRandAnswerInd(0, optionsLength - 1)
                let optionsList = []
                
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
                const newData: any = {
                    error: false,
                    questionStr: questionStr,
                    optionsList: optionsList,
                    answerInd: answerInd,
                    answer: answer,
                    result: "",
                    resultClassName: "",
                    isOver: false,
                    nextQuestBtnlabel: "Skip Question",
                    isNextQuestBtnDisabled: false
                }

                this.setState({ 
                    data: newData
                })

            } 
            else {
                console.error("Error in game.tsx getData()")
            }
        })
        .catch(error => {
            console.error("Error in game.tsx getData() : " + error)
            
            const newData: any = {
                error: true,
                questionStr: "",
                optionsList: [{}],
                answerInd: 1,
                answer: "",
                resultClassName: "text-danger",
                isOver: false,
                result: "You appear to be offline... You can't play Trivia Game until you're connected to the internet",
                nextQuestBtnlabel: "Retry",
                isNextQuestBtnDisabled: false
            }
            this.setState({ 
                data: newData
            })
        })
    }

    questionOptionHandleClick(i: any) {
        let answerId = this.state.data.answerInd
        let answer = this.state.data.answer
        
        // Selecting and updatng background color classes of questionCheckBox option with its state properties
        let optionListNew = this.state.data.optionsList
        optionListNew[i].isChecked = true
        if (i === answerId) {
            optionListNew[i].optionClasses = " bg-success text-white "
        }
        else {
            optionListNew[i].optionClasses = " bg-danger text-white "
            optionListNew[answerId].optionClasses=" bg-success text-white "    
        }

        if (i === answerId) {
            this.setState((previousState: any) => {
                return {
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
            this.setState((previousState: any) => {
                return {
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
    
    renderQuestion(data: any) {
        const questionOptionHandleClick = (i: any) => {
            this.questionOptionHandleClick(i)
        }

        const getQuestionFunction = () => {
            this.questionIsLoadingFunction()
            this.getQuestionFunction()
        }

        return (
          <QuestionComponent 
           value={data}
           functions={{questionOptionHandleClick, getQuestionFunction}}
          />
        );
    }

    render() {
        
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
                            { this.renderQuestion(this.state.data)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function getRandAnswerInd(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export default GameComponent
