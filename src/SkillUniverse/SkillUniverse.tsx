import {
    useEffect,
    useState,
    type KeyboardEvent,
} from 'react'

import './SkillUniverse.css'


// =========================================================
// TYPES
// =========================================================
//
// The same planet structure is reused across:
//
// - Skills
// - Certifications
// - Education
//
// This keeps the component organized and makes it easy
// to add more planets later.
// =========================================================

type UniverseTab =
    | 'skills'
    | 'certifications'
    | 'education'


type PlanetItem = {
    id: string

    // Main text displayed beside the planet.
    title: string

    // Optional supporting text.
    subtitle?: string

    // Skills shown inside the expanded modal.
    items?: string[]

    // Additional text used mainly by Education.
    description?: string

    // External destination.
    //
    // Certifications use this to open:
    //
    // - Credly
    // - certificate PDFs
    url?: string

    // Controls the planet's desktop position.
    orbit:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7

    // Controls planet appearance.
    tone:
    | 'cyan'
    | 'blue'
    | 'violet'
    | 'orange'
    | 'green'
    | 'pink'
    | 'silver'
}



// =========================================================
// PUBLIC FILE BASE PATH
// =========================================================
//
// Vite automatically provides the application's base URL.
//
// Using this instead of hardcoding "/" helps later when
// we deploy the portfolio through GitHub Pages.
// =========================================================

const PUBLIC_BASE =
    import.meta.env.BASE_URL



// =========================================================
// SKILLS
// =========================================================

const skillPlanets:
    PlanetItem[] = [

        {
            id: 'languages',

            title:
                'Languages',

            items: [
                'C',
                'C++',
                'Python',
                'SQL',
            ],

            orbit: 1,

            tone: 'violet',
        },


        {
            id: 'databases',

            title:
                'Databases',

            items: [
                'MySQL',
                'PostgreSQL',
            ],

            orbit: 2,

            tone: 'blue',
        },


        {
            id: 'cloud',

            title:
                'Cloud',

            items: [
                'AWS',
                'EC2',
                'S3',
                'IAM',
                'VPC',
                'Lambda',
                'API Gateway',
                'CloudFront',
                'CloudWatch',
            ],

            orbit: 3,

            tone: 'cyan',
        },


        {
            id: 'devops',

            title:
                'DevOps & Automation',

            items: [
                'Git',
                'Docker',
                'Terraform',
                'Kubernetes',
                'Ansible',
                'Jenkins',
                'GitHub Actions',
                'Shell Scripting',
            ],

            orbit: 4,

            tone: 'orange',
        },


        {
            id: 'concepts',

            title:
                'Concepts',

            items: [
                'CI/CD',
                'Infrastructure as Code',
                'Networking',
                'REST APIs',
                'Microservices',
            ],

            orbit: 5,

            tone: 'green',
        },


        {
            id: 'tools',

            title:
                'Tools',

            items: [
                'VS Code',
                'Visual Studio',
                'Jupyter',
                'Wireshark',
            ],

            orbit: 6,

            tone: 'pink',
        },


        {
            id: 'operating-systems',

            title:
                'Operating Systems',

            items: [
                'Linux',
                'Windows',
            ],

            orbit: 7,

            tone: 'silver',
        },

    ]



// =========================================================
// CERTIFICATIONS
// =========================================================
//
// Certifications behave differently from skills.
//
// Clicking one opens the real credential instead of opening
// our internal center modal.
// =========================================================

const certificationPlanets:
    PlanetItem[] = [

        {
            id: 'aws-cloud-practitioner',

            title:
                'AWS Cloud Practitioner',

            subtitle:
                'Amazon Web Services',

            url:
                'https://www.credly.com/badges/5d16edcf-276e-4f69-a23a-155b13db853f',

            orbit: 2,

            tone: 'orange',
        },


        {
            id: 'outdoor-leadership',

            title:
                'Outdoor Leadership',

            subtitle:
                'Portland State University',

            url:
                `${PUBLIC_BASE}outdoor-leadership.pdf#page=1&zoom=65`,

            orbit: 4,

            tone: 'green',
        },


        {
            id: 'mentor-certificate',

            title:
                'Mentor Certificate',

            subtitle:
                'Portland State University',

            url:
                `${PUBLIC_BASE}mentor-certification.pdf#page=1&zoom=65`,

            orbit: 6,

            tone: 'cyan',
        },

    ]



// =========================================================
// EDUCATION
// =========================================================

