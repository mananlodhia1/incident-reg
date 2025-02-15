import {
  Avatar,
  CustomFlowbiteTheme,
  Dropdown,
  Navbar,
  Spinner,
} from "flowbite-react";
import { AdminNavs } from "../utilities/navigations";
import { useHandleLogout } from "../hooks/useHandleLogout";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar({ active }: any) {
  const navigate = useNavigate();
  const { handleLogout, isLoading } = useHandleLogout();
  const customTheme: CustomFlowbiteTheme["navbar"] = {
    root: {
      base: "w-full bg-gray-200 dark:bg-foreground dark:border-gray-700 px-2 py-2.5 sm:px-4",
    },
    link: {
      base: "font-bold font-md text-md",
      active: {
        on: "text-lightViolet-700",
      },
    },
  };

  return (
    <div className="w-full flex justify-center max-w-full bg-background dark:bg-foreground">
      <Navbar theme={customTheme} fluid>
        <Navbar.Brand href="/">
          {/* <img
            src={"/ylc_logo.png"}
            alt="incident logo"
            width="50"
          /> */}
        </Navbar.Brand>
        <div className="flex items-center justify-center gap-8">
          <Navbar.Collapse>
            {AdminNavs().map((item, index) => {
              return (
                <Navbar.Link
                  key={index}
                  href={item.path}
                  active={item.activePath === active}
                >
                  {item.subNav && item.subNav.length > 0 ? (
                    <Dropdown arrowIcon={true} inline={true} label={item.title}>
                      {item.subNav.map((sub, i) => {
                        return (
                          <Dropdown.Item
                            key={i}
                            onClick={() => {
                              navigate(sub.path);
                            }}
                          >
                            {sub.title}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown>
                  ) : (
                    item.title
                  )}
                </Navbar.Link>
              );
            })}
          </Navbar.Collapse>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                placeholderInitials={
                  isLoading ? (
                    <Spinner color="success" size="sm" />
                  ) : (
                    localStorage.username?.charAt(0).toUpperCase()
                  )
                }
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{localStorage.username}</span>
              <span className="block truncate text-sm font-medium">
                {localStorage.email}
              </span>
            </Dropdown.Header>
            <div className="block md:hidden">
            {AdminNavs().map((item, index) => {
              return (
                <Dropdown.Item
                  onClick={() => {
                    navigate(item.path as string);
                  }}
                  key={index}
                >
                  {item.title}
                </Dropdown.Item>
              );
            })}
            <Dropdown.Divider />
            </div>
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>
    </div>
  );
}
