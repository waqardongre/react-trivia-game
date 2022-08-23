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

    getQuestionFunction():any {
        gameService.getQuestionFunction().then(response => {
            const data: any = response
            if (data) {
                const questionStr = data.question
                const options = data.incorrect_answers 
                const optionsLength = options.length + 1
                const answer = data.correct_answer
                
                const answerInd = getRandAnswerInd(0, optionsLength - 1)
                let optionsList = [Array(optionsLength).fill(null)]
                
                // Adding and randoming answer item in options array
                let j: number = 0
                for (let i = 0; i <  optionsLength; i ++) {
                    if (i === answerInd) {
                        optionsList[i] = [{ option: answer, isChecked: false}]
                    }
                    else {
                        optionsList[i] = [{ option: options[j], isChecked: false}]
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
                    isOver: false
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
        
        
        // Selecting questionCheckBox option with its state property
        let optionListNew = this.state.data.optionsList
        optionListNew[i][0].isChecked = true
        

        if (i === answerId) {
            this.setState((previousState: any) => {
                return {
                    data: {
                        ...previousState.data,
                        optionsList: optionListNew,
                        result: "Result: Correct answer!",
                        resultClassName: "text-success",
                        isOver: true
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
                        isOver: true
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
