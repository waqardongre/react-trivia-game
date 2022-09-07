import { useState } from "react"
import { OptionComponent } from "./OptionComponent"
import { ButtonComponent } from "./ButtonComponent"



export const QuestionComponent = (props: any) => {
    const state = { 
        data: props.state.data,
        functions: props.state.functions
    }

    const renderOption = (list: any) => {
        return (
            list.map(
                (value: any, ind: number) => (
                    <OptionComponent 
                    index={ind}
                    key={ind}
                    state={state}
                    value={value}
                    />
                )
            )
        )
    }

    return (
        <div className="m-3">
            <div className="mt-5 mb-2">
                <span>
                    <strong className="fs-5"> Question: </strong> 
                    { state.data.questionStr }
                </span>
            </div>
            <div className="mb-2"> 
                <span className="text-primary">
                    Please select an option from the given below:
                </span>
            </div>
            <div className="list-group mx-0 w-auto">
                <div className="row p-2">
                    { renderOption(state.data.optionsList)}
                </div>
            </div>
            <div className="mt-2">
                <span className={state.data.resultClassName}>
                    <strong>{" " + state.data.result + " "}</strong>
                </span>
                <div className="mt-4 mb-5">
                    <ButtonComponent state={state}/>
                </div>
            </div>
        </div>
    )
}