const Chair = ({ rowIndex, chairIndex, chairType, isSelected, onClick }) => (
  <span
    className={`buying__scheme_chair chair_${chairType}${
      isSelected ? " chair_selected" : ""
    }`}
    data-type={chairType}
    onClick={onClick}
  >
    {`Row: ${rowIndex}, Seat: ${chairIndex}`} {/* Отображение с 1 */}
  </span>
);

export default Chair;
