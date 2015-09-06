var Question = React.createClass({displayName: "Question",
	render: function () {
		return (
			React.createElement("tr", null

			)
		);
	}
});

var Exam = React.createClass({displayName: "Exam",
	render: function () {
		var questions = '';
		return (
			React.createElement("div", null, 
				"Exam Title", 
				React.createElement("br", null), 
				React.createElement("input", {type: "text"}), 
				React.createElement("br", null), 
				"Alloted Time", 
				React.createElement("br", null), 
				React.createElement("input", {type: "text"}), 
				questions
			)
		);
	}
});

React.render(React.createElement(Exam, null), document.body);