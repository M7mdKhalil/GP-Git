import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import '../stylesheets/Cintro.css'

export default function Cintro() {
    return (
        <div className="container">
            <div className="company-logo">
                <img src='https://reactjsexample.com/content/images/2020/06/BusLine.jpg' alt="Company logo" />
            </div>
            <div className="company-info">
                <h1>Company Name</h1>
                <p>Here is some information about the company.</p>
            </div>
        </div>
    );
}