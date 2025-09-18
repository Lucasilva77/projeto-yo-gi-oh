import React from "react";
import "../styles/modal.css";

export default function Modal({ show, onClose, productName, isDuplicate }) {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // evita fechar clicando dentro
      >
        {isDuplicate ? (
          <>
            <p>
              Produto <strong className="product-name">${productName}</strong> já foi
              adicionado ao carrinho!
            </p>
          </>
        ) : (
          <>
            <p>
              Produto <strong className="product-name">${productName}</strong>{" "}
              adicionado ao carrinho com sucesso!
            </p>
          </>
        )}

        <button className="modal-close" onClick={onClose}>
          FECHAR
        </button>
      </div>
    </div>
  );
}
