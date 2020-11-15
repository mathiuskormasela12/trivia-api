// ===== Auth Controller
// import all models & all modules
const authModel			= require('../models/AuthModel');
const jwt						= require('jsonwebtoken');

exports.isAdmin		= function(req, res, next) {

	const token = req.params.token || req.body.token || req.query.token || req.headers['token'];

	if(token) {
		jwt.verify(token, process.env.SECRET, (err, decode) => {
			if(err) {
				if(!String(err).includes('jwt expired')) {
					console.log(err);
					return res.status(500).json({
									status: 500,
									error: "False",
									message: "Token bermasalah"
								});
				}
				return res.status(200).json({
									status: 200,
									error: "False",
									messsage: "Token sudah expire"
								});
			} else {
					req.decode = decode;
					if(decode.role !== "admin") {
						return res.status(200).json({
							status: 200,
							error: "False",
							message: "Anda tidak punya akses"
						});
					}
					next();
			}
		});
	} else {
		return res.status(200).json({
			status: 200,
			error: "False",
			message: "Tidak ada token"
		});
	}

}

exports.isUser		= function(req, res, next) {

	const token = req.params.token || req.body.token || req.query.token || req.headers['token'];

	if(token) {
		jwt.verify(token, process.env.SECRET, (err, decode) => {
			if(err) {
				if(!String(err).includes('jwt expired')) {
					console.log(err);
					return res.status(500).json({
									status: 500,
									error: "False",
									message: "Token bermasalah"
								});
				}
				return res.status(200).json({
									status: 200,
									error: "False",
									messsage: "Token sudah expire"
								});
			} else {
					req.decode = decode;
					if(decode.role !== "user") {
						return res.status(200).json({
							status: 200,
							error: "False",
							message: "Anda tidak punya akses"
						});
					}
					next();
			}
		});
	} else {
		return res.status(200).json({
			status: 200,
			error: "False",
			message: "Tidak ada token"
		});
	}

}

exports.register = function(req, res) {

	const {
		full_name,
		email,
		password,
		repeatPassword,
		role
	} = req.body;

	if(!full_name || !email || !password || !repeatPassword || !role) {
		return res.status(200).json({
						status: 200,
						error: "False",
						message: "Form kosong"
					});
	}

	if(password.match(/[A-Z]/g) === null || password.match(/[a-z]/g) === null || password.match(/\d/) === null) {
		return res.status(200).json({
						status: 200,
						error: "False",
						message: "Password harus terdiri dari huruf besar, kecil dan angka"
					});
	}

	if(password.length < 5) {
		return res.status(200).json({
						status: 200,
						error: "False",
						message: "Panjang password minimal 5 karakter"
					});
	}

	if(password !== repeatPassword) {
		return res.status(200).json({
						status: 200,
						error: "False",
						message: "Password tidak cocok"
					});
	}

	authModel.register(full_name, email, password, role, (status, error, message) => {
		res.status(status).json({
			status,
			error,
			message
		});
	});

}

exports.login				= function(req, res) {
	const {
		email,
		password
	} = req.body;

	if(!email || !password) {
		return res.status(200).json({
			status: 200,
			error: "False",
			message: "Form kosong"
		});
	}

	authModel.login(email, password, (status, error, message, token) => {
		res.status(status).json({
			status,
			error,
			message,
			token
		});
	});

}
