var ExamPlayer = React.createClass({
	getInitialState: function () {
		return {
			status: 'loading',
			title: 'Loading...',
			hours: 'Loading...',
			minutes: 'Loading...',
			allotedTime: 'Loading...',
			questions: [],
			answers: []
		};
	},
	formatRemainingTime: function () {
		var remainingTimeInSeconds = this.state.allotedTime;
		/* it is safe to assume that remainingTimeInSeconds is above 0 */
		var h = parseInt(remainingTimeInSeconds / 3600);
		var m = parseInt(remainingTimeInSeconds % 3600 / 60);
		var s = remainingTimeInSeconds % 3600 % 60;

		return h + " hours " + m + " minutes " + s + " seconds remaining.";
	},
	reInitializeExam: function () {
		this.setState({
			allotedTime: (this.state.hours * 60 + this.state.minutes) * 60,
			status: 'ready',
			answers: []
		});
	},
	initializeExam: function (exam) {
		this.setState({
			title: exam.title,
			hours: exam.hours,
			minutes: exam.minutes,
			allotedTime: exam.allotedTime * 60,
			questions: exam.questions,
			status: 'ready'
		});
	},
	tick: function () {
		var time = this.state.allotedTime-1;

		if (time > 0) {
			this.setState({
				allotedTime: time
			});
		} else {
			this.endExam();
		}
	},
	startExam: function () {
		this.setState({
			status: 'running',
		});
		this.interval = setInterval(this.tick, 1000);
	},
	endExam: function () {
		clearInterval(this.interval);
		alert('You got ' + this.checkAnswers() + ' out of ' + this.state.questions.length);
		this.reInitializeExam();
	},
	checkAnswers: function () {
		var correctAnswers = 0;

		this.state.questions.forEach(function (question, index) {
			// for multiple-answer questions 
			if (question.correctAnswers.constructor === Array && 
				$(this.state.answers[index]).not(question.correctAnswers).length === 0 &&
				$(question.correctAnswers).not(this.state.answers[index]).length === 0) {
				
				correctAnswers++;
			} 
			// for single-answer questions
			else if (question.correctAnswers == this.state.answers[index]) {
				correctAnswers++;
			}
		}, this);

		return correctAnswers;
	},
	submitExam: function () {
		this.endExam();
	},
	componentDidMount: function () {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function (exam) {
				this.initializeExam(exam);
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	handleChangeSingle: function (questionIndex, parsedChoiceId) {
		var answers = this.state.answers;
		answers[questionIndex] = parsedChoiceId;
		this.setState({answers: answers});
	},
	handleChangeMultiple: function (questionIndex, parsedChoiceId) {
		var answers = this.state.answers;

		if (answers[questionIndex]) {
			var index = $.inArray(parsedChoiceId, answers[questionIndex]);
			if (index === -1) {
				answers[questionIndex].push(parsedChoiceId);
			} else {
				answers[questionIndex].splice(index, 1);
			}
		} else {
			answers[questionIndex] = [parsedChoiceId];
		}

		this.setState({answers: answers});
	},

	render: function () {
		if (this.state.status === 'running') {
			if (this.state.questions.length) {
				var questions = this.state.questions.map(function (question, index) {
					return (
						<Question
							key={index}
							index={index}
							handleChangeMultiple={this.handleChangeMultiple}
							handleChangeSingle={this.handleChangeSingle}
							src={question} />
					);
				}, this);
			} else {
				var questions = <p>Loading questions ...</p>;
			}

			return (
				<div className="exam">
					<h1>Exam Player</h1>
					<p>Exam Title : {this.state.title}</p>
					<p>Remaining Time : {this.formatRemainingTime()}</p>
					{questions}
					<button onClick={this.submitExam}>Submit Exam</button>
				</div>
			);
		} else {
			return (
				<div className="exam">
					<h1>Exam Player</h1>
					<p>Exam Title : {this.state.title}</p>
					<p>Alloted Time : {this.state.hours} hours and {this.state.minutes} minutes</p>
					<br />
					<button onClick={this.startExam}>Start Exam</button>
				</div>
			);
		}
	}
});

var Question = React.createClass({
	handleChange: function (e) {
		if (this.props.src.correctAnswers.constructor === Array) {
			this.props.handleChangeMultiple(this.props.index, e.target.value);
		} else {
			this.props.handleChangeSingle(this.props.index, e.target.value);
		}
	},
	render: function () {
		if (this.props.src.correctAnswers.constructor === Array) {
			var choices = this.props.src.choices.map(function (choice, index) {
				return (
					<div key={choice.id}>
						<input type="checkbox" name={'q' + this.props.index} value={choice.id} onChange={this.handleChange} />
						{choice.choiceText}
						<br />
					</div>
				);
			}, this);
		} else {
			var choices = this.props.src.choices.map(function (choice, index) {
				return (
					<div key={choice.id}>
						<input type="radio" name={'q' + this.props.index} value={choice.id} onChange={this.handleChange} />
						{choice.choiceText}
						<br />
					</div>
				);
			}, this);
		}

		return (
			<div>
				<p>
					Q{this.props.index + 1} : {this.props.src.questionText}
					<br />
					{choices}
				</p>
			</div>
		);
	}
});

React.render(<ExamPlayer url="test-exam.json" />, document.body);