const educationPlanets:
    PlanetItem[] = [

        {
            id: 'vishwabharathi',

            title:
                'Vishwabharathi High School',

            subtitle:
                '10th Class',

            description:
                'CGPA: 10 / 10',

            orbit: 2,

            tone: 'violet',
        },


        {
            id: 'narayana',

            title:
                'Narayana College',

            subtitle:
                'High School',

            description:
                'CGPA: 9.3 / 10',

            orbit: 4,

            tone: 'blue',
        },


        {
            id: 'psu',

            title:
                'Portland State University',

            subtitle:
                'Bachelor of Science in Computer Science',

            description:
                'GPA: 3.6 / 4.0',

            orbit: 6,

            tone: 'cyan',
        },

    ]



// =========================================================
// COMPONENT
// =========================================================

function SkillUniverse() {

    // =====================================================
    // 1. ACTIVE TAB
    // =====================================================

    const [
        activeTab,
        setActiveTab,
    ] =
        useState<UniverseTab>(
            'skills'
        )



    // =====================================================
    // 2. SELECTED PLANET
    // =====================================================
    //
    // null:
    //
    //      No Skills/Education planet is currently open.
    //
    // PlanetItem:
    //
    //      Open that planet inside the large center modal.
    //
    const [
        selectedPlanet,
        setSelectedPlanet,
    ] =
        useState<PlanetItem | null>(
            null
        )



    // =====================================================
    // 3. NAVBAR → UNIVERSE TAB
    // =====================================================
    //
    // Navbar.tsx sends a custom event when someone selects:
    //
    // Skills
    // Education
    //
    // Example:
    //
    // detail: 'education'
    //
    // This component receives the event and activates the
    // corresponding tab.
    // =====================================================

    useEffect(() => {

        const handleTabRequest = (
            event: Event
        ) => {

            const customEvent =
                event as CustomEvent<UniverseTab>


            if (
                customEvent.detail ===
                'skills' ||

                customEvent.detail ===
                'certifications' ||

                customEvent.detail ===
                'education'
            ) {

                setActiveTab(
                    customEvent.detail
                )


                // Close any previously opened planet.
                setSelectedPlanet(
                    null
                )

            }

        }


        window.addEventListener(
            'open-universe-tab',
            handleTabRequest
        )


        return () => {

            window.removeEventListener(
                'open-universe-tab',
                handleTabRequest
            )

        }

    }, [])



    // =====================================================
    // 4. ESC KEY — CLOSE PLANET MODAL
    // =====================================================
    //
    // This is the Esc functionality you asked about.
    //
    // When a Skills or Education modal is open:
    //
    //      press Escape
    //          ↓
    //      close modal
    //
    // It works similarly to the About section.
    // =====================================================

    useEffect(() => {

        const handleEscapeKey = (
            event: globalThis.KeyboardEvent
        ) => {

            if (
                event.key === 'Escape'
            ) {

                setSelectedPlanet(
                    null
                )

            }

        }


        window.addEventListener(
            'keydown',
            handleEscapeKey
        )


        return () => {

            window.removeEventListener(
                'keydown',
                handleEscapeKey
            )

        }

    }, [])



    // =====================================================
    // 5. PREVENT BACKGROUND SCROLL
    // =====================================================
    //
    // When the center modal is open, we don't want the
    // solar system behind it to scroll.
    // =====================================================

    useEffect(() => {

        if (selectedPlanet) {

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

    }, [selectedPlanet])



    // =====================================================
    // 6. GET PLANETS FOR CURRENT TAB
    // =====================================================

    const getCurrentPlanets = () => {

        if (
            activeTab ===
            'certifications'
        ) {

            return certificationPlanets

        }


        if (
            activeTab ===
            'education'
        ) {

            return educationPlanets

        }


        return skillPlanets

    }


    const planets =
        getCurrentPlanets()



    // =====================================================
    // 7. CENTER PLANET TEXT
    // =====================================================

    const getCoreText = () => {

        if (
            activeTab ===
            'certifications'
        ) {

            return {

                eyebrow:
                    'VERIFIED',

                title:
                    'Credentials',

            }

        }


        if (
            activeTab ===
            'education'
        ) {

            return {

                eyebrow:
                    'JOURNEY',

                title:
                    'Education',

            }

        }


        return {

            eyebrow:
                'CORE',

            title:
                'Cloud + DevOps',

        }

    }


    const core =
        getCoreText()



    // =====================================================
    // 8. CHANGE TAB
    // =====================================================

    const switchTab = (
        tab: UniverseTab
    ) => {

        setActiveTab(tab)


        // Close the previous selected planet.
        setSelectedPlanet(
            null
        )

    }



    // =====================================================
    // 9. PLANET CLICK
    // =====================================================

    const handlePlanetClick = (
        planet: PlanetItem
    ) => {

        // -------------------------------------------------
        // CERTIFICATION
        // -------------------------------------------------
        //
        // Certification planets contain URLs.
        //
        // So instead of opening our modal, open:
        //
        // - Credly
        // - PDF
        //
        // in a new browser tab.
        // -------------------------------------------------

        if (planet.url) {

            window.open(
                planet.url,
                '_blank',
                'noopener,noreferrer'
            )

            return

        }


        // -------------------------------------------------
        // SKILLS / EDUCATION
        // -------------------------------------------------
        //
        // These open inside the centered modal.
        // -------------------------------------------------

        setSelectedPlanet(
            planet
        )

    }



    // =====================================================
    // 10. KEYBOARD ACCESSIBILITY FOR PLANETS
    // =====================================================

    const handlePlanetKeyDown = (
        event:
            KeyboardEvent<HTMLButtonElement>,
        planet:
            PlanetItem
    ) => {

        if (
            event.key === 'Enter' ||
            event.key === ' '
        ) {

            event.preventDefault()


            handlePlanetClick(
                planet
            )

        }

    }



    // =====================================================
    // UI
    // =====================================================

    return (

        <section
            id="skill-universe"
            className="skill-universe"
        >


            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div
                className="universe-background"
                aria-hidden="true"
            >

                <div
                    className="universe-stars"
                >
                </div>


                <div
                    className="
                        universe-nebula
                        nebula-one
                    "
                >
                </div>


                <div
                    className="
                        universe-nebula
                        nebula-two
                    "
                >
                </div>

            </div>



            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div
                className="universe-container"
            >


                {/* =============================================
                    HEADER
                ============================================= */}

                <header
                    className="universe-header"
                >

                    <span
                        className="universe-number"
                    >

                        02 / EXPERTISE

                    </span>


                    <h2>

                        MY TECHNICAL

                        <span>
                            {' '}UNIVERSE
                        </span>

                    </h2>


                    <p>

                        Explore the technologies,
                        credentials, and academic
                        foundation behind the systems
                        I build.

                    </p>

                </header>



                {/* =============================================
                    TABS
                ============================================= */}

                <div
                    className="universe-tabs"

                    role="tablist"

                    aria-label="
                        Skills certifications
                        and education
                    "
                >


                    {/* SKILLS */}

                    <button
                        type="button"

                        className={
                            activeTab ===
                                'skills'

                                ? 'universe-tab active'
                                : 'universe-tab'
                        }

                        onClick={() =>
                            switchTab(
                                'skills'
                            )
                        }
                    >

                        Skills

                    </button>



                    {/* CERTIFICATIONS */}

                    <button
                        type="button"

                        className={
                            activeTab ===
                                'certifications'

                                ? 'universe-tab active'
                                : 'universe-tab'
                        }

                        onClick={() =>
                            switchTab(
                                'certifications'
                            )
                        }
                    >

                        Certifications

                    </button>



                    {/* EDUCATION */}

                    <button
                        type="button"

                        className={
                            activeTab ===
                                'education'

                                ? 'universe-tab active'
                                : 'universe-tab'
                        }

                        onClick={() =>
                            switchTab(
                                'education'
                            )
                        }
                    >

                        Education

                    </button>

                </div>



                {/* =============================================
                    INSTRUCTION
                ============================================= */}

                <p
                    className="universe-instruction"
                >

                    {
                        activeTab ===
                            'certifications'

                            ? 'Select a credential to view verification.'

                            : 'Select a planet to explore.'
                    }

                </p>



                {/* =============================================
                    SOLAR SYSTEM
                ============================================= */}

                <div
                    className={
                        `solar-system solar-${activeTab}`
                    }
                >


                    {/* =========================================
                        ORBIT RINGS
                    ========================================= */}

                    <div
                        className="
                            orbit-ring
                            orbit-ring-1
                        "
                    >
                    </div>


                    <div
                        className="
                            orbit-ring
                            orbit-ring-2
                        "
                    >
                    </div>


                    <div
                        className="
                            orbit-ring
                            orbit-ring-3
                        "
                    >
                    </div>


                    <div
                        className="
                            orbit-ring
                            orbit-ring-4
                        "
                    >
                    </div>



                    {/* =========================================
                        CENTER CORE
                    ========================================= */}

                    <div
                        className="universe-core"
                    >

                        <div
                            className="core-glow"
                        >
                        </div>


                        <div
                            className="core-inner"
                        >

                            <span>

                                {
                                    core.eyebrow
                                }

                            </span>


                            <strong>

                                {
                                    core.title
                                }

                            </strong>

                        </div>

                    </div>



                    {/* =========================================
                        PLANETS
                    ========================================= */}

                    {
                        planets.map(
                            (planet) => (

                                <button
                                    type="button"

                                    key={
                                        planet.id
                                    }

                                    className={
                                        `
                                            skill-planet
                                            planet-orbit-${planet.orbit}
                                            planet-${planet.tone}

                                            ${selectedPlanet?.id ===
                                            planet.id

                                            ? 'planet-selected'
                                            : ''
                                        }
                                        `
                                    }

                                    onClick={() =>
                                        handlePlanetClick(
                                            planet
                                        )
                                    }

                                    onKeyDown={
                                        (
                                            event
                                        ) =>
                                            handlePlanetKeyDown(
                                                event,
                                                planet
                                            )
                                    }

                                    aria-label={
                                        `Explore ${planet.title}`
                                    }
                                >


                                    {/* -------------------------
                                        PLANET SPHERE
                                    ------------------------- */}

                                    <span
                                        className="planet-sphere"

                                        aria-hidden="true"
                                    >
                                    </span>



                                    {/* -------------------------
                                        PLANET LABEL
                                    ------------------------- */}

                                    <span
                                        className="planet-label"
                                    >

                                        <strong>

                                            {
                                                planet.title
                                            }

                                        </strong>


                                        {
                                            planet.subtitle && (

                                                <small>

                                                    {
                                                        planet.subtitle
                                                    }

                                                </small>

                                            )
                                        }

                                    </span>

                                </button>

                            )
                        )
                    }

                </div>

            </div>



            {/* =================================================
                CENTERED SKILL / EDUCATION MODAL
            =================================================
                
                IMPORTANT:
                
                This replaces the OLD planet-detail panel
                that appeared underneath the solar system.

                The modal is shown only when selectedPlanet
                contains something.

                Certifications never reach this point because
                their URLs open externally.
            ================================================= */}

            {selectedPlanet && (

                <div
                    className="universe-modal-overlay"

                    // Clicking the dark / blurred area
                    // outside the card closes it.
                    onClick={() => {

                        setSelectedPlanet(
                            null
                        )

                    }}
                >


                    {/* =========================================
                        CENTER MODAL CARD
                    ========================================= */}

                    <div
                        className="universe-modal"

                        role="dialog"

                        aria-modal="true"

                        aria-label={
                            selectedPlanet.title
                        }

                        // Clicking inside the card should NOT
                        // close the modal.
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
                                universe-modal-close
                            "

                            aria-label="
                                Close details
                            "

                            onClick={() => {

                                setSelectedPlanet(
                                    null
                                )

                            }}
                        >

                            ×

                        </button>



                        {/* -------------------------------------
                            SMALL TOP LABEL
                        ------------------------------------- */}

                        <span
                            className="
                                universe-modal-label
                            "
                        >

                            {
                                activeTab ===
                                    'education'

                                    ? 'EDUCATION'
                                    : 'SELECTED NODE'
                            }

                        </span>



                        {/* -------------------------------------
                            MAIN TITLE
                        ------------------------------------- */}

                        <h3>

                            {
                                selectedPlanet.title
                            }

                        </h3>



                        {/* -------------------------------------
                            OPTIONAL SUBTITLE
                            
                            Education uses this for:
                            
                            - 10th Class
                            - High School
                            - Bachelor of Science...
                        ------------------------------------- */}

                        {
                            selectedPlanet.subtitle && (

                                <p
                                    className="
                                        universe-modal-subtitle
                                    "
                                >

                                    {
                                        selectedPlanet
                                            .subtitle
                                    }

                                </p>

                            )
                        }



                        {/* -------------------------------------
                            EDUCATION DESCRIPTION
                            
                            Examples:
                            
                            CGPA: 10 / 10
                            CGPA: 9.3 / 10
                            GPA: 3.6 / 4.0
                        ------------------------------------- */}

                        {
                            selectedPlanet.description && (

                                <p
                                    className="
                                        universe-modal-description
                                    "
                                >

                                    {
                                        selectedPlanet
                                            .description
                                    }

                                </p>

                            )
                        }



                        {/* -------------------------------------
                            SKILL ITEMS
                            
                            Examples:
                            
                            Languages:
                            C, C++, Python, SQL
                            
                            Databases:
                            MySQL, PostgreSQL
                        ------------------------------------- */}

                        {
                            selectedPlanet.items && (

                                <div
                                    className="
                                        universe-modal-tags
                                    "
                                >

                                    {
                                        selectedPlanet
                                            .items
                                            .map(
                                                (
                                                    item
                                                ) => (

                                                    <span
                                                        key={
                                                            item
                                                        }
                                                    >

                                                        {
                                                            item
                                                        }

                                                    </span>

                                                )
                                            )
                                    }

                                </div>

                            )
                        }

                    </div>

                </div>

            )}

        </section>

    )

}


export default SkillUniverse