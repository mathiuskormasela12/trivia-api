// ===== App Controller
// import all models
const questionModel	= require('../models/QuestionModel');

exports.home 				= function(req, res) {
	res.status(200).json({
		status: 200,
		error: 'False',
		message: 'Welcome to Trivia Api'
	});
}

exports.addQuestion = function(req, res) {

	if(!req.body.type || !req.body.question || !req.body.correctAnswer) {
		res.status(200).json({
			status: 200,
			error: 'False',
			message: 'Form kosong'
		});
			return false;
	}

	if(req.body.type.length > 100) {
		res.status(200).json({
			status: 200,
			error: 'False',
			message: 'Tipe pertanyaan terlalu panjang (max 100 karakter)'
		});
		return false;
	}

	if(req.body.question.length > 500) {
		res.status(200).json({
			status: 200,
			error: 'False',
			message: 'Pertanyaan terlalu panjang (max 500 karakter)'
		});
		return false;
	}

	questionModel.addQuestion(req.body, (status, error, message) => {
		res.status(status).json({
			status,
			error,
			message
		});
	});

}

exports.getAllQuestions = function(req, res) {

	questionModel.getAllQuestion((status, error, message, results) => {
		res.status(status).json({
			status,
			error,
			message,
			results
		});
	});

}

exports.getQuestions = function(req, res) {

	questionModel.getQuestion((status, error, message, results) => {
		res.status(status).json({
			status,
			error,
			message,
			results
		});
	});

}

exports.answer = function(req, res) {

	if(!req.body.question_id || !req.body.answer) {
		res.status(200).json({
			status: 200,
			error: 'False',
			message: 'Form kosong'
		});
			return false;
	}

	if(req.body.answer.length > 500) {
		res.status(200).json({
			status: 200,
			error: 'False',
			message: 'Jawaban terlalu panjang (max 500 karakter)'
		});
		return false;
	}
		
	questionModel.addAnswer(req.body, req.decode.id,  (status, error, message) => {
		res.status(status).json({
			status,
			error,
			message
		});
	});

}

exports.getUserDetail = function(req, res) {

	questionModel.getUserDetail(req.decode.id, (status, error, message, results) => {
		res.status(status).json({
			status,
			error,
			message,
			results
		});
	});

}

exports.getUsersDetail = function(req, res) {

	questionModel.getUsersDetail((status, error, message, results) => {
		res.status(status).json({
			status,
			error,
			message,
			results
		});
	});

}

