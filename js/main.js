window.onload = function(){
    $('html,body').animate({ scrollTop: 0 })
    startApp();
}

var openingments = [
    {ment : "서울"},
    {ment : "디지텍"},
    {ment : "카지노에"},
    {ment : "오신 것을"},
    {ment : "환영합니다"},
    {ment : "자"},
    {ment : "이쪽으로 오시죠"},
]

function startApp(){
    //여기서 작업할것
    opening();
    setTimeout(giveMoney, 7500);
}

function giveMoney(){
    $('.money').animate({
        top:'-100px'
    },1000,'swing')
    console.log(1)
} 

function opening(){ 
    var mentCount = 0;
    var saying = setInterval(() => {
        if(mentCount+1 == openingments.length){clearInterval(saying)}
        if(openingments[mentCount].ment=="환영합니다"){
            clearInterval(saying); 
            saying=setInterval(() => {
                if(mentCount+1 == openingments.length){clearInterval(saying)}
                $('header').empty()
                $('header').append(`<p>${openingments[mentCount].ment}</p>`)
            mentCount++  
            }, 1000);
        }
        $('header').empty()
        $('header').append(`<p>${openingments[mentCount].ment}</p>`)
    mentCount++  
    }, 700);
    setTimeout(() => {
        $('html,body').animate({ scrollTop: '1080px' }, 1000)
    }, 6300);
}