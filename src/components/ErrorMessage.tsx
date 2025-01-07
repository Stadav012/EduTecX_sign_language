interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="p-4 text-red-500 bg-red-50 rounded-lg">
      <p>{message}</p>
    </div>
  );
}