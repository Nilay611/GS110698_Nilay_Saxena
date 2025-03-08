import { FC } from "react";
import {
  MdOutlineStore,
  MdOutlineCategory,
  MdOutlineBarChart,
  MdInsertChartOutlined,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Sidebar: FC = () => {
  const location = useLocation(); // Get current path
  const sidebarButtons = [
    // obj to map out all four sidebar buttons
    {
      name: "Store",
      icon: <MdOutlineStore className={"text-4xl"} />,
      path: "/",
      dataTestId: "store-button",
    },
    {
      name: "SKU",
      icon: <MdOutlineCategory className={"text-4xl"} />,
      path: "/sku",
      dataTestId: "sku-button",
    },
    {
      name: "Planning",
      icon: <MdOutlineBarChart className={"text-4xl"} />,
      path: "/planning",
      dataTestId: "planning-button",
    },
    {
      name: "Charts",
      icon: <MdInsertChartOutlined className={"text-4xl"} />,
      path: "/charts",
      dataTestId: "charts-button",
    },
  ];

  return (
    <div
      data-testid={"sidebar"} // test ID to identify the Sidebar component in tests
      className={"w-fit h-full pt-6"}
    >
      {sidebarButtons.map((item, index) => (
        <div key={index} className={"w-full"}>
          <Link
            data-testid={item.dataTestId}
            className={
              `w-full flex flex-row gap-2 pr-8 py-3 pl-4 items-center text-2xl cursor-pointer hover:bg-gray-200
              ${location.pathname === item.path ? "bg-gray-300" : ""}` // Highlight active item
            }
            to={item.path}
          >
            {item.icon}
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
