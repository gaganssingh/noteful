import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

function Button(props) {
	const { tag, className, childrenm, ...otherProps } = props;
	return React.createElement(
		props.tag,
		{
			className : [
				"Button",
				props.className
			].join(" "),
			...otherProps
		},
		props.children
	);
}

Button.defaultProps = {
	tag : "a"
};

Button.propTypes = {
	className : PropTypes.string.isRequired,
	children  : PropTypes.array.isRequired
};

export default Button;
