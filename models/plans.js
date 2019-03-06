/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

    let newPlan = (years, monthlyIncome, goal, userId, callback) => {

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

    // let newPlan = (years, monthlyIncome, goal, callback) => {

    //     const values = [years, monthlyIncome, goal];

    //     dbPoolInstance.query('SELECT * from plans WHERE user_id=$1', [username], (error, queryResult) => {
    //         if (error) {
    //             // invoke callback function with results after query has executed
    //             callback(error, null);

    //         } else {

    //             if (queryResult.rows.length > 0) {
    //                 callback(null, queryResult.rows[0]);

    //             } else {
    //                 dbPoolInstance.query('INSERT INTO plans (years, monthlyIncome, goal) VALUES($1, $2, $3) RETURNING *', values, (error, queryResult) => {
    //                     callback(null, null);
    //                 })
    //             }
    //         }
    //     });
    // }


    return {
        newPlan,
    };

}