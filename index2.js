document.addEventListener('DOMContentLoaded', function() {
    let keyboardzone = document.getElementById("keyboardzone");
	let input = document.getElementById("searchInput");

	let keyboard = new customKeyboard(
		keyboardzone/*생성위치 태그*/,
		input/*input을 받을 태그*/, 
        function()/*클릭 했을때*/ {
            // console.log("click : ", text);
        },
        function()/*esc 눌렀을때*/ {
            // console.log("esc");
        },
        function(e)/*앤터 눌렀을때*/ {
            console.log("엔터");
        }, 
        null/*키패드를 모양 값*/
    );
});