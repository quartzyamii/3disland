import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="header flex justify-between items-center px-4 py-2 fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#9CF0FF' }}>
            <NavLink to="/" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
                <p className="blue-gradient_text">
                    KIM
                </p>
            </NavLink>
            {/* Navigation removed - only KIM logo remains */}
        </header>
    );
}

export default Navbar;
