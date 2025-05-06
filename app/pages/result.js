import React, { useEffect, useState } from "react";

export default function Result() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setInfo({
      token: params.get("token"),
      authorization: params.get("auth"),
      amount: params.get("amount"),
      name: params.get("name"),
      lastname: params.get("lastname"),
      paymentDate: params.get("paymentDate"),
    });
  }, []);

  if (!info) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i
                  className="bi bi-check-circle-fill text-success"
                  style={{ fontSize: "4rem" }}
                ></i>
                <h2 className="mt-3 text-success">¡Pago exitoso!</h2>
                <p className="text-muted">
                  Tu transacción se ha procesado correctamente.
                </p>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>👤 Nombre</th>
                      <td>
                        {info.name} {info.lastname}
                      </td>
                    </tr>
                    <tr>
                      <th>🔐 Autorización</th>
                      <td>{info.authorization}</td>
                    </tr>
                    <tr>
                      <th>💳 Total pagado</th>
                      <td>${info.amount} USD</td>
                    </tr>
                    <tr>
                      <th>🕒 Fecha de pago</th>
                      <td>{new Date(info.paymentDate).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-4">
                <a href="/" className="btn btn-outline-primary">
                  Volver al inicio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
