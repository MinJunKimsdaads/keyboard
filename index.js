document.addEventListener('DOMContentLoaded', function() {
    let Keyboard = window.SimpleKeyboard.default;

    let keyboard = new Keyboard({
        onChange: input => onChange(input),
        onKeyPress: button => onKeyPress(button),
        layout: {
            default: [
                "ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ",
                "ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ",
                "ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ {bksp}",
                "{shift} {space} {shift}"
            ],
            shift: [
                "ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕ ㅑ ㅒ ㅖ",
                "ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ",
                "ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ {bksp}",
                "{shift} {space} {shift}"
            ]
        },
        display: {
            "{bksp}": "백스페이스",
            "{shift}": "쉬프트",
            "{space}": "공백"
        },
        mergeDisplay: true
    });

    // 조합된 한글을 저장하는 변수
    let currentInput = [];

    // 입력 필드와 키보드 동기화
    document.querySelector("#searchInput").addEventListener("input", event => {
        keyboard.setInput(event.target.value);
    });

    // 입력 변화 시 처리 함수
    function onChange(input) {
        document.querySelector("#searchInput").value = input;
    }

    // 키 눌림 이벤트 처리 함수
    function onKeyPress(button) {
        if (button === "{shift}" || button === "{lock}") handleShift();
        if (button === "{space}") handleSpace();
        if (button === "{bksp}") handleBackspace();
        if (button.length === 1) handleCharacter(button); // 단일 문자 입력 처리
    }

    // 쉬프트 키 처리 함수
    function handleShift() {
        let currentLayout = keyboard.options.layoutName;
        let shiftToggle = currentLayout === "default" ? "shift" : "default";
        keyboard.setOptions({
            layoutName: shiftToggle
        });
    }

    // 공백 키 처리 함수
    function handleSpace() {
        currentInput.push(' ');
        let newInput = Hangul.assemble(Hangul.disassemble(currentInput));
        document.querySelector("#searchInput").value = newInput;
        keyboard.setInput(newInput);
    }

    // 백스페이스 키 처리 함수
    function handleBackspace() {
        currentInput.pop();
        let newInput = Hangul.assemble(Hangul.disassemble(currentInput));
        document.querySelector("#searchInput").value = newInput;
        keyboard.setInput(newInput);
    }

    // 한글 조합 문자 처리 함수
    function handleCharacter(button) {
        currentInput.push(button);
        let newInput = Hangul.assemble(Hangul.disassemble(currentInput)); // hangul-js를 사용해 문자 조합
 
        document.querySelector("#searchInput").value = newInput;

        keyboard.setInput(newInput);
        console.log(document.querySelector("#searchInput").value)
    }
});