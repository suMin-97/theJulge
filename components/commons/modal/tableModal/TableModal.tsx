import { Application } from '@/components/table/applicationTypes';
import Modal from '../Modal';
import TableModalTop from './TableModalTop';
import TableModalText from './TableModalText';
import styles from './TableModal.module.scss';

/**
 * tableModal 컴포넌트 입니다.
 * table에서 신청 목록을 클릭하면 나오는 모달 입니다.
 * table에서 item 객체를 prop으로 받고 레이아웃을 구성합니다.
 * @param {boolean} props.showModal 모달 상태 값
 * @param {function} props.handleClose 모달 닫는 함수
 * @param {object} props.items table item의 객체
 */
interface TableModalProps {
  showModal: boolean;
  handleClose: () => void;
  items: Application;
}
export default function TableModal({
  showModal,
  handleClose,
  items,
}: TableModalProps) {
  const { user } = items;

  // console.log(item);
  return (
    <Modal showModal={showModal} handleClose={handleClose}>
      <div className={styles.tableModal}>
        <div>
          <TableModalTop
            name={user.item.name!}
            phone={user.item.phone!}
            handleClose={handleClose}
          />
          <TableModalText text={user.item.bio!} />
        </div>
      </div>
    </Modal>
  );
}
