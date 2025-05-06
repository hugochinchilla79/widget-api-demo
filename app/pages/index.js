import React from "react";
import PaymentForm from "../components/PaymentForm";
import WidgetForm from "../components/WidgetForm";
import CardModal from "../components/CardModal.js";
import TransactionInformation from "../components/TransactionInformation";
import config from "../config/widget-config.js";
import cardData from "../data/cards.json";

export default function Home() {
  const [form, setForm] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isWidgetReady, setIsWidgetReady] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const handleSubmit = (data) => {
    setIsSubmitting(false);
    console.log("Form data:", data);
    console.log("Data token:", data.token);
    setToken(data.token);
    setForm(data);
    setIsWidgetReady(true);
  };

  const handleSubmitting = (isSubmitting) => {
    setIsSubmitting(true);
  };

  React.useEffect(() => {
    const handleMessage = async (event) => {
      if (event.origin !== config.render_url) {
        console.warn("Origen no permitido:", event.origin);
        return;
      }

      const { data } = event;
      if (!data || data.type !== "PaymentProcessCompleted") return;

      const response = data.data;
      if (response.response_code === "PG402-02") {
        alert("❌ Error en el pago. Intenta nuevamente.");
        return;
      }

      console.log("✅ Respuesta del widget:", response);
      const queryParams = new URLSearchParams({
        token: response.token,
        authorization: response.customer_reply.authorization,
        amount: response.customer_reply.totalAmount,
      }).toString();

      console.log("✅ Datos recibidos del widget:");
      console.log(queryParams);
      //Esto se hace para redireccionar con los datos del pago ES OPCIONAL y debe ir a una url de tu sitio.
      window.location.href = `/result?token=${response.token}&auth=${response.customer_reply.authorization}&amount=${response.customer_reply.totalAmount}&name=${response.customer_reply.firstName}&lastname=${response.customer_reply.lastName}&paymentDate=${response.customer_reply.paymentDate}`;
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="container">
      <div className="row mt-4">
        {!isWidgetReady && (
          <div className="col position-relative">
            {isSubmitting && (
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 10,
                  color: "#fff",
                  backdropFilter: "blur(2px)",
                }}
              >
                <div
                  className="spinner-border text-light mb-3"
                  role="status"
                  style={{ width: "4rem", height: "4rem" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="fs-5">Procesando...</p>
              </div>
            )}
            <div
              style={{
                opacity: isSubmitting ? 0.4 : 1,
                pointerEvents: isSubmitting ? "none" : "auto",
              }}
            >
              <PaymentForm
                onFinish={handleSubmit}
                onSubmitting={handleSubmitting}
              />
            </div>
          </div>
        )}

        {isWidgetReady && (
          <div className="col">
            <TransactionInformation transaction={form}></TransactionInformation>
          </div>
        )}

        <div className="col pt-4 pl-4 pb-4">
          {isWidgetReady && token != null && (
            <WidgetForm token={token}></WidgetForm>
          )}
        </div>
      </div>

      <div className="row mt-4">
        <CardModal
          show={showModal}
          onClose={() => setShowModal(false)}
          cards={cardData}
        />

        <button
          className="btn btn-dark position-fixed bottom-0 start-0 m-3 px-4 py-2 shadow"
          style={{ zIndex: 1050 }}
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-credit-card me-2"></i> Ver tarjetas
        </button>
      </div>
    </div>
  );
}
