import jsPDF from 'jspdf';

export function generatePDF(clientName: string, responses: number[], snippetPairs: string[][]) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(`Web Style Quiz Results for ${clientName}`, 10, 20);

  responses.forEach((r, i) => {
    const [left, right] = snippetPairs[i];
    doc.setFontSize(12);
    doc.text(`Q${i + 1}: ${r === 0 ? left : right}`, 10, 30 + i * 10);
  });

  return doc.output('blob'); // can be used to download or attach to email
}
