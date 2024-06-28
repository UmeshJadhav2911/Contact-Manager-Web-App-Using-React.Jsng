import axios from "axios";
// import React from "react";

export class ContactServices{
    static serverUrl="http://localhost:7000"
    
    static getAllContacts(){
        let dataUrl=`${this.serverUrl}/Contacts`
        return axios.get(dataUrl)
    }

    static getContact(contactId){
        let dataUrl=`${this.serverUrl}/Contacts/${contactId}`;
        return axios.get(dataUrl)
    }
    
    static createContact(contact){
     let dataUrl=`${this.serverUrl}/Contacts`
     return axios.post(dataUrl,contact)
    }

    static updateContact(contact,contactId){
      let dataUrl=`${this.serverUrl}/Contacts/${contactId}`;
     return axios.put(dataUrl,contact)   
 
    }
    static deleteContact(contactId){
        let dataUrl = `${this.serverUrl}/Contacts/${contactId}`;
        return axios.delete(dataUrl,contactId);
    }
  

}