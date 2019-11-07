import React from "react";
import ApiContext from "../../ApiContext";
import config from "../../config";
import CatchError from "../../ErrorBoundries/CatchError";
import ValidationError from "../../ErrorBoundries/ValidationError";
import FolderPicker from "../FolderPicker/FolderPicker";
import "./AddNote.css";

class AddNote extends React.Component {
	static contextType = ApiContext;
	constructor(props) {
		super(props);
		this.state = {
			name     : {
				value   : "",
				touched : false
			},
			modified : "",
			folderId : {
				value   : "",
				touched : false
			},
			content  : {
				value   : "",
				touched : false
			}
		};
	}

	handleSubmit(event) {
		event.preventDefault();
		const note = {
			name     : this.state.name.value,
			modified : this.state.modified,
			content  : this.state.content.value,
			folderId : this.state.folderId.value
		};

		const url = `${config.API_ENDPOINT}/notes`;
		const options = {
			method  : "POST",
			headers : {
				Accept         : "application/json",
				"Content-Type" : "application/json"
			},
			body    : JSON.stringify(note)
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
					name     : { value: "" },
					modified : "",
					folderId : { value: "" },
					content  : { value: "" }
				});
				this.context.addNote(data);
				this.props.history.push("/");
			});
	}

	addNoteName(name) {
		this.setState({
			name : { value: name, touched: true }
		});
	}

	addNoteContent(content) {
		this.setState({
			content : { value: content, touched: true }
		});
	}

	addModifiedDate(date) {
		this.setState({
			modified : date
		});
	}

	assignFolderId = (folder) => {
		this.setState({
			folderId : { value: folder, touched: true }
		});
	};

	validateNoteInfo() {
		const folder = this.state.folderId.value;
		const noteName = this.state.name.value.trim();
		const noteText = this.state.content.value.trim();
		if (folder === null || noteName.length === 0 || noteText.length === 0) {
			return "Please enter all fields marked with *";
		}
	}

	render() {
		const date = new Date();
		return (
			<form className="AddNote" onSubmit={(e) => this.handleSubmit(e)}>
				<CatchError>
					<h2>Add note!</h2>
					<label htmlFor="name">Note Name *</label>
					<input
						type="text"
						name="name"
						onChange={(e) => {
							this.addNoteName(e.target.value);
							this.addModifiedDate(date);
						}}
					/>
					{this.state.name.touched && <ValidationError message={this.validateNoteInfo()} />}
					<label htmlFor="FolderPicker">Select folder *</label>
					<FolderPicker assignFolderId={this.assignFolderId} />
					{this.state.folderId.touched && <ValidationError message={this.validateNoteInfo()} />}
					<label htmlFor="noteText">Enter Note *</label>
					<input
						type="text"
						name="noteText"
						onChange={(e) => {
							this.addNoteContent(e.target.value);
							this.addModifiedDate(date);
						}}
					/>
					{this.state.name.touched && <ValidationError message={this.validateNoteInfo()} />}
					<div className="registration__hint">* required field</div>
					<button type="submit" className="AddNote_button" disabled={this.validateNoteInfo()}>
						Add Note
					</button>
				</CatchError>
			</form>
		);
	}
}

export default AddNote;
