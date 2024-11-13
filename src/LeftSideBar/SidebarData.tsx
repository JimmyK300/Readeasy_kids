import { IoChatbox } from "react-icons/io5";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome size={30} />,
    cName: "nav-text",
  },
  {
    title: "Lessons",
    path: "/Lessons",
    icon: <IoIcons.IoIosPaper size={30} />,
    cName: "nav-text",
  },
  {
    title: "Chatbot",
    path: "/messages",
    icon: <IoChatbox size={30} />,
    cName: "nav-text",
  },
  {
    title: "Account",
    path: "/accounts",
    icon: <RiAccountCircleFill size={30} />,
    cName: "nav-text",
  },
];
