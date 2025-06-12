const Navbar = ({ onLogoClick }) => {
    return (
        <header className="header flex justify-between items-center px-4 py-2 fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#9CF0FF' }}>
            <div 
                className="w-10 h-10 rounded-lg bg-white items-center justify-center flex shadow-md cursor-pointer hover:scale-105 transition-transform duration-200" 
                onClick={onLogoClick}
            >
                <img 
                    src="/assets/images/Title.png" 
                    alt="KIM Logo" 
                    className="w-full h-full object-contain"
                />
            </div>
            {/* Navigation removed - only KIM logo remains */}
        </header>
    );
}

export default Navbar;