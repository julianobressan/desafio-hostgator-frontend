import React from 'react';
import "../../styles/style.css";

const Banner = () => (
    <section>
        <div className="banner">
            <div className="banner-left"><img className="banner-img-left" src="/images/desk.svg" alt="" /></div>
            <div className="banner-center">
                <div className="header-first-line">Hospedagem de Sites</div>
                <div className="header-main">Tenha uma hospedagem de sites estável e evite perder visitantes diariamente</div>
                <div className="header-items">
                    <div>
                    <img src="/images/check.svg" alt="" /> 99,9% de disponibilidade: seu site sempre no ar</div><div>
                    <img src="/images/check.svg" alt="" /> Suporte 24h, todos os dias</div><div><img src="/images/check.svg" alt="" /> Painel de Controle
                    cPanel</div>
                </div>
            </div>
        <div className="banner-right"><img className="banner-img-right" src="/images/Grupo29996.svg" alt="" /></div>
        </div>
        <div className="footer-banner"><img src="/images/curve.png" alt="" /></div>
    </section>
);

export default Banner;