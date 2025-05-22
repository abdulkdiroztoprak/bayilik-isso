import React from 'react';
import './css/about.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

function About() {
     const linkedinLink = "https://www.linkedin.com/in/abdulkadiroztoprak/"; 
  const instagramLink = "https://www.instagram.com/abdulkadiroztoprak"; 

  const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>Hakkımızda</h1>
        <p className="hero-text">
Biz, sürekli gelişimi ve yeniliği ilke edinmiş bir ekip olarak; Yazılım, Tasarım ve Tekstil Baskı alanlarında faaliyet gösteriyor, her zaman daha ileriye ulaşmak adına durmaksızın çalışmaktayız. Hedeflerimize kararlılıkla yürürken gerektiğinde bu yolda koşmaktan da asla çekinmiyoruz.

Kurmak istediğimiz bu yapının temelinde; vizyoner bakış açısı, güvenilir hizmet, yenilikçi çözümler ve müşteri memnuniyeti odaklı yaklaşım yer alıyor. Sadece bugünü değil, yarını da düşünen bir anlayışla ilerliyor; her adımda büyümeyi ve gelişmeyi hedefliyoruz.
Müşterilerimizin ihtiyaçlarına en doğru ve etkili çözümleri sunmak için var gücümüzle çalışıyor; güçlü bir iletişim, profesyonel hizmet anlayışı ve etik değerlere bağlılık ile işimizi titizlikle yürütüyoruz.
İşimizi sadece bir ticaret değil, bir sorumluluk ve değer üretme aracı olarak görüyor; topluma, sektöre ve geleceğe katkı sağlama misyonuyla yolumuza devam ediyoruz.
        </p>
        <br></br>
        <div className="social-links">
          <div className="social-icon" onClick={() => openLink(linkedinLink)}>
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </div>
          <div className="social-icon" onClick={() => openLink(instagramLink)}>
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </div>
        </div>
      </section>

      <section className="our-metin">
        <h2>Değerlerimiz</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Müşteri Odaklılık</h3>
            <p>Müşterilerimizin ihtiyaçlarını anlamak ve onlara en iyi çözümleri sunmak önceliğimizdir.</p>
          </div>
          <div className="card">
            <h3>Kalite</h3>
            <p>Sunduğumuz ürün ve hizmetlerde yüksek kalite standartlarını gözetiriz.</p>
          </div>
          <div className="card">
            <h3>İnovasyon</h3>
            <p>Sürekli gelişime inanır, yenilikçi yaklaşımlarla çözümler üretiriz.</p>
          </div>
          <div className="card">
            <h3>Güvenilirlik</h3>
            <p>Müşterilerimizle ve iş ortaklarımızla şeffaf ve güvene dayalı ilişkiler kurarız.</p>
          </div>
        </div>
      </section>

         <section className="our-values">
        <h2>Ürünlerimiz - Tasarımlarımız</h2>
        <div className="card-grid">
          <div className="card">
           <img src="/image/1.png" alt="" srcset="" />
          </div>
          <div className="card">
           <img src="/image/2.png" alt="" srcset="" />
          </div>
          <div className="card">
           <img src="/image/3.png" alt="" srcset="" />
          </div>
          <div className="card">
          <img src="/image/4.png" alt="" srcset="" />
          </div>
          <div className="card">
          <img src="/image/5.png" alt="" srcset="" />
          </div>
          <div className="card">
          <img src="/image/6.png" alt="" srcset="" />
          </div>
          <div className="card">
          <img src="/image/7.png" alt="" srcset="" />
          </div>
          <div className="card">
          <img src="/image/8.png" alt="" srcset="" />
          </div>
           <div className="card">
          <img src="/image/10.png" alt="" srcset="" />
          </div>
           <div className="card">
          <img src="/image/11.png" alt="" srcset="" />
          </div>
           <div className="card">
          <img src="/image/12.png" alt="" srcset="" />
          </div>
           <div className="card">
          <img src="/image/13.png" alt="" srcset="" />
          </div>
        </div>
      </section>

      
    </div>
  );
}

export default About;