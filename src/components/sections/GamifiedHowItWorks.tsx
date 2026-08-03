'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
} from 'framer-motion'

/* ─── World (track) config ──────────────────────────────────────────────────
 *
 * The ball travels from BALL_X to FLAG_X in world units.
 * TOTAL_SHIFT = 1261.5 - 200 = 1061.5 world-px
 *
 * Single source of truth: 1 scroll-px = 1 world-px of track shift.
 * → STEP_DURATION = TOTAL_SHIFT / STEPS_COUNT ≈ 354 scroll-px
 * → At the end of step N the ball has traveled exactly N/3 of the track.
 */
const WORLD_W = 1200
const WORLD_H = 949
const BALL_R = 30       // ball radius in world-px
const BALL_X = 200      // ball fixed x in world coords
const FLAG_X = 1371   // green flag pole x
const TOTAL_SHIFT = FLAG_X - BALL_X   // 1061.5 world-px

const STEPS_COUNT = 3
const INITIAL_OFFSET = 150                                           // scroll-px before step 1
const STEP_DURATION = Math.round(TOTAL_SHIFT / STEPS_COUNT)        // ≈354 scroll-px/step
const TOTAL_SCROLL = INITIAL_OFFSET + STEPS_COUNT * STEP_DURATION // total sticky scroll budget

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)

/* ─── Front-layer contour for ball y-sampling ───────────────────────────────
 *
 * The ball sits on the FRONT (darker, #E4E4E4) layer.
 * Its top edge starts at y=182.136, matching the path:
 *   M345 182.136 C266 186.636 29 182.136 ...
 *
 * Extended flat on both sides so sliding never exposes a gap.
 */
const TOP_EDGE_D =
    'M-1300 182.136 L29 182.136 ' +
    'C29 182.136 266 186.636 345 182.136 ' +
    'C442.284 157.849 477.546 59.3741 577 72.1359 ' +
    'C732.614 92.1039 590.628 423.399 747 436.136 ' +
    'C879.225 446.906 879.5 284.136 997 206.136 ' +
    'C1078.29 152.174 1136.12 135.678 1233 124.136 ' +
    'C1286.51 117.761 1371 124.136 1371 124.136 ' +
    'L2629 124.136'

/* ─── Step data ─────────────────────────────────────────────────────────────*/
interface Step { id: number; title: string; content: string }

const steps: Step[] = [
    { id: 0, title: 'Immersion & Diagnostic', content: 'Analyse approfondie de vos enjeux et modélisation de vos besoins fonctionnels.' },
    { id: 1, title: 'Conception & Prototypage', content: 'Analyse approfondie de vos enjeux et modélisation de vos besoins fonctionnels.' },
    { id: 2, title: 'Déploiement & Suivi', content: 'Analyse approfondie de vos enjeux et modélisation de vos besoins fonctionnels.' },
]

/* ─── SVG atoms ─────────────────────────────────────────────────────────────*/
const WheelSVG = () => (
    <svg width="66" height="64" viewBox="0 0 66 64" fill="none">
        <circle cx="30" cy="30" r="30" fill="#FFD969" />
        <circle cx="36" cy="34" r="30" fill="#FFC107" />
    </svg>
)

const ShadowSVG = () => (
    <svg width="82" height="59" viewBox="0 0 82 59" fill="none">
        <ellipse cx="21.1388" cy="45.5" rx="21.1388" ry="45.5"
            transform="matrix(0.502718 -0.86445 -0.86445 -0.502718 69.4585 70.425)"
            fill="black" fillOpacity="0.1" />
    </svg>
)

