import * as React from "react"
import '../styles/_button.scss';

interface IFormButton {
    className?: string
    type?: any
    children: React.ReactNode
}

export const FormButton = ({ className, type, children }: IFormButton) => (<button type={type ?? 'button'} className={className ?? 'form-button'}>{children}</button>) 