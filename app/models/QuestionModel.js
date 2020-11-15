// ===== Question Model
// import Database classes
const Database 		= require('../core/Database');

class QuestionModel extends Database {

	addQuestion({ type, question, correctAnswer }, send) {
		this.db.query('INSERT INTO questions SET ?', { type, question, correct_answer: correctAnswer }, err => {
			if(err) {
				console.log(err);
				send(500, 'True', 'Server Error');
			} else {
				send(200, 'False', 'Pertanyaan baru berhasil ditambahkan');
			}
		});	
	}

	getAllQuestion(send) {
		this.db.query('SELECT * FROM questions ORDER BY id',(err, results) => {
			if(err) {
				console.log(err);
				send(500, 'True', 'Server Error', []);
			} else {
				send(200, 'False', `Berhasil mengambil ${results.length} buah pertanyan`, results);
			}
		});	
	}

	getQuestion(send) {
		this.db.query('SELECT * FROM questions ORDER BY id',(err, results) => {
			if(err) {
				console.log(err);
				send(500, 'True', 'Server Error', []);
			} else {
				results = results.map(item => ({
					id: item.id,
					type: item.type,
					question: item.question
				}));
				send(200, 'False', `Berhasil mengambil ${results.length} buah pertanyan`, results);
			}
		});	
	}

	getUsersDetail(send) {
		this.db.query('SELECT users.id, users.full_name, scores.total_scores FROM users INNER JOIN scores ON users.id = scores.user_id',(err, results) => {
			if(err) {
				console.log(err);
				send(500, 'True', 'Server Error', []);
			} else {
				results = results.map(item => ({
					id: item.id,
					full_name: item.full_name,
					total_scores: item.total_scores
				}));
				send(200, 'False', `Berhasil mengambil detail user`, results);
			}
		});	
	}

	getUserDetail(user_id, send) {
		this.db.query('SELECT users.id, users.full_name, scores.total_scores FROM users INNER JOIN scores ON users.id = scores.user_id WHERE users.id = ?', [user_id],(err, results) => {
			if(err) {
				console.log(err);
				send(500, 'True', 'Server Error', []);
			} else {
				results = results.map(item => ({
					id: item.id,
					full_name: item.full_name,
					total_scores: item.total_scores
				}));
				send(200, 'False', `Berhasil mengambil detail user`, results);
			}
		});	
	}

	addAnswer({ question_id, answer }, user_id, send) {
		this.db.query('INSERT INTO users_answer SET ?', { question_id, user_id, answer  }, err => {
			if(err) {
				console.log(err);
				send(500, 'True', 'Server Error');
			} else {
				this.db.query('SELECT correct_answer FROM questions WHERE id = ?', [question_id], (err, results) => {
					if(err) {
						console.log(err);
						send(500, 'True', 'Server Error')
					} else {
						if(answer.toLowerCase() === results[0].correct_answer.toLowerCase()) {
							this.db.query('SELECT total_scores FROM scores WHERE user_id = ?', [user_id], (err, result_score) => {
								let total_score = 0;
								if(result_score.length > 0) {
									total_score = parseInt(result_score[0].total_scores);
									total_score += 5;
								} else {
									total_score += 5;
								}
									
								this.db.query('UPDATE scores SET ? WHERE user_id = ?', [{ total_scores: total_score }, user_id], (err, res) => {
									if(err) {
										console.log(err);
										send(500, 'True', 'Server Error');
									} else {
										send(200, 'False', 'Jawaban anda benar anda mendapat tambahan 5 point');
									}
								})							
							})
						} else {
							send(200, 'False', 'Maaf jawaban anda salah');
						}
					}
				});
			}
		});	
	}

}

module.exports = new QuestionModel();