/* Track SVG — viewBox widened with flat fill extensions so no gap on slide */
const TrackSVGBack = () => (
    <svg
        className="absolute top-0 left-0"
        width="2300" height="949"
        viewBox="0 0 2300 949"
        fill="none"
    >
        {/* back-layer left/right extensions */}
        <path d="M1300 108 H2280 L2300 124.136 V933 H1300 Z" fill="#F5F5F5" />

        {/* original back layer */}
        <path d="M316 167C237 171.5 0 167 0 167V933H1342L1370.5 124L1342 109C1342 109 1257.51 102.625 1204 109C1107.12 120.542 1049.29 137.039 968 191C850.5 269 850.225 431.77 718 421C561.628 408.263 703.614 76.9681 548 57.0001C448.546 44.2383 413.284 142.714 316 167Z" fill="#F5F5F5" />

        {/* post shadows */}
        <path d="M115.409 230.139L17.7289 173.328C16.8644 172.825 16.5627 171.355 17.2569 170.161C17.951 168.968 19.3782 168.503 20.2426 169.006L117.923 225.817C118.788 226.32 118.657 227.539 117.963 228.732C117.269 229.926 116.274 230.642 115.409 230.139Z" fill="black" fillOpacity="0.07" />
        <path d="M1357.41 174.139L1259.73 117.328C1258.86 116.825 1258.56 115.355 1259.26 114.161C1259.95 112.968 1261.38 112.503 1262.24 113.006L1359.92 169.817C1360.79 170.32 1360.66 171.539 1359.96 172.732C1359.27 173.926 1358.27 174.642 1357.41 174.139Z" fill="black" fillOpacity="0.07" />

        {/* flags */}
        <path d="M85.5 83.5C84.3 83.1 40.6667 66 19 57.5V104C41.6667 97.3333 86.7 83.9 85.5 83.5Z" fill="#4F679E" />
        <path d="M16.5 172V59C16.5 58 17.6193 57 19 57C20.3807 57 21.5 58 21.5 59V172C21.5 173 20.3807 173.5 19 173.5C17.6193 173.5 16.5 173 16.5 172Z" fill="url(#paint0_linear_0_1)" />
        <path d="M1328 26.5C1326.8 26.1 1283.17 9 1261.5 0.5V47C1284.17 40.3333 1329.2 26.9 1328 26.5Z" fill="#4CAF50" />
        <path d="M1259 115V2C1259 1 1260.12 0 1261.5 0C1262.88 0 1264 1 1264 2V115C1264 116 1262.88 116.5 1261.5 116.5C1260.12 116.5 1259 116 1259 115Z" fill="url(#paint1_linear_0_1)" />

        <defs>
            <linearGradient id="paint0_linear_0_1" x1="14" y1="128" x2="25" y2="128" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E4E4E4" /><stop offset="1" stopColor="#F5F5F5" />
            </linearGradient>
            <linearGradient id="paint1_linear_0_1" x1="1256.5" y1="71" x2="1267.5" y2="71" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E4E4E4" /><stop offset="1" stopColor="#F5F5F5" />
            </linearGradient>
        </defs>
    </svg>
)

const TrackSVGFront = () => (
    <svg
        className="absolute top-0 left-0"
        width="2300" height="949"
        viewBox="0 0 2300 949"
        fill="none"
    >

        {/* front-layer left/right extensions */}
        <path d="M1371 124.136 H2629 V948.136 H1371 Z" fill="#E4E4E4" />

        {/* original front layer */}
        <path d="M345 182.136C266 186.636 29 182.136 29 182.136V948.136H1371V124.136C1371 124.136 1286.51 117.761 1233 124.136C1136.12 135.678 1078.29 152.174 997 206.136C879.5 284.136 879.225 446.906 747 436.136C590.628 423.399 732.614 92.1039 577 72.1359C477.546 59.3741 442.284 157.849 345 182.136Z" fill="#E4E4E4" />

        <defs>
            <linearGradient id="paint0_linear_0_1" x1="14" y1="128" x2="25" y2="128" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E4E4E4" /><stop offset="1" stopColor="#F5F5F5" />
            </linearGradient>
            <linearGradient id="paint1_linear_0_1" x1="1256.5" y1="71" x2="1267.5" y2="71" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E4E4E4" /><stop offset="1" stopColor="#F5F5F5" />
            </linearGradient>
        </defs>
    </svg>
)

