import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { ElementType } from "react";

type Social = {
	href: string;
	icon: ElementType;
};

export const socialLinks: Social[] = [
	{
		href: "https://github.com/danielrdsdev",
		icon: GitHubLogoIcon,
	},
	{
		href: "https://www.linkedin.com/in/danielrdsdev/",
		icon: LinkedInLogoIcon,
	},
];
