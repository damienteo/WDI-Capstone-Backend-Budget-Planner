/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    let setPlan = (years, monthlyIncome, goal, userId, callback) => {

        const values = [years, monthlyIncome, goal, userId];

        dbPoolInstance.query('SELECT * from plans WHERE user_id=$1', [userId], (error, queryResult) => {
            if (error) {
                // invoke callback function with results after query has executed
                callback(error, null);

            } else {

                if (queryResult.rows.length > 0) {
                    dbPoolInstance.query(`
                        UPDATE plans 
                        SET years = $1, monthlyIncome = $2, goal = $3
                        WHERE user_id=$4
                        RETURNING *
                    `, values, (error, queryResult) => {
                        callback(null, queryResult.rows[0]);
                    })

                } else {
                    dbPoolInstance.query('INSERT INTO plans (years, monthlyIncome, goal, user_id) VALUES($1, $2, $3, $4) RETURNING *', values, (error, queryResult) => {
                        callback(null, null);
                    })
                }
            }
        });
    }

    let getPlan = (userId, callback) => {

        const values = [userId];

        dbPoolInstance.query(`
            SELECT * from plans 
            WHERE user_id=$1
        `, [userId], (error, queryResult) => {

            let data = {};
            data.plan = [];
            data.plan.push(queryResult.rows[0]);

            dbPoolInstance.query(`
                SELECT id, expense, month, reason from expenses 
                WHERE user_id=$1
            `, [userId], (error, queryResult) => {

                data.expenses = []
                for (let i = 0; i < queryResult.rows.length; i++) {
                    data.expenses.push(queryResult.rows[i]);
                }

                if (error) {
                    // invoke callback function with results after query has executed
                    callback(error, null);

                } else {

                    if (data) {
                        callback(null, data);
                    } else {
                        callback(null, null);
                    }
                }
            })
        });
    }

    return {
        setPlan,
        getPlan
    };

}