
import React, { useEffect, useState } from 'react';
import { SampleLineChart } from './SampleChart';
import PDFView from './PDFView';
import { PDFViewer } from '@react-pdf/renderer';

export default function Home() {
  const [PdfViewComponent, setPdfViewComponent] = useState<null | (() => JSX.Element)>(null);

  useEffect(() => {
    import('./PDFView').then((module) => {
      setPdfViewComponent(module.default);
    });
  }, []);

  return (
    <div className='m-3'>
      <p>Lorem ipsum dolor sittus facere. Repellendus harum quibusdam aperiam eveniet ex. Cum rem numquam perspiciatis quod? Sit molestiae commodi aut dignissimos, eos ad, assumenda nesciunt ullam illum dolor doloremque rem quibusdam corporis voluptates aspernatur ratione deleniti inventore. Minima sit quia delectus repudiandae reiciendis facilis eos, facere repellendus fugit dolores aperiam sed hic, odio debitis eligendi voluptatem officia in iure nam rerum distinctio, enim sunt consequuntur blanditiis! Quam doloribus, amet explicabo commodi tempora praesentium reiciendis quisquam quaerat vitae. Saepe eaque sed voluptatum?</p>
      <SampleLineChart />
      {PdfViewComponent && <PDFViewer><PDFView /></PDFViewer>}
    </div>
  );
}

