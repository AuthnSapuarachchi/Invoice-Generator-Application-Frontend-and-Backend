import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo.jsx";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";
import { Home, LayoutDashboard, FilePlus, LogIn } from "lucide-react";
import { useCallback } from "react";

// Navigation Link Component
const NavLink = ({ to, icon: Icon, children, isActive }) => (
    <Link 
        to={to}
        className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-pill ${isActive ? 'bg-primary bg-opacity-10 text-primary' : 'text-dark'}`}
        style={{
            fontWeight: isActive ? '600' : '500',
            transition: 'all 0.3s ease',
            textDecoration: 'none'
        }}
        onMouseEnter={(e) => {
            if (!isActive) {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
            }
        }}
        onMouseLeave={(e) => {
            if (!isActive) {
                e.currentTarget.style.backgroundColor = 'transparent';
            }
        }}
    >
        {Icon && <Icon size={18} />}
        <span>{children}</span>
    </Link>
);

const MenuBar = () => {
    const { openSignIn } = useClerk();
    const location = useLocation();

    const openLogin = useCallback(() => {
        openSignIn({});
    }, [openSignIn]);

    const isActive = useCallback((path) => {
        return location.pathname === path;
    }, [location.pathname]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top" 
             style={{ 
                 borderBottom: '1px solid rgba(0,0,0,0.08)',
                 backdropFilter: 'blur(10px)',
                 backgroundColor: 'rgba(255,255,255,0.95)'
             }}>
            <div className="container py-2">
                {/* Logo */}
                <Link className="navbar-brand d-flex align-items-center gap-2" to="/" style={{ textDecoration: 'none' }}>
                    <Logo />
                    <span 
                        className="fw-bold fs-4" 
                        style={{
                            letterSpacing: '-0.5px', 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        Quick Invoice
                    </span>
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ padding: '8px' }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center gap-2">
                        <SignedIn>
                            <li className="nav-item">
                                <NavLink to="/" icon={Home} isActive={isActive('/')}>
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/dashboard" icon={LayoutDashboard} isActive={isActive('/dashboard')}>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/generate" icon={FilePlus} isActive={isActive('/generate')}>
                                    Generate
                                </NavLink>
                            </li>
                            
                            {/* Divider */}
                            <li className="nav-item d-none d-lg-block mx-2">
                                <div style={{ width: '1px', height: '32px', backgroundColor: 'rgba(0,0,0,0.1)' }}></div>
                            </li>

                            {/* User Button with Wrapper */}
                            <li className="nav-item">
                                <div 
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    <UserButton 
                                        appearance={{
                                            elements: {
                                                avatarBox: "w-9 h-9"
                                            }
                                        }}
                                    />
                                </div>
                            </li>
                        </SignedIn>

                        <SignedOut>
                            <li className="nav-item">
                                <button 
                                    className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 shadow-sm"
                                    onClick={openLogin}
                                    style={{ 
                                        borderRadius: '12px',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease',
                                        border: 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 8px 16px rgba(13, 110, 253, 0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                                    }}
                                >
                                    <LogIn size={18} />
                                    Login / Signup
                                </button>
                            </li>
                        </SignedOut>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default MenuBar;