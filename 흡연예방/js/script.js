window.onload = function () {
    setInterval(topLine, 1);
    setInterval(midLine, 1);
    setInterval(bottomLine, 1);
    window.onmousemove = smoothing;
}
function smoothing(){
    let infos = document.getElementsByClassName('info')
    for(let i = 0; i < infos.length; i++){
        infos[i].style.marginLeft = event.screenX/30 + 'px'
        infos[i].style.marginTop = event.screenY/10 + 'px'
    }
    document.getElementsByClassName('smoke')[0].style.left = event.screenX/60 + 'px';
    document.getElementsByClassName('smoke')[0].style.top = 'calc(50%+'+event.screenY/30 + 'px)';
}
function topLine() {
    let top = document.getElementsByClassName('top')[0]
    let toppos = top.getBoundingClientRect()

    let info = document.getElementsByClassName('t')[0]
    let infopos = info.getBoundingClientRect();
    $('#linet')
        .attr('x1', infopos.right)
        .attr('y1', infopos.bottom-infopos.height/2)
        .attr('x2', toppos.left)
        .attr('y2', toppos.top+10)
}
function midLine() {
    let mid = document.getElementsByClassName('mid')[0]
    let midpos = mid.getBoundingClientRect()

    let info = document.getElementsByClassName('m')[0]
    let infopos = info.getBoundingClientRect();
    $('#linem')
        .attr('x1', infopos.left)
        .attr('y1', infopos.bottom-infopos.height/2)
        .attr('x2', midpos.right)
        .attr('y2', midpos.top+midpos.height/2)
}
function bottomLine() {
    let bottom = document.getElementsByClassName('bottom')[0]
    let bottompos = bottom.getBoundingClientRect()

    let info = document.getElementsByClassName('b')[0]
    let infopos = info.getBoundingClientRect();
    $('#lineb')
        .attr('x1', infopos.right)
        .attr('y1', infopos.bottom-infopos.height/2)
        .attr('x2', bottompos.left)
        .attr('y2', bottompos.top+bottompos.height/2)
}