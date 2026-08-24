import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
} from 'react'

import './Experience.css'


// =========================================================
// EXPERIENCE DATA TYPE
// =========================================================
//
// Every experience item follows this structure.
//
// side:
//      "left"  -> job card on left, keywords on right
//      "right" -> keywords on left, job card on right
// =========================================================

type ExperienceItem = {
    id: string

    number: string

    role: string

    organization: string

    date: string

    bullets: string[]

    keywords: string[]

    side:
    | 'left'
    | 'right'

    icon: string
}



// =========================================================
// EXPERIENCE DATA
// =========================================================

const experiences:
    ExperienceItem[] = [

        // -----------------------------------------------------
        // 01 — QUANTUM RESEARCH
        // -----------------------------------------------------

        {
            id:
                'quantum-research',

            number:
                '01',

            role:
                'Quantum Research',

            organization:
                'Portland State University',

            date:
                'Jun 2026 — Aug 2026',

            bullets: [
                'Explored quantum computing concepts, algorithms, and their applications.',
                'Built and tested quantum circuits while developing hands-on experience with Qiskit.',
                'Studied quantum algorithms and worked through research-oriented problems.',
            ],

            keywords: [
                'Quantum Computing',
                'Qiskit',
                'Research',
                'Problem Solving',
            ],

            side:
                'left',

            icon:
                '⚛',
        },



        // -----------------------------------------------------
        // 02 — ALTERNATIVE FORMATS TECHNICIAN
        // -----------------------------------------------------

        {
            id:
                'alternative-formats',

            number:
                '02',

            role:
                'Alternative Formats Technician',

            organization:
                'Portland State University',

            date:
                'Nov 2024 — Present',

            bullets: [
                'Prepare accessible course materials and alternative-format documents for students.',
                'Work with document conversion, formatting, accessibility workflows, and digital content.',
                'Coordinate accurate and timely delivery of accessible academic materials.',
            ],

            keywords: [
                'Accessibility',
                'OCR',
                'Braille',
                'Document Formatting',
            ],

            side:
                'right',

            icon:
                '▤',
        },



        // -----------------------------------------------------
        // 03 — LINUX SUPPORT SPECIALIST
        // -----------------------------------------------------

        {
            id:
                'linux-support',

            number:
                '03',

            role:
                'Linux Support Specialist',

            organization:
                'Portland State University',

            date:
                'Sep 2025 — Jun 2026',

            bullets: [
                'Supported Linux environments and helped troubleshoot technical issues.',
                'Worked with user provisioning, access controls, shared systems, and infrastructure support.',
                'Used shell scripting to automate repetitive troubleshooting and system tasks.',
            ],

            keywords: [
                'Linux',
                'Troubleshooting',
                'Shell Scripting',
                'Systems Support',
            ],

            side:
                'left',

            icon:
                '>_',
        },



        // -----------------------------------------------------
        // 04 — INTERNATIONAL STUDENT MENTOR
        // -----------------------------------------------------

        {
            id:
                'international-mentor',

            number:
                '04',

            role:
                'International Student Mentor',

            organization:
                'Portland State University',

            date:
                'Mar 2025 — Present',

            bullets: [
                'Support incoming international students during their transition to university life.',
                'Provide practical guidance, resources, and peer support throughout the onboarding process.',
                'Help build stronger connections between students and the university community.',
            ],

            keywords: [
                'Mentorship',
                'Leadership',
                'Community',
                'Student Support',
            ],

            side:
                'right',

            icon:
                '◎',
        },

    ]



// =========================================================
// EXPERIENCE COMPONENT
// =========================================================

