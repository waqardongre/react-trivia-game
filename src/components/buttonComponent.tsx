function ButtonComponent(props: any) {
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

export default ButtonComponent