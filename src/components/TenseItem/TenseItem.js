import React from "react";
import "./TenseItem.css";

export default function TenseItem(props) {
	return (
		<div>
			<input type="checkbox" defaultChecked={props.selected} onChange={props.onClick}/>
			<div class="tooltip">
				<label htmlFor={props.id} >{props.name}</label>
				<span class="tooltiptext">{props.example}</span>
			</div>
		</div>
	);
}
