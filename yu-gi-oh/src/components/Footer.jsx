import React from "react";
import abacaxi from "../assets/abacaxi.png";
import "./../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2023 FPR Animes - Todos os direitos reservados</p>
      <img src={abacaxi} alt="Abacaxi" className="footer-image" />
    </footer>
  );
}
