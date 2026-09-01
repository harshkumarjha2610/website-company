"use client";

import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";

import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";

import { motion, AnimatePresence } from "motion/react";

import { useOutsideClick } from "@/hooks/use-outside-click";

type Card = {
  src: string;
  title: string;
  category: string;
  description?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
};

type CarouselProps = {
  items: React.ReactNode[];
  initialScroll?: number;
  autoScroll?: boolean;
  scrollSpeed?: number;
};

type CardProps = {
  card: Card;
  index: number;
};

type CarouselContextType = {
  onCardClose: (index: number) => void;
  currentIndex: number;
};

const CarouselContext = createContext<CarouselContextType | undefined>(
  undefined
);

export const useCarousel = () => {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a Carousel");
  }

  return context;
};

export const Carousel = ({
  items,
}: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Start animation when carousel enters the screen
  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Infinite scrolling animation
  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel || !isVisible) return;

    let animationFrame: number;
    let lastTime = performance.now();

    // Change this number to control speed
    const speed = 0.06;

    const animate = (time: number) => {
      const delta = time - lastTime;

      lastTime = time;

      if (!isPaused) {
        carousel.scrollLeft += delta * speed;

        // Width of one complete set of cards
        const firstSet = carousel.querySelector(
  "[data-carousel-set='first']"
) as HTMLElement | null;

if (firstSet) {
  const firstSetWidth = firstSet.offsetWidth;

  if (carousel.scrollLeft >= firstSetWidth) {
    carousel.scrollLeft -= firstSetWidth;
  }
}
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isVisible, isPaused]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={carouselRef}
        className="
          flex
          w-full
          overflow-x-hidden
          py-10
          [scrollbar-width:none]
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {/* FIRST SET OF CARDS */}
        <div data-carousel-set="first" className="flex shrink-0 gap-6 px-3">
          {items.map((item, index) => (
            <div
              key={`first-${index}`}
              className="shrink-0"
            >
              {item}
            </div>
          ))}
        </div>

        {/* SECOND SET OF CARDS */}
        <div
          className="flex shrink-0 gap-6 px-3"
          aria-hidden="true"
        >
          {items.map((item, index) => (
            <div
              key={`second-${index}`}
              className="shrink-0"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Card = ({ card, index }: CardProps) => {
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => {
    setOpen(false);
  });

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "auto";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {/* Background overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Card */}
      <motion.div
        layoutId={`card-${card.title}-${index}`}
        onClick={() => setOpen(true)}
        className="
          group
          relative
          h-[540px]
          w-[300px]
          cursor-pointer
          overflow-hidden
          rounded-[28px]
          border
          border-white/10
          bg-neutral-900
          shadow-lg
          transition-all
          duration-500
          hover:-translate-y-1
          hover:shadow-2xl
          md:h-[580px]
          md:w-[320px]
        "
      >
        {/* Background Image */}
        <img
          src={card.src}
          alt={card.title}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {/* Image overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/60
            to-black/10
          "
        />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-7">
          {/* Icon */}
          {card.icon && (
            <div
              className="
                mb-5
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-white/20
                bg-white/10
                text-white
                backdrop-blur-md
              "
            >
              {card.icon}
            </div>
          )}

          {/* Category */}
          <p
            className="
              mb-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
              text-white/60
            "
          >
            {card.category}
          </p>

          {/* Title */}
          <h3
            className="
              text-xl
              font-semibold
              leading-tight
              md:text-2xl
            "
          >
            {card.title}
          </h3>

          {/* Description */}
          {card.description && (
            <p
              className="
                mt-3
                line-clamp-3
                text-sm
                leading-relaxed
                text-white/70
              "
            >
              {card.description}
            </p>
          )}

          {/* Learn more */}
          <div
            className="
              mt-5
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-white/80
              transition-all
              duration-300
              group-hover:text-white
            "
          >
            <span>Explore</span>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </motion.div>

      {/* Expanded Card */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              ref={containerRef}
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                relative
                max-h-[90vh]
                w-full
                max-w-4xl
                overflow-y-auto
                rounded-[30px]
                bg-white
                p-6
                shadow-2xl
                dark:bg-neutral-900
                md:p-10
              "
            >
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="
                  absolute
                  right-5
                  top-5
                  z-10
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-neutral-100
                  text-neutral-800
                  transition
                  hover:bg-neutral-200
                  dark:bg-neutral-800
                  dark:text-white
                  dark:hover:bg-neutral-700
                "
                aria-label="Close card"
              >
                <IconX size={18} />
              </button>

              {/* Header */}
              <div className="mb-8 pr-12">
                {card.icon && (
                  <div
                    className="
                      mb-5
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-orange-500
                      via-pink-500
                      to-purple-600
                      text-white
                    "
                  >
                    {card.icon}
                  </div>
                )}

                <p
                  className="
                    mb-2
                    text-sm
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-neutral-500
                    dark:text-neutral-400
                  "
                >
                  {card.category}
                </p>

                <h2
                  className="
                    text-3xl
                    font-bold
                    leading-tight
                    text-neutral-900
                    dark:text-white
                    md:text-5xl
                  "
                >
                  {card.title}
                </h2>

                {card.description && (
                  <p
                    className="
                      mt-5
                      max-w-3xl
                      text-base
                      leading-relaxed
                      text-neutral-600
                      dark:text-neutral-300
                      md:text-xl
                    "
                  >
                    {card.description}
                  </p>
                )}
              </div>

              {/* Expanded Content */}
              {card.content && (
                <div>{card.content}</div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};