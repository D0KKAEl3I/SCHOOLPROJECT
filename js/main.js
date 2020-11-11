window.onload = function(){
    $('html,body').animate({ scrollTop: 0 })
    opening();
}

//오프닝 대사 목록. 추가할경우 순서대로 넣어주세요
let openingMents = [
    {ment : "디지텍"},
    {ment : "카지노에"},
    {ment : "오신 것을"},
    {ment : "환영합니다"},
    {ment : "자"},
    {ment : "이쪽으로 오시죠"},
]

//나레이션 대사 목록. 대사 내용과 언제 대사를 칠건지 정해둠.
let narrationMents = [
    {ment:"안녕하세요. 처음 오신 손님이시군요.",when:"tutorial"},
    {ment:"제 이름은 블랙잭, 이 카지노의 아주 핫한 딜러죠.",when:"tutorial"},
    {ment:"보아하니 카지노는 처음이신가본데..",when:"tutorial"},
    {ment:"이거이거 돈까지 없으시구만..",when:"tutorial"},
    {ment:"오늘 운 좋으신겁니다? 처음 오신 기념으로 무료로 칩 몇개 쥐어드릴테니 한번 해보시는게 어때요?",when:"tutorial"},
    {ment:"많이 따면 조금 떼주시는겁니다?",when:"tutorial"},
    {ment:"자, 이쪽으로 오시죠. 슬롯머신입니다.",when:"slotMachine"},
    {ment:"초심자에겐 이거만큼 얻기 쉬운게 없죠.",when:"slotMachine"},
    {ment:"칩하나 넣고 돌려봐요.",when:"slotMachine"},
    {ment:"칩이 부족하시네요. 하나 더 드릴게요.",when:"alert"},
    {ment:"오? 처음치곤 잘나왔는걸요? 한번 더돌려봐요.",when:"newbieLuck1"},
    {ment:"와우! 두번만에 잭팟이라니! 오늘 운 엄청 좋으신가보네~ 계속해봐요.",when:"newbieLuck2"},
    {ment:"음..괜찮아요. 다시 해보죠.",when:"again"},
    {ment:"설마..포기하려는건 아니죠? 다시 해보죠.",when:"again"},
    {ment:"이걸론 부족하죠..다시 해봐요",when:"lucky"},
    {ment:"이런이런..한 끗 차이로 잭팟을 못터트리다니. 아쉬운걸요?",when:"lucky"},
    {ment:"잭팟! 너무 좋아요! 이 기세로 계속 가보죠!",when:"jackpot"}, 
    {ment:"이런이런..시간이 벌써 이렇게나 흘렀군요.",when:"stop!"}, 
    {ment:"얼마나 얻으셨어요? 뭐요..? 하나도 없다고요?",when:"stop!"}, 
    {ment:"빌려드린 게 몇 갠데 그런 말이 나와요 지금?",when:"stop!"}, 
    {ment:"어떻게든 갚아요! 그게 쉽게 얻어지는것 같아요?",when:"stop!"}, 
    {ment:"못 갚으시겠다고요? 그게지금 말이나 돼요?!",when:"stop!"}, 
    {ment:"이 @#!$아! 당장 갚지 않으면 !#$!@#@$@#$....",when:"stop!"}, 
]

//현재 진행상태
let status = 'tutorial'

//도박 시행 횟수 기록
let gambleCount = 0; 

function gambleNarration(timing){
    let ments = narrationMents.filter(x=>{if(x.when == timing) return x;})
    $('.ment').empty();
    $('#blackjack').animate({
        left : '100px'
    }, 600, 'linear')
    $('.mentBox').animate({
       top : '80%'
    }, 300, 'swing')
    let i = 0;

    //글자 하나하나 타이핑되는 간격
    let speed = 80

    let ment = ments[Math.floor(Math.random()*ments.length)].ment
    //대사 출력 함수
    function type() { 

        //가져온 멘트의 길이까지 안닿았을 경우 글자 타이핑
        if (i < ment.length) {
          $('.ment').append(ment.charAt(i))
          i++;//타이핑한 글자 수 증가
          setTimeout(type, speed);//한 글자 타이핑 후 타이핑 함수 재실행
        } else {//멘트가 끝까지 쳐졌을 경우 
            //타이핑된 글자 수 초기화
            i = 0
            closeNar();
        } 
    }
    setTimeout(type, 800);//전반 애니메이션이 다 끝나면 타이핑 애니메이션 실행
    // 나레이션 끝남 함수
    function closeNar(){
        //원래 우측을 향하던 화살표 아이콘을 아래로 향하게 함
        $('.nextBtn').css({transform : 'rotate(90deg)'})
        //화살표 아이콘 보여줌
        $('.nextBtn').show()

        // 해당 상태에서 클릭시
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
            //화살표 방향 다시 오른쪽으로 만들고 숨김
            setTimeout(function(){
                $('.nextBtn').css({transform : ''}).hide()
            },300)
        })
    }
}

