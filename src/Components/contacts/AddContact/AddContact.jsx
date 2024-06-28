import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ContactServices } from "../../ContactServices/ContactServices";
const AddContact=()=>{
    let Navigate=useNavigate()
    let[state,setState]=useState({
        loading:false,
        contact:{
            name:"",
            photo:"",
            mobile:"",
            email:"",
            title:"",
            company:"",
            groupID:""
        },
        group:[],
        errorMessage:""
    })
    let updateInput=(event)=>{
        setState({ ...state,contact:{
            ...state.contact,
            [event.target.name]:event.target.value
        }})
    }
    let{loading,contact,groups,errorMessage}=state;

    let submitForm=(event)=>{
        event.preventDefault()
        let promise= new Promise((res, rej) => {
            let response=ContactServices.createContact(contact)
            res(response)
        })
        promise.then((res1)=>{
            if (res1) {
                Navigate("/contacts/list",{replace:true})
                
            }
            else{
                Navigate("/contacts/add",{replace:false})
            }
        }).catch(()=>{
            alert("Data is not Found")
        })
        
    }
    return(
        <>
        <pre>{JSON.stringify(contact)}</pre>
        {/* <h1>Add Contact</h1> */}
        <section className="edit-contact">
            <div className="container p-3">
                <div className="row">
                    <p className="fw-bold h4 text-primary">Add Contact</p>
                    <p className="fst-italic">"The Contact Manager project is designed to help users organize and manage their contacts efficiently. It provides functionalities to add, view, edit, and delete contacts, along with search capabilities. The project is built using React.js for the frontend and integrates with a backend service (potentially simulated via mock services or a REST API) to store and retrieve contact data.!!!!!</p>
                </div>
                <div className="row d-flex justify-content-center align-items-center ">
                    <div className="col-md-4">
                        <form action="" onSubmit={submitForm}>
                            <div className="mb-2">
                                <input type="text" name="name" required={true} value={contact.name} onChange={updateInput} id="" placeholder="Name" className="form-control" />
                            </div>
                            <div className="mb-2">
                                <input type="text" name="photo" required={true} value={contact.photo} onChange={updateInput} id="" placeholder="photo url" className="form-control" />
                            </div>
                            <div className="mb-2">
                                <input type="number" name="mobile" required={true} value={contact.mobile} onChange={updateInput} id="" placeholder="mobile" className="form-control" />
                            </div>
                            <div className="mb-2">
                                <input type="text" name="email" required={true} value={contact.email} onChange={updateInput} id="" placeholder="Email" className="form-control" />
                            </div>
                            <div className="mb-2">
                                <input type="text" name="company" required={true} value={contact.company} onChange={updateInput} id="" placeholder="Company Name" className="form-control" />
                            </div>
                            <div className="mb-2">
                                <input type="text" name="title" required={true} value={contact.title} onChange={updateInput} id="" placeholder="Title" className="form-control" />
                            </div>
                            <div className="mb-2">
                                <input type="text" name="groupID" required={true} value={contact.groupID} onChange={updateInput} id="" placeholder="Company GroupID" className="form-control" />
                            </div>
                            <div className="">
                                <input type="submit" name="" value={"Update"} id="" placeholder="update" className="btn btn-primary" />
                                {/* <input type="text" name="" id="" placeholder="Canc" className="btn btn-danger" /> */}
                                <Link to={'/'} className="btn btn-danger ms-2">Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-8">
                        <img className="img-fluid contact-img" src={contact.photo} alt="" />
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
export default AddContact