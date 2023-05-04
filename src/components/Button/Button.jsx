import css from './Button.module.css'

export default function Button({onClick}) {
    return (
      <button onClick={onClick} className={css.Button} type="button">
        Load more
      </button>
    );
}