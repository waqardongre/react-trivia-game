import { ButtonComponent } from "./ButtonComponent"

export const ErrorComponent = (props: any) => {
    const state = props.state
    const data = state.data
    return (
        <div className="m-3">
            <div className="mt-5 mb-2">
                <h5 className={"fs-3"}>
                    <strong>Error: </strong>
                </h5>
                <div className="fs-5">
                    {data.result}
                </div>
                <br>
                </br>
                <div className={"fs-5" + data.resultClassName}>
                    {data.errorMessage}
                </div>
                <div className="mt-2">
                    <div className="mt-4 mb-5">
                        <ButtonComponent state={state}/>
                    </div>
                </div>
            </div>
        </div>
    )
}