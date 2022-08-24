import React from "react";
import OptionComponent from "./optionComponent";
import ButtonComponent from "./buttonComponent"



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
            if (!this.state.data.error) {
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
                                <ButtonComponent data={this.state.data} functions={this.state.functions}/>
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className="m-3">
                        <div className="mt-5 mb-2">
                            <span>
                                <strong className="fs-5"> Question: </strong> 
                                Can not load!
                            </span>
                        </div>
                        <div className="mt-2">
                            <span className={this.state.data.resultClassName}>
                                <strong>{" " + this.state.data.result + " "}</strong>
                            </span>
                            <div className="mt-4 mb-5">
                                <ButtonComponent data={this.state.data} functions={this.state.functions}/>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}

export default QuestionComponent