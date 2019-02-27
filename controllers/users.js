const sha256 = require('js-sha256');
const loginString = "Budget Planning is fun";

module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    // let authentication = false;

    // const cookieAuthentication = request => {

    //     authentication = false;

    //     currentUserId = request.cookies['userId'];
    //     currentLog = request.cookies['loggedin'];
    //     compareLog = sha256(loginString + currentUserId);

    // }

    // const loginAuthentication = (request, response, view) => {

    //     // currentUserId = request.cookies['userId'];
    //     // currentLog = request.cookies['loggedin'];
    //     compareLog = sha256(loginString + currentUserId);

    //     authentication = false;

    //     if (currentLog == null) {
    //         response.render(view);

    //     } else {
    //         if (currentLog == compareLog) {
    //             authentication = true
    //             message = "You are already logged in. Please log out first.";
    //             response.render('Message', { message, authentication });
    //         } else {
    //             response.render(view);
    //         }
    //     }
    // };

    // const frontAuthentication = (request, response, message, view) => {

    //     currentUserId = request.cookies['userId'];
    //     currentLog = request.cookies['loggedin'];
    //     compareLog = sha256(loginString + currentUserId);

    //     authentication = false;

    //     if (currentLog == compareLog) {
    //         authentication = true

    //     }

    //     response.render(view, { message, authentication });
    // };

    // let register = (request, response) => {

    //     loginAuthentication(request, response);

    // }

    let registered = (request, response) => {

        console.log(request);

        let username = request.body.user_name;
        let password = sha256(request.body.user_password);

        console.log("username", username);
        console.log("password", password);

        db.users.registered(username, password, (error, users) => {

            if (error) {

                console.error('error getting username', error);
                response.status(400).send(error);

            } else {

                if (users === null) {
                    response.status(201).send({registered: true, message: 'Successfully Registered'});
                } else {
                    response.status(201).send({registered: false, message: 'Please pick another username'});
                }
            }
        });
    }

    // let login = (request, response) => {

    //     loginAuthentication(request, response, 'users/Login');

    // }

    let loggedin = (request, response) => {

        userPassword(request);

        db.users.loggedin(username, password, (error, users) => {

            if (error) {

                console.error('error getting username', error);
                return response.status(400).send(err);

            } else {

                if (users === null) {
                    response.status(201).send({loggedIn: false, message: 'There is no such user. Please try again'});
                } else {

                    let userId = users[0].id;
                    let hashUserId = sha256(loginString + userId);

                    if (users[0].password == password) {

                        response.status(201).send({loggedIn: true, id: userId, userSession: hashUserId, message: 'Logged in successfully'});

                    } else {
                        response.status(201).send({loggedIn: false, message: 'Password Incorrect'});
                    }
                }
            }
        });
    }

    // let profile = (request, response) => {

    //     cookieAuthentication(request);

    //     if (currentLog == null) {

    //         message = "Please Login";
    //         response.render('Message', { message });

    //     } else {

    //         if (currentLog == compareLog) {
    //             authentication = true
    //             db.users.profile(currentUserId, (error, results) => {
    //                 response.render('users/Profile', { results, authentication });
    //             });
    //         } else {
    //             message = "Invalid Profile";
    //             response.render('Message', { message });
    //         }
    //     }

    // }


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
