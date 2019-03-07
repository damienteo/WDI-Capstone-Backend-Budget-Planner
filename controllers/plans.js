const sha256 = require('js-sha256');

const loginString = "Budget Planning is fun";

let message = '';

module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */


    let setPlan = (request, response) => {

        let years = request.body.years;
        let monthlyIncome = request.body.monthlyIncome;
        let goal = request.body.goal;
        let userId = request.body.userId;
        let userSession = request.body.userSession;

        db.plans.setPlan(years, monthlyIncome, goal, userId, (error, plans) => {

            if (error) {

                console.error('You already have a plan', error);
                response.status(400).send(err);

            } else {

                if (plans === null) {
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

    let getPlan = (request, response) => {

        let userId = request.body.userId;
        let userSession = request.body.userSession;

        db.plans.getPlan(userId, (error, plans) => {

            if (error) {

                console.error('Unable to get plan', error);
                response.status(400).send(err);

            } else {

                if (plans === null) {
                    response.status(201).send({
                        message: 'No previous plan',
                        exist: false
                    });
                } else {
                    response.status(201).send({
                        plan: plans,
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
        setPlan,
        getPlan
    };

}