import React from "react";

class CatchError extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError : false
		};
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return <h2>Something went wrong here! Please go back using the browser.</h2>;
		}
		return this.props.children;
	}
}

export default CatchError;
