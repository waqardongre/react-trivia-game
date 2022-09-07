export function ButtonComponent(props: any) {
    const data = props.state.data
    const functions = props.state.functions
    const nextQuestBtnlabel = data.nextQuestBtnlabel
    let isNextQuestBtnDisabled = data.isNextQuestBtnDisabled
    const getQuestion = () => functions.getQuestionFunction()
    const nextQuestionBtnOnClick = (e: any) => {
            if (getQuestion !== null) {
                getQuestion()
            }
            (e.currentTarget).blur()
    }

    return (
        <button type="button" className={"btn btn-primary btn-md px-4 gap-3"} disabled={isNextQuestBtnDisabled} onClick={(e) => {nextQuestionBtnOnClick(e)}}> {nextQuestBtnlabel} {isNextQuestBtnDisabled} </button>
    )
}