const FogSVG = () => (
    <svg width="1292" height="588" viewBox="0 0 1292 588" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_0_1)">
            <path d="M164 246L18 100V862H1452V122L1294 306L1096 592H370L164 246Z" fill="white" />
        </g>
        <g filter="url(#filter1_f_0_1)">
            <path
                d="M950.204 246.477C1140.69 222.037 1398.48 386.478 1398.48 386.478L1836 862.477L-1065.48 1203L-1110 362.478C-1110 362.478 -922.709 280.477 -784.543 306.477C-646.377 332.477 -644.675 508.645 -480.578 592.478C-138.092 767.444 379.119 710.478 633.958 592.478C888.797 474.478 713.339 276.87 950.204 246.477Z"
                fill="white"
                fillOpacity="0.8"
            />
        </g>
        <defs>
            <filter
                id="filter0_f_0_1"
                x="-82"
                y="0"
                width="1634"
                height="962"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_0_1" />
            </filter>
            <filter
                id="filter1_f_0_1"
                x="-1210"
                y="144"
                width="3146"
                height="1159"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_0_1" />
            </filter>
        </defs>
    </svg>
)

/* ─── Step text item ────────────────────────────────────────────────────────
 *
 * Each step fades in at the start of its scroll window and fades out at the end.
 * Windows are derived from the same INITIAL_OFFSET / STEP_DURATION constants
 * that drive the track — guaranteed lockstep.
 */
function StepItem({ step, index, scrollYProgress }: {
    step: Step
    index: number
    scrollYProgress: MotionValue<number>
}) {
    const seg = STEP_DURATION / TOTAL_SCROLL
    const start = (INITIAL_OFFSET + index * STEP_DURATION) / TOTAL_SCROLL
    const fadeInEnd = start + seg * 0.2
    const fadeOutStart = start + seg * 0.8
    const end = start + seg

    const opacity = useTransform(scrollYProgress, [start, fadeInEnd, fadeOutStart, end], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [start, fadeInEnd], [40, 0])

    return (
        <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-row items-start justify-start gap-6">
            <h1 className="text-[168px] leading-[130px]">{index + 1}</h1>
            <div className="w-[400px]">
                <h2 className="text-4xl">{step.title}</h2>
                <p className="text-xl">{step.content}</p>
            </div>
        </motion.div>
    )
}

