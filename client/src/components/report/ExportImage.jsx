import { toPng } from "html-to-image";

function ExportImage({ reportId }) {
  const exportImage = async () => {
    const node = document.getElementById(reportId);

    if (!node) {
      alert("Report not found");
      return;
    }

    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = "Medical_Report.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to export image");
    }
  };

  return (
    <button
      onClick={exportImage}
      className="rounded-xl bg-indigo-600 px-5 py-2 font-semibold hover:bg-indigo-700"
    >
      🖼 Export Image
    </button>
  );
}

export default ExportImage;