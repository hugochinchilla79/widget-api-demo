import React, { useState } from "react";
import config from "../config/widget-config.js";

const { render_url } = config;

const WidgetForm = ({ token }) => {
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  if (!token) return null;

  return (
    <div className="position-relative">
      {isIframeLoading && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white"
          style={{ zIndex: 10 }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      <iframe
        src={`${render_url}?lang=es&token=${token}`}
        width="400"
        height="800"
        onLoad={() => setIsIframeLoading(false)}
        title="Pago Widget"
      />
    </div>
  );
};

export default WidgetForm;