/* ─── Main component ────────────────────────────────────────────────────────*/
export default function GamifiedHowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null)
    const stageRef = useRef<HTMLDivElement>(null)
    const sampleRef = useRef<SVGPathElement>(null)
    const pointsRef = useRef<{ x: number; y: number }[]>([])

    const [scale, setScale] = useState(1)
    const [worldTop, setWorldTop] = useState(0)

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

    // Spring smoothing — inertia while scrolling, crisp stop at end
    const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.5 })

    // Track shift: [0..1] scroll → [0..TOTAL_SHIFT] world-px, then negate for translateX
    const shift = useTransform(smooth, [0, 1], [0, TOTAL_SHIFT])
    const trackX = useTransform(shift, (s) => -clamp(s, 0, TOTAL_SHIFT))

    // Ball vertical position (world-px from world top) and wheel rotation
    const ballY = useMotionValue(182.136 - BALL_R - 32) // initial: flat section

    /* ── Sample the front-layer contour once on mount ─────────────────────
     * sampleRef traces TOP_EDGE_D (front layer top edge, y starts at 182.136).
     * We build a sorted LUT of 600 pts for O(log n) interpolation.
     */
    useEffect(() => {
        const p = sampleRef.current
        if (!p) return
        const len = p.getTotalLength()
        const N = 600
        const pts: { x: number; y: number }[] = []
        for (let i = 0; i <= N; i++) pts.push(p.getPointAtLength((i / N) * len))
        pointsRef.current = pts
        placeBall(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Binary-search LUT for fast contour interpolation
    const topEdge = (x: number): number => {
        const pts = pointsRef.current
        if (!pts.length) return 182.136
        if (x <= pts[0].x) return pts[0].y
        if (x >= pts[pts.length - 1].x) return pts[pts.length - 1].y
        let lo = 0, hi = pts.length - 1
        while (hi - lo > 1) {
            const mid = (lo + hi) >> 1
            pts[mid].x <= x ? (lo = mid) : (hi = mid)
        }
        const a = pts[lo], b = pts[hi]
        const t = (x - a.x) / (b.x - a.x || 1)
        return a.y + (b.y - a.y) * t
    }

    const placeBall = (s: number) => {
        const ground = topEdge(BALL_X + s)      // y of front-layer surface at ball's world-x
        // wrapper div top = ball center y - half SVG height
        // ball center y   = ground - BALL_R      (resting exactly on surface)
        ballY.set(ground - BALL_R - 6)
    }

    useMotionValueEvent(shift, 'change', (s) => placeBall(clamp(s, 0, TOTAL_SHIFT)))

    /* ── Responsive scaling ────────────────────────────────────────────────
     *
     * Scale the world so its width fills the stage.
     * worldTop: offset so the flat section (y=182) sits 30% from stage top,
     * leaving the hills and valleys in the lower 70%.
     */
    useEffect(() => {
        const el = stageRef.current
        if (!el) return
        const update = () => {
            const s = el.clientWidth / WORLD_W
            setScale(s)
            setWorldTop(el.clientHeight * 0.45 - 60 * s)
        }
        update()
        const ro = new ResizeObserver(update)
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    return (
        <section
            ref={containerRef}
            style={{ height: `calc(100vh + ${TOTAL_SCROLL}px)` }}
            className="relative w-full bg-white text-black"
        >

            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start p-8 px-40 md:pt-40 gap-12 overflow-hidden">
                <h1 className="text-3xl font-medium">GemmaS : Notre workflow</h1>
                <div ref={stageRef} className="relative w-full h-[50vh]">
                    {/* Step text overlay */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        {steps.map((step, index) => (
                            <StepItem
                                key={step.id}
                                step={step}
                                index={index}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>

                    {/* World coordinate system (scaled to stage width) */}
                    <div
                        className="absolute left-0"
                        style={{
                            top: worldTop,
                            width: WORLD_W,
                            height: WORLD_H,
                            transform: `scale(${scale})`,
                            transformOrigin: 'top left',
                        }}
                    >
                        {/* Hidden SVG used only to sample the front-layer contour */}
                        <svg width="0" height="0" className="absolute overflow-visible">
                            <path ref={sampleRef} d={TOP_EDGE_D} fill="none" stroke="none" />
                        </svg>

                        {/* Back Track slides left as scroll progresses */}
                        <motion.div className="absolute top-0 left-0 will-change-transform" style={{ x: trackX }}>
                            <TrackSVGBack />
                        </motion.div>

                        {/* Ball: fixed x in world, y follows terrain, wheel rotates with distance */}
                        <motion.div
                            className="absolute top-0 will-change-transform"
                            style={{ left: BALL_X - 33, y: ballY }}
                        >
                            <div className="absolute left-[2px] top-[31px]">
                                <ShadowSVG />
                            </div>
                            <div
                                className="absolute left-0 top-[-32px]"
                                style={{ transformOrigin: '33px 32px' }}
                            >
                                <WheelSVG />
                            </div>
                        </motion.div>
                        {/* Front Track slides left as scroll progresses */}
                        <motion.div className="absolute top-0 left-0 will-change-transform" style={{ x: trackX }}>
                            <TrackSVGFront />
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    )
}