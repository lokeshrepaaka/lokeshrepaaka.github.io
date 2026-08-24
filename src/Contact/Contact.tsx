import {
    useEffect,
    useRef,
    useState,
} from 'react'

import {
    useForm,
    ValidationError,
} from '@formspree/react'

import './Contact.css'


// =========================================================
// CONTACT FORM DATA
// =========================================================

type ContactFormData = {
    name: string
    email: string
    subject: string
    message: string
}


// =========================================================
// CONTACT COMPONENT
// =========================================================

function Contact() {

    // -----------------------------------------------------
    // SECTION REFERENCE
    // -----------------------------------------------------

    const sectionRef =
        useRef<HTMLElement | null>(
            null
        )


    // -----------------------------------------------------
    // REVEAL STATUS
    // -----------------------------------------------------

    const [
        isVisible,
        setIsVisible,
    ] =
        useState(false)


    // -----------------------------------------------------
    // CONTACT ENDPOINT STATUS
    // -----------------------------------------------------
    //
    // This is only a visual animation for now.
    // Later, when we connect Formspree, we can update this
    // based on the real form submission state.
    // -----------------------------------------------------

    const [
        endpointReady,
        setEndpointReady,
    ] =
        useState(false)


    // -----------------------------------------------------
    // FORM DATA
    // -----------------------------------------------------

    const [
        formData,
        setFormData,
    ] =
        useState<ContactFormData>({
            name: '',
            email: '',
            subject: '',
            message: '',
        })


    // -----------------------------------------------------
    // FORMSPREE SUBMISSION
    // -----------------------------------------------------
    //
    // xeajbarw is the Formspree form ID for this portfolio.
    //
    // state.submitting:
    //     true while the message is being transmitted.
    //
    // state.succeeded:
    //     true after Formspree accepted the message.
    //
    // state.errors:
    //     contains validation / server errors if submission
    //     fails.
    //
    // resetFormspree:
    //     clears Formspree's previous success/error state so
    //     another message can be submitted.
    // -----------------------------------------------------

    const [
        formState,
        submitToFormspree,
        resetFormspree,
    ] =
        useForm(
            'xeajbarw'
        )


    // =====================================================
    // SECTION REVEAL
    // =====================================================

    useEffect(() => {

        const section =
            sectionRef.current

        if (!section) {
            return
        }


        const observer =
            new IntersectionObserver(
                ([entry]) => {

                    if (
                        entry.isIntersecting
                    ) {

                        setIsVisible(
                            true
                        )

                        window.setTimeout(
                            () => {

                                setEndpointReady(
                                    true
                                )

                            },
                            500
                        )

                    }

                },
                {
                    threshold:
                        0.18,
                }
            )


        observer.observe(
            section
        )


        return () => {

            observer.disconnect()

        }

    }, [])


    // =====================================================
    // INPUT UPDATE
    // =====================================================

    const updateField =
        (
            field:
                keyof ContactFormData,
            value:
                string
        ) => {

            // If a previous message succeeded, starting to type
            // again prepares the form for a fresh submission.
            if (
                formState.succeeded
            ) {

                resetFormspree()

            }


            setFormData(
                (
                    current
                ) => ({
                    ...current,
                    [field]:
                        value,
                })
            )

        }


    // =====================================================
    // CLEAR INPUTS AFTER SUCCESS
    // =====================================================
    //
    // Formspree handles the actual network request.
    // Once it reports success, clear the controlled React
    // input values while keeping the success confirmation
    // visible to the visitor.
    // =====================================================

    useEffect(() => {

        if (
            !formState.succeeded
        ) {
            return
        }


        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        })

    }, [
        formState.succeeded,
    ])



    // =====================================================
    // UI
    // =====================================================

    return (

        <section
            id="contact"
            ref={sectionRef}
            className={`
                contact-section
                ${isVisible
                    ? 'contact-visible'
                    : ''
                }
            `}
        >


            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div
                className="
                    contact-background
                "
                aria-hidden="true"
            >

                <div
                    className="
                        contact-grid
                    "
                >
                </div>


                <div
                    className="
                        contact-glow
                        contact-glow-one
                    "
                >
                </div>


                <div
                    className="
                        contact-glow
                        contact-glow-two
                    "
                >
                </div>


                <div
                    className="
                        contact-network-line
                    "
                >

                    <span
                        className="
                            contact-packet
                        "
                    >
                    </span>

                </div>

            </div>


            <div
                className="
                    contact-container
                "
            >


                {/* =================================================
                    SECTION HEADER
                ================================================= */}

                <div
                    className="
                        contact-header
                        contact-reveal
                    "
                >

                    <span
                        className="
                            contact-number
                        "
                    >

                        06 / CONTACT

                    </span>


                    <h2>

                        LET'S
                        <span>
                            {' '}
                            CONNECT.
                        </span>

                    </h2>


                    <p>

                        Have an opportunity, project, or idea?
                        I’d be happy to hear from you.

                    </p>

                </div>


                {/* =================================================
                    CONTACT LAYOUT
                ================================================= */}

                <div
                    className="
                        contact-layout
                    "
                >


                    {/* =============================================
                        LEFT — SEND A MESSAGE
                    ============================================= */}

                    <div
                        className="
                            contact-form-card
                            contact-reveal
                        "
                    >

                        <div
                            className="
                                contact-card-heading
                            "
                        >

                            <div>

                                <span
                                    className="
                                        contact-terminal-label
                                    "
                                >

                                    $ compose_message

                                </span>


                                <h3>

                                    Send a Message

                                </h3>

                            </div>


                            <div
                                className={
                                    endpointReady

                                        ? 'contact-endpoint contact-endpoint-ready'

                                        : 'contact-endpoint'
                                }
                            >

                                <span
                                    className="
                                        contact-endpoint-dot
                                    "
                                >
                                </span>


                                <span>

                                    {
                                        endpointReady

                                            ? 'ENDPOINT // READY'

                                            : 'ENDPOINT // CONNECTING...'
                                    }

                                </span>

                            </div>

                        </div>


                        <form
                            onSubmit={
                                submitToFormspree
                            }
                        >


                            {/* -------------------------------------
                                NAME
                            ------------------------------------- */}

                            <label>

                                <span>
                                    &gt; NAME
                                </span>


                                <input
                                    type="text"
                                    name="name"
                                    value={
                                        formData.name
                                    }
                                    onChange={(event) => {

                                        updateField(
                                            'name',
                                            event.target.value
                                        )

                                    }}
                                    placeholder="
                                        Your full name
                                    "
                                    required
                                />

                                <ValidationError
                                    field="name"
                                    prefix="Name"
                                    errors={
                                        formState.errors
                                    }
                                    className="
                                        contact-field-error
                                    "
                                />

                            </label>


                            {/* -------------------------------------
                                EMAIL
                            ------------------------------------- */}

                            <label>

                                <span>
                                    &gt; EMAIL
                                </span>


                                <input
                                    type="email"
                                    name="email"
                                    value={
                                        formData.email
                                    }
                                    onChange={(event) => {

                                        updateField(
                                            'email',
                                            event.target.value
                                        )

                                    }}
                                    placeholder="
                                        your.email@example.com
                                    "
                                    required
                                />

                                <ValidationError
                                    field="email"
                                    prefix="Email"
                                    errors={
                                        formState.errors
                                    }
                                    className="
                                        contact-field-error
                                    "
                                />

                            </label>


                            {/* -------------------------------------
                                SUBJECT
                            ------------------------------------- */}

                            <label>

                                <span>
                                    &gt; SUBJECT
                                </span>


                                <input
                                    type="text"
                                    name="subject"
                                    value={
                                        formData.subject
                                    }
                                    onChange={(event) => {

                                        updateField(
                                            'subject',
                                            event.target.value
                                        )

                                    }}
                                    placeholder="
                                        What's this about?
                                    "
                                    required
                                />

                                <ValidationError
                                    field="subject"
                                    prefix="Subject"
                                    errors={
                                        formState.errors
                                    }
                                    className="
                                        contact-field-error
                                    "
                                />

                            </label>


                            {/* -------------------------------------
                                MESSAGE
                            ------------------------------------- */}

                            <label>

                                <span>
                                    &gt; MESSAGE
                                </span>


                                <textarea
                                    name="message"
                                    value={
                                        formData.message
                                    }
                                    onChange={(event) => {

                                        updateField(
                                            'message',
                                            event.target.value
                                        )

                                    }}
                                    placeholder="
                                        Tell me about the opportunity, project, or idea...
                                    "
                                    rows={6}
                                    required
                                >
                                </textarea>

                                <ValidationError
                                    field="message"
                                    prefix="Message"
                                    errors={
                                        formState.errors
                                    }
                                    className="
                                        contact-field-error
                                    "
                                />

                            </label>


                            {/* -------------------------------------
                                SUBMIT
                            ------------------------------------- */}

                            <button
                                type="submit"
                                className="
                                    contact-submit
                                "
                                disabled={
                                    formState.submitting
                                }
                            >

                                <span>
                                    [
                                </span>

                                {
                                    formState.submitting
                                        ? 'TRANSMITTING...'
                                        : 'SEND MESSAGE'
                                }

                                <span>
                                    ]
                                </span>

                                {
                                    !formState.submitting && (

                                        <span
                                            className="
                                                contact-submit-arrow
                                            "
                                        >
                                            →
                                        </span>

                                    )
                                }

                            </button>


                            {
                                formState.succeeded && (

                                    <div
                                        className="
                                            contact-submit-status
                                            contact-submit-success
                                        "
                                        role="status"
                                    >

                                        <strong>
                                            ✓ MESSAGE TRANSMITTED
                                        </strong>

                                        <span>
                                            Thanks for reaching out. I’ll get back to you soon.
                                        </span>

                                    </div>

                                )
                            }


                            {
                                formState.errors && (

                                    <ValidationError
                                        errors={
                                            formState.errors
                                        }
                                        prefix="Transmission"
                                        className="
                                            contact-submit-status
                                            contact-submit-error
                                        "
                                    />

                                )
                            }

                        </form>

                    </div>


                    {/* =============================================
                        RIGHT — CONNECTION DETAILS
                    ============================================= */}

                    <div
                        className="
                            contact-side
                        "
                    >


                        {/* -----------------------------------------
                            DETAILS CARD
                        ----------------------------------------- */}

                        <div
                            className="
                                contact-info-card
                                contact-reveal
                            "
                        >

                            <span
                                className="
                                    contact-card-kicker
                                "
                            >

                                CONNECTION DETAILS

                            </span>


                            <div
                                className="
                                    contact-detail
                                "
                            >

                                <div
                                    className="
                                        contact-detail-icon
                                    "
                                >

                                    @

                                </div>


                                <div>

                                    <span>
                                        Email
                                    </span>

                                    <a
                                        href="mailto:lokirepaka@gmail.com"
                                    >

                                        lokirepaka@gmail.com

                                    </a>

                                </div>

                            </div>


                            <div
                                className="
                                    contact-detail
                                "
                            >

                                <div
                                    className="
                                        contact-detail-icon
                                    "
                                >

                                    ◎

                                </div>


                                <div>

                                    <span>
                                        Location
                                    </span>

                                    <p>
                                        Portland, Oregon
                                    </p>

                                </div>

                            </div>


                            <div
                                className="
                                    contact-status
                                "
                            >

                                <span
                                    className="
                                        contact-status-dot
                                    "
                                >
                                </span>


                                <div>

                                    <span>
                                        STATUS
                                    </span>

                                    <p>
                                        Open to Cloud & DevOps opportunities
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* -----------------------------------------
                            SOCIAL / PROFESSIONAL LINKS
                        ----------------------------------------- */}

                        <div
                            className="
                                contact-links-card
                                contact-reveal
                            "
                        >

                            <span
                                className="
                                    contact-card-kicker
                                "
                            >

                                FIND ME ONLINE

                            </span>


                            <div
                                className="
                                    contact-links
                                "
                            >

                                <a
                                    href="https://github.com/lokeshrepaaka"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >

                                    <span className="contact-link-main">

                                        <svg
                                            className="contact-social-icon"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M12 .7a11.3 11.3 0 0 0-3.6 22c.6.1.8-.2.8-.5v-2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C16.8 5 17.8 5.3 17.8 5.3c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A11.3 11.3 0 0 0 12 .7Z"
                                            />
                                        </svg>

                                        <span>
                                            GitHub
                                        </span>

                                    </span>

                                    <span>
                                        ↗
                                    </span>

                                </a>


                                <a
                                    href="https://www.linkedin.com/in/lokesh-repaka"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >

                                    <span className="contact-link-main">

                                        <svg
                                            className="contact-social-icon"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M5.4 7.9H1.8V22h3.6V7.9ZM3.6 2A2.1 2.1 0 1 0 3.6 6.2 2.1 2.1 0 0 0 3.6 2ZM22 13.9c0-4.2-2.2-6.2-5.2-6.2-2.4 0-3.5 1.3-4.1 2.2v-2h-3.6V22h3.6v-7c0-1.8.3-3.6 2.6-3.6 2.2 0 2.2 2.1 2.2 3.7V22H22v-8.1Z"
                                            />
                                        </svg>

                                        <span>
                                            LinkedIn
                                        </span>

                                    </span>

                                    <span>
                                        ↗
                                    </span>

                                </a>


                                <a
                                    href="/Lokesh_Repaka_Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >

                                    <span>
                                        Resume
                                    </span>

                                    <span>
                                        ↗
                                    </span>

                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    )

}


export default Contact