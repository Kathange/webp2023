var availableTickets = 10;

function enableGrabTicketsButton() {
document.getElementById("grabTicketsButton").disabled = false;
}

function disableGrabTicketsButton() {
document.getElementById("grabTicketsButton").disabled = true;
}

// 檢查票是否還有
function grabTickets() {

var ticketCount = parseInt(document.getElementById('ticketCount').value);

if (availableTickets == 0) {
    document.getElementById('ticketAvaliable').innerHTML = '<div class="alert alert-danger">已售完</div>';
} else if (ticketCount > availableTickets) {
    document.getElementById('ticketAvaliable').innerHTML = '<div class="alert alert-warning">票數不足，您只可再買 ' + availableTickets + ' 張票</div>';
} else {
    availableTickets -= ticketCount;
    document.getElementById('ticketAvaliable').innerHTML = '<div class="alert alert-success">已售出 ' + ticketCount + ' 張票</div>';
}

document.getElementById("timeBox").innerHTML= '3秒後回售票資訊頁面';
setTimeout("location.href='file:///C:/Users/29191/OneDrive/%E6%A1%8C%E9%9D%A2/WebFinalProject/final3Main.html?'",3000);

disableGrabTicketsButton();

}


// --- 數字圖形驗證 ---
// https://codepen.io/ayugioh2003/pen/VwKozNo?editors=1010
// 若沒有包在立即函式，options 能直接在 console 中被讀取與修改
$(function () {
let options = {
    canvasId: "auth-code",/**canvas的id*/
    txt: (randomNum(100000, 999999)).toString(),/**傳入驗證碼內容*/
    height: 50,/**驗證碼高度 */
    width: 200,/**驗證碼寬度 */
    fontColor1: 0,/**隨機生成字型顏色*/
    fontColor2: 50,/**隨機生成字型顏色*/
    bgColor1: 180,/**這個範圍的顏色作背景看起來清晰一些*/
    bgColor2: 255,/**這個範圍的顏色作背景看起來清晰一些*/
    fontStyle: "24px SimHei"
};

// 點擊按鈕換圖
var $btn = document.getElementById("newBtn");
$btn.addEventListener('click', () => {
    options.txt = (randomNum(100000, 999999)).toString();
    helper = new writeAuthCode(options);
    document.getElementById('result').innerHTML = "";
    document.getElementById('text').value = "";
    availableTickets -= ticketCount;
});

// 輸入驗證文字
var $text = document.getElementById('verificationCode');
$text.addEventListener('keyup', function () {
    if (helper.validate($text.value)) {
    document.getElementById('isVerifyCode').innerHTML = "驗證碼正確";
    $("#isVerifyCode").css("color", "#18A500");
    enableGrabTicketsButton();
    } else {
    document.getElementById('isVerifyCode').innerHTML = "驗證碼錯誤";
    $("#isVerifyCode").css("color", "#FF435E");
    disableGrabTicketsButton();
    }
});

// --------------------------------------------------
/**驗證碼建構函式**/
function writeAuthCode(options) {
    this.options = options;
    let canvas = document.getElementById(options.canvasId);
    canvas.width = options.width || 300
    canvas.height = options.height || 150
    let ctx = canvas.getContext('2d');/**建立一個canvas物件*/
    ctx.textBaseline = "middle";
    ctx.fillStyle = randomColor(options.bgColor1, options.bgColor2);
    ctx.fillRect(0, 0, options.width, options.height);
    for (let i = 0; i < options.txt.length; i++) {
    let txt = options.txt.charAt(i);/**讓每個字不一樣*/
    ctx.font = options.fontStyle;
    ctx.fillStyle = randomColor(options.fontColor1, options.fontColor2);
    ctx.shadowOffsetY = randomNum(-3, 3);
    ctx.shadowBlur = randomNum(-3, 3);
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    let x = options.width / (options.txt.length + 1) * (i + 1);
    let y = options.height / 2;
    let deg = randomNum(-30, 30);
    /**設定旋轉角度和座標原點*/
    ctx.translate(x, y);
    ctx.rotate(deg * Math.PI / 180);
    ctx.fillText(txt, 0, 0);
    /**恢復旋轉角度和座標原點*/
    ctx.rotate(-deg * Math.PI / 180);
    ctx.translate(-x, -y);
    }
    /**1~4條隨機干擾線隨機出現*/
    for (let i = 0; i < randomNum(1, 4); i++) {
    ctx.strokeStyle = randomColor(40, 180);
    ctx.beginPath();
    ctx.moveTo(randomNum(0, options.width), randomNum(0, options.height));
    ctx.lineTo(randomNum(0, options.width), randomNum(0, options.height));
    ctx.stroke();
    }
    /**繪製干擾點*/
    for (let i = 0; i < options.width / 6; i++) {
    ctx.fillStyle = randomColor(0, 255);
    ctx.beginPath();
    ctx.arc(randomNum(0, options.width), randomNum(0, options.height), 1, 0, 2 * Math.PI);
    ctx.fill();
    }
    this.validate = function (code) {
    return this.options.txt == code;
    }
}

/**隨機數字**/
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**隨機顏色**/
function randomColor(min, max) {
    let r = randomNum(min, max);
    let g = randomNum(min, max);
    let b = randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
}

var helper = new writeAuthCode(options);
});



// 搜尋(目前沒用到)
function filterData(keyword) {
    if (!keyword) {
      filteredData = dataset;
    } else {
      const lowerKeyword = keyword.toLowerCase();
      filteredData = dataset.filter(item => item.title.toLowerCase().includes(lowerKeyword));
    }
    totalPage = Math.ceil(filteredData.length / page_size);
    currentPage = 1;
    clearTable();
    addNewData();
  }

  function searchData() {
    const keyword = document.getElementById("keyword").value.trim();
    filterData(keyword);
  }

  let dataset;
  loadData().then(data => {
    dataset = data;
    filterData();
  }).catch(error => {
    console.error(error);
  });