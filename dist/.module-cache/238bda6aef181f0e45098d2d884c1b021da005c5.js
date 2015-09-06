var Exam = React.createClass({displayName: "Exam",
	render: function () {
		return (
			React.createElement("table", null, 
				React.createElement("thead", null, 
					React.createElement("tr", null, 
						React.createElement("th", null, "Exam Title"), 
						React.createElement("td", null, React.createElement("input", {type: "text"}))
					), 
					React.createElement("tr", null, 
						React.createElement("th", null, "Alloted Time"), 
						React.createElement("td", null, React.createElement("input", {type: "text"}))
					)
				), 
				React.createElement("tbody", null)
			)
		);
	}
});

React.render(React.createElement(Exam, null), document.body);