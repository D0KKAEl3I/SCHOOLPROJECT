let slots = document.getElementsByClassName('roll')[0].getElementsByTagName('li')

function spin(){
    var nums = []

    for(let i = 0; i < $('.roll li').length; i++){
        let num = Math.floor(Math.random() * 4)+1
        nums.push(num)
        slots[i].style.backgroundImage=`url(../images/roll${num}.png)`
    }     
    if(nums[0] == nums[1] && nums[0] == nums[2]){
        
    }    
}
function setSlotMachine(){
    slots[i].style.backgroundImage=`url(../images/roll1.png)`
    $('#slot-machine').show()
}