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
import { steps, type Step } from '@/data/gamifiedHowItWorks'
import { useLang } from '@/contexts/LanguageContext'

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
// La balle s'arrête au pied du drapeau d'arrivée (mât dessiné à x = 1261,5),
// son bord juste avant le mât. 1371 la faisait passer au-delà du drapeau.
const FLAG_X = 1222
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

/* Track SVG · viewBox widened with flat fill extensions so no gap on slide */
const TrackSVGBack = () => (
    <svg
        className="absolute top-0 left-0"
        width="4200" height="949"
        viewBox="0 0 4200 949"
        fill="none"
    >
        {/* back-layer left/right extensions */}
        <path d="M1300 108 H4200 V933 H1300 Z" fill="var(--piste-arriere)" />

        {/* original back layer */}
        <path d="M316 167C237 171.5 0 167 0 167V933H1342L1370.5 124L1342 109C1342 109 1257.51 102.625 1204 109C1107.12 120.542 1049.29 137.039 968 191C850.5 269 850.225 431.77 718 421C561.628 408.263 703.614 76.9681 548 57.0001C448.546 44.2383 413.284 142.714 316 167Z" fill="var(--piste-arriere)" />

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
                <stop stopColor="var(--mat-a)" /><stop offset="1" stopColor="var(--mat-b)" />
            </linearGradient>
            <linearGradient id="paint1_linear_0_1" x1="1256.5" y1="71" x2="1267.5" y2="71" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--mat-a)" /><stop offset="1" stopColor="var(--mat-b)" />
            </linearGradient>
        </defs>
    </svg>
)

const TrackSVGFront = () => (
    <svg
        className="absolute top-0 left-0"
        width="4200" height="949"
        viewBox="0 0 4200 949"
        fill="none"
    >

        {/* front-layer left/right extensions */}
        <path d="M1371 124.136 H4200 V948.136 H1371 Z" fill="var(--piste-avant)" />

        {/* original front layer */}
        <path d="M345 182.136C266 186.636 29 182.136 29 182.136V948.136H1371V124.136C1371 124.136 1286.51 117.761 1233 124.136C1136.12 135.678 1078.29 152.174 997 206.136C879.5 284.136 879.225 446.906 747 436.136C590.628 423.399 732.614 92.1039 577 72.1359C477.546 59.3741 442.284 157.849 345 182.136Z" fill="var(--piste-avant)" />

        <defs>
            <linearGradient id="paint0_linear_0_1" x1="14" y1="128" x2="25" y2="128" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--mat-a)" /><stop offset="1" stopColor="var(--mat-b)" />
            </linearGradient>
            <linearGradient id="paint1_linear_0_1" x1="1256.5" y1="71" x2="1267.5" y2="71" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--mat-a)" /><stop offset="1" stopColor="var(--mat-b)" />
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
 * that drive the track · guaranteed lockstep.
 */
function StepItem({ step, index, scrollYProgress }: {
    step: Step
    index: number
    scrollYProgress: MotionValue<number>
}) {
    const { lang } = useLang()
    const title = lang === 'en' ? step.titleEn : step.title
    const content = lang === 'en' ? step.contentEn : step.content

    const seg = STEP_DURATION / TOTAL_SCROLL
    const start = (INITIAL_OFFSET + index * STEP_DURATION) / TOTAL_SCROLL
    const fadeInEnd = start + seg * 0.2
    const fadeOutStart = start + seg * 0.8
    const end = start + seg

    // La dernière étape reste affichée : à l'arrivée au drapeau, la section
    // se termine sur elle au lieu d'une piste vide.
    const derniere = index === STEPS_COUNT - 1
    const opacity = useTransform(scrollYProgress, [start, fadeInEnd, fadeOutStart, end], [0, 1, 1, derniere ? 1 : 0])
    const y = useTransform(scrollYProgress, [start, fadeInEnd], [40, 0])

    return (
        <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-row items-start justify-start gap-4 md:gap-6">
            {/* Le chiffre est decoratif : le titre de l'etape porte le sens. */}
            <span aria-hidden="true" className="shrink-0 text-[88px] leading-[72px] md:text-[168px] md:leading-[130px]">{index + 1}</span>
            <div className="min-w-0 max-w-[400px] flex-1">
                <h3 className="text-2xl leading-tight md:text-4xl">{title}</h3>
                <p className="mt-2 text-base md:text-xl">{content}</p>
            </div>
        </motion.div>
    )
}

/* ─── Arrivée ───────────────────────────────────────────────────────────────
 *
 * Une fois la balle au drapeau, la section se termine sur une action : la
 * phrase et le bouton occupent la moitié droite, en face du texte de
 * l'étape 3 (en bas de la scène sur mobile, sous la piste).
 */
