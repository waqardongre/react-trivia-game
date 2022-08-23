import React from "react";

function OptionComponent(props: any) {
    return (
        <label className="btn btn-primary list-group-item d-flex gap-2">
            <input className="form-check-input flex-shrink-0 questionCheckBox" type="radio" checked={props.value.value[0].isChecked} disabled={props.value.isOver} onChange={()=> {}} onClick={ props.onClick }/>
            <span>
                { " " + props.value.value[0].option }
            </span>
        </label>
    )
}

function NextQuestionBtnComponent(props: any) {
    const resetBtnDesign = () => {
        let questionElement: any = document.getElementById("nextQuesBtn")
        questionElement.blur() 
    }

    return (
        <button id="nextQuesBtn" type="button" className={"btn btn-primary btn-md px-4 gap-3"} onClick={() => {resetBtnDesign(); props.functions.getQuestionFunction()}}> Next Question </button>
    )
}


class QuestionComponent extends React.Component<any, any> {
    constructor(props: any) {
      super(props)
      this.state = {
        data: null
      }
    }

    static getDerivedStateFromProps(props: any) {
        if (props.value !== null)
        return { 
            data: props.value,
            functions: props.functions
        }
        else {
            return null
        }
    }

    handleClick(i: any) {
        const questionOptionHandleClickFunction = (i: any) => {
            this.state.functions.questionOptionHandleClick(i)
        }
        questionOptionHandleClickFunction(i)
    }

    getQuestionFunction() {
        const getQuestionFunction = () => {
            this.state.functions.getQuestionFunction()
        }
        getQuestionFunction()
    }
  
    renderOption(list: any[]) {
        return (
            list.map(
                (value: any, ind: number) => (
                    <OptionComponent key={ind}
                    value = {{
                        value: value, 
                        isOver: this.state.data.isOver
                    }}
                    onClick = {() => this.handleClick(ind)}
                    />
                )
            )
        )
    }

    render() {
        if (this.state.data != null) {
            
            const getQuestionFunction = () => {
                this.getQuestionFunction()
            }
            
            return (
                <div className="m-3">
                    <div className="mt-5 mb-3">
                        <span>
                            <strong className="fs-5"> Question: </strong> 
                            { this.state.data.questionStr }
                        </span>
                    </div>
                    <div className="mb-3"> 
                        <span className="text-primary">
                            Please select an option from the given below:
                        </span>
                    </div>
                    <div className="list-group mx-0 w-auto">
                        { this.renderOption(this.state.data.optionsList)}
                    </div>
                    <div className="mt-3"> 
                        <span className={"fs-5 " + this.state.data.resultClassName }>
                            <strong>{" " + this.state.data.result + " "}</strong>
                        </span>
                        <div className="mt-5 mb-5">
                            <NextQuestionBtnComponent functions={{getQuestionFunction}}/>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default QuestionComponent