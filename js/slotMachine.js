let newbieLuck = 0;

function spin(){
    $('.money-slot').off();
    let nums = [0,0,0]
    
    let interval = setInterval(() => {
        for (let i = 1; i <= $('.roll li').length; i++) {
            let num = Math.floor(Math.random() * 4) + 1;
            nums[i - 1] = num;
            $(`.roll li:nth-child(${i})`).empty();
            $(`.roll li:nth-child(${i})`).append(`<img src="./images/roll${num}.png">`);
        }
    }, 10);
    
    setTimeout(() => {
        switch(newbieLuck){
            case 0 : {
                for(let i = 0; i < 2; i++){
                    $(`.roll li:nth-child(${i})`).empty();
                    $(`.roll li:nth-child(${i})`).append(`<img src="./images/roll2.png">`);
                }
                $(`.roll li:nth-child(${2})`).empty();
                $(`.roll li:nth-child(${2})`).append(`<img src="./images/roll3.png">`); 
            }

        }
            $(`.roll li:nth-child(${i})`).empty();
            $(`.roll li:nth-child(${i})`).append(`<img src="./images/roll${num}.png">`);
        clearInterval(interval)
        let cnt=0;
        if(nums[0] == nums[1]){cnt++}
        if(nums[0] == nums[2]){cnt++}
        if(nums[1] == nums[2]){cnt++}
        if(cnt == 3)console.log('jackpot!')
        else if(cnt == 1)console.log('lucky!')
        else console.log('again')
        $('.money-slot').on('click',spin)
    }, 1000);

}
function setSlotMachine(){
    $('.roll li').append(`<img src="./images/roll1.png">`)
    $('#slot-machine').show()
    $('.money-slot').on('click',spin)
}  