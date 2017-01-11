function createElement(tagName/* string... */) {
  /* 创建一个文档元素
   * 第一个参数为标签名
   * 剩余的参数为标签中的内容
    * 如果剩余的参数中有document对象，直接添加到心创建的元素中*/
  if (!tagName || typeof tagName != 'string') return undefined;
  var $temp = document.createElement(tagName);
  for (var i = 1; i < arguments.length; i++) {
    if (typeof arguments[i] === 'string') {
      $temp.appendChild(document.createTextNode(arguments[i]));
    }
    else {
      $temp.appendChild(arguments[i]);
    }
  }
  return $temp;
}
/**
 * Created by star on 31/12/16.
 */
