import './Footer.css'


// =========================================================
// FOOTER
// =========================================================
//
// Purpose:
// - Gives the portfolio a clean ending.
// - Shows copyright ownership.
// - Mentions the core stack used to build the site.
// - Provides a simple "Back to top" action.
//
// We intentionally keep this section visually calm so it
// doesn't compete with the Contact section above it.
// =========================================================

function Footer() {

    // -----------------------------------------------------
    // SCROLL BACK TO TOP
    // -----------------------------------------------------

    const handleBackToTop =
        () => {

            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })

        }


    return (

        <footer
            className="
                portfolio-footer
            "
        >

            {/* =============================================
                DECORATIVE TOP LINE
            ============================================= */}

            <div
                className="
                    footer-line
                "
                aria-hidden="true"
            >

                <span
                    className="
                        footer-line-packet
                    "
                >
                </span>

            </div>


            {/* =============================================
                MAIN FOOTER CONTENT
            ============================================= */}

            <div
                className="
                    footer-content
                "
            >

                <p
                    className="
                        footer-copyright
                    "
                >

                    © 2026 Lokesh Repaka.
                    <span>
                        {' '}
                        All rights reserved.
                    </span>

                </p>


                <p
                    className="
                        footer-built-with
                    "
                >

                    Built with
                    <span>
                        {' '}
                        React, TypeScript & Vite
                    </span>
                    .

                </p>


                <button
                    type="button"

                    className="
                        footer-back-top
                    "

                    onClick={
                        handleBackToTop
                    }
                >

                    <span
                        className="
                            footer-arrow
                        "
                    >
                        ↑
                    </span>

                    Back to top

                </button>

            </div>

        </footer>

    )

}


export default Footer