function Arrivee({ course }: { course: MotionValue<number> }) {
    const { t } = useLang()
    // `course` est la progression amortie, celle qui pousse la balle : le
    // message arrive avec elle, juste avant qu'elle touche le drapeau. Une
    // valeur liée directement au défilement serait confiée par framer-motion
    // au navigateur (ScrollTimeline), qui ne la rendait pas ici.
    const opacity = useTransform(course, [0.86, 0.97], [0, 1])
    const y = useTransform(course, [0.86, 0.97], [16, 0])
    // Invisible, le bouton ne se clique pas et sort de la tabulation.
    const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? 'auto' : 'none'))
    const visibility = useTransform(opacity, (o) => (o > 0.01 ? 'visible' : 'hidden'))

    return (
        <motion.div
            style={{ opacity, y, pointerEvents, visibility }}
            className="absolute bottom-8 left-6 right-6 z-20 flex flex-col items-start gap-4 md:bottom-auto md:left-1/2 md:right-12 md:top-2 md:gap-5"
        >
            <p className="max-w-[420px] text-2xl font-medium leading-tight md:text-4xl">{t('workflow.arrivee')}</p>
            <a
                href="mailto:gemmas.pro@gmail.com"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground py-1 pl-5 pr-1 text-sm font-medium text-background transition-all duration-300 ease-smooth hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:text-base"
            >
                {t('hero.cta')}
                <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                </span>
            </a>
        </motion.div>
    )
}

/* ─── Main component ────────────────────────────────────────────────────────*/
export default function GamifiedHowItWorks() {
    const { t } = useLang()
    const containerRef = useRef<HTMLDivElement>(null)
    const stageRef = useRef<HTMLDivElement>(null)
    const sampleRef = useRef<SVGPathElement>(null)
    const pointsRef = useRef<{ x: number; y: number }[]>([])

    const [scale, setScale] = useState(1)
    const [worldTop, setWorldTop] = useState(0)

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

    // Spring smoothing · inertia while scrolling, crisp stop at end
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
            // Le monde se règle sur la largeur ET sur la hauteur. Sa partie
            // utile va du plat de départ (y = 60) au fond de la vallée, balle
            // comprise (y = 470) : 410 unités. Elle se pose sous le texte des
            // étapes et doit finir avant le bas de la scène, sinon sur un écran
            // bas la balle descendait hors de vue. Sur un écran étroit, on
            // garde un plancher : la piste déborde à droite, ce qui ne gêne pas
            // puisqu'elle défile vers la gauche.
            const largeur = el.clientWidth
            const hauteur = el.clientHeight
            const texte = largeur < 768 ? 190 : 240
            const parLaHauteur = (hauteur - 16 - texte) / 410
            const s = clamp(Math.min(largeur / WORLD_W, parLaHauteur), 0.5, 1)
            setScale(s)
            setWorldTop(texte - 60 * s)
        }
        update()
        const ro = new ResizeObserver(update)
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    return (
        <section
            id="how"
            ref={containerRef}
            style={{ height: `calc(100vh + ${TOTAL_SCROLL}px)` }}
            // La section suit le thème du site : piste claire sur blanc en
            // clair, piste sombre sur noir en sombre (version E retenue).
            className="relative w-full bg-white text-black [--piste-arriere:#F5F5F5] [--piste-avant:#E4E4E4] dark:bg-black dark:text-white dark:[--piste-arriere:#111111] dark:[--piste-avant:#1c1c1c] [--mat-a:#E4E4E4] [--mat-b:#F5F5F5] dark:[--mat-a:#d4d4d4] dark:[--mat-b:#8a8a8a]"
        >

            {/* La scene prend toute la largeur : un padding horizontal sur ce
                conteneur retrecissait le monde et coupait la piste avant le
                bord droit. Seuls le titre et le texte des etapes sont en retrait. */}
            {/* La scène prend toute la hauteur laissée par le titre (flex-1),
                au lieu d'une hauteur fixe en vh qui coupait la vallée sur les
                écrans bas. Le haut suit la hauteur d'écran, sous la barre de
                navigation. */}
            <div className="sticky top-0 h-[100dvh] w-full flex flex-col items-center justify-start pt-[max(6rem,12vh)] gap-6 md:gap-8 overflow-hidden">
                <h2 className="px-6 text-center text-3xl font-medium">{t("workflow.title")}</h2>
                <div ref={stageRef} className="relative w-full min-h-0 flex-1">
                    {/* Step text overlay */}
                    <div className="absolute inset-y-0 left-0 right-0 z-10 mx-auto max-w-page px-6 md:px-12 pointer-events-none">
                        <div className="relative h-full">
                        {steps.map((step, index) => (
                            <StepItem
                                key={step.id}
                                step={step}
                                index={index}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                        </div>
                    </div>

                    <Arrivee course={smooth} />

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