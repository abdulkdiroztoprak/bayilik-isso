import React from "react";
import { Typography, Box } from "@mui/material";
import "./css/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const linkedinLink = "https://www.linkedin.com/in/abdulkadiroztoprak/";
  const instagramLink = "https://www.instagram.com/abdulkadiroztoprak";

  return (
    <footer className="footer">
      <Box className="footer-content">
        {/* Name and Brand */}
        <Box className="footer-section">
          <Typography variant="h5" className="footer-name">
            Abdulkadir Öztoprak
          </Typography>
          <Typography variant="subtitle1" className="footer-brand">
            İssoBeyazşehir
          </Typography>
        </Box>

        {/* Categories */}
        <Box className="footer-section">
          <Typography variant="subtitle2" className="section-title">
            Kategoriler
          </Typography>
          <Typography variant="body2" className="category-item">
            Çiğ Köfte
          </Typography>
          <Typography variant="body2" className="category-item">
            İçecekler
          </Typography>
          <Typography variant="body2" className="category-item">
            Tatlılar
          </Typography>
        </Box>

        {/* Contact */}
        <Box className="footer-section">
          <Typography variant="subtitle2" className="section-title">
            Paket Servis
          </Typography>
          <Typography variant="body1" className="phone-number">
            0550 200 40 00
          </Typography>
        </Box>

        {/* Social Media */}
        {/* Social Media */}
        <Box className="footer-section social-media">
          <Typography variant="subtitle2" className="section-title">
            Sosyal Medya
          </Typography>
          <Box className="social-links">
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </Box>
        </Box>
      </Box>
      <br></br>
      <br></br>
      {/* Copyright */}
      <Typography variant="caption" className="copyright">
        © 2025 ABDULKADİR ÖZTOPRAK. Tüm Hakları Saklıdır.
      </Typography>
    </footer>
  );
}

export default Footer;
