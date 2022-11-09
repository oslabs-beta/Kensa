import * as React from 'react';

type Props = {
  name: string
}

const Hello = ({name}: Props) => {
  const [hi, setHi] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('clicking');
    setHi(!hi);
  };
  return (
    <div>
      <div>{hi ? 'Hello' : 'Hi'} {name}. This is a test app</div>
      <button onClick={handleClick}>Change</button>
    </div>
  );
};

export default Hello;