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
    {ment:"안녕하세요. 처음 오신 손님이신가보네요?",when:"tutorial"},
    {ment:"제 이름은 블랙잭, 이 카지노의 아주 핫한 딜러죠.",when:"tutorial"},
    {ment:"보아하니..배팅할 돈은 없어보이시는데..",when:"tutorial"},
    {ment:"에잇, 처음오신분이니 칩 세개만 드릴테니까 한번 해봐요.",when:"tutorial"},
    {ment:"초심자에겐 이거만큼 따기 쉬운게 없죠. 슬롯머신이에요.",when:"slotMachine"},
    {ment:"칩하나 넣고 돌려봐요.",when:"slotMachine"},
 
]

function startApp(){
    //여기서 작업할것
    opening();
}

function narration(timing){
    let ments = narrationMents.filter(x=>{if(x.when == timing) return x;})
    $('.ment').empty()
    let mentCount = 0
    //블랙잭 등장
    $('#blackjack').animate({
        left : '100px'
    }, 600, 'linear')
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
                if(timing=='tutorial'){
                    document.getElementById('gambleZone').style.backgroundColor='black'
                    for(let j = 0; j < 3; j++){
                        giveChip()
                    }
                    setTimeout(() => {
                        narration('slotMachine')
                    }, 2000);
                }
                else if(timing=='slotMachine'){
                    setSlotMachine()
                }
            }
        }
    }
    setTimeout(type, 800);
    function closeNar(){
        $('.nextBtn').css({transform : 'rotate(90deg)'})
        $('.nextBtn').show()
        $('.mentBox').on('click',function(){
            //대사창 내려감
            $('.mentBox').animate({
                top : '100%'
            },300,'swing')
            $('.mentBox').off('click')
            //블랙잭 퇴장
            $('#blackjack').animate({
            left : '-40%'
            }, 700, 'linear')
            //무시하셈
            setTimeout(function(){
                $('.nextBtn').css({transform : ''})

            },300)
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
}


let chips = 0;
function giveChip(){
    $('#chips').append('<li class="chip"></li>')
    chips++
} 
function useChip(){
    $('.chip')[0].remove();
    chips--
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
        setTimeout(function(){
            narration('tutorial')
        },1200)
    }, 6300);
}
