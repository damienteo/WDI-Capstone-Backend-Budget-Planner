const sha256 = require('js-sha256');

const loginString = "Budget Planning is fun";

let message = '';

module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */


    let setExpense = (request, response) => {

        let newExpense = request.body.newExpense;
        let newMonth = request.body.newMonth;
        let expenseReason = request.body.expenseReason;
        let userId = request.body.userId;
        let userSession = request.body.userSession;

        db.expenses.setExpense(newExpense, newMonth, expenseReason, userId, (error, expenses) => {

            if (error) {

                console.error('Error while creating expense', error);
                response.status(400).send(err);

            } else {

                if (expenses === null) {
                    response.status(201).send({
                        message: 'Unable to create expense'
                    });
                } else {
                    response.status(201).send({
                        message: 'Expense created'
                    });
                }
            }
        });
    }

    let getExpenses = (request, response) => {

        userId = request.body.userId;
        userSession = request.body.userSession;

        db.expenses.getExpenses(userId, (error, users) => {

            if (error) {

                console.error('Unable to get plan', error);
                response.status(400).send(err);

            } else {

                if (users === null) {
                    response.status(201).send({
                        message: 'No previous plan',
                        exist: false
                    });
                } else {
                    response.status(201).send({
                        plan: users,
                        message: 'Setting plan',
                        exist: true
                    });
                }
            }
        });
    }


    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        setExpense,
        getExpenses
    };

}