const sha256 = require('js-sha256');
const loginString = "Budget Planning is fun";

module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    let registered = (request, response) => {

        let username = request.body.user_name;
        let password = sha256(request.body.user_password);

        db.users.registered(username, password, (error, users) => {

            if (error) {

                console.error('error getting username', error);
                response.status(400).send(error);

            } else {

                if (users === null) {
                    response.status(201).send({
                        registered: true,
                        message: 'Successfully Registered'
                    });
                } else {
                    response.status(201).send({
                        registered: false,
                        message: 'Please pick another username'
                    });
                }
            }
        });
    }

    let loggedin = (request, response) => {

        let username = request.body.user_name;
        let password = sha256(request.body.user_password);

        db.users.loggedin(username, password, (error, users) => {

            if (error) {

                console.error('error getting username', error);
                return response.status(400).send(err);

            } else {

                if (users === null) {
                    response.status(201).send({
                        loggedIn: false,
                        message: 'There is no such user. Please try again'
                    });
                } else {

                    let userId = users[0].id;
                    let hashUserId = sha256(loginString + userId);

                    if (users[0].password == password) {

                        response.status(201).send({
                            loggedIn: true,
                            id: userId,
                            userSession: hashUserId,
                            message: 'Logged in successfully'
                        });

                    } else {
                        response.status(201).send({
                            loggedIn: false,
                            message: 'Password Incorrect'
                        });
                    }
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
        registered,
        loggedin
    };

}