import {
    useEffect,
    useState,
} from 'react'

import './Navbar.css'


function Navbar() {

    // =========================================================
    // 1. MOBILE MENU STATE
    // =========================================================
    //
    // false = menu closed
    // true  = menu open
    //
    const [
        isMenuOpen,
        setIsMenuOpen,
    ] =
        useState(false)


    // =========================================================
    // 2. THEME STATE
    // =========================================================
    //
    // Stores:
    //
    // "dark"
    // or
    // "light"
    //
    const [
        theme,
        setTheme,
    ] =
        useState<
            'light' | 'dark'
        >(
            'dark'
        )


    // =========================================================
    // 3. SCROLL PERCENTAGE STATE
    // =========================================================
    //
    // Stores how far the visitor has travelled through the
    // page as a whole number from:
    //
    // 0   -> top of portfolio
    // 100 -> bottom of portfolio
    // =========================================================

    const [
        scrollPercent,
        setScrollPercent,
    ] =
        useState(0)


    // =========================================================
    // 4. LOAD SAVED / SYSTEM THEME
    // =========================================================

    useEffect(() => {

        const savedTheme =
            localStorage.getItem(
                'portfolio-theme'
            )


        if (
            savedTheme === 'light' ||
            savedTheme === 'dark'
        ) {

            setTheme(
                savedTheme
            )

            document.documentElement
                .setAttribute(
                    'data-theme',
                    savedTheme
                )

            return
        }


        const prefersDark =
            window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches


        const initialTheme =
            prefersDark
                ? 'dark'
                : 'light'


        setTheme(
            initialTheme
        )


        document.documentElement
            .setAttribute(
                'data-theme',
                initialTheme
            )

    }, [])


    // =========================================================
    // 5. TRACK PAGE SCROLL PERCENTAGE
    // =========================================================
    //
    // Formula:
    //
    // current scroll position
    // -----------------------  x 100
    // total scrollable height
    //
    // Example:
    //
    // halfway down the page -> approximately 50%
    // =========================================================

    useEffect(() => {

        const updateScrollPercent =
            () => {

                // How far the visitor has already scrolled.
                const scrollTop =
                    window.scrollY


                // Total page height minus the visible browser
                // height gives us the actual scrollable distance.
                const scrollableHeight =
                    document.documentElement.scrollHeight -
                    window.innerHeight


                // If the page is too short to scroll, show 0%.
                if (
                    scrollableHeight <= 0
                ) {

                    setScrollPercent(
                        0
                    )

                    return
                }


                // Convert scroll progress into a percentage.
                const percentage =
                    Math.round(
                        (
                            scrollTop /
                            scrollableHeight
                        ) *
                        100
                    )


                // Keep the value safely between 0 and 100.
                setScrollPercent(
                    Math.min(
                        100,
                        Math.max(
                            0,
                            percentage
                        )
                    )
                )

            }


        // Calculate once when Navbar first appears.
        updateScrollPercent()


        // Recalculate whenever the visitor scrolls.
        window.addEventListener(
            'scroll',
            updateScrollPercent,
            {
                passive: true,
            }
        )


        // Recalculate if the browser window changes size.
        window.addEventListener(
            'resize',
            updateScrollPercent
        )


        return () => {

            window.removeEventListener(
                'scroll',
                updateScrollPercent
            )

            window.removeEventListener(
                'resize',
                updateScrollPercent
            )

        }

    }, [])


    // =========================================================
    // 6. SWITCH LIGHT / DARK MODE
    // =========================================================

    const toggleTheme =
        () => {

            const newTheme =
                theme === 'dark'
                    ? 'light'
                    : 'dark'


            setTheme(
                newTheme
            )


            document.documentElement
                .setAttribute(
                    'data-theme',
                    newTheme
                )


            localStorage.setItem(
                'portfolio-theme',
                newTheme
            )

        }


    // =========================================================
    // 7. OPEN / CLOSE MOBILE MENU
    // =========================================================

    const toggleMenu =
        () => {

            setIsMenuOpen(
                (
                    current
                ) =>
                    !current
            )

        }


    // =========================================================
    // 8. CLOSE MOBILE MENU
    // =========================================================

    const closeMenu =
        () => {

            setIsMenuOpen(
                false
            )

        }


    // =========================================================
    // UI
    // =========================================================

    return (

        <header
            className="
                navbar
            "
        >

            <nav
                className="
                    navbar-inner
                "
            >

                {/* =================================================
                    NAVIGATION LINKS
                ================================================= */}

                <div
                    className={
                        isMenuOpen

                            ? 'navbar-links navbar-links-open'

                            : 'navbar-links'
                    }
                >


                    <a
                        href="#about"

                        onClick={() => {

                            closeMenu()

                            window.dispatchEvent(
                                new CustomEvent(
                                    'replay-about-animation'
                                )
                            )

                        }}
                    >
                        About
                    </a>


                    <a
                        href="#skill-universe"

                        onClick={() => {

                            closeMenu()

                            window.dispatchEvent(
                                new CustomEvent(
                                    'open-universe-tab',
                                    {
                                        detail:
                                            'skills',
                                    }
                                )
                            )

                        }}
                    >
                        Skills
                    </a>


                    <a
                        href="#experience"
                        onClick={
                            closeMenu
                        }
                    >
                        Experience
                    </a>


                    <a
                        href="#projects"
                        onClick={
                            closeMenu
                        }
                    >
                        Projects
                    </a>


                    <a
                        href="#skill-universe"

                        onClick={() => {

                            closeMenu()

                            window.dispatchEvent(
                                new CustomEvent(
                                    'open-universe-tab',
                                    {
                                        detail:
                                            'education',
                                    }
                                )
                            )

                        }}
                    >
                        Education
                    </a>


                    <a
                        href="#contact"
                        onClick={
                            closeMenu
                        }
                    >
                        Contact
                    </a>

                </div>


                {/* =================================================
                    RIGHT SIDE CONTROLS
                ================================================= */}

                <div
                    className="
                        navbar-actions
                    "
                >

                    {/* ---------------------------------------------
                        SCROLL PERCENTAGE

                        Kept inside the same navbar row so we do
                        not create a second progress-bar line.
                    --------------------------------------------- */}

                    <span
                        className="
                            navbar-scroll-percent
                        "

                        aria-label={
                            `${scrollPercent}% of page viewed`
                        }
                    >
                        Scroll {scrollPercent}%
                    </span>


                    {/* ---------------------------------------------
                        LIGHT / DARK MODE
                    --------------------------------------------- */}

                    <button
                        type="button"

                        className="
                            theme-toggle
                        "

                        onClick={
                            toggleTheme
                        }

                        aria-label="
                            Toggle light and dark mode
                        "
                    >
                        {
                            theme === 'dark'
                                ? '☀'
                                : '☾'
                        }
                    </button>


                    {/* ---------------------------------------------
                        MOBILE HAMBURGER
                    --------------------------------------------- */}

                    <button
                        type="button"

                        className={
                            isMenuOpen

                                ? 'menu-toggle menu-open'

                                : 'menu-toggle'
                        }

                        onClick={
                            toggleMenu
                        }

                        aria-label="
                            Open navigation menu
                        "

                        aria-expanded={
                            isMenuOpen
                        }
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                </div>

            </nav>

        </header>

    )

}


export default Navbar