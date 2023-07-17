import React, {useState, useRef} from "react";
import emailjs from "@emailjs/browser";
import { Alert, Space } from "antd";

const FeedbackForm = () => {
  const [formStatus, setFormStatus] = useState("Send");
const form = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Submitting...");

    // const { name, email, message } = e.target.elements;
    // const formData = {
    //   name: name.value,
    //   email: email.value,
    //   message: message.value,
    // };

    emailjs.sendForm("service_oyu95e8", "template_zp49gv4", form.current, "3IaPAq58enoE1C7xZ")
      .then(() => {
        setFormStatus("Sent!");
       <Space> <Alert message="Sent!" type= "success" /></Space>

      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setFormStatus("Failed");
        <Space> <Alert message="Not Sent!" type= "error" /></Space>

      });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Feedback Form Here</h1>
      <p>Welcome to our website!</p>
      <p>Thank you for visiting. We value your feedback.</p>
      <p>Please take a moment to fill out our feedback form below:</p>
      <form ref={form}  onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input className="form-control" name="name" type="text" id="name" required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input className="form-control" type="email" name="email" id="email" required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="message">
            Message
          </label>
          <textarea className="form-control" name="message" id="message" required />
        </div>
        <button className="btn btn-danger" type="submit">
          {formStatus}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
