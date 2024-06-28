import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactServices } from "../../ContactServices/ContactServices";
import Spinner from "../../Spinner/Spinner";

const ContactList = () => {
  const [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: "",
    searchQuery: "",
  });

  useEffect(() => {
    setState({ ...state, loading: true });
    ContactServices.getAllContacts()
      .then((response) => {
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data,
        });
      })
      .catch(() => {
        setState({ ...state, loading: false, errorMessage: "Data not found" });
      });
  }, []);

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    const filteredContacts = state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setState({
      ...state,
      filteredContacts: filteredContacts,
      searchQuery: searchQuery,
    });
  };
   /////DELETE CONTACT
  const handleDeleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
        ContactServices.deleteContact(id)
            .then(() => {
                const updatedContacts = state.contacts.filter(contact => contact.id !== id);
                setState({
                    ...state,
                    contacts: updatedContacts,
                    filteredContacts: updatedContacts 
                });
                alert("Contact deleted successfully.");
            })
            .catch((error) => {
                alert("Failed to delete contact. Please try again later.");
            });
    }
};

  const { loading, filteredContacts, errorMessage, searchQuery } = state;

  return (
    <>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <p className="h3">
                Contact Manager{" "}
                <Link to={"/contacts/add"} className="btn btn-primary">
                  <i className="fa fa-plus-circle me-2"> New</i>
                </Link>
              </p>
              <p>
              The Contact Manager project is designed to help users organize and manage their contacts efficiently. It provides functionalities to add, view, edit, and delete contacts, along with search capabilities. The project is built using React.js for the frontend and integrates with a backend service (potentially simulated via mock services or a REST API) to store and retrieve contact data....!!!!
              </p>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-8 mb-2">
                    <input
                      type="search"
                      name=""
                      placeholder="Search Names"
                      className="form-control"
                      id=""
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <div className="col mb-2">
                    <input
                      type="submit"
                      value="Search"
                      className="btn btn-outline-dark"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-card">
        <div className="container">
          <div className="row">
            {loading ? (
              <Spinner />
            ) : (
              <React.Fragment>
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <div className="col-md-6" key={contact.id}>
                      <div className="row">
                        <div className="card my-3">
                          <div className="card-body">
                            <div className="row d-flex align-items-center">
                              <div className="col-md-4">
                                <img
                                  src={contact.photo}
                                  className="img-fluid contact-img"
                                  alt=""
                                />
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name:{" "}
                                    <span className="fw-bold ms-1">
                                      {contact.name}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email:
                                    <span className="fw-bold ms-1">
                                      {contact.email}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Contact:{" "}
                                    <span className="fw-bold ms-1">
                                      {contact.mobile}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column p-1">
                                <Link
                                  to={`/contacts/view/${contact.id}`}
                                  className="btn btn-warning my-1"
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                                <Link
                                  to={`/contacts/edit/${contact.id}`}
                                  className="btn btn-primary my-1"
                                >
                                  <i className="fa fa-pen"></i>
                                </Link>
                                <button className="btn btn-danger my-1" onClick={()=> handleDeleteContact(contact.id)}>
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-md-12">
                    <p>No contacts found.</p>
                  </div>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactList;
