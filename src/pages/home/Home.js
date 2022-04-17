import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

// styles
import styles from './Home.module.css';
import StudentForm from './StudentForm';

// components
import StudentList from './StudentList';

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error, isQuerying } = useCollection(
    'students',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );

  console.log(documents);

  return (
    <>
      {isQuerying && (
        <div className={styles.container}>
          <div className={styles.content}>
            <p>Loading...</p>
          </div>
        </div>
      )}
      {!isQuerying && (
        <div className={styles.container}>
          <div className={styles.content}>
            {error && <p>{error}</p>}
            {documents && <StudentList students={documents} />}
          </div>
          <div className={styles.sidebar}>
            {!documents && <StudentForm uid={user.uid} />}
          </div>
        </div>
      )}
    </>
  );
}
