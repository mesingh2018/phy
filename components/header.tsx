"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { AnimatePresence, MotionValue, motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from 'next/image';

const navItems = [
  { name: "Home", path: "/" },
  { name: "Topics", path: "/topics" },
  { name: "Challenges", path: "/challenges" },
  { name: "Leaderboard", path: "/leaderboard" },
];

const Header = () => {
  const pathname = usePathname();
  const MotionLink = motion(Link);

  const mapRange = (
    inputLower: number,
    inputUpper: number,
    outputLower: number,
    outputUpper: number
  ) => {
    const INPUT_RANGE = inputUpper - inputLower;
    const OUTPUT_RANGE = outputUpper - outputLower;

    return (value: number) =>
      outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0);
  };

  const setTransform = (
    item: HTMLElement & EventTarget,
    event: React.PointerEvent,
    x: MotionValue,
    y: MotionValue
  ) => {
    const bounds = item.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const xRange = mapRange(0, bounds.width, -1, 1)(relativeX);
    const yRange = mapRange(0, bounds.height, -1, 1)(relativeY);
    x.set(xRange * 10);
    y.set(yRange * 10);
  };

  return (
    <header className="bg-background border-b">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <Image src="/physics-nuclear-svgrepo-com.svg" alt="logo" width={40} height={40} />
          Physics Playground
        </Link>
        <ul className="hidden lg:flex space-x-1">
          <AnimatePresence>
            {navItems.map((item) => {
              const x = useMotionValue(0);
              const y = useMotionValue(0);
              const textX = useTransform(x, (latest: number) => latest * 0.5);
              const textY = useTransform(y, (latest: number) => latest * 0.5);
              return (
                <motion.li
                  key={item.path}
                  onPointerMove={(event: React.PointerEvent) => {
                    const target = event.currentTarget as HTMLElement;
                    setTransform(target, event, x, y);
                  }}
                  onPointerLeave={() => {
                    x.set(0);
                    y.set(0);
                  }}
                  style={{ x, y }}
                >
                  <MotionLink
                    className={cn(
                      "font-medium relative rounded-md text-sm py-2 px-4 transition-all duration-500 ease-out hover:bg-accent",
                      pathname === item.path ? "bg-accent text-accent-foreground" : ""
                    )}
                    href={item.path}
                  >
                    <motion.span
                      style={{ x: textX, y: textY }}
                      className="z-10 relative"
                    >
                      {item.name}
                    </motion.span>
                    {pathname === item.path && (
                      <motion.div
                        transition={{ type: "spring" }}
                        layoutId="underline"
                        className="absolute w-full h-full rounded-md left-0 bottom-0 bg-primary/20"
                      ></motion.div>
                    )}
                  </MotionLink>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">Sign In</Button>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;