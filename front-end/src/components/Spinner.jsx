import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', 
    }}>
      <div>
        <TailSpin
          height={100}
          width={200}
          color="#f5385d"
          radius="1"
          visible={true}
        />
      </div>
    </div>
  );
};

export default Spinner;