function Experience() {

    // =====================================================
    // SECTION REFERENCE
    // =====================================================

    const sectionRef =
        useRef<HTMLElement | null>(
            null
        )



    // =====================================================
    // EXPERIENCE TITLE ANIMATION
    // =====================================================
    //
    // false:
    //      Letters are hidden.
    //
    // true:
    //      EXPERIENCE appears letter by letter.
    // =====================================================

    const [
        titleVisible,
        setTitleVisible,
    ] =
        useState(false)



    // =====================================================
    // WATCH EXPERIENCE SECTION
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

                        setTitleVisible(
                            true
                        )

                    } else {

                        // Reset so EXPERIENCE can animate
                        // again when the user comes back.
                        setTitleVisible(
                            false
                        )

                    }

                },

                {
                    threshold:
                        0.08,
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
    // TEXT USED FOR LETTER-BY-LETTER ANIMATION
    // =====================================================

    const experienceTitle =
        'EXPERIENCE'



    // =====================================================
    // UI
    // =====================================================

    return (

        <section
            id="experience"
            className="experience-section"
            ref={sectionRef}
        >


            {/* =================================================
                ANIMATED BACKGROUND
            ================================================= */}

            <div
                className="experience-background"
                aria-hidden="true"
            >

                {/* MOVING GRID */}

                <div
                    className="experience-grid"
                >
                </div>



                {/* BACKGROUND GLOW 1 */}

                <div
                    className="
                        experience-glow
                        experience-glow-one
                    "
                >
                </div>



                {/* BACKGROUND GLOW 2 */}

                <div
                    className="
                        experience-glow
                        experience-glow-two
                    "
                >
                </div>



                {/* MOVING DATA PARTICLE */}

                <span
                    className="
                        experience-packet
                        packet-one
                    "
                >
                </span>



                {/* MOVING DATA PARTICLE */}

                <span
                    className="
                        experience-packet
                        packet-two
                    "
                >
                </span>

            </div>



            {/* =================================================
                MAIN CONTAINER
            ================================================= */}

            <div
                className="experience-container"
            >


                {/* =================================================
                    EXPERIENCE HEADER
                ================================================= */}

                <header
                    className="experience-header"
                >


                    {/* SECTION NUMBER */}

                    <span
                        className="experience-number"
                    >

                        03 /

                    </span>



                    {/* =============================================
                        EXPERIENCE WORD
                        LETTER-BY-LETTER ANIMATION
                    ============================================= */}

                    <h2
                        className={
                            titleVisible

                                ? 'experience-title title-visible'
                                : 'experience-title'
                        }

                        aria-label="Experience"
                    >

                        {
                            experienceTitle
                                .split('')
                                .map(
                                    (
                                        letter,
                                        index
                                    ) => (

                                        <span
                                            key={
                                                `${letter}-${index}`
                                            }

                                            style={
                                                {
                                                    '--letter-index':
                                                        index,
                                                } as CSSProperties
                                            }
                                        >

                                            {
                                                letter
                                            }

                                        </span>

                                    )
                                )
                        }

                    </h2>



                    {/* SMALLER SUB-HEADING */}

                    <h3>

                        WHERE I’VE BUILT

                        <span>

                            {' '}& IMPACTED

                        </span>

                    </h3>



                    {/* INTRO TEXT */}

                    <p>

                        A timeline of roles where I’ve
                        learned, solved problems, and
                        contributed across technical
                        systems, research, accessibility,
                        and student support.

                    </p>

                </header>



                {/* =================================================
                    EXPERIENCE TIMELINE
                ================================================= */}

                <div
                    className="experience-timeline"
                >


                    {/* CENTRAL VERTICAL LINE */}

                    <div
                        className="timeline-line"
                        aria-hidden="true"
                    >
                    </div>



                    {/* =================================================
                        EXPERIENCE ROWS
                    ================================================= */}

                    {
                        experiences.map(
                            (
                                experience
                            ) => (

                                <article
                                    key={
                                        experience.id
                                    }

                                    className={
                                        `
                                            experience-row
                                            experience-${experience.side}
                                        `
                                    }
                                >


                                    {/* =================================
                                        LEFT SIDE
                                    ================================= */}

                                    <div
                                        className="
                                            timeline-side
                                            timeline-left
                                        "
                                    >

                                        {
                                            experience.side ===
                                                'left'

                                                ? (

                                                    <ExperienceCard
                                                        experience={
                                                            experience
                                                        }
                                                    />

                                                )

                                                : (

                                                    <KeywordCloud
                                                        keywords={
                                                            experience.keywords
                                                        }
                                                    />

                                                )
                                        }

                                    </div>



                                    {/* =================================
                                        CENTER TIMELINE NODE
                                    ================================= */}

                                    <div
                                        className="timeline-node"
                                    >


                                        {/* PULSE RING */}

                                        <div
                                            className="
                                                timeline-node-pulse
                                            "
                                        >
                                        </div>



                                        {/* MAIN NODE */}

                                        <div
                                            className="
                                                timeline-node-inner
                                            "
                                        >

                                            {
                                                experience.icon
                                            }

                                        </div>

                                    </div>



                                    {/* =================================
                                        RIGHT SIDE
                                    ================================= */}

                                    <div
                                        className="
                                            timeline-side
                                            timeline-right
                                        "
                                    >

                                        {
                                            experience.side ===
                                                'right'

                                                ? (

                                                    <ExperienceCard
                                                        experience={
                                                            experience
                                                        }
                                                    />

                                                )

                                                : (

                                                    <KeywordCloud
                                                        keywords={
                                                            experience.keywords
                                                        }
                                                    />

                                                )
                                        }

                                    </div>

                                </article>

                            )
                        )
                    }

                </div>

            </div>

        </section>

    )

}



