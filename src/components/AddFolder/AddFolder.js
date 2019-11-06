import React from "react";
import ApiContext from "../../ApiContext";
import config from "../../config";
import CatchError from "../../ErrorBoundries/CatchError";
import ValidationError from "../../ErrorBoundries/ValidationError";
import "./AddFolder.css";

class AddFolder extends React.Component {
	static contextType = ApiContext;
	constructor(props) {
		super(props);
		this.state = {
			name : {
				value   : "",
				touched : false
			},
			id   : ""
		};
	}

	handleSubmit(event) {
		event.preventDefault();
		const folder = {
			id   : this.state.id,
			name : this.state.name.value
		};
		const url = `${config.API_ENDPOINT}/folders`;
		const options = {
			method  : "POST",
			headers : {
				Accept         : "application/json",
				"Content-Type" : "application/json"
			},
			body    : JSON.stringify(folder)
		};

		fetch(url, options)
			.then((response) => {
				if (!response.ok) {
					return response.json().then((e) => Promise.reject(e));
				}
				return response.json();
			})
			.then((data) => {
				this.setState({
					name : { value: "" },
					id   : ""
				});
				this.context.addFolder(data);
				this.props.history.push("/");
			});
	}

	validateName() {
		const name = this.state.name.value.trim();
		if (name.length === 0) {
			return "Please enter a name";
		}
	}

	addFolderName(name) {
		this.setState({
			name : { value: name, touched: true }
		});
	}

	render() {
		return (
			<form className="AddFolder" onSubmit={(e) => this.handleSubmit(e)}>
				<CatchError>
					<h2>Add folder</h2>
					<label htmlFor="name">Folder Name *</label>
					<input type="text" name="name" onChange={(e) => this.addFolderName(e.target.value)} />
					{this.state.name.touched && <ValidationError message={this.validateName()} />}
					<div className="AddFolder__hint">* required field</div>
					<button type="submit" className="AddFolder-button" disabled={this.validateName()}>
						Add Folder
					</button>
				</CatchError>
			</form>
		);
	}
}

export default AddFolder;
