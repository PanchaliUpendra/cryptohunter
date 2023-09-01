const SelectButton = ({ children, selected, onClick }) => {
    return (
        <span onClick={onClick}>
          {children}
        </span>
      );
    };
    
export default SelectButton;