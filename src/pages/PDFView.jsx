import { Document, Page, PDFViewer, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ChartSvg } from './Chart'
import CustomScatterChart from './charts/ScatterChart'
import { SampleLineChart, SampleBarChart } from './SampleChart'
import Html from 'react-pdf-html';
import ReactDOMServer from 'react-dom/server';

const PDFView = () => {
  const element = (
    <html>
      <body>
        <style>
          {`
          h2 {
            background: darkgreen;
            color: white;
          }`}
        </style>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <table>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Foo</td>
              <td>Bar</td>
              <td>Foobar</td>
            </tr>
            <tr>
              <td colspan="2">Foo</td>
              <td>Bar</td>
            </tr>
            <tr>
              <td>Some longer thing</td>
              <td>Even more content than before!</td>
              <td>Even more content than before!</td>
            </tr>
          </tbody>
          <ul>
            <li>Unordered item</li>
            <li>Unordered item</li>
          </ul>
          <ol>
            <li>Ordered item</li>
            <li>Ordered item</li>
          </ol>
        </table>
      </body>
    </html>
  );
  const element2 = (
    <html>
      <body>
        <style>
          {`
          h2 {
            background: darkgreen;
            color: white;
          }`}
        </style>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <table>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Foo</td>
              <td>Bar</td>
              <td>Foobar</td>
            </tr>
            <tr>
              <td colspan="2">Foo</td>
              <td>Bar</td>
            </tr>
            <tr>
              <td>Some longer thing</td>
              <td>Even more content than before!</td>
              <td>Even more content than before!</td>
            </tr>
          </tbody>
          <ul>
            <li>Unordered item</li>
            <li>Unordered item</li>
          </ul>
          <ol>
            <li>Ordered item</li>
            <li>Ordered item</li>
          </ol>
        </table>
      </body>
    </html>
  );
  
  const html = ReactDOMServer.renderToStaticMarkup(element);
  const html1 = ReactDOMServer.renderToStaticMarkup(element2);
  return(
    <Document>
      <Page>
        <Text style={styles.header} fixed>
          ~ Created with react-pdf ~
        </Text>
        <Text style={styles.title}>React PDF test</Text>
        <View style={styles.section}>
          <Text style={styles.chartTitle}>Line Chart</Text>
          <View style={styles.sideBySide}>
            <ChartSvg width={500} height={800}>
              <SampleLineChart />
            </ChartSvg>
          </View>
          <Text style={styles.chartTitle}>Bar Chart</Text>
          <View>
          <ChartSvg width={800} height={600} debug={null} style={null}>
            <SampleBarChart />
          </ChartSvg>
          </View>
          <View>
          <ChartSvg width={800} height={600} debug={null} style={null}>
            <CustomScatterChart />
          </ChartSvg>
          </View>
        </View>
        <Html>{html}</Html>
        <ChartSvg width={500} height={800}>
          <SampleLineChart />
        </ChartSvg>
        <Html>{html1}</Html>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
      backgroundColor: '#ffffff',
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      textDecoration: 'underline',
      textAlign: 'center',
  },
  section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
  },
  line: {
      borderBottom: 1,
      marginBottom: 40,
  },
  chartTitle: {
      fontSize: 14,
      marginBottom: 5,
  },
  sideBySide: {
      display: 'flex',
      flexDirection: 'row',
  },
  paragraph: {
      fontSize: 10,
      maxWidth: '40%',
      marginTop: 20,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
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
})

export default PDFView;