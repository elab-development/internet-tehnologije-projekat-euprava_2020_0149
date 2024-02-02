import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FDAKartica from './FDAKartica';
import ReactPaginate from 'react-paginate';
import './Pagination.css';
const OpenFDAComponent = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const currentItems = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  useEffect(() => {

    
    const fetchData = async () => {
      try {
        
        const result = await axios.get('https://api.fda.gov/food/enforcement.json?limit=50');
        setData(result.data.results);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={styles.container}>
      <h2>OpenFDA Food Recall Data</h2>
      <ul>
        {currentItems.map((item, index) => (
            <FDAKartica
            key={index}
            proizvod={item.product_description}
            razlogOpoziva={item.reason_for_recall}
            datumObjave={item.report_date}
            product_description={item.product_description}
        />
        ))}
      </ul>
      <ReactPaginate
            previousLabel={"Prethodna"}
            nextLabel={"Sledeća"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"activePageItem"}
            pageLinkClassName={"pageItem"}
            />


    </div>
  );
};
const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',  
      height: 'auto',
      background: 'linear-gradient(135deg, #e2dadb 25%, #dae2df 25%, #dae2df 50%, #a2a7a5 50%, #a2a7a5 75%, #6d696a 75%)',
      padding: '20px 0'
    },
 
      

};
export default OpenFDAComponent;
