import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { BsPencil } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';

export function TutorList(props) {
    const history = useHistory();
    const courseNumber = localStorage.getItem('course')
    const [tutors, setTutors] = useState(props.tutors || []);
    const { cseCourse } = props.location;
    const [course] = useState(cseCourse || courseNumber);
    const [nameEdit, setNameEdit] = useState(-1);
    const [yearEdit, setYearEdit] = useState(-1);

    /* READ */
    const getTutors = (cseCourse) => {
        let config = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          };
          return fetch('http://localhost:8000/tutor_list?cseCourse=' + cseCourse, config)
          .then(response => response.json())
          .catch(error => console.log(error));
    }

    /* UPDATE */
    const updateTutors = (tutors, cseCourse) => {
        let config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'tutors': tutors,
                'cseCourse': cseCourse
            })
          };
        fetch('http://localhost:8000/tutor_list/update_tutor', config)
        .catch(error => console.log(error));  
          
        
    }

    /* DELETE */
    const deleteTutor = (tutor, cseCourse) => {
        let config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'tutor': tutor,
                'cseCourse':cseCourse
            })
          };
        fetch('http://localhost:8000/tutor_list/remove_tutor', config)
        .catch(error => console.log(error));  
        
    }

    // retrieve Tutor list and store in the tutors array to display the tutors in a table
    useEffect(
        () => {
            if(!props.tutors)
                getTutors(course)
                .then(tutorsSnapshot => {
                    let tutorList = [];

                    for(var tutor in tutorsSnapshot) {
                        tutorList.push({...tutorsSnapshot[tutor], key: tutor})
                    }

                    setTutors(tutorList);
                });
        },
        [course, props.tutors]
    );

    // navigating to Hire Tutor page
    const handleClick = () => {
        history.push({
            pathname: "/tutor_list/hire_tutor",
            cseCourse: course
        })
    }

    /* handles removing a tutor from the list */
    const handleFire = (tutor) => {
        /* find which tutor to remove, and remove them from our tutors list */
        const tutorIndex = tutors.findIndex(el => el === tutor);
        const tutorList = [...tutors];
        tutorList.splice(tutorIndex, 1);
        setTutors(tutorList);

        deleteTutor(tutor, course);
    }

    /* goes back to the home page */
    const goBack = () => {
        history.goBack();
    }

    /*  "handleXXXChange" is used to specify updates in the View, and
        "handleXXXUpdate" is used to specify updating the database */

    /* updates the name of a tutor on the tutor list, just on the view */
    const handleNameChange = (tutor, newName) => {
        const tutorIndex = tutors.findIndex(el => el === tutor);
        const tutorList = [...tutors];
        tutorList[tutorIndex] = { ...tutorList[tutorIndex], name: newName };

        setTutors(tutorList);
    }

    /* updates the year of a tutor on the tutor list, just on the View */
    const handleYearsChange = (tutor, newYears) => {
        const tutorIndex = tutors.findIndex(el => el === tutor);
        const tutorList = [...tutors];
        tutorList[tutorIndex] = { ...tutorList[tutorIndex], years: newYears };

        setTutors(tutorList);
    }

    /*  updates the tutor list with the updated names/years on the database.
        Synchronize the view with the database */
    const handleTutorUpdate = () => {
        updateTutors(tutors, course);
    }

    /* render the html, show view to the user */
    return (
        <div className="container">
            <header className="App-header">
                <h1>Tutor List for CSE {course}</h1>
                <Table striped bordered hover variant="dark" className="table tutors-table">
                    <thead>
                        <tr >
                            <th className="table-row">Name</th>
                            <th className="table-row">Years</th>
                            <th className="table-row">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutors && tutors.map((tutor, key) => (
                            <tr key={key} className="tutors-table-row">
                                <td><BsPencil className="edit-tutor-button" onClick={() => setNameEdit(key)} /> {nameEdit === key ?
                                    (<div><Form.Control value={tutor.name} onChange={(event) => handleNameChange(tutor, event.target.value)} />
                                        <Button variant="info" className="save-button" onClick={() => { setNameEdit(-1); handleTutorUpdate(); }}>Save</Button></div>)
                                    : (tutor.name)
                                }
                                </td>
                                <td><BsPencil onClick={() => setYearEdit(key)} /> {yearEdit === key ?
                                    (<div><Form.Control value={tutor.years} onChange={(event) => handleYearsChange(tutor, event.target.value)} />
                                        <Button variant="info" onClick={() => { setYearEdit(-1); handleTutorUpdate(); }}>Save</Button></div>)
                                    : (tutor.years)
                                }
                                </td>
                                <td><Button variant="danger" className="btn-danger fire-button" onClick={() => handleFire(tutor)}>Fire</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div>
                    <Button onClick={handleClick} className="btn-primary">
                        Hire Tutor!
                    </Button>
                </div>
                <div className="home-button">
                    <Button variant="info" onClick={goBack} className="home-button">
                        Home Page
                    </Button>
                </div>
            </header>
        </div>
    );
}


