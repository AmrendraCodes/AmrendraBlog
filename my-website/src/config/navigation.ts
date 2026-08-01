import { BookOpen, FolderCheck, LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownType?: "services" | "resources";
}

export interface ResourceDropdownItem {
  title: string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  ctaText: string;
}

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services", hasDropdown: true, dropdownType: "services" },
  { name: "Resources", href: "/resources", hasDropdown: true, dropdownType: "resources" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const RESOURCES_DROPDOWN_ITEMS: ResourceDropdownItem[] = [
  {
    title: "Blog",
    subtitle: "Latest technical articles, deep dives & engineering tutorials",
    href: "/resources/blog",
    icon: BookOpen,
    badge: "Articles",
    ctaText: "Read Articles",
  },
  {
    title: "Case Studies",
    subtitle: "Real client success stories, architecture decisions & results",
    href: "/resources/case-studies",
    icon: FolderCheck,
    badge: "Client Work",
    ctaText: "View Case Studies",
  },
];
