const db = require('../src/db_config');

module.exports = function deleteTutors(cseCourse, tutor) {
    db.ref('course').child(cseCourse + '/' + tutor.key).remove();
}
