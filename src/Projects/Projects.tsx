import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
} from 'react'

import './Projects.css'

// =========================================================
// AWS SERVICE ICONS
// =========================================================
//
// These SVG files live inside:
//
// src/assets/aws/
//
// Using the real service icons makes the architecture
// immediately recognizable as AWS infrastructure.
// =========================================================

import cloudFrontIcon from '../assets/aws/cloudfront.svg'
import s3Icon from '../assets/aws/s3.svg'
import apiGatewayIcon from '../assets/aws/api-gateway.svg'
import lambdaIcon from '../assets/aws/lambda.svg'
import cloudWatchIcon from '../assets/aws/cloudwatch.svg'


// =========================================================
// PROJECT TYPE
// =========================================================
//
// This describes the smaller supporting project cards.
//
// The first AWS project is displayed separately because
// it receives the larger architecture-focused layout.
// =========================================================

type Project = {
    number: string
    title: string
    description: string
    technologies: string[]
    githubUrl?: string
    icon: string

    // Extra information used inside the expanded project modal.
    overview: string
    built: string
    highlights: string[]
}



// =========================================================
// SUPPORTING PROJECTS
// =========================================================
//
// IMPORTANT:
//
// Replace the GitHub URLs later with the exact repository
// links once you decide which repos you want public.
// =========================================================

const projects: Project[] = [

    // -----------------------------------------------------
    // PROJECT 02 — PORTFOLIO WEBSITE
    // -----------------------------------------------------

    {
        number:
            'PROJECT 02',

        title:
            'Portfolio Website',

        description:
            'An interactive portfolio built with React, TypeScript, and Vite to present my cloud, DevOps, Linux, research, experience, and projects through responsive system-inspired interfaces.',

        technologies: [
            'React',
            'TypeScript',
            'Vite',
            'CSS',
            'Responsive Design',
        ],

        githubUrl:
            'https://github.com/lokeshrepaaka',

        icon:
            '</>',

        overview:
            'A personal portfolio designed to communicate my Cloud and DevOps direction through an interactive, recruiter-friendly experience.',

        built:
            'Built a responsive React and TypeScript interface with reusable sections, light and dark themes, animated system visuals, interactive project and skill panels, and mobile-friendly layouts.',

        highlights: [
            'Responsive desktop and mobile layouts',
            'Light and dark theme support',
            'Reusable React components',
            'Interactive system-inspired animations',
        ],
    },



    // -----------------------------------------------------
    // PROJECT 03 — UNIX ARCHIVE MANAGER
    // -----------------------------------------------------

    {
        number:
            'PROJECT 03',

        title:
            'UNIX Archive Manager',

        description:
            'A systems-programming archive utility built in C with archive creation, extraction, listing, metadata handling, and integrity verification.',

        technologies: [
            'C',
            'Linux',
            'POSIX',
            'MD4',
            'CLI',
        ],

        githubUrl:
            'https://github.com/lokeshrepaaka',

        icon:
            '[]',

        overview:
            'A UNIX-style archive utility focused on systems programming, binary file handling, metadata processing, and archive integrity.',

        built:
            'Implemented archive creation, extraction, table-of-contents listing, file metadata handling, command-line options, and MD4-based integrity verification.',

        highlights: [
            'Archive create, extract, and list workflows',
            'File metadata and POSIX-style system handling',
            'MD4 header and data integrity checks',
            'Command-line error handling and validation',
        ],
    },



    // -----------------------------------------------------
    // PROJECT 04 — C++ TEMPLATE ENGINE
    // -----------------------------------------------------

    {
        number:
            'PROJECT 04',

        title:
            'C++ Template Engine',

        description:
            'A C++ project focused on parsing, structured processing, reusable components, and generating output from template-based input.',

        technologies: [
            'C++',
            'Parsing',
            'Data Structures',
            'OOP',
        ],

        githubUrl:
            'https://github.com/lokeshrepaaka',

        icon:
            '</>',

        overview:
            'A C++ template-processing project centered on parsing structured input and generating output through reusable program components.',

        built:
            'Designed parsing and processing logic using C++ data structures and object-oriented organization to transform template-based input into structured output.',

        highlights: [
            'Structured parsing workflow',
            'Reusable C++ components',
            'Object-oriented design',
            'Data-structure driven processing',
        ],
    },

]



