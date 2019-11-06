import React from "react";
import ApiContext from "../../ApiContext";

class FolderPicker extends React.Component {
	static contextType = ApiContext;

	render() {
		return (
			<select className="FolderPicker" onChange={(e) => this.props.assignFolderId(e.target.value)}>
				{this.context.folders.map((folder) => (
					<option key={folder.id} value={folder.id}>
						{folder.name}
					</option>
				))}>
			</select>
		);
	}
}

export default FolderPicker;
