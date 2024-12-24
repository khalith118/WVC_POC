import * as React from "react"
import '../styles/_input.scss';

interface IFormInput {
    label: string;
    name: string;
    register: any;
    rules?: object;
    errors?: any;
    type?: string;
    placeholder?: string;
}

export const FormInput = ({
    label,
    name,
    register,
    rules,
    errors,
    type,
    placeholder }: IFormInput) => {
    return (
        <div className="form-input">
            <label htmlFor={name}> {label} </label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                {...register(name, rules)}
            />
            {(errors && errors[name] )&& <p className="error-message">{errors[name]?.message}</p>}
        </div>
    )
}
