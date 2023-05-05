import css from './Button.module.css'
import PropTypes from 'prop-types';
export default function Button({onClick}) {
    return (
      <button onClick={onClick} className={css.Button} type="button">
        Load more
      </button>
    );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};