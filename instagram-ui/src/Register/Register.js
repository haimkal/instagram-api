
import React from 'react';
import './Register.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerSchema } from './register.schema';
import {H2, LABEL} from '../StylesComponent/StylesComponent';









export default function Rgister(props) {

    return (
        <div className="Register">
            <H2 primary>Register</H2>
            <Formik
                initialValues={{ username: '', email: '', password: '', agreeToTerms: false }}
                validationSchema={registerSchema}>
                <Form>
                    <div className="mb-3">
                        <LABEL htmlFor="username">Username</LABEL>
                        <Field className="form-control" id="username" name="username" placeholder="Username"/>
                        <ErrorMessage render={(msg)=> <div className="ErrorMessage">{msg}</div>} name="username" component="div" />
                    </div>
                    <div className="mb-3">
                        <LABEL htmlFor="email">Email</LABEL>
                        <Field type="email" className="form-control" id="email" name="email" placeholder="Email" />
                        <ErrorMessage render={(msg)=> <div className= "ErrorMessage">{msg}</div>} name="email" component="div" />
                    </div>

                    <div className="mb-3">
                        <LABEL htmlFor="password">Password</LABEL>
                        <Field type="password" className="form-control" id="password" name="password" placeholder="password" />
                        <ErrorMessage render={(msg)=> <div className= "ErrorMessage">{msg}</div>} name="password" component="div" />
                    </div>


                    <div className="form-check  mb-3">
                        <LABEL className="form-check-label" htmlFor="agreeToTerms">Agree to terms</LABEL>
                        <Field type="checkbox" className="form-check-input" id="agreeToTerms" name="agreeToTerms" />
                        <ErrorMessage className= "ErrorMessage" name="agreeToTerms" component="div" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success">Register</button>

                    </div>
                </Form>
            </Formik>
        </div>




    )
}
