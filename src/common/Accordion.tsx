import  { useState } from 'react'

const Accordion = ({ children, title }: any) => {
    const [expand, setExpand] = useState(true);
    return (
        <div className="accordion-box">
            <div className='header'>
                <h3>{title}</h3>
                <button type='button' onClick={() => { setExpand(!expand) }} className={expand ? 'expand' : ''}><span></span></button>
            </div>
            <div className='content'>{expand && children}</div>
        </div>
    )
}

export default Accordion;