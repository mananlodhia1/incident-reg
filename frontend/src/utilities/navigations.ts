export interface NavigationItem {
  name: string;
  href: string;
  subNav?: NavigationItem[];
  activeSegment: string | null;
}

export const AdminNavs = () => {
  const sidebarNavs = [
    {
      path: "/admin/dashboard",
      title: "Dashboard",
      activePath: "dashboard",
      subNav:[]
    },
  ];

  return sidebarNavs;
};
