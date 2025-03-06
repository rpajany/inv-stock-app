import { useState } from "react";
import axios from "axios";

export const Email = () => {
    const [emailData, setEmailData] = useState({
        to: "",
        subject: "",
        text: "",
        html: "",
        cc: "",
        bcc: "",
        attachment: null,
    });

    console.log('emailData', emailData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setEmailData((prev) => ({ ...prev, attachment: e.target.files[0] }));
    };

    const sendEmail = async () => {
        const formData = new FormData();
        formData.append("to", emailData.to);
        formData.append("subject", emailData.subject);
        formData.append("text", emailData.text);
        formData.append("html", emailData.html);
        formData.append("cc", emailData.cc);
        formData.append("bcc", emailData.bcc);
        if (emailData.attachment) {
            formData.append("attachment", emailData.attachment);
        }

        try {
            const response = await axios.post("http://localhost:8080/send-email", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert(response.data.message);
        } catch (error) {
            alert("Failed to send email.");
            console.error(error);
        }
    };
    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
            <h2>Email Sender</h2>
            <input type="email" name="to" placeholder="To" value={emailData.to} onChange={handleChange} />
            <input type="text" name="cc" placeholder="CC" value={emailData.cc} onChange={handleChange} />
            <input type="text" name="bcc" placeholder="BCC" value={emailData.bcc} onChange={handleChange} />
            <input type="text" name="subject" placeholder="Subject" value={emailData.subject} onChange={handleChange} />
            <textarea name="text" placeholder="Plain Text Email" value={emailData.text} onChange={handleChange} />
            <textarea name="html" placeholder="HTML Email Content" value={emailData.html} onChange={handleChange} />
            <input type="file" name="attachment" onChange={handleFileChange} />
            <button onClick={sendEmail}>Send Email</button>
        </div>
    )
}
