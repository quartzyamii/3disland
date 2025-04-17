import {NavLink} from "react-router-dom"

const Navbar = () => {
    return (
        <header className=" header flex justify-between items-center px-4 py-2">
             <NavLink to="/" className = "w-10 h-10 rounded-lg bg-white     items-center justify-center flex font-bold shadow-md" >
             {/* KIM 색을 지정하고 싶을 때 tailwind.config.js에서 설정 */}
             <p className="blue-gradient_text">
                KIM
             </p>
             </NavLink>
             <nav className ="flex text-lg gap-7 font-medium">
                {/* about */}
                <NavLink to = "/about"  className={({ isActive }) => isActive ? 'text-blue-500' :'text-black' }>
                About
                </NavLink>

                {/* projects */}
                <NavLink to = "/projects"  className={({ isActive }) => isActive ? 'text-blue-500' :'text-black' }>
                Projects
                </NavLink>
             </nav>
        </header>
    )
}

export default Navbar;