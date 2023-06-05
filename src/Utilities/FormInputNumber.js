import { useState } from "react";
import { mainColor } from "../constants";
import { FormInputDiv } from "./FormInputDiv";

export const FormInputNumber = ({
	htmlFor,
	label,
	name,
	step,
	onChangeHandler,
	isValid,
	invalidText,
}) => {
	const [firstTime, setFirstTime] = useState(true);

	const handleFirstTime = () => {
		setFirstTime(false);
	};

	return (
		<FormInputDiv>
			<label htmlFor={htmlFor}>{label}</label>
			<input
				type="number"
				name={name}
				step={step}
				min={0}
				onChange={onChangeHandler}
				onBlur={handleFirstTime}
				style={{
					marginLeft: "10px",
					padding: "5px",
					border: "none",
					borderBottom:
						isValid || firstTime ? "2px solid " + mainColor : "2px solid red",
					width: "250px",
					fontSize: "16px",
					color: "#555",
				}}
			/>
			{!isValid && !firstTime && (
				<p style={{ color: "red", marginTop: "5px" }}>{invalidText}</p>
			)}
		</FormInputDiv>
	);
};
