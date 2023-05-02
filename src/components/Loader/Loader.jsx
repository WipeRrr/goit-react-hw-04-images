import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css'
const Loader = () => {
  return (
    <div className={css.ThreeDots}>
      <ThreeDots
        height="200"
        width="200"
        color="#3f51b5"
        ariaLabel="ThreeDots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
}

export default Loader