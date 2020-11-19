import React from "react";
import "./TenseItem.css";

export default function TenseItem(props) {
	return (
		<div>
			<input type="checkbox" defaultChecked={props.selected} onChange={props.onClick}/>
			<div className="tooltip">
				<label htmlFor={props.id} >{props.name}</label>
				<span className="tooltiptext">{props.example}</span>
			</div>
		</div>
	);
}
