import React, { useState, useEffect } from "react";
import { usePlayersList } from "playroomkit";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSomeValue } from '../../slices/yourSlice';

export const Leaderboard = () => {
  const players = usePlayersList(true);
  const [timer, setTimer] = useState(60); // Initial timer value in seconds (5 minutes)
  const dispatch = useDispatch();
  const someValue = useSelector(state => state.yourSlice.someValue);
  const handleButtonClick = () => {
    dispatch(setSomeValue(players));
  };

  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "Are you sure you want to leave? If you leave the game the bedding amount did't fund.";
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    };
    const handleUnload = () => {
      // Perform any cleanup or additional logic before unmounting the component

      // Navigate to another page when the component is unmounted (page reload)
      history.push('/another-page');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedData = localStorage.getItem("myData");
      // console.log("the data is :",typeof(storedData),storedData,(storedData !== null) && (storedData !== 'false') && (storedData !== 'true'))
      if((storedData !== null) && (storedData !== 'false') && (storedData !== 'true ')){
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // Run this effect only once on component mount

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    // console.log(minutes === 0,remainingSeconds < 3)
    if (minutes < 1) {
      var obj = document.getElementById("timer_con");
      if (obj) {
        obj.style.backgroundColor = 'rgba(182, 47, 47, 0.99)';
        obj.style.padding = '4px 11px';
        obj.style.borderRadius = '9px';
        obj.style.fontFamily = 'cursive';
        obj.style.fontWeight = 'bold';
        obj.style.boxShadow = '0px 0px 20px 20px #ff000059';
        obj.style.border = '2px solid rgb(252, 38, 68)';
        obj.style.transition = 'background-color 0.5s ease-in-out';


        // console.log("form redux:",someValue )

      }
       if((minutes === 0) && (remainingSeconds < 1)){
        localStorage.setItem('myData', 'false');
        localStorage.setItem('myData', 'false');
        // console.log(localStorage.getItem("myData"),typeof(localStorage.getItem("myData")))
        // console.log("game over")
        handleButtonClick();
        // localStorage.setItem('myObject', JSON.stringify(players));
        navigate('/result'); 
      }
    }
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 p-4 flex z-10 gap-4">
      <div  style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', top: '11%', position:"fixed" }}>
        <p id="timer_con" style={{  backgroundColor: '#75b0feab',  padding: '4px 11px',  borderRadius: '9px',  fontFamily: 'cursive',  fontWeight: 'bold',  border: '2px solid #2682fc'}}>Time: {formatTime(timer)}</p>
      </div>

      {players.map((player) => (
          <div
            key={player.id}
            className={`bg-opacity-60 backdrop-blur-sm flex items-center rounded-lg gap-2 p-2 min-w-[140px]`}
            style={{backgroundColor: '#75B0FE'}}
          >
            <img
              src={player.state.profile?.photo || ""}
              className="w-10 h-10 border-2 rounded-full"
              style={{
                borderColor: player.state.profile?.color,
              }}
            />
            <div className="flex-grow">
              <h2 className={`font-bold text-sm`}>
                {player.state.profile?.name}
              </h2>
              <div className="flex text-sm items-center gap-4">
                <p>🔫 {player.state.kills}</p>
                <p>💀 {player.state.deaths}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="fixed top-4 right-4 z-10 text-white"
        onClick={() => {
          // toggle fullscreen
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            document.documentElement.requestFullscreen();
          }
        }}
      >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      </button>
    </>
  );
};

