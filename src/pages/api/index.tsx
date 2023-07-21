import { NextApiRequest, NextApiResponse } from 'next';
import ReactPDF from '@react-pdf/renderer';
import { Document, Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer';
import puppeteer from 'puppeteer';
import ReactDOMServer from 'react-dom/server';
import { Chart } from '..';
import ExampleUsage from '../ExampleUsage';
import PDFView from '../PDFView';

type Data = {
  status: string;
};

const generatePDFContent = (chartImage: string) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header} fixed>
        ~ Created with react-pdf ~
      </Text>
      <View style={styles.content}>
        <Text>Lorem ipsum dolor sittus facere. Repellendus harum quibusdam aperiam eveniet ex. Cum rem numquam perspiciatis quod? Sit molestiae commodi aut dignissimos, eos ad, assumenda nesciunt ullam illum dolor doloremque rem quibusdam corporis voluptates aspernatur ratione deleniti inventore.</Text>
        <Image src={chartImage} />
      </View>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
);

const captureChartImage = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const chartHtml = ReactDOMServer.renderToString(<Chart />);
  const chartContainer = `${chartHtml}`;
  await page.setContent(chartContainer);
  const chartImage = await page.screenshot({ encoding: 'base64' });
  await browser.close();
  return `data:image/png;base64,${chartImage}`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // const chartImage = await captureChartImage();
    // const pdfContent = generatePDFContent(chartImage);
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


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  content: {
    margin: 10,
    padding: 10,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});
