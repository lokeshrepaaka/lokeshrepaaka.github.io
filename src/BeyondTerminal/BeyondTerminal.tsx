import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
} from 'react'

import './BeyondTerminal.css'


// =========================================================
// IMAGE IMPORTS
// =========================================================
//
// All of these files should live inside:
//
// src/assets/beyond-terminal/
//
// Keeping the images in one folder makes this section easy
// to maintain later if you want to replace any photo.
// =========================================================

import mentoring01 from '../assets/beyond-terminal/mentoring-01.jpg'
import outdoorProgram01 from '../assets/beyond-terminal/outdoor-program-01.jpg'
import hiking01 from '../assets/beyond-terminal/hiking-01.jpg'
import hiking02 from '../assets/beyond-terminal/hiking-02.jpg'
import exploring01 from '../assets/beyond-terminal/exploring-01.jpg'
import exploring02 from '../assets/beyond-terminal/exploring-02.jpg'
import roadtrip01 from '../assets/beyond-terminal/roadtrip-01.jpg'
import friends01 from '../assets/beyond-terminal/friends-01.jpg'
import campus01 from '../assets/beyond-terminal/campus-01.jpg'
import food01 from '../assets/beyond-terminal/food-01.jpg'


// =========================================================
// STORY TYPE
// =========================================================

type Story = {
    number: string
    eyebrow: string
    title: string
    description: string
    image: string
    imageAlt: string
    secondaryImages?: {
        src: string
        alt: string
    }[]
    tags: string[]
    accent: string
}


// =========================================================
// STORIES
// =========================================================
//
// These are intentionally personal rather than technical.
//
// You can change any title, description, tag, or image later
// without changing the carousel logic below.
// =========================================================

const stories: Story[] = [
    {
        number: '01',
        eyebrow: 'MENTORSHIP',
        title: 'Helping Others Find Their Footing.',
        description:
            'Some of my most meaningful experiences come from helping new students feel a little less lost. Mentoring has taught me how much a small conversation, a useful resource, or simply being available can matter.',
        image:
            mentoring01,
        imageAlt:
            'International student mentor badge and lanyard',
        tags: [
            'Mentoring',
            'Community',
            'Communication',
            'Leadership',
        ],
        accent:
            '#8b5cf6',
    },

    {
        number: '02',
        eyebrow: 'OUTDOORS',
        title: 'Leading Beyond the Classroom.',
        description:
            'Getting outside gives me a completely different kind of challenge. Hiking, exploring new places, and spending time outdoors are some of my favorite ways to reset, learn, and make memories with other people.',
        image:
            outdoorProgram01,
        imageAlt:
            'Outdoor program group in a forest',
        secondaryImages: [
            {
                src: hiking01,
                alt: 'Outdoor hiking experience',
            },
            {
                src: hiking02,
                alt: 'Waterfall during an outdoor trip',
            },
        ],
        tags: [
            'Hiking',
            'Exploration',
            'Teamwork',
            'Outdoors',
        ],
        accent:
            '#22c55e',
    },

    {
        number: '03',
        eyebrow: 'EXPLORATION',
        title: 'Take the Long Way Home.',
        description:
            'I enjoy exploring without turning every destination into a checklist. Sometimes the best part is finding a view, a road, or a place I had never planned to see.',
        image:
            exploring01,
        imageAlt:
            'Scenic rocky landscape and river',
        secondaryImages: [
            {
                src: exploring02,
                alt: 'Colorful evening street view',
            },
        ],
        tags: [
            'Travel',
            'Scenery',
            'Curiosity',
            'Pacific Northwest',
        ],
        accent:
            '#38bdf8',
    },

    {
        number: '04',
        eyebrow: 'ROAD TRIPS',
        title: 'Just Drive.',
        description:
            'Driving is one of my favorite ways to reset, explore, and see what is beyond the usual route. A simple drive can turn into one of the best parts of the week.',
        image:
            roadtrip01,
        imageAlt:
            'View from behind the steering wheel on a road trip',
        tags: [
            'Road Trips',
            'Driving',
            'Exploring',
            'Reset',
        ],
        accent:
            '#f59e0b',
    },

    {
        number: '05',
        eyebrow: 'PEOPLE',
        title: 'Better With Good Company.',
        description:
            'Some of my favorite memories are the simplest ones — spending time with friends, celebrating together, sharing experiences, and enjoying life outside work and school.',
        image:
            friends01,
        imageAlt:
            'Friends celebrating Holi together',
        tags: [
            'Friends',
            'Community',
            'Memories',
            'Celebrations',
        ],
        accent:
            '#f472b6',
    },

    {
        number: '06',
        eyebrow: 'PORTLAND',
        title: 'The City That Became Home.',
        description:
            'Portland became the place where I studied, worked, met people from around the world, explored the Pacific Northwest, and built a completely new chapter of my life.',
        image:
            campus01,
        imageAlt:
            'Portland State University campus',
        tags: [
            'Portland',
            'PSU',
            'Community',
            'New Chapter',
        ],
        accent:
            '#06b6d4',
    },

    {
        number: '07',
        eyebrow: 'FOOD',
        title: 'Try Something New.',
        description:
            'Exploring also means finding new food, different flavors, and places worth coming back to. Trying something unfamiliar is usually more interesting than ordering the same thing every time.',
        image:
            food01,
        imageAlt:
            'Several plates of food on a table',
        tags: [
            'Food',
            'New Flavors',
            'Exploring',
            'Experiences',
        ],
        accent:
            '#eab308',
    },
]


