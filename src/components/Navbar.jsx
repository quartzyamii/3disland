import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
    const location = useLocation();
    const [bgColor, setBgColor] = useState('#8395ff');  // 기본 배경색 설정

    useEffect(() => {
        // location.pathname을 기반으로 현재 경로가 무엇인지 확인하고 배경색을 변경
        if (location.pathname === "/about" || location.pathname === "/projects") {
            setBgColor('#f5f7f9');  // 회색으로 변경
        } else {
            setBgColor('#8395ff');  // 원래 색으로 돌아가기
        }
    }, [location]);

    return (
        <header className={`header flex justify-between items-center px-4 py-2`} style={{ backgroundColor: bgColor }}>
            <NavLink to="/" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
                <p className="blue-gradient_text">
                    KIM
                </p>
            </NavLink>
            <nav className="flex text-lg gap-7 font-medium">
                {/* Home 페이지에서 About, Projects 글자색을 하얀색 */}
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        // Home 페이지에서는 항상 하얀색, About과 Projects 페이지에서는 경로에 따라 색상 변경
                        location.pathname === '/' ? 'text-white' : (location.pathname === '/about' ? 'text-blue-500' : 'text-black')
                    }
                >
                    About
                </NavLink>

                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        // Home 페이지에서는 항상 하얀색, About과 Projects 페이지에서는 경로에 따라 색상 변경
                        location.pathname === '/' ? 'text-white' : (location.pathname === '/projects' ? 'text-blue-500' : 'text-black')
                    }
                >
                    Projects
                </NavLink>
            </nav>
        </header>
    );
}

export default Navbar;
