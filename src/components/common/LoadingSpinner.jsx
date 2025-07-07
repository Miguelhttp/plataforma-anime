export default function LoadingSpinner({ size = 12, color = "gray-400" }) {
  return (
    <div
      className={`animate-spin rounded-full border-t-transparent border-4 border-${color}`}
      style={{ height: size, width: size }}
    />
  );
}
