import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

CouterFeature.propTypes = {};

function CouterFeature(props) {
  const dispatch = useDispatch();
  const count = useSelector(function (state) {
    return state.count;
  });
  const handleIncrease = () => {
    const action = increase();
    dispatch(action);
  };
  const handleDecrease = () => {
    const action = decrease();
    dispatch(action);
  };
  return (
    <div>
      Couter {count}
      <button onClick={handleIncrease}>increase</button>
      <button onClick={handleDecrease}>decrease</button>
    </div>
  );
}
export default CouterFeature;
