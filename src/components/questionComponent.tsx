import React from "react";



function OptionComponent(props: any) {
    const optionClasses = props.value.optionClasses
    return (
        <div className="col-sm-6 p-1">
            <label className={optionClasses + "btn btn-primary list-group-item d-flex gap-2"}>
                <input className="form-check-input flex-shrink-0 questionCheckBox" type="radio" checked={props.value.isChecked} disabled={props.data.isOver} onChange={()=> {}} onClick={ props.onClick }/>
                <span>
                    { " " + props.value.option }
                </span>
            </label>
        </div>
    )
}

function NextQuestionBtnComponent(props: any) {
    const nextQuestBtnlabel = props.data.nextQuestBtnlabel
    let isNextQuestBtnDisabled = props.data.isNextQuestBtnDisabled
    const getQuestionFunction = () => props.functions.getQuestionFunction()
    const nextQuestionBtnOnClick = (e: any) => {
        if (getQuestionFunction != null) {
            getQuestionFunction()
        }
        (e.currentTarget).blur()
    }

    return (
        <button type="button" className={"btn btn-primary btn-md px-4 gap-3"} disabled={isNextQuestBtnDisabled} onClick={(e) => {nextQuestionBtnOnClick(e)}}> {nextQuestBtnlabel} {isNextQuestBtnDisabled} </button>
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
        const questionOptionHandleClickFunction = (i: any) => this.state.functions.questionOptionHandleClick(i)
        questionOptionHandleClickFunction(i)
    }

    renderOption(list: any) {
        return (
            list.map(
                (value: any, ind: number) => (
                    <OptionComponent key={ind}
                    value = {value}
                    data= {this.state.data}
                    onClick = {() => this.handleClick(ind)}
                    />
                )
            )
        )
    }

    render() {
        if (this.state.data != null) {
            
            return (
                <div className="m-3">
                    <div className="mt-5 mb-2">
                        <span>
                            <strong className="fs-5"> Question: </strong> 
                            { this.state.data.questionStr }
                        </span>
                    </div>
                    <div className="mb-2"> 
                        <span className="text-primary">
                            Please select an option from the given below:
                        </span>
                    </div>
                    <div className="list-group mx-0 w-auto">
                        <div className="row p-2">
                            { this.renderOption(this.state.data.optionsList)}
                        </div>
                    </div>
                    <div className="mt-2">
                        <span className={this.state.data.resultClassName}>
                            <strong>{" " + this.state.data.result + " "}</strong>
                        </span>
                        <div className="mt-4 mb-5">
                            <NextQuestionBtnComponent data={this.state.data} functions={this.state.functions}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default QuestionComponent