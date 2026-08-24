// =========================================================
// IMPORTS
// =========================================================
//
// useEffect:
// Lets us run browser-side behavior after React renders.
//
// useRef:
// Lets us keep a reference to real HTML elements.
//
// App.css:
// Contains all styling and animations for this page.
//
import { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar/Navbar'
import About from './About/About'
import SkillUniverse from './SkillUniverse/SkillUniverse'
import Experience from './Experience/Experience'
import Projects from './Projects/Projects'
import BeyondTerminal from './BeyondTerminal/BeyondTerminal'
import Contact from './Contact/Contact'
import Footer from './Footer/Footer'
import './App.css'


function App() {

  // =========================================================
  // 1. HERO VISUAL REFERENCE
  // =========================================================
  //
  // This reference points to:
  //
  // <div className="hero-visual" ref={visualRef}>
  //
  // We use it for the mouse-parallax effect on the
  // Cloud / DevOps visualization.
  //
  const visualRef = useRef<HTMLDivElement | null>(null)


  // =========================================================
  // 2. CUSTOM CURSOR REFERENCES
  // =========================================================
  //
  // Our custom cursor has TWO parts:
  //
  // cursorDotRef
  //     Small cyan dot that follows the mouse immediately.
  //
  // cursorRingRef
  //     Larger circle that follows slightly behind the mouse.
  //
  // Together they create a smooth animated cursor.
  //
  const cursorDotRef = useRef<HTMLDivElement | null>(null)
  const cursorRingRef = useRef<HTMLDivElement | null>(null)



  // =========================================================
  // BEYOND THE TERMINAL — OPEN / CLOSED STATE
  // =========================================================
  //
  // App owns this state so About and BeyondTerminal can
  // communicate directly through React props.
  //
  // false -> popup is closed
  // true  -> popup is open
  // =========================================================

  const [
    beyondTerminalOpen,
    setBeyondTerminalOpen,
  ] = useState(false)



  // =========================================================
  // ALWAYS START AT THE HOME / HERO SECTION
  // =========================================================
  //
  // Browsers sometimes remember the previous scroll position
  // after a refresh. For this one-page portfolio, we want a
  // fresh reload to always begin at the Hero section.
  //
  // scrollRestoration = 'manual'
  //     prevents the browser from automatically restoring
  //     the old scroll position.
  //
  // window.scrollTo(...)
  //     immediately moves the page to the very top.
  // =========================================================

  useEffect(() => {

    if (
      'scrollRestoration' in window.history
    ) {

      window.history.scrollRestoration =
        'manual'

    }


    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })


    return () => {

      if (
        'scrollRestoration' in window.history
      ) {

        window.history.scrollRestoration =
          'auto'

      }

    }

  }, [])



  // =========================================================
  // 3. MOUSE PARALLAX EFFECT
  // =========================================================
  //
  // PURPOSE:
  //
  // Makes the Cloud / DevOps system react slightly when
  // the visitor moves their mouse.
  //
  // This creates an illusion of depth.
  //
  // Example:
  //
  // Move mouse →
  //
  // Background grid       moves slightly
  // Network               moves slightly more
  // Cloud                 moves differently
  //
  // CSS receives two values:
  //
  // --mouse-x
  // --mouse-y
  //
  // Both are approximately between -1 and +1.
  //
  useEffect(() => {

    // Get the hero visual HTML element.
    const visual = visualRef.current


    // Safety check:
    // If React cannot find the visual element,
    // stop running this effect.
    if (!visual) return


    // ---------------------------------------------------------
    // Runs every time the mouse moves.
    // ---------------------------------------------------------
    const handleMouseMove = (event: MouseEvent) => {

      // Convert horizontal mouse location:
      //
      // far left  ≈ -1
      // center    ≈  0
      // far right ≈ +1
      //
      const x =
        (event.clientX / window.innerWidth - 0.5) * 2


      // Convert vertical mouse location:
      //
      // top       ≈ -1
      // center    ≈  0
      // bottom    ≈ +1
      //
      const y =
        (event.clientY / window.innerHeight - 0.5) * 2


      // Send the values to App.css.
      //
      // CSS can now use:
      //
      // var(--mouse-x)
      // var(--mouse-y)
      //
      visual.style.setProperty('--mouse-x', `${x}`)
      visual.style.setProperty('--mouse-y', `${y}`)
    }


    // Listen for mouse movement anywhere in the browser.
    window.addEventListener(
      'mousemove',
      handleMouseMove
    )


    // ---------------------------------------------------------
    // CLEANUP
    // ---------------------------------------------------------
    //
    // If React ever removes this component,
    // remove the event listener too.
    //
    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      )
    }

  }, [])



  // =========================================================
  // 4. CUSTOM ANIMATED CURSOR
  // =========================================================
  //
  // Our cursor has TWO positions:
  //
  // mouseX / mouseY
  //     Actual mouse location.
  //
  // ringX / ringY
  //     Current trailing-ring location.
  //
  // The small dot goes directly to the mouse.
  //
  // The larger ring slowly catches up.
  //
  // This creates the smooth trailing animation.
  //
  useEffect(() => {

    // Get the two cursor HTML elements.
    const dot = cursorDotRef.current
    const ring = cursorRingRef.current


    // Stop if either cursor element doesn't exist.
    if (!dot || !ring) return


    // ---------------------------------------------------------
    // REAL MOUSE POSITION
    // ---------------------------------------------------------

    let mouseX = 0
    let mouseY = 0


    // ---------------------------------------------------------
    // TRAILING RING POSITION
    // ---------------------------------------------------------

    let ringX = 0
    let ringY = 0


    // Stores the browser animation-frame ID.
    //
    // We need this so we can stop the animation
    // during cleanup.
    //
    let animationFrameId: number



    // =========================================================
    // TRACK THE MOUSE
    // =========================================================

    const handleMouseMove = (event: MouseEvent) => {

      // Save the current real mouse position.
      mouseX = event.clientX
      mouseY = event.clientY


      // Move the small cyan dot immediately.
      //
      // translate3d() is generally efficient for animation
      // because browsers can optimize transforms well.
      //
      dot.style.transform =
        `translate3d(${mouseX}px, ${mouseY}px, 0)`
    }



    // =========================================================
    // ANIMATE THE TRAILING RING
    // =========================================================
    //
    // IMPORTANT:
    //
    // The ring doesn't instantly jump to the mouse.
    //
    // Instead:
    //
    // ringX += (mouseX - ringX) * 0.16
    //
    // means:
    //
    // "Move 16% of the remaining distance toward
    //  the mouse during every animation frame."
    //
    // Smaller value:
    //     slower / smoother
    //
    // Bigger value:
    //     faster / tighter
    //
    const animateRing = () => {

      ringX +=
        (mouseX - ringX) * 0.16

      ringY +=
        (mouseY - ringY) * 0.16


      // Move the outer ring.
      ring.style.transform =
        `translate3d(${ringX}px, ${ringY}px, 0)`


      // Ask the browser to run this function again
      // on the next display frame.
      animationFrameId =
        requestAnimationFrame(animateRing)
    }



    // Start listening for mouse movement.
    window.addEventListener(
      'mousemove',
      handleMouseMove
    )


    // Start the trailing cursor animation.
    animateRing()



    // =========================================================
    // CLEANUP
    // =========================================================

    return () => {

      // Stop listening for mouse movement.
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      )

      // Stop the animation loop.
      cancelAnimationFrame(animationFrameId)
    }

  }, [])



  // =========================================================
  // 5. PAGE UI / JSX
  // =========================================================
  //
  // Everything below describes what React displays
  // in the browser.
  //
  return (

    // =========================================================
    // REACT FRAGMENT
    // =========================================================
    //
    // <>
    // </>
    //
    // lets us return multiple top-level elements:
    //
    // Cursor Ring
    // Cursor Dot
    // Main Portfolio
    //
    // without adding an unnecessary wrapper <div>.
    //
    <>

      {/* =====================================================
        NAVBAR
        =====================================================

        This is our reusable Navbar component.

        It stays fixed at the top of the page.
    */}
      <Navbar />

      {/* =====================================================
          CUSTOM CURSOR
          =====================================================

          cursor-ring:
          Larger circle that smoothly trails the mouse.

          cursor-dot:
          Small cyan dot at the real mouse position.

          aria-hidden="true":
          Tells screen readers these are decorative only.
      */}

      <div
        ref={cursorRingRef}
        className="cursor-ring"
        aria-hidden="true"
      ></div>


      <div
        ref={cursorDotRef}
        className="cursor-dot"
        aria-hidden="true"
      ></div>



      {/* =====================================================
          HERO / HOME PAGE
          ===================================================== */}

      <main
        id="home"
        className="hero"
      >


        {/* ===================================================
            BACKGROUND ATMOSPHERE
            ===================================================

            These elements don't contain content.

            App.css turns them into:
            - moving glow
            - fog
            - atmospheric particles
        */}

        <div className="background-effects">


          {/* Large animated blue/cyan glow areas */}

          <div className="glow glow-one"></div>

          <div className="glow glow-two"></div>



          {/* Slowly drifting fog */}

          <div className="fog fog-one"></div>

          <div className="fog fog-two"></div>



          {/* Small floating particles */}

          <div className="particle particle-one"></div>

          <div className="particle particle-two"></div>

          <div className="particle particle-three"></div>

          <div className="particle particle-four"></div>

          <div className="particle particle-five"></div>


        </div>



        {/* ===================================================
            LEFT SIDE — PERSONAL INTRODUCTION
            ===================================================

            Contains:

            $ whoami

            LOKESH
            REPAKA

            Role

            Tagline

            Resume / LinkedIn / GitHub
        */}

        <div className="hero-content">


          {/* -----------------------------------------------
              TERMINAL-STYLE INTRO
          */}

          <p className="intro">
            $ whoami
          </p>



          {/* -----------------------------------------------
              MAIN NAME
          */}

          <h1>
            LOKESH
            <br />
            REPAKA
          </h1>



          {/* -----------------------------------------------
              CAREER TITLE
          */}

          <h2>
            Aspiring Cloud & DevOps Engineer
          </h2>



          {/* -----------------------------------------------
              PERSONAL TAGLINE
          */}

          <p className="tagline">
            I don't just write code.
            <br />
            I build the systems that run it.
          </p>



          {/* =================================================
              PROFESSIONAL LINKS

              CURRENTLY:
              href="#"

              Later we will replace these with:

              Resume:
              actual PDF path

              LinkedIn:
              actual LinkedIn URL

              GitHub:
              actual GitHub profile URL
          */}

          {/* =========================================================
    HERO LINKS
========================================================= */}

          <div className="hero-links">

            {/* -----------------------------------------------------
        RESUME

        Your resume PDF should be placed in:

        public/Lokesh_Repaka_Resume.pdf

        target="_blank"
        opens the PDF in a new browser tab.
    ----------------------------------------------------- */}

            <a
              href="/Lokesh_Repaka_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-link"
            >
              Resume
            </a>


            {/* -----------------------------------------------------
        LINKEDIN

        Opens your LinkedIn profile in a new tab.
    ----------------------------------------------------- */}

            <a
              href="https://www.linkedin.com/in/lokesh-repaka"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>


            {/* -----------------------------------------------------
        GITHUB

        Opens your GitHub profile in a new tab.
    ----------------------------------------------------- */}

            <a
              href="https://github.com/lokeshrepaaka"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>

          </div>

        </div>



        {/* ===================================================
            RIGHT SIDE — CLOUD / DEVOPS VISUALIZATION
            ===================================================

            IMPORTANT:

            ref={visualRef}

            connects this HTML element to the
            mouse-parallax JavaScript above.
        */}

        <div
          className="hero-visual"
          ref={visualRef}
        >


          {/* =================================================
              TOPOLOGY GRID
              =================================================

              Creates the subtle infrastructure/grid pattern
              behind the Cloud system.
          */}

          <div className="topology-grid"></div>



          {/* =================================================
              CLOUD GLOW
              =================================================

              Soft light behind the central cloud.
          */}

          <div className="cloud-glow"></div>



          {/* =================================================
              ORBITAL RINGS
              =================================================

              Two independently rotating rings.

              Their animations are controlled from App.css.
          */}

          <div className="orbit orbit-one"></div>

          <div className="orbit orbit-two"></div>



          {/* =================================================
              SVG INFRASTRUCTURE CONNECTION MAP
              =================================================

              SVG = Scalable Vector Graphics.

              We use SVG because it lets us create:
              - curved paths
              - animated packets
              - scalable graphics

              viewBox:

              0 0 600 560

              creates an invisible coordinate system:

              X = 0 → 600
              Y = 0 → 560
          */}

          <svg
            className="connection-map"
            viewBox="0 0 600 560"
            aria-hidden="true"
          >


            {/* ===============================================
                INFRASTRUCTURE CONNECTION PATHS
                ===============================================

                Every technology node connects toward the
                central Cloud at approximately:

                X = 300
                Y = 280
            */}



            {/* -----------------------------------------------
                Docker → Cloud
            */}

            <path
              id="docker-path"
              className="connection-line"
              d="M120 125 C190 145, 220 220, 300 280"
            />



            {/* -----------------------------------------------
                AWS → Cloud
            */}

            <path
              id="aws-path"
              className="connection-line"
              d="M500 100 C430 150, 390 220, 300 280"
            />



            {/* -----------------------------------------------
                Kubernetes → Cloud

                Kubernetes was moved farther left so that
                its card does NOT overlap the cloud.

                Therefore this path also begins farther left.
            */}

            <path
              id="kubernetes-path"
              className="connection-line"
              d="M55 280 C140 240, 220 250, 300 280"
            />



            {/* -----------------------------------------------
                Git → Cloud
            */}

            <path
              id="git-path"
              className="connection-line"
              d="M525 265 C450 240, 380 250, 300 280"
            />



            {/* -----------------------------------------------
                Linux → Cloud
            */}

            <path
              id="linux-path"
              className="connection-line"
              d="M130 465 C180 400, 230 335, 300 280"
            />



            {/* -----------------------------------------------
                CI/CD → Cloud
            */}

            <path
              id="cicd-path"
              className="connection-line"
              d="M490 440 C430 390, 380 330, 300 280"
            />



            {/* =================================================
                ANIMATED DATA / DEPLOYMENT PACKETS
                =================================================

                Each <circle> moves along one of the paths.

                Example:

                Docker
                    ● ───── ✦ ───→ ☁

                Different durations make the traffic look
                less mechanical.
            */}



            {/* Docker packet */}

            <circle
              className="data-pulse"
              r="4"
            >
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
              >
                <mpath href="#docker-path" />
              </animateMotion>
            </circle>



            {/* AWS packet */}

            <circle
              className="data-pulse pulse-two"
              r="4"
            >
              <animateMotion
                dur="4s"
                begin="0.7s"
                repeatCount="indefinite"
              >
                <mpath href="#aws-path" />
              </animateMotion>
            </circle>



            {/* Kubernetes packet */}

            <circle
              className="data-pulse pulse-three"
              r="4"
            >
              <animateMotion
                dur="3.4s"
                begin="1.3s"
                repeatCount="indefinite"
              >
                <mpath href="#kubernetes-path" />
              </animateMotion>
            </circle>



            {/* Git packet */}

            <circle
              className="data-pulse"
              r="4"
            >
              <animateMotion
                dur="4.4s"
                begin="2s"
                repeatCount="indefinite"
              >
                <mpath href="#git-path" />
              </animateMotion>
            </circle>



            {/* Linux packet */}

            <circle
              className="data-pulse pulse-two"
              r="4"
            >
              <animateMotion
                dur="5s"
                begin="1s"
                repeatCount="indefinite"
              >
                <mpath href="#linux-path" />
              </animateMotion>
            </circle>



            {/* CI/CD packet */}

            <circle
              className="data-pulse pulse-three"
              r="4"
            >
              <animateMotion
                dur="3.8s"
                begin="2.5s"
                repeatCount="indefinite"
              >
                <mpath href="#cicd-path" />
              </animateMotion>
            </circle>


          </svg>



          {/* =================================================
              CENTRAL CLOUD
              =================================================

              This is intentionally ONLY the cloud.

              We removed:

              "6 SERVICES ONLINE"

              because we wanted the Cloud itself to remain
              visually centered in the infrastructure system.
          */}

          <div className="cloud-system">

            <div className="cloud-core">

              <span className="cloud-symbol">
                ☁
              </span>

            </div>

          </div>



          {/* =================================================
              TECHNOLOGY / DEVOPS NODES
              =================================================

              Positioning is controlled in App.css.

              Look for:

              .aws
              .docker
              .kubernetes
              .linux
              .cicd
              .git

              If we want to move a specific card later,
              those are the CSS classes to edit.
          */}



          {/* -----------------------------------------------
              AWS
          */}

          <div className="node aws">

            <span className="node-dot"></span>

            <span>
              AWS
            </span>

          </div>



          {/* -----------------------------------------------
              Docker
          */}

          <div className="node docker">

            <span className="node-dot"></span>

            <span>
              Docker
            </span>

          </div>



          {/* -----------------------------------------------
              Kubernetes
          */}

          <div className="node kubernetes">

            <span className="node-dot"></span>

            <span>
              Kubernetes
            </span>

          </div>



          {/* -----------------------------------------------
              Linux
          */}

          <div className="node linux">

            <span className="node-dot"></span>

            <span>
              Linux
            </span>

          </div>



          {/* -----------------------------------------------
              CI/CD
          */}

          <div className="node cicd">

            <span className="node-dot"></span>

            <span>
              CI/CD
            </span>

          </div>



          {/* -----------------------------------------------
              Git
          */}

          <div className="node git">

            <span className="node-dot"></span>

            <span>
              Git
            </span>

          </div>


        </div>

      </main>
      <About
        onOpenBeyondTerminal={() => {
          setBeyondTerminalOpen(true)
        }}
      />

      <BeyondTerminal
        isOpen={beyondTerminalOpen}
        onClose={() => {
          setBeyondTerminalOpen(false)
        }}
      />

      <SkillUniverse />

      <Experience />

      <Projects />

      <Contact />

      <Footer />

    </>
  )
}


export default App