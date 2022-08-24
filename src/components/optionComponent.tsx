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

export default OptionComponent