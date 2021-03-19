class autoScript {
    constructor() {
        this.video = null;
        this.videoOptions = null;
        this.videoSubmit = null;
        this.currentCapter = null;
        this.nextCapter = null;

        this.stop = true;
    }

    async runScript() {
        this.stop = false;
        while (!this.stop) {
            var targetIframe = document.getElementById('iframe').contentDocument.getElementsByTagName('iframe')[0].contentDocument;
            disableAlert(targetIframe.body)
            this.video = targetIframe.getElementById('video_html5_api');
            // console.log(this.video, nowFormat());
            var homework = document.getElementById("dct2");
            if (this.video == null) {
                console.log("no video!", nowFormat());
                if (homework.classList.length == 1) {
                    await sleep(10000);
                    continue;
                }
            } else {
                this.video.playbackRate = 2.0;
                this.video.play();
            }
            while (true) {
                if (this.video == null || this.video.ended) {
                    console.log('video end', nowFormat());
                    var isCurrentCapterDone = false;
                    if (homework != null) {
                        if (homework.classList.length == 1) {
                            homework.click();
                        }
                        await sleep(3000);
                    }
                    while (!isCurrentCapterDone) {
                        if (homework != null) {
                            this.currentCapter = document.getElementsByClassName('currents')[1];
                        } else {
                            this.currentCapter = document.getElementsByClassName('currents')[0];
                        }
                        var roundpointStudentClassList = this.currentCapter.getElementsByClassName("roundpointStudent")[0].classList;
                        console.log(roundpointStudentClassList, nowFormat());
                        for (var tmp = 0; tmp < roundpointStudentClassList.length; tmp++) {
                            if (roundpointStudentClassList[tmp] == "blue") {
                                isCurrentCapterDone = true;
                                break;
                            }
                        }
                        await sleep(5000);
                    }
                    // 视频结束，跳转下一个视频
                    this.nextCapter = this.currentCapter.parentNode.nextElementSibling;
                    if (this.nextCapter) {
                        this.nextCapter.childNodes[1].childNodes[1].click();
                    } else {
                        var notLastCapter = this.currentCapter.parentNode.parentNode.nextElementSibling;
                        if (notLastCapter) {
                            notLastCapter.childNodes[5].childNodes[1].childNodes[1].click();
                        } else {
                            console.log('Congratulations on completing the study!', nowFormat());
                            this.stopScript();
                            this.finnishSpan();
                            return;
                        }
                    }
                    break;
                }
                console.log('check pause', nowFormat());
                if (this.video.paused) {
                    // 获取选项
                    this.videoOptions = targetIframe.getElementsByClassName('ans-videoquiz-opt');
                    this.videoSubmit = targetIframe.getElementsByClassName('ans-videoquiz-submit');
                    // console.log(this.videoOptions, nowFormat());
                    // 暂停重播
                    if (this.videoOptions.length == 0) {
                        console.log('replay video', nowFormat());
                        this.video.play();
                    } else {
                        var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
                        for (var i = 0; i < this.videoOptions.length; i++) {
                            console.log('try answer', alphabet[i], nowFormat(), nowFormat());
                            this.videoOptions[i].childNodes[0].childNodes[0].click();
                            this.videoSubmit[0].click();
                            await sleep(500);
                            if (!this.video.paused) {
                                break;
                            }
                            console.log('Error', alphabet[i], nowFormat());
                        }
                    }
                }
                await sleep(5000);
            }
            await sleep(10000);
        }
    }

    stopScript() {
        console.log('stop script', nowFormat());
        this.video = null;
        this.videoOptions = null;
        this.videoSubmit = null;
        this.currentCapter = null;
        this.nextCapter = null;

        this.stop = true;
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function nowFormat() {
    var date = new Date();
    return "    " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();
}

function addBtn() {
    var run = new autoScript();

    var btnStart = document.createElement('input');
    btnStart.type = 'button';
    btnStart.value = 'start auto script';
    btnStart.style.zIndex = 999;
    btnStart.style.padding = '5px';
    btnStart.style.margin = '10px';
    btnStart.style.position = 'fixed';
    btnStart.style.top = '50px';

    var btnStop = document.createElement('input');
    btnStop.type = 'button';
    btnStop.value = 'stop auto script';
    btnStop.style.zIndex = 999;
    btnStop.style.padding = '5px';
    btnStop.style.margin = '10px';
    btnStop.style.position = 'fixed'
    btnStop.style.top = '90px';
    btnStop.disabled = true;

    btnStart.addEventListener('click', () => { btnStart.disabled = true; btnStop.disabled = false; run.runScript(); });
    btnStop.addEventListener('click', () => { btnStart.disabled = false; btnStop.disabled = true; run.stopScript(); });
    document.body.appendChild(btnStart);
    document.body.appendChild(btnStop);
}

function disableAlert(element) {
    var scriptElement = document.createElement('script');
    scriptElement.innerHTML = 'window.alert = () => { };'
    scriptElement.lang = 'javascript'
    element.appendChild(scriptElement);
}

// 覆盖浏览器自带的弹窗，避免被打断
window.alert = () => { };
addBtn()
