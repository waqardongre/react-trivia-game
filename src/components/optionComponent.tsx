export const OptionComponent = (props: any) => {
    const value = props.value
    const index = props.index
    const state = props.state
    const data = state.data
    const functions = state.functions
    const questionOptionHandleClick = (index: any, state: any) => functions.questionOptionHandleClickFunction(index, state)
    const isOver = data.isOver
    const optionClasses = value.optionClasses
    const isChecked = value.isChecked
    const option = value.option
    
    return (
        <div className="col-sm-6 p-1">
            <label className={optionClasses + "btn btn-primary list-group-item d-flex gap-2"}>
                <input className="form-check-input flex-shrink-0 questionCheckBox" type="radio" checked={isChecked} disabled={isOver} onChange={()=> {}} onClick={ () => questionOptionHandleClick(index, state) }/>
                <span>
                    { " " + option }
                </span>
            </label>
        </div>
    )
}