import React from 'react';
import { StatusButton } from '@/components/table/StatusButton';
import Pagination from '@/components/commons/pagination/Pagination';
import { ApplicationPageProps } from '@/ssr/myDetailPageSsr';
import { formatNoticeTime, formatWage } from '@/utils/noticeDataFormetters';
import styles from './Table.module.scss';

/**
 * @param {Object}items   받아오는 데이터
 * @param {number}itemCount 보여지는 리스트 개수
 * @param {number}totalCount 총 데이터수
 */
interface TableProps extends ApplicationPageProps {}

function EmployeeTable({ items, totalCount, itemCount }: TableProps) {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.gridContainer}>
        <div className={`${styles.gridHeader} ${styles.gridCellFirst}`}>
          <h6>가게</h6>
        </div>
        <div className={`${styles.gridHeader}`}>
          <h6>일자</h6>
        </div>
        <div className={`${styles.gridHeader}`}>
          <h6>시급</h6>
        </div>
        <div className={`${styles.gridHeader}`}>
          <h6>상태</h6>
        </div>

        {items.map(list => {
          const { item } = list;
          const { shop, notice } = item;
          const noticeTime = formatNoticeTime(
            notice.item.startsAt,
            Number(notice.item.workhour),
          );

          return (
            <React.Fragment key={item.id}>
              <div className={`${styles.gridCell} ${styles.gridCellFirst}`}>
                <p> {shop.item.name}</p>
              </div>
              <div className={`${styles.gridCell}`}>
                <p>{noticeTime}</p>
              </div>
              <div className={`${styles.gridCell} `}>
                <p>{formatWage(Number(notice.item.hourlyPay))}</p>
              </div>
              <div className={`${styles.gridCell} `}>
                <StatusButton
                  item={item}
                  status={item.status}
                  type="employee"
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <Pagination itemCount={itemCount} totalCount={totalCount} />
    </div>
  );
}

export default EmployeeTable;
