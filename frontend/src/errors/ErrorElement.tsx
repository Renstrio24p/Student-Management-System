import { useRouteError } from "react-router-dom";

type ErrorStatus = {
  status?: number;
  message?: string;
};

export default function ErrorElement() {
  const error = useRouteError() as ErrorStatus;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
        <p className="mt-4 text-lg text-gray-700">Something went wrong.</p>
        {error?.status && (
          <p className="text-gray-600 mt-2">
            <strong>Status Code:</strong> {error.status}
          </p>
        )}
        {error?.message && (
          <p className="text-gray-600 mt-2">
            <strong>Error Message:</strong> {error.message}
          </p>
        )}
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => (window.location.href = "/")}>
          Go Home
        </button>
      </div>
    </div>
  );
}
