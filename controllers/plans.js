const sha256 = require('js-sha256');

const loginString = "Welcome to Grace";

let message = '';

module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */


    let newPlan = (request, response) => {

        years = request.body.years;
        monthlyIncome = request.body.monthlyIncome;
        goal = request.body.goal;
        userId = request.body.userId;
        userSession = request.body.userSession;

        db.plans.newPlan(years, monthlyIncome, goal, userId, (error, users) => {

            if (error) {

                console.error('You already have a plan', error);
                response.status(400).send(err);

            } else {

                if (users === null) {
                    response.status(201).send({
                        message: 'Plan created'
                    });
                } else {
                    response.status(201).send({
                        message: 'Plan updated'
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
        newPlan
    };

}