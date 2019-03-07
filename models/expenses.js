/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    let setExpense = (newExpense, newMonth, expenseReason, userId, callback) => {

        const values = [newExpense, newMonth, expenseReason, userId];

        dbPoolInstance.query(`
        INSERT INTO expenses (expense, month, reason, user_id) 
        VALUES($1, $2, $3, $4) 
        RETURNING *
        `, values, (error, queryResult) => {

            dbPoolInstance.query(`
                SELECT id, expense, month, reason 
                FROM expenses 
                WHERE user_id=$1
            `, [userId], (error, queryResult) => {

                if (error) {
                    // invoke callback function with results after query has executed
                    callback(error, null);

                } else {

                    if (queryResult.rows.length > 0) {
                        callback(null, queryResult.rows);
                    } else {
                        callback(null, null);
                    }
                }

            })
        });
    }

    return {
        setExpense,
    };

}