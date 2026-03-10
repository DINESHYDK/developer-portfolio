import React, { useState, useRef, useLayoutEffect, cloneElement } from "react";

export type LimelightNavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  href?: string;
  onClick?: () => void;
};

type LimelightNavProps = {
  items: LimelightNavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

export const LimelightNav = ({
  items,
  defaultActiveIndex = 0,
  onTabChange,
  className = "",
  limelightClassName = "",
  iconContainerClassName = "",
  iconClassName = "",
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  // Recalculate limelight position whenever activeIndex or items change
  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];

    if (limelight && activeItem) {
      const newLeft =
        activeItem.offsetLeft +
        activeItem.offsetWidth / 2 -
        limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) return null;

  const handleItemClick = (index: number, item: LimelightNavItem) => {
    setActiveIndex(index);
    onTabChange?.(index);
    item.onClick?.();
  };

  return (
    <nav
      className={`relative inline-flex items-center h-14 rounded-[28px] px-1 ${className}`}
    >
      {items.map((item, index) => (
        <a
          key={item.id}
          ref={(el) => { navItemRefs.current[index] = el; }}
          href={item.href ?? "#"}
          aria-label={item.label}
          onClick={(e) => {
            if (!item.href || item.href === "#") e.preventDefault();
            handleItemClick(index, item);
          }}
          className={`relative z-20 flex h-full cursor-pointer items-center justify-center px-3 py-4 ${iconContainerClassName}`}
        >
          {cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
            className: `w-5 h-5 transition-all duration-200 ease-in-out ${
              activeIndex === index ? "opacity-100" : "opacity-35"
            } ${(item.icon as React.ReactElement<{ className?: string }>).props.className ?? ""} ${iconClassName}`,
          })}
        </a>
      ))}

      {/* The limelight bar + cone glow */}
      <div
        ref={limelightRef}
        className={`absolute top-0 z-10 w-9 h-[3px] rounded-full bg-accent-primary shadow-[0_30px_15px_theme(colors.accent-primary/40)] ${
          isReady ? "transition-[left] duration-300 ease-in-out" : ""
        } ${limelightClassName}`}
        style={{ left: "-999px" }}
      >
        {/* Cone-shaped gradient below the bar */}
        <div className="absolute left-[-30%] top-[3px] w-[160%] h-10 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-accent-primary/25 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};

