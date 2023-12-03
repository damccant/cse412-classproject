const pool = require('./pool').pool;

//if the search bar is empty then print top 50 if not then searching value in the search box
async function specificJob(request, response) {
	const name = "%" + request.query.query + "%";
	if(name == "%%") {
		//const companyname = result.rows[0].companyname;
	    const jobs = await pool.query('SELECT * FROM JobPosting LIMIT 50;');
	    response.render("search", {jobs});
	}else{
		const jobs = await pool.query("SELECT * FROM JobPosting WHERE title LIKE $1;", [name]);
        response.render("search", {jobs});
    }
}

module.exports = {
    specificJob,
}