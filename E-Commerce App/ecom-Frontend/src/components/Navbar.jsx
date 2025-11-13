import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { home } from "../services/ProductServices";

export const Navbar = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await home();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const styles = {
    navbar: {
      position: "sticky",
      top: 0,
      width: "100%",
      background: "linear-gradient(90deg, #007bff, #00a6ff)",
      color: "white",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      zIndex: 1000,
      transition: "all 0.3s ease",
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "12px 30px",
    },
    logo: {
      fontSize: "1.6rem",
      fontWeight: 700,
      color: "white",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    links: {
      display: "flex",
      alignItems: "center",
      gap: "35px",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontWeight: 500,
      fontSize: "1.05rem",
      transition: "all 0.3s ease",
      padding: "6px 10px",
      borderRadius: "6px",
    },
    linkHover: {
      backgroundColor: "rgba(255,255,255,0.2)",
      transform: "scale(1.05)",
    },
  };

  // ✅ Small hover effect using inline event handlers
  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = "rgba(255,255,255,0.2)";
    e.target.style.transform = "scale(1.05)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "transparent";
    e.target.style.transform = "scale(1)";
  };

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.container}>
          {/* Logo */}
          <Link to="/" style={styles.logo}>
            📚 <span>MyBookStore</span>
          </Link>

          {/* Links */}
          <div style={styles.links}>
            {["Home", "Add Product", "getProducts", "Contact"].map((text, idx) => (
              <Link
                key={idx}
                to={text === "Home" ? "/" : `/${text.replace(" ", "").toLowerCase()}`}
                style={styles.link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* spacing below navbar */}
      <div style={{ height: "75px" }}></div>
    </>
  );
};
