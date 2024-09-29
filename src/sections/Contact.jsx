import React, {useRef, useState} from 'react'
import * as emailjs from "@emailjs/browser";

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';
const Contact = () => {

    const formRef = useRef();
    const { alert, showAlert, hideAlert } = useAlert();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };

    // service_8ig7zfo
    //1w_2lKDzmBwjNOBxo

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs
            .send(
                'service_8ig7zfo',
                'template_uvr1f36',
                {
                    from_name: form.name,
                    to_name: 'Ziga',
                    from_email: form.email,
                    to_email: 'shehu.meni+portfolioZiga@gmail.com',
                    message: `${form.message}  -${form.email}` ,
                },
                '1w_2lKDzmBwjNOBxo',
            )
            .then(
                () => {
                    setLoading(false);
                    showAlert({
                        show: true,
                        text: 'Thank you for your message 😃',
                        type: 'success',
                    });

                    setTimeout(() => {
                        hideAlert(false);
                        setForm({
                            name: '',
                            email: '',
                            message: '',
                        });
                    }, [3000]);
                },
                (error) => {
                    setLoading(false);
                    console.error(error);

                    showAlert({
                        show: true,
                        text: "I didn't receive your message 😢",
                        type: 'danger',
                    });
                },
            );
    };
    return (
        <section className="c-space my-20 relative" id="contact">
            {alert.show && <Alert {...alert} />}

            <div className="relative w-full flex items-center justify-center flex-col min-h-screen">
                {/* Background Image */}
                <img
                    src="/assets/terminal.png"
                    alt="terminal-bg"
                    className="absolute inset-0 w-full h-full object-fill z-0"
                />

                <div className="contact-container relative z-10 w-full max-w-4xl px-4 py-12 bg-opacity-80">
                    <h3 className="head-text text-center text-white">Let's talk</h3>
                    <p className="text-lg text-white-600 mt-2">
                        Whether you’re looking to build a new website, improve your existing platform,
                        or bring a unique project to life, I’m here to help.
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit}
                          className="mt-12 flex flex-col space-y-7 w-full max-w-xl mx-auto">
                        <label className="space-y-3">
                            <span className="field-label text-white">Full Name</span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="field-input w-full px-4 py-2 rounded-lg"
                                placeholder="ex., John Doe"
                            />
                        </label>

                        <label className="space-y-3">
                            <span className="field-label text-white">Email address</span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="field-input w-full px-4 py-2 rounded-lg"
                                placeholder="ex., johndoe@gmail.com"
                            />
                        </label>

                        <label className="space-y-3">
                            <span className="field-label text-white">Your message</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="field-input w-full px-4 py-2 rounded-lg"
                                placeholder="Share your thoughts or inquiries..."
                            />
                        </label>

                        <button className="field-btn" type="submit" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}

                            <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow"/>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default Contact
