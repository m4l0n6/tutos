import type { LinkItemType } from "./sheard";
import {
  GlobeIcon,
  LayersIcon,
  UserPlusIcon,
  BarChart3Icon,
  PlugIcon,
  CodeIcon,
  UsersIcon,
  StarIcon,
  HandshakeIcon,
  FileTextIcon,
  ShieldIcon,
  RotateCcwIcon,
  LeafIcon,
  HelpCircleIcon,
} from "lucide-react";

export const companyLinks: LinkItemType[] = [
  {
    label: "Tutors",
    href: "/tutors",
    description: "Find experienced tutors for your child",
    icon: <UsersIcon />,
  },
  {
    label: "Classes",
    href: "/classes",
    description: "Explore our range of educational classes",
    icon: <UsersIcon />,
  },
]

export const companyLinks2: LinkItemType[] = [
  {
    label: "Terms of Service",
    href: "#",
    icon: <FileTextIcon />,
  },
  {
    label: "Privacy Policy",
    href: "#",
    icon: <ShieldIcon />,
  },
  {
    label: "Refund Policy",
    href: "#",
    icon: <RotateCcwIcon />,
  },
  {
    label: "Blog",
    href: "#",
    icon: <LeafIcon />,
  },
  {
    label: "Help Center",
    href: "#",
    icon: <HelpCircleIcon />,
  },
];
