import React from "react";
import Spinner1 from "../Spinner/loading.gif"

const Spinner=()=>{
    return(
        <div className="d-flex justify-content-center align-items-center">
            <img src={Spinner1} alt="" className="img-fluid contact-img" />
        </div>
    )
}
export default Spinner