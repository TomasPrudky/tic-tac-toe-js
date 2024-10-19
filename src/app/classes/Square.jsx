const Square = ({ value, onClick }) => {
    return (
      <button 
        onClick={onClick} 
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'transparent',
          border: '1px solid #ededed',
          fontSize: '34px',
          fontWeight: 'bold',
        }}>
        {value}
      </button>
    );
  };
  
  export default Square;
  