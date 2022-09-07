import { ButtonComponent } from "./ButtonComponent"

export const ErrorComponent = (props: any) => {
    const state = props.state
    return (
        <div className="m-3">
            <div className="mt-5 mb-2">
                <span>
                    <strong className={"fs-5 " + state.data.resultClassName}>
                        {" " + state.data.result + " "}
                    </strong>
                </span>
                <div className="mt-2">
                    <div className="mt-4 mb-5">
                        <ButtonComponent state={state}/>
                    </div>
                </div>
            </div>
        </div>
    )
}