// =========================================================
// PROJECTS COMPONENT
// =========================================================

function Projects() {

    // =====================================================
    // SECTION REFERENCE
    // =====================================================

    const sectionRef =
        useRef<HTMLElement | null>(
            null
        )



    // =====================================================
    // PROJECT TITLE VISIBILITY
    // =====================================================
    //
    // Used for the letter-by-letter PROJECTS animation.
    // =====================================================

    const [
        titleVisible,
        setTitleVisible,
    ] =
        useState(false)



    // =====================================================
    // LARGE PROJECT VISIBILITY
    // =====================================================

    const [
        mainProjectVisible,
        setMainProjectVisible,
    ] =
        useState(false)



    // =====================================================
    // SUPPORTING CARD VISIBILITY
    // =====================================================

    const [
        supportingVisible,
        setSupportingVisible,
    ] =
        useState(false)



    // =====================================================
    // SELECTED SUPPORTING PROJECT
    // =====================================================
    //
    // Projects 02, 03, and 04 use one shared center modal.
    //
    // null:
    //      no project is expanded
    //
    // Project:
    //      show that project inside the animated modal
    // =====================================================

    const [
        selectedProject,
        setSelectedProject,
    ] =
        useState<Project | null>(
            null
        )



    // =====================================================
    // SECTION OBSERVER
    // =====================================================
    //
    // We use separate animation stages:
    //
    // 1. PROJECTS title
    // 2. Main AWS project
    // 3. Supporting project cards
    //
    // This prevents everything from appearing at once.
    // =====================================================

    useEffect(() => {

        const section =
            sectionRef.current


        if (!section) {
            return
        }


        // -------------------------------------------------
        // MAIN SECTION OBSERVER
        // -------------------------------------------------

        const sectionObserver =
            new IntersectionObserver(

                ([entry]) => {

                    if (
                        entry.isIntersecting
                    ) {

                        setTitleVisible(
                            true
                        )

                    } else {

                        // Reset when leaving the section
                        // so it can animate again later.
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



        // -------------------------------------------------
        // MAIN PROJECT OBSERVER
        // -------------------------------------------------

        const mainProject =
            section.querySelector(
                '.project-main'
            )


        const mainObserver =
            new IntersectionObserver(

                ([entry]) => {

                    setMainProjectVisible(
                        entry.isIntersecting
                    )

                },

                {
                    threshold:
                        0.2,
                }

            )



        // -------------------------------------------------
        // SUPPORTING PROJECT OBSERVER
        // -------------------------------------------------

        const supportingProjects =
            section.querySelector(
                '.supporting-projects'
            )


        const supportingObserver =
            new IntersectionObserver(

                ([entry]) => {

                    setSupportingVisible(
                        entry.isIntersecting
                    )

                },

                {
                    threshold:
                        0.18,
                }

            )



        // -------------------------------------------------
        // START OBSERVERS
        // -------------------------------------------------

        sectionObserver.observe(
            section
        )


        if (mainProject) {

            mainObserver.observe(
                mainProject
            )

        }


        if (supportingProjects) {

            supportingObserver.observe(
                supportingProjects
            )

        }



        // -------------------------------------------------
        // CLEANUP
        // -------------------------------------------------

        return () => {

            sectionObserver.disconnect()

            mainObserver.disconnect()

            supportingObserver.disconnect()

        }

    }, [])



    // =====================================================
    // ESC KEY — CLOSE EXPANDED PROJECT
    // =====================================================

    useEffect(() => {

        const handleEscape =
            (
                event:
                    globalThis.KeyboardEvent
            ) => {

                if (
                    event.key === 'Escape'
                ) {

                    setSelectedProject(
                        null
                    )

                }

            }


        window.addEventListener(
            'keydown',
            handleEscape
        )


        return () => {

            window.removeEventListener(
                'keydown',
                handleEscape
            )

        }

    }, [])



    // =====================================================
    // PREVENT BACKGROUND SCROLL
    // =====================================================

    useEffect(() => {

        if (selectedProject) {

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

    }, [selectedProject])



    // =====================================================
    // PROJECT TITLE TEXT
    // =====================================================

    const title =
        'PROJECTS'



    // =====================================================
    // UI
    // =====================================================

    return (

        <section
            id="projects"
            className="projects-section"
            ref={sectionRef}
        >


            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div
                className="projects-background"
                aria-hidden="true"
            >

                {/* MOVING GRID */}

                <div
                    className="projects-grid"
                >
                </div>



                {/* ATMOSPHERIC GLOWS */}

                <div
                    className="
                        projects-glow
                        projects-glow-one
                    "
                >
                </div>


                <div
                    className="
                        projects-glow
                        projects-glow-two
                    "
                >
                </div>



                {/* MOVING BACKGROUND DATA LINES */}

                <span
                    className="
                        projects-data-line
                        project-line-one
                    "
                >
                </span>


                <span
                    className="
                        projects-data-line
                        project-line-two
                    "
                >
                </span>

            </div>



            {/* =================================================
                MAIN CONTAINER
            ================================================= */}

            <div
                className="projects-container"
            >


                {/* =================================================
                    HEADER
                ================================================= */}

                <header
                    className="projects-header"
                >

                    <span
                        className="projects-number"
                    >

                        04 / PROJECTS

                    </span>



                    {/* =============================================
                        PROJECTS LETTER ANIMATION
                    ============================================= */}

                    <h2
                        className={
                            titleVisible

                                ? 'projects-title projects-title-visible'
                                : 'projects-title'
                        }

                        aria-label="Projects"
                    >

                        {
                            title
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
                                                    '--project-letter':
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



                    <p
                        className="projects-subtitle"
                    >

                        Systems I’ve built,
                        automated, and engineered
                        from idea to implementation.

                    </p>

                </header>



                {/* =================================================
                    PROJECT 01
                ================================================= */}

                <article
                    className={
                        mainProjectVisible

                            ? 'project-main project-main-visible'
                            : 'project-main'
                    }
                >


                    {/* =============================================
                        LEFT SIDE — PROJECT INFORMATION
                    ============================================= */}

                    <div
                        className="project-main-info"
                    >

                        <span
                            className="project-index"
                        >

                            PROJECT 01

                        </span>


                        <h3>

                            AWS Serverless
                            Web App

                        </h3>



                        {/* -----------------------------------------
                            WHAT IT DOES
                        ----------------------------------------- */}

                        <div
                            className="project-info-block"
                        >

                            <span
                                className="project-info-label"
                            >

                                ◉ WHAT IT DOES

                            </span>


                            <p>
                                A serverless web application that delivers
                                frontend content through CloudFront and S3,
                                processes API requests through API Gateway
                                and Lambda, and uses CloudWatch for
                                monitoring.
                            </p>


                        </div>



                        {/* -----------------------------------------
                            WHAT I BUILT
                        ----------------------------------------- */}

                        <div
                            className="project-info-block"
                        >

                            <span
                                className="project-info-label"
                            >

                                ◇ WHAT I BUILT

                            </span>


                            <p>
                                Designed an AWS architecture that separates
                                static content delivery from backend API
                                processing, while using IAM for access
                                control and CloudWatch for operational
                                visibility.
                            </p>

                        </div>



                        {/* -----------------------------------------
                            OUTCOME
                        ----------------------------------------- */}

                        <div
                            className="project-info-block"
                        >

                            <span
                                className="project-info-label"
                            >

                                ✓ OUTCOME

                            </span>


                            <p>
                                Built a scalable serverless architecture
                                that separates frontend delivery from
                                backend processing without managing
                                traditional application servers.
                            </p>

                        </div>



                        {/* -----------------------------------------
                            TECH STACK
                        ----------------------------------------- */}

                        <div
                            className="project-tech-section"
                        >

                            <span
                                className="project-info-label"
                            >

                                ◫ TECH STACK

                            </span>


                            <div
                                className="project-tech-stack"
                            >

                                <span>AWS</span>

                                <span>S3</span>

                                <span>CloudFront</span>

                                <span>API Gateway</span>

                                <span>Lambda</span>

                                <span>IAM</span>

                                <span>CloudWatch</span>

                            </div>

                        </div>



                        {/* -----------------------------------------
                            PROJECT LINKS
                        ----------------------------------------- */}

                        <div
                            className="project-actions"
                        >

                            <a
                                href="https://github.com/lokeshrepaaka"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-primary-link"
                            >

                                View on GitHub

                                <span>
                                    ↗
                                </span>

                            </a>

                        </div>

                    </div>



                    {/* =============================================
                        RIGHT SIDE — ARCHITECTURE
                    ============================================= */}

                    <div
                        className="project-architecture"
                    >


                        {/* -----------------------------------------
                            ARCHITECTURE BACKGROUND
                        ----------------------------------------- */}

                        <div
                            className="architecture-grid"
                            aria-hidden="true"
                        >
                        </div>



                        {/* =========================================
                            CONNECTION MAP

                            IMPORTANT:

                            The connection lines and moving packets
                            now live inside ONE SVG layer.

                            This fixes the alignment problem that
                            happened when the line and the packet
                            were positioned separately with CSS.

                            Each moving packet follows the exact
                            same SVG path as its connection line.
                        ========================================= */}

                        <svg
                            className="architecture-map"
                            viewBox="0 0 1000 600"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >

                            {/* -------------------------------------
                                CLIENT → CLOUDFRONT
                            ------------------------------------- */}

                            <path
                                id="path-client-cloudfront"
                                className="architecture-path"
                                d="M 180 300 L 380 150"
                            />


                            {/* Three packets on this connection */}

                            <circle
                                className="architecture-flow-dot"
                                r="5"
                            >
                                <animateMotion
                                    dur="5.2s"
                                    repeatCount="indefinite"
                                    begin="0s"
                                >
                                    <mpath
                                        href="#path-client-cloudfront"
                                    />
                                </animateMotion>
                            </circle>


                            <circle
                                className="architecture-flow-dot"
                                r="5"
                            >
                                <animateMotion
                                    dur="5.2s"
                                    repeatCount="indefinite"
                                    begin="-1.73s"
                                >
                                    <mpath
                                        href="#path-client-cloudfront"
                                    />
                                </animateMotion>
                            </circle>


                            <circle
                                className="architecture-flow-dot"
                                r="5"
                            >
                                <animateMotion
                                    dur="5.2s"
                                    repeatCount="indefinite"
                                    begin="-3.46s"
                                >
                                    <mpath
                                        href="#path-client-cloudfront"
                                    />
                                </animateMotion>
                            </circle>



                            {/* -------------------------------------
                                CLOUDFRONT → S3

                                CloudFront and S3 share the exact
                                same Y coordinate, making this line
                                perfectly horizontal.

                                The path runs center-to-center behind
                                the node cards. Because the cards have
                                a higher z-index, the visible part of
                                the line appears to touch each box
                                cleanly.
                            ------------------------------------- */}

                            <path
                                id="path-cloudfront-s3"
                                className="architecture-path"
                                d="M 380 150 L 820 150"
                            />


                            <circle
                                className="architecture-flow-dot"
                                r="5"
                            >
                                <animateMotion
                                    dur="5.4s"
                                    repeatCount="indefinite"
                                    begin="0s"
                                >
                                    <mpath
                                        href="#path-cloudfront-s3"
                                    />
                                </animateMotion>
                            </circle>


                            <circle
                                className="architecture-flow-dot"
                                r="5"
                            >
                                <animateMotion
                                    dur="5.4s"
                                    repeatCount="indefinite"
                                    begin="-1.8s"
                                >
                                    <mpath
                                        href="#path-cloudfront-s3"
                                    />
                                </animateMotion>
                            </circle>


                            <circle
                                className="architecture-flow-dot"
                                r="5"
                            >
                                <animateMotion
                                    dur="5.4s"
                                    repeatCount="indefinite"
                                    begin="-3.6s"
                                >
                                    <mpath
                                        href="#path-cloudfront-s3"
                                    />
                                </animateMotion>
                            </circle>



                            {/* -------------------------------------
                                CLIENT → API GATEWAY
                            ------------------------------------- */}

                            <path
                                id="path-client-api"
                                className="architecture-path"
                                d="M 180 300 L 380 450"
                            />


                            {/* Three packets on this connection */}

                            <circle
                                className="architecture-flow-dot"
                                r="5"
                            >
                                <animateMotion
                                    dur="5.0s"
                                    repeatCount="indefinite"
                                    begin="0s"
                                >
                                    <mpath
                                        href="#path-client-api"
                                    />
                                </animateMotion>
                            </circle>


                            <circle
                                className="architecture-flow-dot"
                                r="5"
                            >
                                <animateMotion
                                    dur="5.0s"
                                    repeatCount="indefinite"
                                    begin="-1.66s"
                                >
                                    <mpath
                                        href="#path-client-api"
                                    />
                                </animateMotion>
                            </circle>


                            <circle
                                className="architecture-flow-dot"
                                r="5"
                            >
                                <animateMotion
                                    dur="5.0s"
                                    repeatCount="indefinite"
                                    begin="-3.33s"
                                >
                                    <mpath
                                        href="#path-client-api"
                                    />
                                </animateMotion>
                            </circle>



                            {/* -------------------------------------
                                API GATEWAY → LAMBDA
                            ------------------------------------- */}

                            <path
                                id="path-api-lambda"
                                className="architecture-path"
                                d="M 380 450 L 680 450"
                            />


                            <circle
                                className="architecture-flow-dot"
                                r="5"
                            >
                                <animateMotion
                                    dur="4.6s"
                                    repeatCount="indefinite"
                                    begin="0s"
                                >
                                    <mpath
                                        href="#path-api-lambda"
                                    />
                                </animateMotion>
                            </circle>


                            <circle
                                className="architecture-flow-dot"
                                r="5"
                            >
                                <animateMotion
                                    dur="4.6s"
                                    repeatCount="indefinite"
                                    begin="-1.53s"
                                >
                                    <mpath
                                        href="#path-api-lambda"
                                    />
                                </animateMotion>
                            </circle>


                            <circle
                                className="architecture-flow-dot"
                                r="5"
                            >
                                <animateMotion
                                    dur="4.6s"
                                    repeatCount="indefinite"
                                    begin="-3.06s"
                                >
                                    <mpath
                                        href="#path-api-lambda"
                                    />
                                </animateMotion>
                            </circle>



                            {/* -------------------------------------
                                LAMBDA → CLOUDWATCH
                            ------------------------------------- */}

                            <path
                                id="path-lambda-cloudwatch"
                                className="architecture-path"
                                d="M 680 450 L 870 528"
                            />


                            <circle
                                className="architecture-flow-dot"
                                r="5"
                            >
                                <animateMotion
                                    dur="4.9s"
                                    repeatCount="indefinite"
                                    begin="0s"
                                >
                                    <mpath
                                        href="#path-lambda-cloudwatch"
                                    />
                                </animateMotion>
                            </circle>


                            <circle
                                className="architecture-flow-dot"
                                r="5"
                            >
                                <animateMotion
                                    dur="4.9s"
                                    repeatCount="indefinite"
                                    begin="-1.63s"
                                >
                                    <mpath
                                        href="#path-lambda-cloudwatch"
                                    />
                                </animateMotion>
                            </circle>


                            <circle
                                className="architecture-flow-dot"
                                r="5"
                            >
                                <animateMotion
                                    dur="4.9s"
                                    repeatCount="indefinite"
                                    begin="-3.26s"
                                >
                                    <mpath
                                        href="#path-lambda-cloudwatch"
                                    />
                                </animateMotion>
                            </circle>

                        </svg>



                        {/* =========================================
                            CLIENT
                        ========================================= */}

                        <div
                            className="
                                architecture-node
                                node-client
                            "
                        >

                            <span
                                className="
                                    architecture-icon
                                    architecture-client-icon
                                "
                            >
                                ◎
                            </span>

                            <small>
                                Client
                            </small>

                        </div>



                        {/* =========================================
                            CLOUDFRONT
                        ========================================= */}

                        <div
                            className="
                                architecture-node
                                node-cloudfront
                            "
                        >

                            <span
                                className="architecture-icon"
                            >

                                <img
                                    src={cloudFrontIcon}
                                    alt=""
                                    className="aws-service-icon"
                                />

                            </span>

                            <small>
                                CloudFront
                            </small>

                        </div>



                        {/* =========================================
                            S3
                        ========================================= */}

                        <div
                            className="
                                architecture-node
                                node-s3
                            "
                        >

                            <span
                                className="architecture-icon"
                            >

                                <img
                                    src={s3Icon}
                                    alt=""
                                    className="aws-service-icon"
                                />

                            </span>

                            <small>
                                S3
                            </small>

                        </div>



                        {/* =========================================
                            API GATEWAY
                        ========================================= */}

                        <div
                            className="
                                architecture-node
                                node-api
                            "
                        >

                            <span
                                className="architecture-icon"
                            >

                                <img
                                    src={apiGatewayIcon}
                                    alt=""
                                    className="aws-service-icon"
                                />

                            </span>

                            <small>
                                API Gateway
                            </small>

                        </div>



                        {/* =========================================
                            LAMBDA
                        ========================================= */}

                        <div
                            className="
                                architecture-node
                                node-lambda
                            "
                        >

                            <span
                                className="architecture-icon"
                            >

                                <img
                                    src={lambdaIcon}
                                    alt=""
                                    className="aws-service-icon"
                                />

                            </span>

                            <small>
                                Lambda
                            </small>

                        </div>



                        {/* =========================================
                            CLOUDWATCH
                        ========================================= */}

                        <div
                            className="
                                architecture-node
                                node-cloudwatch
                            "
                        >

                            <span
                                className="architecture-icon"
                            >

                                <img
                                    src={cloudWatchIcon}
                                    alt=""
                                    className="aws-service-icon"
                                />

                            </span>

                            <small>
                                CloudWatch
                            </small>

                        </div>

                    </div>

                </article >



                {/* =================================================
                    SUPPORTING PROJECTS
                ================================================= */}

                < div
                    className={
                        supportingVisible

                            ? 'supporting-projects supporting-projects-visible'
                            : 'supporting-projects'
                    }
                >

                    {
                        projects.map(
                            (
                                project,
                                index
                            ) => (

                                <ProjectCard
                                    key={
                                        project.title
                                    }

                                    project={
                                        project
                                    }

                                    index={
                                        index
                                    }

                                    onOpen={() => {

                                        setSelectedProject(
                                            project
                                        )

                                    }}
                                />

                            )
                        )
                    }

                </div >

            </div >



            {/* =================================================
                EXPANDED SUPPORTING PROJECT MODAL
            =================================================

                Projects 02–04 open here.

                Interaction:
                - click any small project card
                - background blurs/dims
                - modal expands into the center
                - scan line sweeps once
                - modal content reveals in stages
                - click ×, outside, or press Esc to close
            ================================================= */}

            {
                selectedProject && (

                    <div
                        className="
                            project-modal-overlay
                        "

                        onClick={() => {

                            setSelectedProject(
                                null
                            )

                        }}
                    >

                        <div
                            className="
                                project-modal
                            "

                            role="dialog"

                            aria-modal="true"

                            aria-label={
                                selectedProject.title
                            }

                            onClick={
                                (
                                    event
                                ) => {

                                    event.stopPropagation()

                                }
                            }
                        >


                            {/* One-time scan-line effect */}

                            <div
                                className="
                                    project-modal-scan
                                "
                                aria-hidden="true"
                            >
                            </div>



                            {/* CLOSE BUTTON */}

                            <button
                                type="button"

                                className="
                                    project-modal-close
                                "

                                aria-label="
                                    Close project details
                                "

                                onClick={() => {

                                    setSelectedProject(
                                        null
                                    )

                                }}
                            >

                                ×

                            </button>



                            {/* TOP LABEL */}

                            <span
                                className="
                                    project-modal-number
                                    project-modal-stage
                                    modal-stage-1
                                "
                            >

                                {
                                    selectedProject.number
                                }

                            </span>



                            {/* TITLE */}

                            <div
                                className="
                                    project-modal-heading
                                    project-modal-stage
                                    modal-stage-1
                                "
                            >

                                <span
                                    className="
                                        project-modal-icon
                                    "
                                    aria-hidden="true"
                                >

                                    {
                                        selectedProject.icon
                                    }

                                </span>


                                <h3>

                                    {
                                        selectedProject.title
                                    }

                                </h3>

                            </div>



                            {/* OVERVIEW */}

                            <div
                                className="
                                    project-modal-section
                                    project-modal-stage
                                    modal-stage-2
                                "
                            >

                                <span
                                    className="
                                        project-modal-label
                                    "
                                >

                                    ◉ OVERVIEW

                                </span>


                                <p>

                                    {
                                        selectedProject.overview
                                    }

                                </p>

                            </div>



                            {/* WHAT I BUILT */}

                            <div
                                className="
                                    project-modal-section
                                    project-modal-stage
                                    modal-stage-3
                                "
                            >

                                <span
                                    className="
                                        project-modal-label
                                    "
                                >

                                    ◇ WHAT I BUILT

                                </span>


                                <p>

                                    {
                                        selectedProject.built
                                    }

                                </p>

                            </div>



                            {/* TECH STACK */}

                            <div
                                className="
                                    project-modal-section
                                    project-modal-stage
                                    modal-stage-4
                                "
                            >

                                <span
                                    className="
                                        project-modal-label
                                    "
                                >

                                    ◫ TECH STACK

                                </span>


                                <div
                                    className="
                                        project-modal-tech
                                    "
                                >

                                    {
                                        selectedProject
                                            .technologies
                                            .map(
                                                (
                                                    technology
                                                ) => (

                                                    <span
                                                        key={
                                                            technology
                                                        }
                                                    >

                                                        {
                                                            technology
                                                        }

                                                    </span>

                                                )
                                            )
                                    }

                                </div>

                            </div>



                            {/* KEY HIGHLIGHTS */}

                            <div
                                className="
                                    project-modal-section
                                    project-modal-stage
                                    modal-stage-5
                                "
                            >

                                <span
                                    className="
                                        project-modal-label
                                    "
                                >

                                    + KEY HIGHLIGHTS

                                </span>


                                <ul
                                    className="
                                        project-modal-highlights
                                    "
                                >

                                    {
                                        selectedProject
                                            .highlights
                                            .map(
                                                (
                                                    highlight
                                                ) => (

                                                    <li
                                                        key={
                                                            highlight
                                                        }
                                                    >

                                                        {
                                                            highlight
                                                        }

                                                    </li>

                                                )
                                            )
                                    }

                                </ul>

                            </div>



                            {/* GITHUB */}

                            {
                                selectedProject.githubUrl && (

                                    <div
                                        className="
                                            project-modal-actions
                                            project-modal-stage
                                            modal-stage-6
                                        "
                                    >

                                        <a
                                            href={
                                                selectedProject
                                                    .githubUrl
                                            }

                                            target="_blank"

                                            rel="
                                                noopener noreferrer
                                            "

                                            onClick={
                                                (
                                                    event
                                                ) => {

                                                    event
                                                        .stopPropagation()

                                                }
                                            }
                                        >

                                            View on GitHub

                                            <span>
                                                ↗
                                            </span>

                                        </a>

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



// =========================================================
// PROJECT CARD
// =========================================================

function ProjectCard(
    {
        project,
        index,
        onOpen,
    }:
        {
            project:
            Project

            index:
            number

            onOpen:
            () => void
        }
) {

    return (

        <article
            className="
                project-card
                project-card-clickable
            "

            role="button"

            tabIndex={0}

            aria-label={
                `Open ${project.title} details`
            }

            onClick={
                onOpen
            }

            onKeyDown={
                (
                    event
                ) => {

                    if (
                        event.key === 'Enter' ||
                        event.key === ' '
                    ) {

                        event.preventDefault()

                        onOpen()

                    }

                }
            }

            style={
                {
                    '--card-index':
                        index,
                } as CSSProperties
            }
        >


            {/* =================================================
                TOP
            ================================================= */}

            <div
                className="project-card-top"
            >

                <span
                    className="project-index"
                >

                    {
                        project.number
                    }

                </span>


                <span
                    className="project-card-icon"
                    aria-hidden="true"
                >

                    {
                        project.icon
                    }

                </span>

            </div>


            <span
                className="
                    project-expand-hint
                "
            >

                EXPAND ↗

            </span>



            {/* =================================================
                PROJECT NAME
            ================================================= */}

            <h3>

                {
                    project.title
                }

            </h3>



            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p>

                {
                    project.description
                }

            </p>



            {/* =================================================
                TECHNOLOGIES
            ================================================= */}

            <div
                className="project-card-tech"
            >

                {
                    project.technologies.map(
                        (
                            technology
                        ) => (

                            <span
                                key={
                                    technology
                                }
                            >

                                {
                                    technology
                                }

                            </span>

                        )
                    )
                }

            </div>



            {/* =================================================
                GITHUB
            ================================================= */}

            {
                project.githubUrl && (

                    <a
                        href={
                            project.githubUrl
                        }

                        target="_blank"

                        rel="noopener noreferrer"

                        className="project-card-link"

                        onClick={
                            (
                                event
                            ) => {

                                event.stopPropagation()

                            }
                        }
                    >

                        View on GitHub

                        <span>
                            ↗
                        </span>

                    </a>

                )
            }

        </article>

    )

}


export default Projects