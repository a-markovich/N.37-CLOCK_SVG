"use strict"

function createСlock() {

    const degreesInHour = 360/12 // на столько град. передвигается часовая стрелка за 1 час
    const degreesInMinuteForHour = 360/12/60 // на столько град. передвигается часовая стрелка за 1 минуту
    const degreesInSecondForHour = 360/12/60/60 // на столько град. передвигается часовая стрелка за 1 секунду
    const degreesInMinuteOrSecond = 360/60 // на столько град. передвигается минутная или секундная стрелка за 1 минуту или секунду
    const degreesInSecondForMinute = 360/60/60 // на столько град. передвигается минутная стрелка за 1 секунду

    const radiusClockFace = 200; 

    const inputElem = document.getElementById("clockD");
    const clockDiameter = inputElem.value;

    //удаление поля и кнопки
    const labelElem = document.getElementById("labelСlockD");
    const buttonElem = document.getElementById("button");
    labelElem.remove();
    buttonElem.remove();

    const SVGElem=document.getElementById("clockSVG");
    SVGElem.setAttribute("width", clockDiameter);
    SVGElem.setAttribute("height", clockDiameter);
    SVGElem.setAttribute("viewBox",`0 0 ${radiusClockFace*2} ${radiusClockFace*2}`);
    SVGElem.setAttribute("display","block");

    const clockFace = document.getElementById("clockFace");
    clockFace.setAttribute("r", radiusClockFace);
    clockFace.setAttribute("cx", radiusClockFace);
    clockFace.setAttribute("cy", radiusClockFace);

    const hourHand=document.getElementById("hourHand");
    hourHand.setAttribute("x1", radiusClockFace);
    hourHand.setAttribute("y1", radiusClockFace*1.05);
    hourHand.setAttribute("x2", radiusClockFace);
    hourHand.setAttribute("y2", radiusClockFace*0.55);
    hourHand.setAttribute("stroke-width", radiusClockFace*0.06);
    hourHand.style.transformOrigin=`center center`;

    const minuteHand=document.getElementById("minuteHand");
    minuteHand.setAttribute("x1", radiusClockFace);
    minuteHand.setAttribute("y1", radiusClockFace*1.05);
    minuteHand.setAttribute("x2", radiusClockFace);
    minuteHand.setAttribute("y2", radiusClockFace*0.25);
    minuteHand.setAttribute("stroke-width", radiusClockFace*0.04);
    minuteHand.style.transformOrigin=`center center`;

    const secondHand=document.getElementById("secondHand");
    secondHand.setAttribute("x1", radiusClockFace);
    secondHand.setAttribute("y1", radiusClockFace*1.05);
    secondHand.setAttribute("x2", radiusClockFace);
    secondHand.setAttribute("y2", radiusClockFace*0.13);
    secondHand.setAttribute("stroke-width", radiusClockFace*0.015);
    secondHand.style.transformOrigin=`center center`;

    const digitalTime=document.getElementById("digitalTime");  
    digitalTime.setAttribute("x", radiusClockFace);
    digitalTime.setAttribute("y", radiusClockFace*0.7);
    digitalTime.setAttribute("font-size", radiusClockFace*0.2);

    for (let i=1; i<=12; i++) {
        let angleDegrees = 360/12*i;
        let angleRadians=angleDegrees/180*Math.PI;

        const numbersCenterX =
            radiusClockFace+(radiusClockFace-radiusClockFace*0.18)*Math.sin(angleRadians);
        const numbersCenterY =
            radiusClockFace-(radiusClockFace-radiusClockFace*0.18)*Math.cos(angleRadians);
        
        let circle = document.createElementNS("http://www.w3.org/2000/svg",'circle');
        circle.setAttribute("r",`${radiusClockFace*0.13}px`);
        circle.setAttribute("cx",`${numbersCenterX}px`);
        circle.setAttribute("cy",`${numbersCenterY}px`);
        circle.setAttribute("fill","#48b382");
        SVGElem.appendChild(circle);

        let number = document.createElementNS("http://www.w3.org/2000/svg",'text');
        number.setAttribute("font-family","sans-serif");
        number.setAttribute("font-size",`${radiusClockFace*0.12}`);
        number.setAttribute("fill","black");
        number.setAttribute("text-anchor","middle");
        number.setAttribute("x",`${numbersCenterX}px`);
        number.setAttribute("y",`${numbersCenterY+radiusClockFace*0.12/2}px`);
        number.textContent=`${i}`;
        SVGElem.appendChild(number);
    }

    let clockHands = document.getElementById("clockHands");
    SVGElem.appendChild(clockHands);
    
    function currentTime() {
        let nowTime = new Date();
        let nowHours = nowTime.getHours();
        let nowMinutes = nowTime.getMinutes();
        let nowSeconds = nowTime.getSeconds();

        hourHand.style.transform=
            `rotate( ${degreesInHour*nowHours + degreesInMinuteForHour*nowMinutes + degreesInSecondForHour*nowSeconds}deg )`;
        minuteHand.style.transform=
            `rotate( ${degreesInMinuteOrSecond*nowMinutes + degreesInSecondForMinute*nowSeconds}deg )`;
        secondHand.style.transform=
            `rotate( ${degreesInMinuteOrSecond*nowSeconds}deg )`;
 
        digitalTime.textContent=`${nowTime.toLocaleTimeString()}`;

        console.log( nowTime.toLocaleTimeString() );

        setTimeout(currentTime,1010-nowTime.getMilliseconds());
    }

    currentTime();

    setInterval(currentTime,1000);
}




