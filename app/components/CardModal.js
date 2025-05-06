// components/CardModal.js
import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const CardModal = ({ show, onClose, cards = [] }) => {
  const [copiedCard, setCopiedCard] = useState(null);

  const grouped = cards.reduce((acc, card) => {
    acc[card.action] = acc[card.action] || [];
    acc[card.action].push(card);
    return acc;
  }, {});

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Tarjetas de prueba</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Object.entries(grouped).map(([action, group]) => (
          <div key={action} className="mb-4">
            <h5 className="text-primary border-bottom pb-1">{action}</h5>
            <div className="row">
              {group.map((card) => (
                <div key={card.name} className="col-md-6 mb-3">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h6 className="card-title mb-1">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <img
                            src={`/assets/cards/${card.typeName.toLowerCase()}.png`}
                            alt={card.typeName}
                            style={{ height: "24px" }}
                          />
                        </div>
                      </h6>
                      <p className="card-text">
                        <strong>Número:</strong> {card.text}
                        <br />
                        {card.expiration && (
                          <>
                            <strong>Expira:</strong> {card.expiration}
                            <br />
                          </>
                        )}
                        <button
                          className="btn btn-outline-secondary btn-sm mt-2"
                          onClick={() => {
                            navigator.clipboard.writeText(card.number);
                            setCopiedCard(card.number);
                            setTimeout(() => setCopiedCard(null), 2000); // Oculta luego de 2s
                          }}
                        >
                          Copiar número
                          {copiedCard === card.number && (
                            <small className="text-success mt-1 d-block">
                              ¡Número copiado!
                            </small>
                          )}
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardModal;
