import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const getFriendlyMessage = () => {
    if (error.message.includes("Network Error")) {
      return "Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.";
    }

    if (error.message.includes("404")) {
      return "Conteúdo não encontrado. Por favor, verifique e tente novamente.";
    }

    // Caso contrário, retorna uma mensagem genérica
    return "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.";
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="p-6 bg-red-100 rounded-md text-red-700 max-w-md mx-auto mt-10 text-center"
    >
      <h2 className="text-xl font-bold mb-2">Ocorreu um erro!</h2>
      <p>{getFriendlyMessage()}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        aria-label="Tentar novamente"
      >
        Tentar novamente
      </button>
    </div>
  );
};

export default function ErrorBoundary({ children }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
      onError={(error, info) => {
        console.error("Erro capturado:", error);
        console.error("Informações adicionais:", info);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
