const pool = require('./pool').pool;
const crypto = require('crypto');

function md5(password) {
	return crypto.createHash('md5').update(password).digest("hex");
}

async function isValidCreds(username, password) {
	if(username === undefined || password === undefined)
		return false;
	var hashed_pass = md5(password);
	const result = await pool.query('SELECT COUNT(*) FROM UserApplicant WHERE userId = $1 AND hashed_pass = $2;', [username, hashed_pass]);
	return result.rows[0].count > 0;
}

async function changePassword(username, password) {
	var hashed_pass = md5(password);
	const result = await pool.query('UPDATE UserApplicant SET hashed_pass = $1 WHERE userId = $2;', [hashed_pass, username]);
	return result.rowCount > 0;
}

async function changeEducation(username, education) {
	const result = await pool.query('UPDATE UserApplicant SET education = $1 WHERE userId = $2;', [education, username]);
	return result.rowCount > 0;
}

async function changeJobExp(username, jobExp) {
	const result = await pool.query('UPDATE UserApplicant SET jobExp = $1 WHERE userId = $2;', [jobExp, username]);
	return result.rowCount > 0;
}

async function changeResume(username, resume) {
	const result = await pool.query('UPDATE UserApplicant SET resume = $1 WHERE userId = $2;', [resume, username]);
	return result.rowCount > 0;
}

async function getUserInfo(username) {
	const result = await pool.query('SELECT * FROM UserApplicant WHERE userId = $1;', [username]);
	if(result.rows.length < 1)
		return {};
	return result.rows[0];
}

async function deleteUser(username) {
	const result = await pool.query('DELETE FROM UserApplicant WHERE userId = $1;', [username]);
	return result.rowCount > 0;
}

async function createUser(username, password, education, jobExp, resume) {
	var hashed_pass = md5(password);
	const result = await pool.query('INSERT INTO UserApplicant(userId, hashed_pass) VALUES ($1, $2);', [username, hashed_pass]);
	if(result.rowCount < 1)
		return false;
	if(education !== undefined)
		changeEducation(username, education);
	if(jobExp !== undefined)
		changeJobExp(username, jobExp);
	if(resume !== undefined)
		changeResume(username, resume);
	return true;
}

module.exports = {
	isValidCreds,
	changePassword,
	getUserInfo,
	deleteUser,
	createUser
}