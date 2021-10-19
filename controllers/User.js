const express = require('express');
const app = express();

module.exports.signup = (req,res) => {
	let { name, email, password, confirmPassword } = req.body
	name=name.trim();
	email=email.trim();
	password=password.trim();
	confirmPassword=confirmPassword.trim();

	if (name==="" || email==="" || password==="" || confirmPassword==="") {
		res.json({
			status: "FAILED",
			message: "Empty input fields!"
		})
	} else if (!/[a-zA-Z]$/.test(name)) {
		res.json({
			status:'FAILED',
			message:"Invalid name"
		}) 
	} else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
		res.json({
			status:'FAILED',
			message:"Invalid email"
		}) 
	} else if (password.length < 8) {
		res.json({
			status: "FAILED",
			message: "Password too short"
		})
	} else {
		// checking if user already exists
		User.find({email}).then(result => {
			if (result.length) {
				// If user already exists
				res.json({
					status: "FAILED",
					message:"User with the provided email already exists"
				})
			} else {
				// Create new user

				// password hashing
				const saltRounds = 10;
				bcrypt.hash(password, saltRounds).then(hashedPassword => {
					const newUser = new User({
						name,
						email,
						password: hashedPassword
					})
					newUser.save().then(result => {
						res.json({
							status: "SUCCESS",
							message: "Signup successful",
							data: result,
						})
					}).catch(err => {
						res.json({
							status: "FAILED",
							message: "An error occurred while saving user account"
						})
					})

				}).catch(err => {
					res.json({
						status: "FAILED",
						message: "An error occurred while hashing password"
					})
				})

			}
		}).catch(err => {
			console.error(err)
			res.json({
				status: "FAILED",
				message: "An error occurred while checking for existing user"
			})
		})
	}
}

module.exports.signin = (req,res) => {
	let { email, password } = req.body
	email=email.trim();
	password=password.trim();

	if (email==="" || password==="") {
		res.json({
			status:"FAILED",
			message: "Empty credentials supplied"
		})
	} else {
		// Check if user exists
		User.find({email}).then(data => {
			if(data.length) {
				// User exists
				const hashedPassword = data[0].password;
				bcrypt.compare(password, hashedPassword).then(result => {
					if (result) {
						// Password match
						res.json({
							status: "SUCCESS",
							message: "Signup successful",
							data: data,
						})
					} else {
						res.json({
							status:"FAILED",
							message: "Invalid Password"
						})
					}
				}).catch(err => {
					res.json({
						status:"FAILED",
						message: "An error occurred while comparing password"
					})
				})
			} else {
				res.json({
					status:"FAILED",
					message: "Invalid credentials supplied"
				})
			}
		}).catch(err => {
			res.json({
				status:"FAILED",
				message: "An error occurred while checking for existing user"
			})
		})
	}
}