// =========================================================
// COMPONENT PROPS
// =========================================================
//
// App.tsx owns whether this experience is open or closed.
//
// isOpen:
//     true  -> show the cinematic carousel
//     false -> render nothing
//
// onClose:
//     tells App.tsx to close the experience
// =========================================================

type BeyondTerminalProps = {
    isOpen: boolean
    onClose: () => void
}


// =========================================================
// COMPONENT
// =========================================================

function BeyondTerminal(
    {
        isOpen,
        onClose,
    }:
        BeyondTerminalProps
) {

    // -----------------------------------------------------
    // ACTIVE STORY
    // -----------------------------------------------------

    const [
        activeIndex,
        setActiveIndex,
    ] =
        useState(0)


    // -----------------------------------------------------
    // TRANSITION STATE
    // -----------------------------------------------------
    //
    // Unlike the earlier version, we do NOT replace the
    // center card immediately.
    //
    // Instead:
    //
    // 1. current card stays mounted
    // 2. next/previous preview stays mounted
    // 3. CSS physically moves those cards between positions
    // 4. only after the animation finishes do we commit the
    //    new activeIndex
    //
    // This is what creates the real "card deck" effect.
    // -----------------------------------------------------

    const [
        direction,
        setDirection,
    ] =
        useState<1 | -1>(
            1
        )

    const [
        isAnimating,
        setIsAnimating,
    ] =
        useState(false)

    const [
        targetIndex,
        setTargetIndex,
    ] =
        useState<number | null>(
            null
        )


    // -----------------------------------------------------
    // DIALOG REFERENCE
    // -----------------------------------------------------

    const dialogRef =
        useRef<HTMLDivElement | null>(
            null
        )

    const transitionTimerRef =
        useRef<number | null>(
            null
        )


    // =====================================================
    // RESET WHEN OPENED
    // =====================================================

    useEffect(() => {

        if (!isOpen) {
            return
        }

        setActiveIndex(
            0
        )

        setDirection(
            1
        )

        setIsAnimating(
            false
        )

        setTargetIndex(
            null
        )

    }, [isOpen])


    // =====================================================
    // CLEAN UP TRANSITION TIMER
    // =====================================================

    useEffect(() => {

        return () => {

            if (
                transitionTimerRef.current !==
                null
            ) {

                window.clearTimeout(
                    transitionTimerRef.current
                )

            }

        }

    }, [])


    // =====================================================
    // BODY SCROLL LOCK
    // =====================================================

    useEffect(() => {

        if (!isOpen) {
            return
        }


        const previousOverflow =
            document.body.style.overflow


        document.body.style.overflow =
            'hidden'


        return () => {

            document.body.style.overflow =
                previousOverflow

        }

    }, [isOpen])


    // =====================================================
    // CARD-DECK TRANSITION ENGINE
    // =====================================================

    const startTransition =
        (
            nextIndex:
                number,
            nextDirection:
                1 | -1
        ) => {

            if (
                isAnimating ||
                nextIndex === activeIndex
            ) {
                return
            }


            setDirection(
                nextDirection
            )

            setTargetIndex(
                nextIndex
            )

            setIsAnimating(
                true
            )


            if (
                transitionTimerRef.current !==
                null
            ) {

                window.clearTimeout(
                    transitionTimerRef.current
                )

            }


            transitionTimerRef.current =
                window.setTimeout(
                    () => {

                        setActiveIndex(
                            nextIndex
                        )

                        setIsAnimating(
                            false
                        )

                        setTargetIndex(
                            null
                        )

                        transitionTimerRef.current =
                            null

                    },

                    620
                )

        }


    // =====================================================
    // CAROUSEL HELPERS
    // =====================================================

    const goNext =
        () => {

            const nextIndex =
                (
                    activeIndex + 1
                ) %
                stories.length

            startTransition(
                nextIndex,
                1
            )

        }


    const goPrevious =
        () => {

            const previousIndex =
                (
                    activeIndex - 1 +
                    stories.length
                ) %
                stories.length

            startTransition(
                previousIndex,
                -1
            )

        }


    const goToStory =
        (
            nextIndex:
                number
        ) => {

            if (
                nextIndex ===
                activeIndex
            ) {
                return
            }

            startTransition(
                nextIndex,
                nextIndex >
                    activeIndex
                    ? 1
                    : -1
            )

        }


    // =====================================================
    // KEYBOARD CONTROLS
    // =====================================================

    useEffect(() => {

        if (!isOpen) {
            return
        }


        const handleKeyDown =
            (
                event:
                    globalThis.KeyboardEvent
            ) => {

                if (
                    event.key === 'Escape'
                ) {

                    onClose()

                    return
                }


                if (
                    event.key === 'ArrowRight'
                ) {

                    goNext()

                    return
                }


                if (
                    event.key === 'ArrowLeft'
                ) {

                    goPrevious()

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

    }, [
        isOpen,
        activeIndex,
        isAnimating,
    ])


    // =====================================================
    // FOCUS DIALOG
    // =====================================================

    useEffect(() => {

        if (
            isOpen &&
            dialogRef.current
        ) {

            dialogRef.current.focus()

        }

    }, [isOpen])


    // =====================================================
    // CURRENT / SIDE STORIES
    // =====================================================

    const previousIndex =
        (
            activeIndex - 1 +
            stories.length
        ) %
        stories.length


    const nextIndex =
        (
            activeIndex + 1
        ) %
        stories.length


    const activeStory =
        stories[
        activeIndex
        ]


    const previousStory =
        stories[
        previousIndex
        ]


    const nextStory =
        stories[
        nextIndex
        ]


    // If the user clicked a non-adjacent pagination dot,
    // the moving side card should show that target story.
    const movingStory =
        targetIndex !== null
            ? stories[targetIndex]
            : direction === 1
                ? nextStory
                : previousStory


    // =====================================================
    // CLOSED
    // =====================================================

    if (!isOpen) {
        return null
    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <div
            className={`
                beyond-overlay
                ${isAnimating
                    ? `beyond-is-animating ${direction === 1
                        ? 'beyond-moving-forward'
                        : 'beyond-moving-backward'
                    }`
                    : ''
                }
            `}

            style={
                {
                    '--story-accent':
                        activeStory.accent,
                    '--incoming-accent':
                        movingStory.accent,
                } as CSSProperties
            }

            onMouseDown={
                (
                    event
                ) => {

                    if (
                        event.target ===
                        event.currentTarget
                    ) {

                        onClose()

                    }

                }
            }
        >


            {/* =================================================
                AMBIENT BACKGROUND
            ================================================= */}

            <div
                className="
                    beyond-ambient
                "
                aria-hidden="true"
            >
            </div>


            {/* =================================================
                BACKGROUND TITLE
            ================================================= */}

            <div
                className="
                    beyond-topbar
                "
            >

                <div>

                    <span
                        className="
                            beyond-kicker
                        "
                    >

                        LIFE OUTSIDE THE TERMINAL

                    </span>


                    <h2>

                        There’s More to Me
                        <span>
                            {' '}
                            Than Code.
                        </span>

                    </h2>

                </div>


                <button
                    type="button"

                    className="
                        beyond-close
                    "

                    aria-label="
                        Close Beyond the Terminal
                    "

                    onClick={() => {

                        onClose()

                    }}
                >

                    ×

                </button>

            </div>


            {/* =================================================
                CINEMATIC CARD-DECK STAGE
            ================================================= */}

            <div
                className="
                    beyond-stage
                "
            >


                {/* ---------------------------------------------
                    FAR LEFT / PREVIOUS PREVIEW
                --------------------------------------------- */}

                <button
                    type="button"

                    className="
                        beyond-side-card
                        beyond-side-left
                    "

                    onClick={(event) => {
                        event.stopPropagation()

                        startTransition(
                            previousIndex,
                            -1
                        )
                    }}

                    disabled={
                        isAnimating
                    }

                    aria-label={
                        `Previous story: ${previousStory.title}`
                    }
                >

                    <img
                        src={
                            previousStory.image
                        }

                        alt=""
                    />


                    <span>

                        {
                            previousStory.eyebrow
                        }

                    </span>

                </button>


                {/* ---------------------------------------------
                    CENTER / CURRENT CARD
                --------------------------------------------- */}

                <article
                    ref={
                        dialogRef
                    }

                    className={`
                        beyond-main-card
                        ${activeIndex % 2 === 1
                            ? 'beyond-layout-reverse'
                            : ''
                        }
                    `}

                    role="dialog"

                    aria-modal="true"

                    aria-labelledby="beyond-active-title"

                    tabIndex={0}

                    onClick={() => {
                        goNext()
                    }}

                    onKeyDown={(event) => {

                        if (
                            event.key === 'Enter' ||
                            event.key === ' '
                        ) {

                            event.preventDefault()
                            goNext()

                        }

                    }}

                    aria-label={`Open next story after ${activeStory.title}`}
                >


                    {/* =========================================
                        IMAGE SIDE
                    ========================================= */}

                    <div
                        className="
                            beyond-image-panel
                        "
                    >

                        <img
                            className="
                                beyond-main-image
                            "

                            src={
                                activeStory.image
                            }

                            alt={
                                activeStory.imageAlt
                            }
                        />


                        {
                            activeStory
                                .secondaryImages &&
                            activeStory
                                .secondaryImages
                                .length > 0 && (

                                <div
                                    className="
                                        beyond-secondary-images
                                    "
                                    aria-hidden="true"
                                >

                                    {
                                        activeStory
                                            .secondaryImages
                                            .map(
                                                (
                                                    image,
                                                    index
                                                ) => (

                                                    <img
                                                        key={
                                                            image.src
                                                        }

                                                        src={
                                                            image.src
                                                        }

                                                        alt=""

                                                        style={
                                                            {
                                                                '--secondary-index':
                                                                    index,
                                                            } as CSSProperties
                                                        }
                                                    />

                                                )
                                            )
                                    }

                                </div>

                            )
                        }


                        <span
                            className="
                                beyond-next-hint
                            "
                        >

                            CLICK TO CONTINUE →

                        </span>

                    </div>


                    {/* =========================================
                        STORY SIDE
                    ========================================= */}

                    <div
                        className="
                            beyond-story-panel
                        "
                    >

                        <span
                            className="
                                beyond-story-number
                            "
                        >

                            {
                                activeStory.number
                            }
                            {' / '}
                            {
                                activeStory.eyebrow
                            }

                        </span>


                        <h3
                            id="beyond-active-title"
                        >

                            {
                                activeStory.title
                            }

                        </h3>


                        <p>

                            {
                                activeStory.description
                            }

                        </p>


                        <div
                            className="
                                beyond-tags
                            "
                        >

                            {
                                activeStory
                                    .tags
                                    .map(
                                        (
                                            tag
                                        ) => (

                                            <span
                                                key={
                                                    tag
                                                }
                                            >

                                                {
                                                    tag
                                                }

                                            </span>

                                        )
                                    )
                            }

                        </div>


                        <div
                            className="
                                beyond-card-controls
                            "
                        >

                            <button
                                type="button"

                                onClick={(event) => {
                                    event.stopPropagation()
                                    goPrevious()
                                }}

                                disabled={
                                    isAnimating
                                }

                                aria-label="
                                    Previous story
                                "
                            >

                                ←

                            </button>


                            <span>

                                {
                                    String(
                                        activeIndex + 1
                                    )
                                        .padStart(
                                            2,
                                            '0'
                                        )
                                }

                                {' / '}

                                {
                                    String(
                                        stories.length
                                    )
                                        .padStart(
                                            2,
                                            '0'
                                        )
                                }

                            </span>


                            <button
                                type="button"

                                onClick={(event) => {
                                    event.stopPropagation()
                                    goNext()
                                }}

                                disabled={
                                    isAnimating
                                }

                                aria-label="
                                    Next story
                                "
                            >

                                →

                            </button>

                        </div>

                    </div>

                </article>


                {/* ---------------------------------------------
                    FAR RIGHT / NEXT PREVIEW
                --------------------------------------------- */}

                <button
                    type="button"

                    className="
                        beyond-side-card
                        beyond-side-right
                    "

                    onClick={(event) => {
                        event.stopPropagation()

                        startTransition(
                            nextIndex,
                            1
                        )
                    }}

                    disabled={
                        isAnimating
                    }

                    aria-label={
                        `Next story: ${nextStory.title}`
                    }
                >

                    <img
                        src={
                            nextStory.image
                        }

                        alt=""
                    />


                    <span>

                        {
                            nextStory.eyebrow
                        }

                    </span>

                </button>


                {/* ---------------------------------------------
                    MOVING CARD
                ---------------------------------------------

                    This is the "crazy" effect:
                    the incoming side card becomes a full card
                    and physically travels into the center.

                    It is only visible during transitions.
                */}

                {
                    isAnimating && (

                        <article
                            className={`
                                beyond-transition-card
                                ${direction === 1
                                    ? 'beyond-transition-from-right'
                                    : 'beyond-transition-from-left'
                                }
                                ${targetIndex !== null &&
                                    targetIndex % 2 === 1
                                    ? 'beyond-layout-reverse'
                                    : ''
                                }
                            `}

                            aria-hidden="true"
                        >

                            <div
                                className="
                                    beyond-transition-image
                                "
                            >

                                <img
                                    src={
                                        movingStory.image
                                    }

                                    alt=""
                                />

                            </div>


                            <div
                                className="
                                    beyond-transition-story
                                "
                            >

                                <span>

                                    {
                                        movingStory.number
                                    }
                                    {' / '}
                                    {
                                        movingStory.eyebrow
                                    }

                                </span>


                                <h3>

                                    {
                                        movingStory.title
                                    }

                                </h3>


                                <p>

                                    {
                                        movingStory.description
                                    }

                                </p>

                            </div>

                        </article>

                    )
                }


                {/* =============================================
                    LIGHT SWEEP
                ============================================= */}

                {
                    isAnimating && (

                        <div
                            className="
                                beyond-light-sweep
                            "
                            aria-hidden="true"
                        >
                        </div>

                    )
                }

            </div>


            {/* =================================================
                BOTTOM DOT NAVIGATION
            ================================================= */}

            <div
                className="
                    beyond-pagination
                "

                aria-label="
                    Beyond the Terminal stories
                "
            >

                {
                    stories.map(
                        (
                            story,
                            index
                        ) => (

                            <button
                                key={
                                    story.number
                                }

                                type="button"

                                className={
                                    index ===
                                        activeIndex

                                        ? 'beyond-dot beyond-dot-active'
                                        : 'beyond-dot'
                                }

                                disabled={
                                    isAnimating
                                }

                                aria-label={
                                    `Open story ${story.number}: ${story.eyebrow}`
                                }

                                onClick={() => {

                                    goToStory(
                                        index
                                    )

                                }}
                            >
                            </button>

                        )
                    )
                }

            </div>


            <p
                className="
                    beyond-keyboard-hint
                "
            >

                ← → navigate
                <span>
                    •
                </span>
                Esc to close

            </p>

        </div>

    )

}



export default BeyondTerminal