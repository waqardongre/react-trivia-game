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
        const data = this.state.data
        const questionStr = data.question
        const optionsList = data.optionsList 
        const answerInd = data.answerInd
        const answer = data.correct_answer
    
        const newData: any = {
            questionStr: questionStr,
            optionsList: optionsList,
            answerInd: answerInd,
            answer: answer,
            result: "",
            resultClassName: "",
            isOver: false,
            nextQuestBtnlabel: "Loading...",
            isNextQuestBtnDisabled: true
        }

        this.setState({ 
            data: newData
        })
    }

    getQuestionFunction() {
        gameService.getQuestionFunction().then(response => {
            const data: any = response
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
                console.log("error in game.tsx getData()")
            }
        });
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
                    <a href="/" className="d-flex align-items-center me-md-auto text-dark text-decoration-none">
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
