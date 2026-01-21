"use client";

export type MenuType = "대시보드 홈" | "설정" | "문의";

interface SidebarProps {
  currentMenu: MenuType;
  onMenuChange: (menu: MenuType) => void;
}

const menuItems: MenuType[] = ["대시보드 홈", "설정", "문의"];

const Sidebar = ({ currentMenu, onMenuChange }: SidebarProps) => {
  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-[#1a1a1a] border-r border-gray-800 z-40">
      <nav className="mt-8 px-4 flex flex-col gap-2">
        {menuItems.map((menuName) => (
          <button
            key={menuName}
            onClick={() => onMenuChange(menuName)}
            className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all hover:cursor-pointer ${
              currentMenu === menuName
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
            }`}
          >
            {menuName}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
