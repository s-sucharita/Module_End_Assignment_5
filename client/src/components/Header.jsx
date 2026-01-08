import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "User";

  const initials = name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div style={{display: 'flex', alignItems: 'center', gap:12}}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="4" fill="#6366f1" />
            <path d="M7 12h10M7 8h10M7 16h7" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <h1 className="brand">Taskly</h1>
            <div className="brand-sub">Organize your day</div>
          </div>
        </div>

        <nav style={{display:'flex', alignItems:'center', gap:12}}>
          <div className="avatar" title={name}>{initials}</div>
          <button className="btn btn-ghost" onClick={logout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
