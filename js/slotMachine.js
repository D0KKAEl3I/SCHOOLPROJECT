let newbieLuck = 0;//초짜의 운. 0, 1일때만 효과를 보임

function spin(){
    if(chips < 1){narration('alert'); giveChip(); return;}//칩이 0개면 한개 주면서 대사치고 함수 생략
    useChip();//칩 소모
    $('.money-slot').off();//칩 투입 잠시 비활성
    if(gambleCount >= 20){//도박 20회 진행했을시
        narration('stop!')//블랙잭의 나쁜대사.
        status='stop'//상태 변경
        return;
    }
    let nums = [0,0,0]//세 칸의 번호 저장용
    
    
    let interval = setInterval(() => {//반복. 클리어인터벌을 위해 변수로 할당
        for (let i = 1; i <= $('.roll li').length; i++) {//세칸이라서 한칸씩 세번 돌림
            //1~4사이의 정수값 뽑아냄
            let num = Math.floor(Math.random() * 4) + 1;

            //각 칸 변수에 방금나온 숫자 기록
            nums[i - 1] = num;
            $(`.roll li:nth-child(${i})`).empty();//원래 들어있던 이미지 제거
            $(`.roll li:nth-child(${i})`).append(`<img src="./images/roll${num}.png">`);//랜덤돌려 나온 새 이미지 넣음
        }
    }, 80);  
    
    setTimeout(() => { //1초후 실행
        clearInterval(interval)//반복 중단
        if(newbieLuck == 0){ //초짜의 행운이 0이면 
            for(let i = 1; i <= 2; i++){//앞에 두개는 동일하게
                $(`.roll li:nth-child(${i})`).empty();
                $(`.roll li:nth-child(${i})`).append(`<img src="./images/roll2.png">`);
            }
            //마지막 한개만 다르게, 희망주는거
            $(`.roll li:nth-child(3)`).empty();
            $(`.roll li:nth-child(3)`).append(`<img src="./images/roll3.png">`);
            newbieLuck++;//뉴비의 운을 1로 만듦
            narration('newbieLuck1')//흥미 돋구는 대사 침
            $('.money-slot').on('click',spin)//비활성화돼있던 투입구 클릭 이벤트 다시 할당
            return;
        }else if(newbieLuck == 1){//초짜의 행운이 1이면
            for(let i = 1; i <= 3; i++){//세개 다 다이아몬드로 만들어서 대박터진것처럼 해줌
                $(`.roll li:nth-child(${i})`).empty();
                $(`.roll li:nth-child(${i})`).append(`<img src="./images/roll1.png">`);
            }
            newbieLuck++;//뉴비의 운을 2로만듦, 효력 잃음
            narration('newbieLuck2')//칭찬으로 흥미 더 유발하는 대사침
            $('.money-slot').on('click',spin)//비활성화돼있던 투입구 클릭 이벤트 다시 할당
            return;
        }else{
            let cnt=0; //같은게 몇개 나왔는지 세는 변수
            if(nums[0] == nums[1]){cnt++}
            if(nums[0] == nums[2]){cnt++}  //각 슬롯별로 같은지 확인
            if(nums[1] == nums[2]){cnt++}
            if(cnt == 3){narration('jackpot'); giveChip();}//셋이 다 같은경우 cnt는 3이 나오므로 잭팟 대사 출력 후 토큰 한개 지급
            else if(cnt == 1)narration('lucky') //두개만 같은경우 cnt는 1이 나오므로 아쉬우니 다시 해보라는 대사를 침
            else narration('again') //하나도 안같을 경우 걍 다시하라고 대사침.
            $('.money-slot').on('click',spin)//비활성하돼있던 투입구 클릭 이벤트 다시 할당
        }
    }, 1000);
    gambleCount++;//도박횟수 증가
}

function setSlotMachine(){
    $('.roll li').append(`<img src="./images/roll1.png">`)
    $('#slot-machine').show()
    $('.money-slot').on('click',spin)
}  