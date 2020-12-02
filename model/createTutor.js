const db = require('../src/db_config');

module.exports = function createTutor(name, years, cseCourse) {
    var tutorData = {
        name,
        years
    };
    var tutorKey = db.ref('course').child(cseCourse).push().key;
    var updates = {};
    updates['/course/' + cseCourse + '/' + tutorKey] = tutorData;

    db.ref().update(updates);
}
