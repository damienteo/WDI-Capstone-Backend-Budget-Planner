/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    let newPlan = (years, monthlyIncome, goal, callback) => {

        const values = [years, monthlyIncome, goal];

        dbPoolInstance.query('SELECT * from plans WHERE user_id=$1', [username], (error, queryResult) => {
            if (error) {
                // invoke callback function with results after query has executed
                callback(error, null);

            } else {

                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows[0]);

                } else {
                    dbPoolInstance.query('INSERT INTO plans (years, monthlyIncome, goal) VALUES($1, $2, $3) RETURNING *', values, (error, queryResult) => {
                        callback(null, null);
                    })
                }
            }
        });
    }


    return {
        newPlan,
    };

}