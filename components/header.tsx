"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  {
    name: "Topics",
    path: "/topics",
    dropdownItems: [
      { name: "Newton's Laws", path: "/topics/newtons-laws" },
      { name: "Thermodynamics", path: "/topics/thermodynamics" },
      { name: "Optics", path: "/topics/optics" },
      { name: "Electromagnetism", path: "/topics/electromagnetism" },
      { name: "Quantum Mechanics", path: "/topics/quantum-mechanics" },
    ],
  },
  {
    name: "Challenges",
    path: "/challenges",
    dropdownItems: [
      { name: "Daily Challenge", path: "/challenges/daily" },
      { name: "Weekly Quiz", path: "/challenges/weekly-quiz" },
      { name: "Monthly Contest", path: "/challenges/monthly-contest" },
    ],
  },
  {
    name: "Community",
    path: "/community",
    dropdownItems: [
      { name: "Forums", path: "/community/forums" },
      { name: "Study Groups", path: "/community/study-groups" },
      { name: "User Contributions", path: "/community/contributions" },
    ],
  },
  { name: "Leaderboard", path: "/leaderboard" },
];

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
  x: MotionValue<number>,
  y: MotionValue<number>
) => {
  const bounds = item.getBoundingClientRect();
  const relativeX = event.clientX - bounds.left;
  const relativeY = event.clientY - bounds.top;
  const xRange = mapRange(0, bounds.width, -1, 1)(relativeX);
  const yRange = mapRange(0, bounds.height, -1, 1)(relativeY);
  x.set(xRange * 10);
  y.set(yRange * 10);
};

const NavItem = ({ item, pathname }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const textX = useTransform(x, (latest) => latest * 0.5);
  const textY = useTransform(y, (latest) => latest * 0.5);

  return (
    <motion.li
      onPointerMove={(event: React.PointerEvent) => {
        const item = event.currentTarget as HTMLElement;
        setTransform(item, event, x, y);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
    >
      {item.dropdownItems ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex items-center justify-center h-10 px-4 py-2",
                pathname === item.path ? "bg-accent text-accent-foreground" : ""
              )}
            >
              <motion.span style={{ x: textX, y: textY }} className="z-10 relative">
                {item.name}
              </motion.span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {item.dropdownItems.map((dropdownItem) => (
              <DropdownMenuItem key={dropdownItem.path} asChild>
                <Link href={dropdownItem.path}>{dropdownItem.name}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <MotionLink
          className={cn(
            "font-medium relative rounded-md text-sm py-2 px-4 transition-all duration-500 ease-out hover:bg-slate-200",
            pathname === item.path ? "bg-slate-300" : ""
          )}
          href={item.path}
        >
          <motion.span style={{ x: textX, y: textY }} className="z-10 relative">
            {item.name}
          </motion.span>
          {pathname === item.path && (
            <motion.div
              transition={{ type: "spring" }}
              layoutId="underline"
              className="absolute w-full h-full rounded-md left-0 bottom-0 bg-red-300"
            ></motion.div>
          )}
        </MotionLink>
      )}
    </motion.li>
  );
};

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <Image src="/physics-nuclear-svgrepo-com.svg" alt="logo" width={40} height={40} />
          Physics Playground
        </Link>
        <ul className="hidden lg:flex items-center space-x-1">
          <AnimatePresence>
            {navItems.map((item) => (
              <NavItem key={item.path} item={item} pathname={pathname} />
            ))}
          </AnimatePresence>
        </ul>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0">
                  <Avatar>
                    <AvatarImage src={session.user.image} />
                    <AvatarFallback>{session.user.name[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn()}>Sign In</Button>
          )}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="mt-6 flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Button
                      key={item.path}
                      variant="ghost"
                      className={cn(
                        "justify-start",
                        pathname === item.path ? "bg-accent text-accent-foreground" : ""
                      )}
                      asChild
                    >
                      <Link href={item.path}>{item.name}</Link>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;