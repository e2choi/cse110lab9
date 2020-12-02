const db = require('../src/db_config');


module.exports = function getTutors(cseCourse) {
    return db.ref('course').child(cseCourse).once('value')
        .then(snapshot => snapshot.val())
        .catch(error => console.log(error));
};
