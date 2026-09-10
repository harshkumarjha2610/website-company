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
  initialScroll = 0,
}: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto">
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 * index, ease: "easeOut" } }}
                key={`card-${index}`}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        <div className="flex justify-end gap-2 mr-10 mt-4">
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500 dark:text-neutral-400" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500 dark:text-neutral-400" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index }: CardProps) => {
  const [open, setOpen] = useState(false);
  const { onCardClose } = useCarousel();

  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => {
    handleClose();
  });

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

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
                onClick={handleClose}
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