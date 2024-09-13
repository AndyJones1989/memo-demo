import { useState } from 'react'
import './App.css'
import React from 'react'
import { mockGetData } from './api/api'
import { processData } from './utils'
import {MemoizedText, Text} from './text-component'

function App() {
  const [data, setData] = useState<Array<string> | null>(null)
  const [processing, setProcessing] = useState<boolean>(false);

  const fetchData = React.useCallback(async () => {
    if (!data) {
      const res = await mockGetData();
      setData(res);
    }
  }, [data, setData]);

  React.useEffect(() => {
    if (!data) {
      fetchData();
    }}, [fetchData, data]);

const handleProcessing = async () => {
  setProcessing(true);
  const refinedData = await processData(data || []);
  setData(refinedData);
  setProcessing(false);
}

const textClickHandler = ()=>{
  window.alert('you click on the text!')
}

// const memoTextClickHandler = React.useCallback(()=>{
//   window.alert('you click on the text!')
// },[]);
  

  return (
    <div>
        <h1>Andy's memoisation app</h1>
        <p>These cards show some data fetched from the server.</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          {data && !processing ? data.map((entry, index) => (
            <Card key={index} text={entry} buttonText="Process data" onButtonClick={handleProcessing} />
          )) : <div>Loading...</div>}
        </div>
        <Text onClick={textClickHandler}/>
        {/* <MemoizedText onClick={textClickHandler}/> */}
        {/* <MemoizedText onClick={memoTextClickHandler}/> */}
    </div>
  )
}

export default App


interface CardProps {
  text: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Card: React.FC<CardProps> = ({ text, buttonText, onButtonClick }) => {
  console.log('Card rendered');

  return (
    <div style={{ height: '400px', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>{text}</div>
      <button onClick={onButtonClick}>{buttonText}</button>
        
    </div>
  );
};


// function App() {
//   const [data, setData] = useState<Array<string> | null>(null);
//   const [processing, setProcessing] = useState<boolean>(false);
//   const [processedData, setProcessedData] = useState<Array<string> | null>(null);

//   const fetchData = React.useCallback(async () => {
//     if (!data) {
//       const res = await mockGetData();
//       setData(res);
//     }
//   }, [data, setData]);

//   React.useEffect(() => {
//     if (!data) {
//       fetchData();
//     }
//   }, [fetchData, data]);

//   const memoizedProcessedData = React.useMemo(async () => {
//     if (data) {
//       const tempData = await processData(data);
//       return tempData;
//     }
//     return null;
//   }, [data]);

//   const handleProcessing = async () => {
  
//     setProcessing(true);
//     setProcessedData(await memoizedProcessedData);
//     setProcessing(false);
//   };

//   // const handleProcessing = React.useCallback(async () => {
//   //   setProcessing(true);
//   //   setProcessedData(await memoizedProcessedData);
//   //   setProcessing(false);
//   // }, [memoizedProcessedData]);

//   const dataToShow = processedData || data;

//   return (
//     <div>
//       <h1>Andy's memoisation app</h1>
//       <p>These cards show some data fetched from the server.</p>
//       <div style={{ display: 'flex', gap: '20px' }}>
//         {dataToShow && !processing ? dataToShow.map((entry, index) => (
//           <Card key={index} text={entry} buttonText="Process data" onButtonClick={handleProcessing} />
//         )) : <div>Loading...</div>}
//       </div>
//     </div>
//   );
// }

// export default App