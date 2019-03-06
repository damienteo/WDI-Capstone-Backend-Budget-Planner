const sha256 = require('js-sha256');
// const cookieParser = require('cookie-parser');

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

        db.plans.newPlan(years, monthlyIncome, goal, (error, users) => {

            if (error) {

                console.error('You already have a plan', error);
                response.status(400).send(err);

            } else {

                if (users === null) {
                    response.status(201).send({
                        registered: true,
                        message: 'Plan created'
                    });
                } else {
                    response.status(201).send({
                        registered: false,
                        message: 'error creating plan'
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