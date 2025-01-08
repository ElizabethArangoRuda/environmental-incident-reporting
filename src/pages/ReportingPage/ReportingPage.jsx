import React, { useState } from 'react';
import './ReportingPage.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AddNewReport from '../../components/AddNewReport/AddNewReport'; // Import the AddNewReport component

function ReportingPage() {

  return (
<>
    <Header />
    <article className="reporting-page">

      <div className="reporting-page__layout">
          <section className="reporting-page__report-form">
            <AddNewReport /> Add the AddNewReport component
          </section>
      </div>

      
    </article>
    <Footer />
    </>
  );
}

export default ReportingPage;  // Ensure this is present to allow default import
