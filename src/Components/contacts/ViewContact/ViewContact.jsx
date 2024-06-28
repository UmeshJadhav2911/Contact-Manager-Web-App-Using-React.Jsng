import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactServices } from "../../ContactServices/ContactServices";
import Spinner from "../../Spinner/Spinner";

const ViewContact=()=>{
    let {contactId}=useParams()
    let [state,setState]=useState({
        loading:false,
        contact:{},
        errorMessage:""
    })
    useEffect(()=>{
        let promise =new Promise((res,rej)=>{
            setState({...state,loading:true})
            let response =ContactServices.getContact(contactId)
            res(response)
        })
        promise.then((res1)=>{
            setState({...state,loading:false,contact:res1.data});
        }).catch(()=>{
            setState({...state,loading:false,errorMessage:alert("data is not found")})
        })
    },[contactId])
    let{loading,contact,errorMessage}=state;
    return(
        <>
        {/* <h1>{contactId}</h1> */}
        <section className="view-contact">
            <div className="container p-3">
                <div className="row">
                    <p className="h4 text-warning">View Contact</p>
                    <p className="fst-italic">The Contact Manager project is designed to help users organize and manage their contacts efficiently. It provides functionalities to  view contact, along with search capabilities. The project is built using React.js for the frontend and integrates with a backend service (potentially simulated via mock services or a REST API) to store and retrieve contact data....!!!!</p>
                </div>
            </div>
        </section>
        {
            loading?<Spinner/>:<React.Fragment>
                {
                    Object.keys(contact).length>0&&
                    <section className="view-contact my-3">
                    <div className="container d-flex flex-column justify-content-center">
                        <div className="row">
                            <div className="col-md-4 my-3">
                                <img src={contact.photo} className="img-fluid img-contact" alt="" />
                           
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <ul className="list-group">
                                    <li className="list-group-item list-group-item-action">Name:<span className="fw-bold">{contact.name}</span></li>
                                    <li className="list-group-item list-group-item-action">Email:<span className="fw-bold">{contact.email}</span></li>
                                    <li className="list-group-item list-group-item-action">Mobile:<span className="fw-bold">{contact.mobile}</span></li>
                                    <li className="list-group-item list-group-item-action">Company:<span className="fw-bold">{contact.company}</span></li>
                                    <li className="list-group-item list-group-item-action">Title:<span className="fw-bold">{contact.title} </span></li> 
                                    <li className="list-group-item list-group-item-action">groupID:<span className="fw-bold">{contact.groupID}</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <Link className="btn btn-warning my-2" to={"/"}>Back</Link>
                            </div>
                        </div>
                    </div>
                </section>
                }
            </React.Fragment>
        }
       
        </>
    )
}
export default ViewContact