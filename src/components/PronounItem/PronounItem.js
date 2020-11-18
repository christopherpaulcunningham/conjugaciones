import React from 'react'

export default function PronounItem(props) {
    return (
        <div>
			<input type="checkbox" defaultChecked={props.selected} onChange={props.onClick}/>
			<label htmlFor={props.id}>{props.name}</label>
		</div>
    )
}
