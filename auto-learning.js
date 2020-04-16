class autoScript {
    constructor() {
        this.video = null;
        this.videoOptions = null;
        this.videoSubmit = null;
        this.currentCapter = null;
        this.nextCapter = null;
        this.runner = null;
    }

    runScript() {
        this.status = true;
        var targetIframe = document.getElementById('iframe').contentDocument.getElementsByTagName('iframe')[0].contentDocument;
        this.video = targetIframe.getElementById('video_html5_api');
        console.log(this.video);
        this.video.playbackRate = 2.0;
        this.video.play();
        var newVideo = false;
        this.runner = window.setInterval(() => {
            if (this.video.ended) {
                console.log('video end');
                // 视频结束，跳转下一个视频
                this.currentCapter = document.getElementsByClassName('currents');
                this.nextCapter = this.currentCapter[1].parentNode.nextElementSibling;
                if (this.nextCapter) {
                    this.nextCapter.childNodes[1].childNodes[1].click();
                } else {
                    var notLastCapter = this.currentCapter[1].parentNode.parentNode.nextElementSibling;
                    if (notLastCapter) {
                        notLastCapter.childNodes[5].childNodes[1].childNodes[1].click();
                    } else {
                        console.log('Congratulations on completing the study!');
                        this.stopScript();
                        this.finnishSpan();
                    }
                }
                newVideo = true;
                return;
            }
            if (newVideo) {
                console.log('new video');
                targetIframe = document.getElementById('iframe').contentDocument.getElementsByTagName('iframe')[0].contentDocument;
                this.video = targetIframe.getElementById('video_html5_api');
                newVideo = false;
            }
            console.log('check pause');
            if (this.video.paused) {
                // 获取选项
                this.videoOptions = targetIframe.getElementsByClassName('ans-videoquiz-opt');
                this.videoSubmit = targetIframe.getElementsByClassName('ans-videoquiz-submit');
                console.log(this.videoOptions);
                // 暂停重播
                if (this.videoOptions.length == 0) {
                    console.log('replay video');
                    this.video.play();
                } else {
                    // 选择选项A
                    console.log('try answer A');
                    this.videoOptions[0].childNodes[0].childNodes[0].click();
                    this.videoSubmit[0].click();
                    // 如果错误，重新选B
                    if (this.video.paused) {
                        console.log('try answer B');
                        this.videoOptions[1].childNodes[0].childNodes[0].click();
                        this.videoSubmit[0].click();
                    }
                }
            }
        }, 10 * 1000)
    }

    stopScript() {
        console.log('stop script');
        this.video = null;
        this.videoOptions = null;
        this.videoSubmit = null;
        this.currentCapter = null;
        this.nextCapter = null;
        clearInterval(this.runner);
    }

    finnishSpan() {
        var finnish = document.createElement('span');
        finnish.innerText = 'Congratulations on completing the study!';
        finnish.style.zIndex = 999;
        finnish.style.padding = '5px';
        finnish.style.margin = '10px';
        finnish.style.position = 'fixed';
        finnish.style.top = '130px';
        finnish.style.background = 'green';
        finnish.style.color = 'white';
        document.body.appendChild(finnish);
    }
}

function addBtn() {
    var run = new autoScript();

    var btnStart = document.createElement('input');
    btnStart.type = 'button';
    btnStart.value = 'start auto script';
    btnStart.addEventListener('click', () => { run.runScript(); });
    btnStart.style.zIndex = 999;
    btnStart.style.padding = '5px';
    btnStart.style.margin = '10px';
    btnStart.style.position = 'fixed';
    finnish.style.top = '50px';
    document.body.appendChild(btnStart);

    var btnStop = document.createElement('input');
    btnStop.type = 'button';
    btnStop.value = 'stop auto script';
    btnStop.addEventListener('click', () => { run.stopScript(); });
    btnStop.style.zIndex = 999;
    btnStop.style.padding = '5px';
    btnStop.style.margin = '10px';
    btnStop.style.position = 'fixed'
    finnish.style.top = '90px';
    document.body.appendChild(btnStop);
}

// 覆盖浏览器自带的弹窗，避免被打断
window.alert = () => { };
addBtn()