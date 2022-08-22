import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './TextBox.module.scss';

interface ITextBoxProps {
  placeholder: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}

export default function TextBox(props: ITextBoxProps) {
  const { placeholder, defaultValue, value, onChange, onSearch } = props;
  const [text, setText] = useState(defaultValue || value || '');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(text);
    }
  };
  const onClearHandler = () => {
    setText('');
    if (onChange) {
      onChange('');
    }
    if (onSearch) {
      onSearch('');
    }
  };
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder={placeholder}
        value={value || text}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
      />
      {text.length ? (
        <div className={styles.clearButton} onClick={onClearHandler}>
          <FontAwesomeIcon icon={faXmark} size="xs" />
        </div>
      ) : null}
    </div>
  );
}
