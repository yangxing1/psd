/**
 * Created by star on 14/01/17.
 */
function createForm(config) {
  function func() {
    return config.validator.call(this, config.success, config.fail);
  }
  var $input = createElement('input');
  $input.onfocus = function () {
    $point.style.visibility = 'visible';
  };
  $input.onblur = func;
  $input.setAttribute('type', config.type);
  $input.className = config.type;

  var $item_name = createElement('span', config.label);
  $item_name.className = 'form_name';

  var $point = createElement('span', config.rules);
  $point.className = 'point';

  var $label = createElement('label', $item_name, $input, $point);
  $label.setAttribute('for', config.label);

  var $form_item = createElement('p', $label);
  $form_item.className = 'form_item';

  if (config.type === 'submit') {
    $input.onblur = undefined;
    $input.onfocus = undefined;
    $input.onclick = func;
    $item_name.remove();
    $form_item.className += ' form_submit';
  }

  return $form_item;
}

function errorPoint(str) {
  var $point = getPoint.call(this);
  $point.innerHTML = str;
  $point.style.color = '#cf4a36';
  $point.style.visibility = 'visible';
  this.style.borderColor = '#cf4a36';
}
function rightPoint(str) {
  var $point = getPoint.call(this);
  $point.innerHTML = str;
  $point.style.visibility = 'visible';
  $point.style.color = '#00c7d6';
  this.style.borderColor = '#999';
}
function getPoint() {
  return this.parentNode.getElementsByClassName('point')[0];
}

function checkName (success, fail) {
  var value = this.value.match(/[^ ]+/g);
  if (!value) {
    errorPoint.call(this, '不能为空');
    return false;
  }
  value = value.join('');
  var length = value.length;
  if (value.match(/[^\x00-\xff]/g)) {
    length += value.match(/[^\x00-\xff]/g).length;
  }
  if (length < 4 || length > 16) {
    errorPoint.call(this, fail);
    return false;
  }
  else {
    rightPoint.call(this, success);
    return true;
  }
}
function checkPass(success, fail) {
  var value = this.value.match(/[^ ]+/g);
  if (!value) {
    errorPoint.call(this, '不能为空');
    return false;
  }
  value = value.join('');
  var length = value.length;
  if (value.match(/[^\x00-\xff]/g)) {
    length += value.match(/[^\x00-\xff]/g).length;
  }
  if (length < 4 || length > 16) {
    errorPoint.call(this, fail);
    return false;
  }
  else {
    rightPoint.call(this, success);
    return true;
  }
}
function checkPassRe(success, fail) {
  var $pass = this.parentNode.parentNode.parentNode.getElementsByClassName('password')[0];
  var pass_value = $pass.value;
  if (!pass_value) {
    errorPoint.call(this, '不能为空');
    return false;
  }
  var value = this.value;
  if (value !== pass_value) {
    errorPoint.call(this, fail);
    return false;
  }
  else {
    rightPoint.call(this, success);
    return true;
  }
}
function checkMail(success, fail) {
  var value = this.value;
  var apos = value.indexOf("@");
  var dotpos = value.lastIndexOf(".");
  if (apos < 1 || dotpos - apos < 2) {
    errorPoint.call(this, fail);
    return false
  }
  else {
    rightPoint.call(this, success);
    return true
  }
}
function checkTel(success, fail) {
  var value = this.value;
  if (!value) {
    errorPoint.call(this, '不能为空');
    return false;
  }
  if (value.search(/[^0-9]/) !== -1) {
    errorPoint.call(this, fail);
    return false;
  }
  var length = value.match(/[0-g]/g).length;
  if (length !== 11) {
    errorPoint.call(this, '号码只能是11位');
    return false;
  }
  else {
    rightPoint.call(this, success);
    return true;
  }
}
function checkAll(success, fail) {
  var parent = this.parentNode.parentNode.parentNode;

  var $inputs = parent.getElementsByTagName('input');
  var judge = [];
  for (var i = 0; i < $inputs.length - 1; i++) {
    judge.push($inputs[i].onblur());
  }
  for (i = 0; i < judge.length; i++) {
    if (!judge[i]) {
      errorPoint.call(this, fail);
      return false;
    }
  }
  rightPoint.call(this, success);
  return true;
}

function insertForm(parent, label, type, validator, rules, success, fail) {
  var $form_item = createForm({
    label: label,
    type: type,
    validator: validator,
    rules: rules,
    success: success,
    fail: fail
  });
  parent.appendChild($form_item);
}