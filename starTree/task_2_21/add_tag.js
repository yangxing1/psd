/**
 * Created by star on 09/01/17.
 */
"use strict";

function AddTag (box_id, input_id) {
  this.data = [];
  this.box = document.getElementById(box_id);
  this.input =document.getElementById(input_id);
}
AddTag.prototype.add = function () {
  /* 添加子节点
  * 先检查是否有输入并获取输入
  * 在使用insertBefore()插入 */
  var value;
  var self = this;
  if (value = AddTag.__check__.call(self)) {
    var childs = this.box.childNodes;
    value.forEach(function (item) {
      if (self.data.length == 10) {
        // 如果数量大于10 以队列的方式删除节点
        self.remove(childs[self.data.length-1]);
      }
      if (!AddTag.__noRepeat__.call(self, item)) return undefined;
      var $item = createElement('li', item);
      self.box.insertBefore($item, childs[0]);
      $item.className = 'item';
      self.hover($item);
      self.data[self.data.length] = item;
    });
  }
};
AddTag.__noRepeat__ = function (str) {
  /* 检查是否有重复
  * 如果重复返回false
  * 没问题返回true*/
  for (var i = 0; i < this.data.length; i++) {
    if (str === this.data[i]) {
      return false;
    }
  }
  return true;
};
AddTag.__check__ = function () {
  /* 检查input的值
  * 解析并作为数组返回
  * 使用正则match()解析
  * 正则表达式为/[a-z0-9\u0391-\uFFE5]+/g */
  var value;
  if (!this.input.value) return undefined;
  value = this.input.value.match(/[a-z0-9\u0391-\uFFE5]+/g);
  this.input.value = '';
  if (value) return value;
};
AddTag.prototype.remove = function (item) {
  /* 删除一个节点
  * 删除数据
  * 考虑数据储存是不是多此一举*/
  if (!this.data.length) return undefined;
  for (var i = 0; i < this.data.length; i++) {
    if (this.data[i] === item.innerHTML) {
      AddTag.__del__.call(this, i);
    }
  }
  this.box.removeChild(item);
};
AddTag.__del__ = function (index) {
  // 删除数据中的一项
  for (var i = index; i < this.data.length - 1; i++) {
    this.data[i] = this.data[i + 1];
  }
  this.data.length -= 1;
};
AddTag.prototype.hover = function (item) {
  /* 对item节点添加三个事件
  * 鼠标移动到节点上动画
  * 0.5秒之后改变内容，添加点击时间
  * 鼠标移出后还原节点 */
  var self = this;
  var value = item.innerHTML;
  var timer;
  item.onmouseover = function () {
    item.className += ' item_hover';
    timer = setTimeout(function () {
      item.innerHTML = 'Delete';
      item.onclick = function () {
        self.remove(item);
      };
    }, 500);
  };

  item.onmouseout = function () {
    item.className = 'item';
    clearTimeout(timer);

    // 预防超过0.5秒之后移出再点击
    item.onclick = function () {};
    item.innerHTML = value;
  };
};