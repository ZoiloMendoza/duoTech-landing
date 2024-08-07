import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LanguageToggle } from "./mode-toggle-language";
import MessengerHover from "./MessengerHover";
import { useTranslation } from "react-i18next";

// Importa la imagen dt.png

interface RouteProps {
  href: string;
  label: string;
  icon?: JSX.Element;
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useTranslation("global");
  const routeList: RouteProps[] = [
    {
      href: "#a",
      label: t("navbar.services"),
    },
    {
      href: "#b",
      label: t("navbar.projects"),
    },
    {
      href: "#c",
      label: t("navbar.contact"),
    },
  ];
  return (
    <header className="bg-alison sticky border-b-[1px] top-0 z-40 w-full dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between items-center">
          <NavigationMenuItem className="flex justify-start max-w-[100px] md:w-full">
            <div className="font-bold text-xl flex">
              <img
                src={"/DT-BLACK.png"}
                alt="DuoTech Logo"
                className="w-20 h-10 md:w-72 md:h-40 mt-4 object-contain"
                // Ajusta el tamaño de la imagen y usa object-contain para mantener la proporción
              />
            </div>
          </NavigationMenuItem>

          <div className="flex items-center space-x-4">
            {/* mobile */}
            <div className="flex w-auto md:hidden space-x-2">
              <LanguageToggle />
              <ModeToggle />

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="px-2">
                  <Menu
                    className="flex md:hidden h-5 w-5"
                    onClick={() => setIsOpen(true)}
                  >
                    <span className="sr-only">Menu Icon</span>
                  </Menu>
                </SheetTrigger>

                <SheetContent side={"left"}>
                  <SheetHeader>
                    <SheetTitle className="font-bold text-xl">DuoTech</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                    {routeList.map(({ href, label, icon }: RouteProps, i) => (
                      <a
                        key={label}
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={buttonVariants({ variant: "ghost" })}
                      >
                        <MessengerHover
                          text={label}
                          isHovered={hoveredIndex === i}
                        />
                        {icon && <span className="ml-1">{icon}</span>}
                      </a>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <nav className="">
                {routeList.map((route: RouteProps, i) => (
                  <a
                    href={route.href}
                    key={i}
                    className={`text-[17px] ${buttonVariants({
                      variant: "ghost",
                    })}`}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <MessengerHover
                      text={route.label}
                      isHovered={hoveredIndex === i}
                    />
                    {route.icon && <span className="ml-1">{route.icon}</span>}
                  </a>
                ))}
              </nav>
              <LanguageToggle />
              <ModeToggle />
            </div>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
