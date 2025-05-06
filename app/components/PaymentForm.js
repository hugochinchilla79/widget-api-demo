// components/PaymentForm.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import countriesData from "@data/countries.json";
import config from "../config/widget-config.js";

console.log(config.api_base_url);

const PaymentForm = ({ onFinish, onError, onSubmitting }) => {
  const autofillAndSubmit = () => {
    const demoData = {
      name: "John",
      lastname: "Doe",
      email: "johndoe@testing.com",
      address: "San Salvador",
      countryId: "222",
      state: "San Salvador",
      city: "San Salvador",
      phone: "77777777",
      details: {
        description: "Ecommerce Purchase",
        quantity: 1,
        amount: 10.0,
      },
    };

    setForm(demoData);
  };

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    address: "",
    countryId: "",
    state: "",
    city: "",
    phone: "",
    details: {
      description: "Compra en línea",
      quantity: 1,
      amount: 10.0,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setForm((prev) => ({
      ...prev,
      details: { ...prev.details, quantity: value },
    }));
  };

  const selectedCountry = countriesData.find(
    (c) => c.id === parseInt(form.countryId)
  ) || { states: [] };

  const handleSubmit = async (e) => {
    onSubmitting(true);
    e.preventDefault();

    const payload = {
      domain: window.location.hostname,
      name: form.name,
      lastname: form.lastname,
      email: form.email,
      address: form.address,
      countryId: parseInt(form.countryId),
      state: form.state,
      city: form.city,
      phone: form.phone,
      details: [form.details],
      currencyId: "USD",
    };

    try {
      const response = await fetch(`/api/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Checkout failed");

      payload.token = data.pagadito_response.token;
      onFinish(payload);
    } catch (error) {
      console.error("Error en el proceso:", error);
      if (onError) onError(error);
    }
  };

  return (
    <div className="card p-4 mt-4">
      <h2 className="mb-4">Demo Widget</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">País</label>
            <select
              className="form-select"
              name="countryId"
              value={form.countryId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un país</option>
              {countriesData.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <label className="form-label">Estado</label>
            <select
              className="form-select"
              name="state"
              value={form.state}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un estado</option>
              {selectedCountry.states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Ciudad</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            className="form-control"
            value={form.details.description}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cantidad</label>
          <input
            type="number"
            className="form-control"
            min="1"
            value={form.details.quantity}
            onChange={handleQuantityChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio Unitario</label>
          <input
            type="text"
            className="form-control"
            value={form.details.amount.toFixed(2)}
            readOnly
          />
        </div>

        <button type="submit" className="btn btn-primary btn-lg btn-block">
          Render Widget!
        </button>
      </form>
      <button
        className="btn btn-secondary position-fixed top-0 start-0 m-3 px-3 py-2 shadow-sm"
        onClick={autofillAndSubmit}
      >
        <i className="bi bi-lightning-fill me-1"></i> Llenado rápido
      </button>
    </div>
  );
};

export default PaymentForm;
