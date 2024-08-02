import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../Components/styled/PageLoader/PageLoader";
import { getAllPdfs } from "../../store/actions/pdfActions";
import "./style.css";
const Pdf = () => {
  const { loading, pdfs, error } = useSelector((state) => state.pdf);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPdfs());
  }, [dispatch]);
  return (
    <div>
      <Navbar />

      <div
        className="max-width-1440 pdf-main-container"
        style={{ padding: "20px 130px" }}
      >
        {loading ? (
          <PageLoader />
        ) : (
          <>
            <h1>Browse Pdf Books</h1>
            <div className="pdf-books">
              {pdfs &&
                pdfs.map((pdf) => {
                  return (
                    <a href={pdf.url} target="_blank" rel="noreferrer">
                      <div className="pdf-book">
                        <img src="/pdf.png" alt="" />
                        <h2>{pdf.title}</h2>
                        <h3>By {pdf.author}</h3>
                        <h4>Uploaded By {pdf.user?.name}</h4>
                      </div>
                    </a>
                  );
                })}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Pdf;
