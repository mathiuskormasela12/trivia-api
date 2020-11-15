// ===== Auth Model
// import Database classes and all modules
const Database		= require('../core/Database');
const bcrypt		  = require('bcryptjs');
const jwt					= require('jsonwebtoken');

class AuthModel extends Database {

	register(full_name, email, password, role,  send) {
		this.db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
			if(err) {
				console.log(err);
				send(500, 'True', 'Server Error');
			} else if(results.length > 0) {
				send(200, 'False', 'Email sudah digunakan');
			} else {
				const hash = await bcrypt.hash(password, 8);
				this.db.query('INSERT INTO users SET ?', { full_name, email, password: hash, role }, err => {
					if(err) {
						console.log(err);
						send(500, 'True', 'Server Error');
					} else if(role.toLowerCase() !== 'admin') {
						this.db.query('SELECT * FROM users WHERE email = ?', [email], (err, results2) => {
							if(err) {
								console.log(err);
								send(500, 'True', 'Server Error');
							} else {
								this.db.query('INSERT INTO scores SET ?', { user_id: results2[0].id, total_scores: 0 }, err => {
									if(err) {
										console.log(err);
										send(500, 'True', 'Server Error');
									} else {
											send(200, 'False', 'User baru berhasil terdaftar')
									}
								});
							}
						})
					}
				});
			}
		});
	}
	
	login(email, password, send) {
		this.db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
			if(err) {
				console.log(err);
				send(500, 'True', 'Server Error', '');
			} else if(results.length < 1 || !(await bcrypt.compare(password, results[0].password))) {
				send(200, 'False', 'Email atau password salah');
			} else {
				const token = jwt.sign({ id: results[0].id, email, role: results[0].role }, process.env.SECRET, {
					expiresIn: '1h'
				});
				send(200, 'False', 'Login berhasil', token);
			}
		});
	}

}

module.exports = new AuthModel();
