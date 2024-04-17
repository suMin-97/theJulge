import React from 'react';
import styles from './FilterButton.module.scss';

/**
 *
 * @param {Object} props
 * @param {React.Dispatch<React.SetStateAction<Location[]>>} props.setSelectLocation 주소 값 결정
 * @param {React.Dispatch<React.SetStateAction<Date | null>>} props.setStartDate 시작일 값 결정
 */

interface Location {
  id: number;
  name: string;
}

export default function FilterButton({
  setSelectLocation,
  setStartDate,
}: {
  setSelectLocation: React.Dispatch<React.SetStateAction<Location[]>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
}) {
  const handleInitialization = () => {
    setSelectLocation([]);
    setStartDate(new Date());
  };
  return (
    <div className={styles.filterButton}>
      <button type="button" onClick={handleInitialization}>
        초기화
      </button>
      <button type="button">적용하기</button>
    </div>
  );
}
