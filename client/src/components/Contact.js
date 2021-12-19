import React, { Fragment, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { contact } from "../actions/contacts";

const Contact = () => {
  const { alerts, alertType } = useSelector((state) => state.alerts);

  const { isLoading } = useSelector((state) => state.messages);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const { email, phone, address, message } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = JSON.stringify(formData);
    dispatch(contact(data));
  };

  return (
    <Fragment>
      <Navbar />
      {isLoading === true && (
        <Fragment>
          {/* <div id="modal-box" className="modal-box">
                        <div id="modal" className="modal custom-spinner">
                        </div>
                    </div> */}
        </Fragment>
      )}
      <div className="container mt-4">
        <h1 className="text-center text-primary mb-4">Contact Us</h1>
        <form className="row g-3" onSubmit={handleSubmit}>
          {alerts.map((alert, i) => {
            return (
              <p
                key={i}
                className={`alert alert-${alertType} text-center w-100 p-2 mb-3`}
              >
                {alert}
              </p>
            );
          })}
          <div className="col-md-6 mb-4">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-4">
            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder="Phone"
              value={phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 mb-4">
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="1234 Main St"
              value={address}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 mb-4">
            <textarea
              rows="5"
              type="text"
              className="form-control"
              name="message"
              onChange={handleChange}
              value={message}
            >
              {message}
            </textarea>
          </div>
          <div className="text-center mx-auto mb-sm-0 mb-3 mt-5">
            <button
              type="submit"
              name="save-button"
              className="btn btn-primary"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Contact;
