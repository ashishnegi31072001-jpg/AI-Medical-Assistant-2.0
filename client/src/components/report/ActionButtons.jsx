function ActionButtons({
  onDownload,
  onDelete,
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      <button
        onClick={onDownload}
        className="rounded-lg bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-700"
      >
        📥 Download Report
      </button>

      <button
        onClick={onDelete}
        className="rounded-lg bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
      >
        🗑 Delete Report
      </button>
    </div>
  );
}

export default ActionButtons;