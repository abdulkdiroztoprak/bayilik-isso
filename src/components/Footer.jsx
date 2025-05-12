import React from 'react';
import { Grid, Typography, Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <Grid container spacing={4} className="footer-container">
        {/* Logo and Tagline */}
        <Grid item xs={12} sm={6} md={2}>
          <div className="footer-logo">
            <Typography variant="h5" component="h2" className="footer-logo-text">
             Abdulkadir Öztoprak
            </Typography>
            <Typography variant="body2">
              İssoBeyazşehir
            </Typography>
          </div>
        </Grid>


        {/* Kategoriler */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" component="h3" gutterBottom>
            Kategoriler
          </Typography>
          <ul className="footer-links">
            <li><Link href="#" color="inherit">Çiğ Köfte</Link></li>
            <li><Link href="#" color="inherit">İçecekler</Link></li>
            <li><Link href="#" color="inherit">Tatlılar</Link></li>
          </ul>
        </Grid>

      

        {/* İletişim */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" component="h3" gutterBottom>
          Paket Servis
          </Typography>
         
          <Typography variant="body1" className="footer-contact">
            0550 200 40 00
          </Typography>
          <br></br>
          <Typography variant="caption" display="block" className="footer-note">
            Bu site reCAPTCHA ile korunmaktadır.
          </Typography>
        </Grid>

        {/* Sosyal Medya */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" component="h3" gutterBottom>
            Sosyal Medya
          </Typography>
          <ul className="footer-links">
            <li>
              <Link href="https://instagram.com/abdulkadiroztoprak" color="inherit" target="_blank" rel="noopener">
                <InstagramIcon className="footer-icon" /> Instagram
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/in/abdulkadiroztoprak/?originalSubdomain=tr" color="inherit" target="_blank" rel="noopener">
                <LinkedInIcon className="footer-icon" /> LinkedIn
              </Link>
            </li>
          </ul>
        </Grid>
      </Grid>

      {/* Copyright */}
      <div className="footer-copyright">
        <Typography variant="caption">
          © 2025 ABDULKADİR ÖZTOPRAK. Tüm Hakları Saklıdır.
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;