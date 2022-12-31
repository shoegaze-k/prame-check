"use strict";

const func = () => {

  // パラメータチェックパターン
  const regexpParam01 = /(\?.*){2,}/,
    regexpParam02 = /\/\&{1}/,
    regexpParam03 = /\/\?{1}/,
    regexpParam04 = /\?{1}/,
    regexpParam05 = /\&{1}/,

  textForm = document.querySelector('input[type="text"]');

  // フォーカスが外れた時に全角を半角に変換する
  textForm.addEventListener('blur', () => {
    let textFormValue = textForm.value;
    textFormValue = textFormValue.replace(/[‐－―ー]/g, '-');
    const replacedValue = textFormValue.replace(/[Ａ-Ｚａ-ｚ０-９－！”＃＄％＆’（）＝＜＞，．？＿［］｛｝＠＾～￥]/g,
      (str) => {
        return String.fromCharCode(str.charCodeAt(0) - 0xFEE0)
      });
    textForm.value = replacedValue;
  }, false);

  // 「CHECK」ボタンを押して入力欄を取得する
  const buttonClick = () => {
    const matchInput = document.getElementById('match'),
    matchValue = document.getElementById('match').value,
    validateMsgContainer = document.getElementById('js-validate-msg');
    const validate = (e) => {
        validateMsgContainer.innerHTML = e;
      },
      validateAlertClassRepeat = () => {
        matchInput.classList.add('alert--bg');
        matchInput.classList.remove('success--bg');
      };

    // 条件分岐
    // 入力欄が "空" の場合 = NG
    if (matchValue === "") {
      const validateMsg = `
        <span class="alert--text">Please enter the URL.</span>`;
      validate(validateMsg);
      validateAlertClassRepeat();
    }

    // "?" が2つ以上含まれている場合 / "/&" 始まりの場合 = NG
    else if (regexpParam01.test(matchValue) || regexpParam02.test(matchValue)) {
      const validateMsg = `
        <span class="alert--text">It contains invalid parameters.</span>`;
      validate(validateMsg);
      validateAlertClassRepeat();
    }

    // "?" 始まりの場合 = OK
    else if (regexpParam03.test(matchValue) || regexpParam04.test(matchValue)) {
      const validateMsg = `
        <span class="success--text">This is the correct parameter.</span>`;
      validate(validateMsg);
      matchInput.classList.remove('alert--bg');
    }

    // "&" 始まりの場合 = NG
    else if (regexpParam05.test(matchValue)) {
      const validateMsg = `
        <span class="alert--text">It contains invalid parameters.</span>`;
      validate(validateMsg);
      validateAlertClassRepeat();
    }

    // 上記以外 = NG
    else {
      const validateMsg = `
      <span class="alert--text">Please enter the correct URL.</span>`;
      validate(validateMsg);
      validateAlertClassRepeat();
    }
  }

  // 「CHECK」ボタンを押した際の動作
  const button = document.getElementById('form__submit');
  button.addEventListener('click', buttonClick);
}
func();