interface IError {
    error: any
}

export const Error = ({ error }:IError) => {
    return (<div className="error-message">
        {error && (typeof (error) == 'string' ?
            (< span > {error}</span>) :
            (error.map((err:string) => (<span key={err}>{err}<br /></span>)))
        )}
    </div>)
}