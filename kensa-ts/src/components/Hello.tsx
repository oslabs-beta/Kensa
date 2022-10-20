import * as React from 'react';


type Props = {
  name: string
}

const Hello = ({name}: Props) => {
  const [hi, setHi] = React.useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('clicking')
    setHi(!hi);
  }
  return (
    <div>
      <div>{hi ? 'Hello' : 'Hi'}. My name is {name}</div>
      <button onClick={handleClick}>Change</button>
    </div>
  )
}

export default Hello;