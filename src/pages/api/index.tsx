import { NextApiRequest, NextApiResponse } from 'next';
import ReactPDF from '@react-pdf/renderer';
import PDFView from '../PDFView';

type Data = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const pdfStream = await ReactPDF.renderToStream(<PDFView />);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="myGraphs.pdf"');
    res.status(200);
    pdfStream.pipe(res);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ status: 'error' });
  }
}