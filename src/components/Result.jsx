import React, { useEffect, useState } from 'react';
import "./../styles/result.css"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Result = () => {
    // const someValue = JSON.parse(localStorage.getItem('myObject'));
    const someValue = useSelector(state => state.yourSlice.someValue);
    const [applyed, setApplyed] = useState(false)
    const [myrank, setrank] = useState(false)
    try{
        var a = someValue[0].id
    }catch(e){
        alert("Redirecting to lobby...!")
        window.location.replace("/")
    }
    useEffect(()=>{
        setApplyed(true)
        var team = someValue.map((someValue, index) => {
            return {
              rank: index + 1,
              name: someValue.state.profile.name,
              handle: 'lewishamilton', // Replace with the actual handle if available in your data
              img: someValue.state.profile.photo,
              kudos: someValue.state.kills,
              deaths: someValue.state.deaths,
              sent: 31,
            };
          });
        team = team.sort((a, b) =>{ b.kudos - a.kudos});
        team.forEach((player, index) => {
            player.rank = index + 1;
        });

        const randomEmoji = () => {
            const emojis = ['👏','👍','🙌','🤩','🔥','⭐️','🏆','💯'];
            let randomNumber = Math.floor(Math.random() * emojis.length);
            return emojis[randomNumber]
        }
        var class_obj = document.getElementById("list")
        while (class_obj.firstChild) {
            class_obj.removeChild(class_obj.firstChild);
        }
        if (applyed === false){
            console.log(applyed)
            console.log("the function are called...")
            let newRow = document.createElement('li');
                newRow.classList = 'c-list__item';
                newRow.innerHTML = `
                <div className="c-list__grid" style="display: contents;">
                    <div className="u-text--left u-text--small u-text--medium">
                    Rank
                    </div>
                    <div className="u-text--left u-text--small u-text--medium">
                    Name
                    </div>
                    <div className="u-text--right u-text--small u-text--medium">
                    # Kills/Deaths
                    </div>
                </div>`
            list.appendChild(newRow)
            team.forEach(member => {
                let newRow = document.createElement('li');
                newRow.classList = 'c-list__item';
                newRow.innerHTML = `
                    <div class="c-list__grid" style="display: contents;">
                        <div class="c-flag c-place u-bg--transparent">${member.rank}</div>
                        <div class="c-media">
                            <img class="c-avatar c-media__img" src="${member.img}" />
                            <div class="c-media__content">
                                <div class="c-media__title">${member.name}</div>
                                <a class="c-media__link u-text--small" href="https://instagram.com/${member.handle}" target="_blank">@${member.handle}</a>
                            </div>
                        </div>
                        <div class="u-text--right c-kudos">
                            <div class="u-mt--8">
                                <strong>${member.kudos}</strong>/<strong>${member.deaths}</strong> ${randomEmoji()}
                            </div>
                        </div>
                    </div>
                `;
                if(member.rank === 1) {
                    newRow.querySelector('.c-place').classList.add('u-text--dark')
                    newRow.querySelector('.c-place').classList.add('u-bg--yellow')
                    newRow.querySelector('.c-kudos').classList.add('u-text--yellow')
                } else if(member.rank === 2) {
                    newRow.querySelector('.c-place').classList.add('u-text--dark')
                    newRow.querySelector('.c-place').classList.add('u-bg--teal')
                    newRow.querySelector('.c-kudos').classList.add('u-text--teal')
                } else if(member.rank === 3) {
                    newRow.querySelector('.c-place').classList.add('u-text--dark')
                    newRow.querySelector('.c-place').classList.add('u-bg--orange')
                    newRow.querySelector('.c-kudos').classList.add('u-text--orange')
                }
                list.appendChild(newRow)
            })
            setApplyed(true);
        }else{
            console.log("the function did not called...")
        }
        // Find Winner from sent kudos by sorting the drivers in the team array
        // let sortedTeam = team.sort((a, b) => b.kudos - a.kudos);
        let winner = team[0]

        // Render winner card
        const winnerCard = document.getElementById('winner')
        winnerCard.innerHTML = `
            <div class="u-text-small u-text--medium u-mb--16">MVP of the Match🔥</div>
            <img class="c-avatar c-avatar--lg" src="${winner.img}"/>
            <h3 class="u-mt--16">${winner.name}</h3>
            <span class="u-text--teal u-text--small">${winner.name}</span>
        `
    },[])

    return (
        <div className="l-wrapper">
        <div className="c-header">
            {/* <img
            className="c-logo"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/813538/km-logo-color.svg"
            draggable="false"
            /> */}
            <button className="c-button c-button--primary"><a href="lobby">Lobby</a></button>
        </div>
        <div className="l-grid">
            <div className="l-grid__item l-grid__item--sticky">
            <div className="c-card u-bg--light-gradient u-text--dark">
                <div className="c-card__body">
                <div className="u-display--flex u-justify--space-between">
                    <div className="u-text--left">
                    <div className="u-text--small">Room</div>
                        <h1>{someValue[0].id}</h1>
                    </div>
                    <div className="u-text--right">
                    <div className="u-text--small">Total bedding</div>
                    <h2>{someValue.kills}/{someValue.deaths}</h2>
                    </div>
                </div>
                </div>
            </div>
            <div className="c-card">
                <div className="c-card__body">
                <div className="u-text--center" id="winner" />
                </div>
            </div>
            </div>
            <div className="l-grid__item">
            <div className="c-card">
                <div className="c-card__header">
                <h3>Rank</h3>
                <select className="c-select">
                    <option selected="selected">
                        RoomId : {someValue[0].id}
                    </option>
                </select>
                </div>
                <div className="c-card__body">
                <ul className="c-list" id="list">
                    <li className="c-list__item">
                    <div className="c-list__grid">
                        <div className="u-text--left u-text--small u-text--medium">
                        Rank
                        </div>
                        <div className="u-text--left u-text--small u-text--medium">
                        Name
                        </div>
                        <div className="u-text--right u-text--small u-text--medium">
                        # Kills/Deaths
                        </div>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        </div>

    )
}

export default Result
