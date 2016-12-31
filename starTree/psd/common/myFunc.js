function createElement(/* tagName */tagName/* string... */) {
  /* 创建一个文档元素
   * 第一个参数为标签名
   * 剩余的参数为标签中的内容 */
  if(!tagName || typeof tagName != 'string') return undefined;
  var $temp = document.createElement(tagName);
  for (var i = 1; i < arguments.length; i++) {
    $temp.appendChild(document.createTextNode(arguments[i]));
  }
  return $temp;
}/**
 * Created by star on 31/12/16.
 */
