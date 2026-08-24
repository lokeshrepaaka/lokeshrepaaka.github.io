import {
    useEffect,
    useRef,
    useState,
    type MouseEvent,
    type KeyboardEvent as ReactKeyboardEvent,
} from 'react'

import './About.css'


// =========================================================
// CARD TYPE
// =========================================================
//
// This TypeScript type describes the information that
// every interactive About card must contain.
//
type AboutCard = {
    label: string
    title: string
    shortDescription: string
    fullDescription: string
    tags?: string[]
}


type AboutProps = {
    onOpenBeyondTerminal: () => void
}


function About(
    {
        onOpenBeyondTerminal,
    }:
        AboutProps
) {

    // =========================================================
    // 1. ABOUT SECTION REFERENCE
    // =========================================================
    //
    // Gives React access to the About section.
    //
    const sectionRef =
        useRef<HTMLElement | null>(null)



    // =========================================================
    // 2. SELECTED / EXPANDED CARD
    // =========================================================
    //
    // null:
    //      No card is open.
    //
    // AboutCard:
    //      A card has been clicked and should appear enlarged.
    //
    const [
        selectedCard,
        setSelectedCard,
    ] = useState<AboutCard | null>(null)



    // =========================================================
    // 3. CARD SYSTEM STATUS
    // =========================================================
    //
    // false:
    //      Cards have not entered their reveal zone yet.
    //
    // true:
    //      Cards have animated into place and the small
    //      "SYSTEM PROFILE" indicator changes to ONLINE.
    //
    const [
        cardsOnline,
        setCardsOnline,
    ] = useState(false)



    // =========================================================
    // 4. ABOUT REVEAL ANIMATION
    // =========================================================
    //
    // We intentionally use TWO reveal triggers:
    //
    // 1. ABOUT INTRO
    //    The heading and story appear as the About section
    //    starts entering the viewport.
    //
    // 2. ABOUT CARDS
    //    The cards wait until the visitor is actually looking
    //    at the card area. Only then do they slide in from the
    //    left/right.
    //
    // This prevents the card animation from finishing before
    // a first-time visitor can notice it.
    //
    // When the entire About section leaves the viewport,
    // everything resets so the animation can play again when
    // the visitor scrolls back or clicks About in the navbar.
    // =========================================================

    useEffect(() => {

        const section =
            sectionRef.current

        if (!section) return


        // -----------------------------------------------------
        // Elements
        // -----------------------------------------------------

        const introElements = [
            section.querySelector<HTMLElement>(
                '.about-header'
            ),
            section.querySelector<HTMLElement>(
                '.about-story'
            ),
        ].filter(
            (
                element
            ): element is HTMLElement =>
                element !== null
        )


        const cards =
            Array.from(
                section.querySelectorAll<HTMLElement>(
                    '.about-card'
                )
            )


        const cardsContainer =
            section.querySelector<HTMLElement>(
                '.about-cards'
            )


        if (!cardsContainer) return


        // Store timeout IDs so old stagger animations cannot
        // continue running after the section has been reset.
        let introTimers:
            number[] = []

        let cardTimers:
            number[] = []


        // -----------------------------------------------------
        // Timer cleanup helpers
        // -----------------------------------------------------

        const clearIntroTimers = () => {

            introTimers.forEach(
                (timerId) => {

                    window.clearTimeout(
                        timerId
                    )

                }
            )

            introTimers = []

        }


        const clearCardTimers = () => {

            cardTimers.forEach(
                (timerId) => {

                    window.clearTimeout(
                        timerId
                    )

                }
            )

            cardTimers = []

        }


        // -----------------------------------------------------
        // Reveal heading + story
        // -----------------------------------------------------

        const revealIntro = () => {

            clearIntroTimers()


            introElements.forEach(
                (element, index) => {

                    const timerId =
                        window.setTimeout(
                            () => {

                                element.classList.add(
                                    'reveal-visible'
                                )

                            },

                            index * 60
                        )


                    introTimers.push(
                        timerId
                    )

                }
            )

        }


        // -----------------------------------------------------
        // Reveal cards
        // -----------------------------------------------------
        //
        // These use a short stagger so the direction change
        // is easy to notice without feeling slow.
        // -----------------------------------------------------

        const revealCards = () => {

            clearCardTimers()

            setCardsOnline(true)


            cards.forEach(
                (card, index) => {

                    const timerId =
                        window.setTimeout(
                            () => {

                                card.classList.add(
                                    'reveal-visible'
                                )

                            },

                            index * 65
                        )


                    cardTimers.push(
                        timerId
                    )

                }
            )

        }


        // -----------------------------------------------------
        // Reset the entire About section
        // -----------------------------------------------------

        const resetAbout = () => {

            clearIntroTimers()
            clearCardTimers()

            setCardsOnline(false)


            introElements.forEach(
                (element) => {

                    element.classList.remove(
                        'reveal-visible'
                    )

                }
            )


            cards.forEach(
                (card) => {

                    card.classList.remove(
                        'reveal-visible'
                    )

                }
            )

        }


        // -----------------------------------------------------
        // Observer 1:
        // Reveal the heading/story relatively early.
        // -----------------------------------------------------

        const introObserver =
            new IntersectionObserver(

                ([entry]) => {

                    if (
                        entry.isIntersecting
                    ) {

                        revealIntro()

                    }

                },

                {
                    threshold: 0.08,
                    rootMargin:
                        '-3% 0px -3% 0px',
                }

            )


        // -----------------------------------------------------
        // Observer 2:
        // Reveal cards only once the visitor reaches the
        // actual card area.
        //
        // 35% means a meaningful part of the card grid must
        // be visible before the movement begins.
        // -----------------------------------------------------

        const cardObserver =
            new IntersectionObserver(

                ([entry]) => {

                    if (
                        entry.isIntersecting
                    ) {

                        revealCards()

                    }

                },

                {
                    threshold: 0.35,
                    rootMargin:
                        '0px 0px -8% 0px',
                }

            )


        // -----------------------------------------------------
        // Observer 3:
        // Reset only after the ENTIRE About section is no
        // longer intersecting the viewport.
        //
        // This avoids cards resetting just because the visitor
        // moved a few pixels.
        // -----------------------------------------------------

        const resetObserver =
            new IntersectionObserver(

                ([entry]) => {

                    if (
                        !entry.isIntersecting
                    ) {

                        resetAbout()

                    }

                },

                {
                    threshold: 0,
                }

            )


        introObserver.observe(
            section
        )

        cardObserver.observe(
            cardsContainer
        )

        resetObserver.observe(
            section
        )


        return () => {

            clearIntroTimers()
            clearCardTimers()

            introObserver.disconnect()
            cardObserver.disconnect()
            resetObserver.disconnect()

        }

    }, [])



    // =========================================================
    // 5. ESC KEY — CLOSE EXPANDED CARD
    // =========================================================

    useEffect(() => {

        const handleKeyDown = (
            event: KeyboardEvent
        ) => {

            if (
                event.key === 'Escape'
            ) {

                setSelectedCard(null)

            }

        }


        window.addEventListener(
            'keydown',
            handleKeyDown
        )


        return () => {

            window.removeEventListener(
                'keydown',
                handleKeyDown
            )

        }

    }, [])



    // =========================================================
    // 6. PREVENT BACKGROUND SCROLL
    // =========================================================

    useEffect(() => {

        if (selectedCard) {

            document.body.style.overflow =
                'hidden'

        } else {

            document.body.style.overflow =
                ''

        }


        return () => {

            document.body.style.overflow =
                ''

        }

    }, [selectedCard])



    // =========================================================
    // 7. CARD SPOTLIGHT EFFECT
    // =========================================================

    const handleCardMouseMove = (
        event: MouseEvent<HTMLDivElement>
    ) => {

        const card =
            event.currentTarget


        const rect =
            card.getBoundingClientRect()


        const x =
            event.clientX - rect.left


        const y =
            event.clientY - rect.top


        card.style.setProperty(
            '--spotlight-x',
            `${x}px`
        )


        card.style.setProperty(
            '--spotlight-y',
            `${y}px`
        )

    }



    // =========================================================
    // 8. KEYBOARD SUPPORT FOR CARDS
    // =========================================================

    const handleCardKeyDown = (
        event:
            ReactKeyboardEvent<HTMLDivElement>,
        card:
            AboutCard
    ) => {

        if (
            event.key === 'Enter' ||
            event.key === ' '
        ) {

            event.preventDefault()

            setSelectedCard(card)

        }

    }



    // =========================================================
    // 9. CARD INFORMATION
    // =========================================================


    // ---------------------------------------------------------
    // CARD 1 — CURRENT FOCUS
    // ---------------------------------------------------------

    const currentFocusCard:
        AboutCard = {

        label:
            'CURRENT FOCUS',

        title:
            'Cloud & DevOps',

        shortDescription:
            'Building toward a career in cloud infrastructure, automation, and reliable systems.',

        fullDescription:
            'My current focus is Cloud and DevOps engineering. I am developing hands-on experience with cloud platforms, infrastructure automation, deployment workflows, Linux systems, and the tools that help software move reliably from development into production.',

        tags: [
            'AWS',
            'Linux',
            'DevOps',
            'IaC',
        ],

    }



    // ---------------------------------------------------------
    // CARD 2 — FOUNDATION
    // ---------------------------------------------------------

    const foundationCard:
        AboutCard = {

        label:
            'FOUNDATION',

        title:
            'Linux + Automation',

        shortDescription:
            'Hands-on experience with Linux systems, shell scripting, troubleshooting, and infrastructure automation.',

        fullDescription:
            'Linux and automation form an important part of my technical foundation. Through hands-on support, scripting, system troubleshooting, and working with shared computing environments, I have learned to look beyond individual applications and think about the systems that support them.',

        tags: [
            'Linux',
            'Bash',
            'Automation',
            'Systems',
        ],

    }



    // ---------------------------------------------------------
    // CARD 3 — CERTIFICATION
    // ---------------------------------------------------------

    const certificationCard:
        AboutCard = {

        label:
            'CERTIFIED',

        title:
            'AWS Cloud Practitioner',

        shortDescription:
            'Building a strong foundation in AWS cloud services and modern infrastructure concepts.',

        fullDescription:
            'My AWS Certified Cloud Practitioner certification helped strengthen my understanding of AWS services, cloud architecture, security, pricing, reliability, and the shared responsibility model. I continue building on that foundation through practical cloud projects and deeper infrastructure learning.',

        tags: [
            'AWS',
            'Cloud',
            'Infrastructure',
        ],

    }



    // ---------------------------------------------------------
    // CARD 4 — BUILDING TOWARD
    // ---------------------------------------------------------

    const systemsCard:
        AboutCard = {

        label:
            'BUILDING TOWARD',

        title:
            'Reliable Systems',

        shortDescription:
            'Learning how scalable infrastructure, automation, observability, and deployment workflows work together.',

        fullDescription:
            'I want to build systems that are not only functional, but dependable. That means learning how infrastructure, deployment pipelines, observability, automation, networking, and cloud services work together to create systems that are easier to operate, scale, and maintain.',

        tags: [
            'CI/CD',
            'Observability',
            'Scalability',
            'Reliability',
        ],

    }



    // =========================================================
    // COMPONENT UI
    // =========================================================

    return (

        <section
            id="about"
            className="about-section"
            ref={sectionRef}
        >


            {/* =================================================
                BACKGROUND DECORATION
            ================================================= */}

            <div
                className="about-background"
                aria-hidden="true"
            >

                <div
                    className="about-grid"
                >
                </div>


                <div
                    className="
                        about-glow
                        about-glow-one
                    "
                >
                </div>


                <div
                    className="
                        about-glow
                        about-glow-two
                    "
                >
                </div>


                <span
                    className="
                        about-data-line
                        line-one
                    "
                >
                </span>


                <span
                    className="
                        about-data-line
                        line-two
                    "
                >
                </span>

            </div>



            {/* =================================================
                MAIN ABOUT CONTENT
            ================================================= */}

            <div
                className="about-container"
            >


                {/* =============================================
                    SECTION HEADER
                ============================================= */}

                <div
                    className="
                        about-header
                        reveal-up
                    "
                    data-reveal
                >

                    <span
                        className="about-number"
                    >

                        01 / ABOUT

                    </span>


                    <h2>

                        WHO'S BEHIND

                        <br />

                        <span>
                            THE SYSTEM?
                        </span>

                    </h2>

                </div>



                {/* =============================================
                    ABOUT GRID
                ============================================= */}

                <div
                    className="about-layout"
                >


                    {/* =========================================
                        LEFT SIDE — ABOUT STORY
                    ========================================= */}

                    <div
                        className="
                            about-story
                            reveal-up
                        "
                        data-reveal
                    >


                        <p>

                            I’m a Computer Science student
                            at Portland State University
                            interested in{' '}

                            <strong>

                                cloud infrastructure,
                                DevOps, Linux, and automation

                            </strong>

                            {' '}— the systems behind reliable
                            software.

                        </p>



                        <p>

                            I learn best by building,
                            troubleshooting, and understanding
                            why something works. Whether I’m
                            automating a task, working with
                            Linux, or building cloud projects,
                            I enjoy improving systems and
                            finding cleaner solutions.

                        </p>



                        <p>

                            Right now, I’m focused on
                            strengthening my Cloud and DevOps
                            skills and building practical
                            experience with reliable,
                            scalable, and automated
                            infrastructure.

                        </p>



                        {/* =====================================
    BEYOND THE TERMINAL
===================================== */}

                        <a
                            href="#"
                            className="beyond-link"
                            onClick={(event) => {
                                event.preventDefault()

                                onOpenBeyondTerminal()
                            }}
                        >

                            <span>
                                Beyond the Terminal
                            </span>

                            <span
                                className="beyond-arrow"
                            >
                                →
                            </span>

                        </a>
                    </div>


                    {/* =========================================
                        RIGHT SIDE — INTERACTIVE CARDS
                    ========================================= */}

                    <div
                        className="about-cards-area"
                    >

                        {/* =====================================
                            SYSTEM PROFILE STATUS

                            This gives the visitor a subtle clue
                            that the cards are about to animate.

                            Before reveal:
                            SYSTEM PROFILE // INITIALIZING...

                            After reveal:
                            SYSTEM PROFILE // ONLINE
                        ===================================== */}

                        <div
                            className={
                                cardsOnline

                                    ? 'cards-status cards-status-online'
                                    : 'cards-status'
                            }
                            aria-live="polite"
                        >

                            <span
                                className="cards-status-dot"
                                aria-hidden="true"
                            >
                            </span>

                            <span>
                                SYSTEM PROFILE //{' '}
                                {
                                    cardsOnline
                                        ? 'ONLINE'
                                        : 'INITIALIZING...'
                                }
                            </span>

                        </div>


                        <div
                            className="about-cards"
                        >


                            {/* =====================================
                            CARD 1 — CLOUD & DEVOPS
                            ENTERS FROM RIGHT
                        ===================================== */}

                            <div
                                className="
                                about-card
                                reveal-right
                            "
                                data-reveal

                                role="button"
                                tabIndex={0}

                                aria-label="
                                Open Cloud and DevOps details
                            "

                                onMouseMove={
                                    handleCardMouseMove
                                }

                                onClick={() => {

                                    setSelectedCard(
                                        currentFocusCard
                                    )

                                }}

                                onKeyDown={(event) => {

                                    handleCardKeyDown(
                                        event,
                                        currentFocusCard
                                    )

                                }}
                            >

                                <div
                                    className="card-spotlight"
                                >
                                </div>


                                <span
                                    className="card-label"
                                >

                                    {currentFocusCard.label}

                                </span>


                                <h3>

                                    {currentFocusCard.title}

                                </h3>


                                <p>

                                    {
                                        currentFocusCard
                                            .shortDescription
                                    }

                                </p>


                                {/* ---------------------------------
                                SMALL CARD TAGS
                            --------------------------------- */}

                                <div
                                    className="mini-topology"
                                >

                                    {
                                        currentFocusCard
                                            .tags
                                            ?.map(
                                                (tag) => (

                                                    <span
                                                        key={tag}
                                                    >
                                                        {tag}
                                                    </span>

                                                )
                                            )
                                    }

                                </div>


                                <span
                                    className="card-open-hint"
                                >

                                    Click to explore ↗

                                </span>

                            </div>



                            {/* =====================================
                            CARD 2 — LINUX + AUTOMATION
                            ENTERS FROM LEFT
                        ===================================== */}

                            <div
                                className="
                                about-card
                                reveal-left
                            "
                                data-reveal

                                role="button"
                                tabIndex={0}

                                aria-label="
                                Open Linux and Automation details
                            "

                                onMouseMove={
                                    handleCardMouseMove
                                }

                                onClick={() => {

                                    setSelectedCard(
                                        foundationCard
                                    )

                                }}

                                onKeyDown={(event) => {

                                    handleCardKeyDown(
                                        event,
                                        foundationCard
                                    )

                                }}
                            >

                                <div
                                    className="card-spotlight"
                                >
                                </div>


                                <span
                                    className="card-label"
                                >

                                    {foundationCard.label}

                                </span>


                                <h3>

                                    {foundationCard.title}

                                </h3>


                                <p>

                                    {
                                        foundationCard
                                            .shortDescription
                                    }

                                </p>


                                {/* ---------------------------------
                                SMALL CARD TAGS
                            --------------------------------- */}

                                <div
                                    className="mini-topology"
                                >

                                    {
                                        foundationCard
                                            .tags
                                            ?.map(
                                                (tag) => (

                                                    <span
                                                        key={tag}
                                                    >
                                                        {tag}
                                                    </span>

                                                )
                                            )
                                    }

                                </div>


                                <span
                                    className="card-open-hint"
                                >

                                    Click to explore ↗

                                </span>

                            </div>



                            {/* =====================================
                            CARD 3 — AWS CERTIFICATION
                            ENTERS FROM RIGHT
                        ===================================== */}

                            <div
                                className="
                                about-card
                                reveal-right
                            "
                                data-reveal

                                role="button"
                                tabIndex={0}

                                aria-label="
                                Open AWS certification details
                            "

                                onMouseMove={
                                    handleCardMouseMove
                                }

                                onClick={() => {

                                    setSelectedCard(
                                        certificationCard
                                    )

                                }}

                                onKeyDown={(event) => {

                                    handleCardKeyDown(
                                        event,
                                        certificationCard
                                    )

                                }}
                            >

                                <div
                                    className="card-spotlight"
                                >
                                </div>


                                <span
                                    className="card-label"
                                >

                                    {certificationCard.label}

                                </span>


                                <h3>

                                    {certificationCard.title}

                                </h3>


                                <p>

                                    {
                                        certificationCard
                                            .shortDescription
                                    }

                                </p>


                                {/* ---------------------------------
                                SMALL CARD TAGS
                            --------------------------------- */}

                                <div
                                    className="mini-topology"
                                >

                                    {
                                        certificationCard
                                            .tags
                                            ?.map(
                                                (tag) => (

                                                    <span
                                                        key={tag}
                                                    >
                                                        {tag}
                                                    </span>

                                                )
                                            )
                                    }

                                </div>


                                <span
                                    className="card-open-hint"
                                >

                                    Click to explore ↗

                                </span>

                            </div>



                            {/* =====================================
                            CARD 4 — RELIABLE SYSTEMS
                            ENTERS FROM LEFT
                        ===================================== */}

                            <div
                                className="
                                about-card
                                reveal-left
                            "
                                data-reveal

                                role="button"
                                tabIndex={0}

                                aria-label="
                                Open Reliable Systems details
                            "

                                onMouseMove={
                                    handleCardMouseMove
                                }

                                onClick={() => {

                                    setSelectedCard(
                                        systemsCard
                                    )

                                }}

                                onKeyDown={(event) => {

                                    handleCardKeyDown(
                                        event,
                                        systemsCard
                                    )

                                }}
                            >

                                <div
                                    className="card-spotlight"
                                >
                                </div>


                                <span
                                    className="card-label"
                                >

                                    {systemsCard.label}

                                </span>


                                <h3>

                                    {systemsCard.title}

                                </h3>


                                <p>

                                    {
                                        systemsCard
                                            .shortDescription
                                    }

                                </p>


                                {/* ---------------------------------
                                SMALL CARD TAGS
                            --------------------------------- */}

                                <div
                                    className="mini-topology"
                                >

                                    {
                                        systemsCard
                                            .tags
                                            ?.map(
                                                (tag) => (

                                                    <span
                                                        key={tag}
                                                    >
                                                        {tag}
                                                    </span>

                                                )
                                            )
                                    }

                                </div>


                                <span
                                    className="card-open-hint"
                                >

                                    Click to explore ↗

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>



            {/* =================================================
                EXPANDED CARD MODAL
            ================================================= */}

            {
                selectedCard && (

                    <div
                        className="about-modal-overlay"

                        onClick={() => {

                            setSelectedCard(null)

                        }}
                    >

                        <div
                            className="about-modal"

                            role="dialog"

                            aria-modal="true"

                            aria-label={
                                selectedCard.title
                            }

                            onClick={(event) => {

                                event.stopPropagation()

                            }}
                        >


                            {/* -------------------------------------
                            CLOSE BUTTON
                        ------------------------------------- */}

                            <button
                                type="button"

                                className="
                                about-modal-close
                            "

                                aria-label="
                                Close expanded card
                            "

                                onClick={() => {

                                    setSelectedCard(null)

                                }}
                            >

                                ×

                            </button>



                            {/* -------------------------------------
                            CARD LABEL
                        ------------------------------------- */}

                            <span
                                className="modal-label"
                            >

                                {selectedCard.label}

                            </span>



                            {/* -------------------------------------
                            CARD TITLE
                        ------------------------------------- */}

                            <h3>

                                {selectedCard.title}

                            </h3>



                            {/* -------------------------------------
                            EXPANDED DESCRIPTION
                        ------------------------------------- */}

                            <p>

                                {
                                    selectedCard
                                        .fullDescription
                                }

                            </p>



                            {/* -------------------------------------
                            EXPANDED CARD TAGS
                        ------------------------------------- */}

                            {
                                selectedCard.tags && (

                                    <div
                                        className="modal-tags"
                                    >

                                        {
                                            selectedCard
                                                .tags
                                                .map(
                                                    (tag) => (

                                                        <span
                                                            key={tag}
                                                        >

                                                            {tag}

                                                        </span>

                                                    )
                                                )
                                        }

                                    </div>

                                )
                            }

                        </div>

                    </div>

                )
            }

        </section >

    )

}


export default About