//나레이션 함수, 파라미터는 문자열.
function narration(timing){

    //대사 목록에서 when 키의 값이 파라미터로 받은 값과 같은 대사들을 가져옴
    let ments = narrationMents.filter(x=>{if(x.when == timing) return x;})
    $('.ment').empty()

    //가져온 멘트들 순서 확인 변수
    let mentCount = 0
    //블랙잭 등장
    $('#blackjack').animate({
        left : '100px'
    }, 600, 'linear')
    //대사창 보여줌
    $('.mentBox').animate({
       top : '80%'
    }, 300, 'swing')

    //대사 속 글자 수 확인 변수
    let i = 0;

    //글자 하나하나 타이핑되는 간격
    let speed = 80

    //대사 출력 함수
    function type() { 
        //사용할 멘트 변수에 순서에 맞는 멘트를 가져와 할당
        let ment = ments[mentCount].ment

        //가져온 멘트의 길이까지 안닿았을 경우 글자 타이핑
        if (i < ment.length) {
          $('.ment').append(ment.charAt(i))
          i++;//타이핑한 글자 수 증가
          setTimeout(type, speed);//한 글자 타이핑 후 타이핑 함수 재실행
        } else {//멘트가 끝까지 쳐졌을 경우 
            //타이핑된 글자 수 초기화
            i = 0
            if(mentCount < ments.length-1){//마지막 멘트가 아니라면
                mentCount++;//출력된 멘트 갯수 증가
                toNext()//다음으로. 함수 실행
            } else {//마지막 멘트라면
                if(status=="tutorial"){//튜토리얼이었다면
                    status='slotMachine'//순서 상태를 슬롯머신으로 변경
                    //배경색 변경, 분위기 전환
                    document.getElementById('gambleZone').style.backgroundColor='black'
                    for(let j = 0; j < 3; j++){//칩을 세개 줌
                        giveChip()
                    }
                    console.log(status)
                }
                closeNar();//닫기 함수 실행.(아직 안닫힘)
            }
        } 
    }
    setTimeout(type, 800);//전반 애니메이션이 다 끝나면 타이핑 애니메이션 실행
    // 나레이션 끝남 함수
    function closeNar(){
        //원래 우측을 향하던 화살표 아이콘을 아래로 향하게 함
        $('.nextBtn').css({transform : 'rotate(90deg)'})
        //화살표 아이콘 보여줌
        $('.nextBtn').show()

        // 해당 상태에서 클릭시
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
            //화살표 방향 다시 오른쪽으로 만들고 숨김
            setTimeout(function(){
                $('.nextBtn').css({transform : ''}).hide()
            },300)
            if(status=='slotMachine'){//만약 상태가 슬롯머신이라면
            setTimeout(() => {//1.5초후 슬롯머신관련 대사 나레이션 시작
                status='ing' //진행중으로 상태 바꿈
               narration('slotMachine')
               setSlotMachine();
            }, 1500);
            } else if(status =='stop'){
                ending();
            }
        })

        
    }
    function toNext(){//다음 대사로. 함수
        $('.nextBtn').show()//화살표 아이콘 보여줌
        $('.mentBox').on('click',function(){ //대사창에서 클릭 발생시
            $('.nextBtn').hide();//화살표 숨기고
            $('.ment').empty();//대사창 속 멘트공간 비우고
            type()//다음 대사 시작
            $('.mentBox').off('click')//클릭이벤트 비활성
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

//오프닝부분
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

function ending(){
    $('html,body').animate({ scrollTop: `${$('#information').offset().top}px` }, 1000)
    setTimeout(() => {
        for(var i = 0; i < 3; i++){
            let list = document.getElementsByClassName('info-block')[i]
            console.log(list)
            setTimeout(() => {
                list.style.marginTop = '9%'
            }, 600*i);
            
        }
    }, 1100);
}