// =========================================================
// EXPERIENCE CARD COMPONENT
// =========================================================
//
// This creates the large rectangular card that contains:
//
// - Number
// - Role
// - Organization
// - Dates
// - Responsibilities
// =========================================================

function ExperienceCard(
    {
        experience,
    }:
        {
            experience:
            ExperienceItem
        }
) {

    return (

        <div
            className="experience-card"
        >


            {/* =================================================
                CARD HEADER
            ================================================= */}

            <div
                className="
                    experience-card-heading
                "
            >


                {/* ROLE NUMBER */}

                <span
                    className="
                        experience-card-number
                    "
                >

                    {
                        experience.number
                    }

                </span>



                {/* ROLE */}

                <h4>

                    {
                        experience.role
                    }

                </h4>

            </div>



            {/* =================================================
                ORGANIZATION
            ================================================= */}

            <div
                className="experience-company"
            >

                <span
                    aria-hidden="true"
                >
                    ◫
                </span>


                <span>

                    {
                        experience.organization
                    }

                </span>

            </div>



            {/* =================================================
                DATE
            ================================================= */}

            <div
                className="experience-date"
            >

                <span
                    aria-hidden="true"
                >
                    ◫
                </span>


                <span>

                    {
                        experience.date
                    }

                </span>

            </div>



            {/* =================================================
                DIVIDER
            ================================================= */}

            <div
                className="experience-divider"
            >
            </div>



            {/* =================================================
                EXPERIENCE BULLETS
            ================================================= */}

            <ul>

                {
                    experience.bullets.map(
                        (
                            bullet
                        ) => (

                            <li
                                key={
                                    bullet
                                }
                            >

                                {
                                    bullet
                                }

                            </li>

                        )
                    )
                }

            </ul>

        </div>

    )

}



// =========================================================
// KEYWORD CLOUD COMPONENT
// =========================================================
//
// Displays the slowly floating keywords beside each role.
//
// Example:
//
// Quantum Computing
// Qiskit
// Research
// Problem Solving
// =========================================================

function KeywordCloud(
    {
        keywords,
    }:
        {
            keywords:
            string[]
        }
) {

    return (

        <div
            className="keyword-cloud"
        >


            {/* DECORATIVE ORBIT */}

            <div
                className="keyword-orbit"
                aria-hidden="true"
            >
            </div>



            {/* KEYWORD PILLS */}

            {
                keywords.map(
                    (
                        keyword,
                        index
                    ) => (

                        <span
                            key={
                                keyword
                            }

                            className={
                                `keyword keyword-${index + 1}`
                            }
                        >

                            {
                                keyword
                            }

                        </span>

                    )
                )
            }

        </div>

    )

}


export default Experience