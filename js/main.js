window.onload = function(){
    $('html,body').animate({ scrollTop: 0 })
    startApp();
}

//오프닝 대사 목록. 추가할경우 순서대로 넣어주세요
let openingMents = [
    {ment : "서울"},
    {ment : "디지텍"},
    {ment : "카지노에"},
    {ment : "오신 것을"},
    {ment : "환영합니다"},
    {ment : "자"},
    {ment : "이쪽으로 오시죠"},
]

//나레이션 대사 목록. 대사 내용과 언제 대사를 칠건지 정해둠.
let narrationMents = [
    {ment:"안녕하세요 제 이름은 블랙잭. 이 카지노의 핫한 알바생이죠."
    ,when:"tutorial"},
    {ment:"보아하니 당신..돈도 없어보이고..여친한테 차였구나?"
    ,when:"tutorial"}
]

function startApp(){
    //여기서 작업할것
    // opening();
    setInterval(function(){console.log(1)},10);
    // setTimeout(giveMoney, 7500);
}

function narration(){
    let ments = narrationMents.filter(x=>{if(x.when == 'tutorial') return x;})
    let mentCount = 0
    console.log(ments.length)
    
    //대사창 보여줌
    $('.mentBox').animate({
       top : '80%'
    }, 300, 'swing')
    //대사 출력
    let i = 0;
    let speed = 80
    function type() { 
        let ment = ments[mentCount].ment 
        if (i < ment.length) {
          $('.ment').append(ment.charAt(i))
          i++;
          setTimeout(type, speed);
        } else {
            i = 0
            if(mentCount < ments.length-1){
                mentCount++;
                toNext()
            } else {
                closeNar();
            }
        }
    }
    setTimeout(type, 800);
    function closeNar(){
        $('.nextBtn').css({transform : 'rotate(90deg)'})
        $('.nextBtn').show()
        $('.mentBox').on('click',function(){
            $('.mentBox').animate({
                top : '100%'
            },300,'swing')
            $('.mentBox').off('click')
            setTimeout(function(){$('.nextBtn').css({transform : ''})},300)
        })
    }
    function toNext(){
        $('.nextBtn').show()
        $('.mentBox').on('click',function(){
            $('.nextBtn').hide();
            $('.ment').empty();
            type()
            $('.mentBox').off('click')
        })
    }
    // setTimeout(toNext, ments[mentCount].ment.length*80+1000);
    // document.getElementsByClassName('mentBox')[0].addEventListener('click', )
}

async function giveMoney(){
    narration()
    $('.money').animate({
        top:'-100px'
    },1000,'swing')
    .on('click',function(){
        $('.money').animate({
            top:'200%'
        },1000,'swing')
    })
} 

function opening(){ 
    let mentCount = 0;
    let saying = setInterval(() => {
        if(mentCount+1 == openingMents.length){clearInterval(saying)}
        if(openingMents[mentCount].ment=="환영합니다"){
            clearInterval(saying); 
            saying=setInterval(() => {
                if(mentCount+1 == openingMents.length){clearInterval(saying)}
                $('header').empty()
                $('header').append(`<p>${openingMents[mentCount].ment}</p>`)
            mentCount++  
            }, 1000);
        }
        $('header').empty()
        $('header').append(`<p>${openingMents[mentCount].ment}</p>`)
    mentCount++  
    }, 700);
    setTimeout(() => {
        $('html,body').animate({ scrollTop: `${$('#gambleZone').offset().top}px` }, 1000)
    }, 6300);
}

