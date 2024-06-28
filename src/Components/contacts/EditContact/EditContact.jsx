import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactServices } from "../../ContactServices/ContactServices";
import Spinner from "../../Spinner/Spinner";

const EditContact = () => {
    const navigate = useNavigate();
    const { contactId } = useParams();

    const [state, setState] = useState({
        loading: false,
        contact: {
            name: "",
            photo: "",
            mobile: "",
            email: "",
            title: "",
            company: "",
            groupID: ""
        },
        errorMessage: ""
    });

    useEffect(() => {
        setState({ ...state, loading: true });
        ContactServices.getContact(contactId)
            .then((response) => {
                setState({
                    ...state,
                    loading: false,
                    contact: response.data
                });
            })
            .catch((error) => {
                setState({ ...state, loading: false, errorMessage: "Data not found" });
            });
    }, [contactId]);

    const updateInput = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        });
    };

    const submitForm = (event) => {
        event.preventDefault();
        setState({ ...state, loading: true });

        ContactServices.updateContact(state.contact, contactId)
            .then(() => {
                setState({ ...state, loading: false });
                navigate("/contacts/list", { replace: true });
            })
            .catch(() => {
                setState({ ...state, loading: false, errorMessage: "Failed to update contact" });
            });
    };

    const { loading, contact, errorMessage } = state;

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <section className="edit-contact">
                    <div className="container p-3">
                        <div className="row">
                            <p className="fw-bold h4 text-primary">Edit Contact</p>
                            <p className="fst-italic">
                            The Contact Manager project is designed to help users organize and manage their contacts efficiently. It provides functionalities to  edit contacts  along with search capabilities. The project is built using React.js for the frontend and integrates with a backend service (potentially simulated via mock services or a REST API) to store and retrieve contact data!!!!!
                            </p>
                        </div>
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-md-4">
                                <form onSubmit={submitForm}>
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            name="name"
                                            onChange={updateInput}
                                            value={contact.name}
                                            placeholder="Name"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            name="photo"
                                            onChange={updateInput}
                                            value={contact.photo}
                                            placeholder="Photo URL"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            name="mobile"
                                            onChange={updateInput}
                                            value={contact.mobile}
                                            placeholder="Mobile"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            name="email"
                                            onChange={updateInput}
                                            value={contact.email}
                                            placeholder="Email"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            name="company"
                                            onChange={updateInput}
                                            value={contact.company}
                                            placeholder="Company Name"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            name="title"
                                            onChange={updateInput}
                                            value={contact.title}
                                            placeholder="Title"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            name="groupID"
                                            onChange={updateInput}
                                            value={contact.groupID}
                                            placeholder="Company Group"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="">
                                        <input
                                            type="submit"
                                            value={"Update"}
                                            className="btn btn-primary"
                                        />
                                        <Link to={"/"} className="btn btn-danger ms-2">
                                            Cancel
                                        </Link>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-8">
                                <img
                                    className="img-fluid contact-img"
                                    src={contact.photo}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default EditContact;
