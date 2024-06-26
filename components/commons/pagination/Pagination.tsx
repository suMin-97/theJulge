import { useRouter } from 'next/router';
import { useState } from 'react';
import LeftButton from '@/public/images/leftButton.svg';
import LeftButtonOn from '@/public/images/leftButtonOn.svg';
import RightButtonOn from '@/public/images/rightButtonOn.svg';
import RightButton from '@/public/images/rightButton.svg';
import usePagination from '@/hooks/usePagenation';
import styles from './Pagination.module.scss';

/**
 * @param {Object} prop
 * @param {number} prop.totalCount  api로 받아온 전체 아이템 카운터 갯수
 * @param {number} prop.itemCount 한번에 출력할 아이템 갯수
 * @param {function} prop.handlePageClick 페이지 선택시 선택한 숫자로 쿼리가 바뀌고 해당 페이지로 넘어가는 함수
 */

interface PageNationProps {
  totalCount: number;
  itemCount: number;
}

function Pagination({ totalCount, itemCount }: PageNationProps) {
  const router = useRouter();
  const { pathname, query } = router;
  const page = parseInt(query.page as string, 10) || 1;
  const [selectedPage, setSelectedPage] = useState(page);

  const totalPages = Math.ceil(totalCount / itemCount);

  const isFirstPage = selectedPage === 1;
  const isLastPage = selectedPage === totalPages;
  // 페이지네이션 버튼 출력함수
  const { pageNumbers } = usePagination({ totalPages, page });

  const handlePageClick = async (pageNumber: number): Promise<void> => {
    setSelectedPage(pageNumber);
    await router.replace(
      {
        pathname,
        query: { ...query, page: pageNumber.toString() },
      },
      undefined,
      {
        shallow: false, // getServerSideProps는 같은 주소(pathname)일 경우 한번만 호출되서 이 옵션을 false로 바꿔서 호출되게 변경
        scroll: false,
      },
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageBox}>
        {isFirstPage ? (
          <LeftButton className={styles.icon} tabIndex={0} />
        ) : (
          <LeftButtonOn
            className={styles.icon}
            onClick={() => !isFirstPage && handlePageClick(selectedPage - 1)}
          />
        )}
        <div className={styles.pageNumberBox}>
          {pageNumbers.map(num => (
            <div
              tabIndex={0}
              className={`${styles.pageNumber} ${
                num === selectedPage ? styles.selected : ''
              }`}
              key={num}
              role="presentation"
              onClick={() => handlePageClick(num)}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  handlePageClick(num);
                }
              }}
            >
              {num}
            </div>
          ))}
        </div>
        {isLastPage ? (
          <RightButton className={styles.icon} tabIndex={0} />
        ) : (
          <RightButtonOn
            tabIndex={0}
            className={styles.icon}
            onClick={() => !isLastPage && handlePageClick(selectedPage + 1)}
          />
        )}
      </div>
    </div>
  );
}

export default Pagination;
