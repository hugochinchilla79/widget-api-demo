// components/TransactionInformation.js
import React from "react";
import countriesData from "../data/countries.json";

const TransactionInformation = ({ transaction }) => {
  if (!transaction) return null;

  const {
    name,
    lastname,
    email,
    address,
    countryId,
    state,
    city,
    phone,
    details,
  } = transaction;

  const country = countriesData.find((c) => c.id === parseInt(countryId));
  const countryName = country ? country.name : "N/A";
  const item = details[0];

  return (
    <div
      className="card p-4 mt-4 shadow-lg border-0 animate__animated animate__fadeIn"
      style={{ maxWidth: "600px", margin: "0 auto" }}
    >
      <div className="text-center mb-4">
        <h3 className="fw-bold text-primary">Resumen de la Compra</h3>
        <p className="text-muted">
          Verifique los datos antes de continuar con el pago.
        </p>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <i className="bi bi-person-fill me-2 text-primary"></i>
          <strong>Cliente:</strong> {name} {lastname}
        </li>
        <li className="list-group-item">
          <i className="bi bi-envelope-fill me-2 text-primary"></i>
          <strong>Email:</strong> {email}
        </li>
        <li className="list-group-item">
          <i className="bi bi-telephone-fill me-2 text-primary"></i>
          <strong>Teléfono:</strong> {phone}
        </li>
        <li className="list-group-item">
          <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
          <strong>Dirección:</strong> {address}, {city}, {state}, {countryName}
        </li>
        <li className="list-group-item">
          <i className="bi bi-bag-fill me-2 text-primary"></i>
          <strong>Producto:</strong> {item.description}
        </li>
        <li className="list-group-item">
          <strong>Cantidad:</strong> {item.quantity}
        </li>
        <li className="list-group-item">
          <strong>Total a cobrar:</strong> $
          {(item.quantity * item.amount).toFixed(2)} USD
        </li>
      </ul>
    </div>
  );
};

export default TransactionInformation;
