import React from 'react';
import './ReportingPage.scss';
import AddNewReport from '../../components/AddNewReport/AddNewReport';

function ReportingPage() {

  return (
    <>
      <article className="reporting-page">
        <div className="reporting-page__layout">
          <section className="reporting__search">
            <h2>Report Environmental Issue</h2>
          </section>
          <section className="reporting-page__report-form">
            <AddNewReport /> {/* Renderiza el formulario aquí */}
          </section>
        </div>
      </article>
    </>
  );
}

export default ReportingPage;
