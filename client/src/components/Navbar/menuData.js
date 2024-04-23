import { IoIosLaptop } from "react-icons/io";
import { FiMonitor } from "react-icons/fi";
import { BsController } from "react-icons/bs";
import { PiDevices } from "react-icons/pi";
import { GiProcessor } from "react-icons/gi";
const menuItems = [
  {
    page: "Laptopi",
    icon: <IoIosLaptop />,
    url: "/katalog/laptopi",
    submenu: [
      {
        title: "HP",
        url: "/katalog/laptop/hp",
      },
      {
        title: "Lenovo",
        url: "/katalog/laptop/lenovo",
      },
      {
        title: "Dell",
        url: "/katalog/laptop/dell",
      },
      {
        title: "Acer",
        url: "/katalog/laptop/acer",
      },
      {
        title: "Apple",
        url: "/katalog/laptop/apple",
      },
      {
        title: "Assus",
        url: "/katalog/laptop/assus",
      },
    ],
  },
  {
    page: "PC",
    icon: <PiDevices />,
    url: "/katalog/computers",
    submenu: [
      {
        title: "HP PC",
        url: "/katalog/computers/hp-pc",
      },
      {
        title: "Lenovo PC",
        url: "/katalog/computers/lenovo-pc",
      },
      {
        title: "Dell PC",
        url: "/katalog/computers/dell-pc",
      },
      {
        title: "Apple PC",
        url: "/katalog/computers/apple-pc",
      },
      {
        title: "Assus PC",
        url: "/katalog/computers/assus-pc",
      },
    ],
  },
  {
    page: "Gaming",
    icon: <BsController />,
    url: "/katalog/gaming",
    submenu: [
      {
        title: "Consoles",
        url: "/katalog/gaming/consoles",
      },
      {
        title: "Games",
        url: "/katalog/gaming/games",
      },
      {
        title: "Gaming Periphery",
        url: "/katalog/gaming/gaming-periphery",
      },
    ],
  },
  {
    page: "Monitori",
    icon: <FiMonitor />,
    url: "/catalog/monitors",
    submenu: [
      {
        title: "Gaming Monitors",
        url: "/katalog/gaming/gaming-monitors",
      },
      {
        title: "Office Monitors",
        url: "/katalog/monitors/office-monitors",
      },
    ],
  },
  {
    page: "Komponente",
    icon: <GiProcessor />,
    url: "/catalog/pc-parts",
    submenu: [
      {
        title: "Central Processing Units (CPU)",
        url: "/katalog/pc-parts/cpu",
      },
      {
        title: "Graphic Cards (GPU)",
        url: "/katalog/pc-parts/gpu",
      },
      {
        title: "MotherBoard",
        url: "/katalog/pc-parts/mp",
      },
      {
        title: "HDD / SDD",
        url: "/katalog/pc-parts/storage",
      },
    ],
  },
];

export default menuItems;
