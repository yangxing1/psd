/**
 * Created by star on 04/01/17.
 */
window.onload = function () {
  var $box = document.getElementsByClassName('box')[0];
  var $box_wrap = document.getElementsByClassName('aqi-chart-wrap')[0];
  var $radio = document.getElementsByTagName('input');
  var $city = document.getElementById('city');
  var $option = document.getElementsByTagName('option');

  var getData = (function () {
    /* 获取数据
     * 使用随机数造假*/
    function getDataStr (dat) {
      var year = dat.getFullYear();
      var month = dat.getMonth() + 1;
      var day = dat.getDate();
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      return year + '-' + month + '-' + day;
    }

    return function (number /* Number */) {
      var dat = new Date('2016-01-01');
      var returnData = {};
      for (var i = 0; i < 100; i++) {
        var dataStr = getDataStr(dat);
        returnData[dataStr] = parseInt(Math.random() * number);
        dat.setDate(dat.getDate() + 1);
      }
      return returnData;
    }
  }());

  var sort_data = function (str, data) {
    /* 将数据重组
     * 根据参数传递的字符串选择规则*/
    function sort_day(data) {
      /* 对象转数组*/
      var returnData = [];
      for (var i = 0, key = Object.keys(data); i < key.length; i++) {
        var title_str = key[i].split('-');
        returnData.push({'date': title_str[1] + '月' + title_str[2] + '日', 'level': data[key[i]]});
      }
      return returnData;
    }
    function sort_month(data) {
      /* 将每条数据中的月份作为数组的索引保存数据*/
      var returnData = [];
      var valueData = [];
      var countData = [];
      for (var i = 0, key = Object.keys(data); i < key.length; i++) {
        var title_str = key[i].split('-');
        if (!valueData[parseInt(title_str[1])] && !countData[parseInt(title_str[1])]) {
          valueData[parseInt(title_str[1])] = 0;
          countData[parseInt(title_str[1])] = 0;
        }
        valueData[parseInt(title_str[1])] += data[key[i]];
        countData[parseInt(title_str[1])]++;
      }
      valueData.forEach(function (item, index) {
        var title_str = index < 10 ? '0' + index : index;
        returnData.push({'date': title_str + '月', 'level': parseInt(item/countData[index])});
      });

      return returnData;
    }
    function sort_week(data) {
      /* 以周为周期排序数据
      * 计算每周的平均数*/
      var returnData = [];
      var valueData = [];
      var count = 0;
      for (var i = 0, key = Object.keys(data); i < key.length; i++) {
        if (i == 0) {
          var date = new Date(data[key[i]]);
          count = date.getDay();
          valueData.push([]);
        }
        if (count == 7) {
          count = 0;
          valueData.push([]);
        }
        valueData[valueData.length - 1].push({'date': key[i], 'level': data[key[i]]});
        count++;
      }
      valueData.forEach(function (item) {
        var number = 0;
        var first = item[0].date.split('-');
        var last = item[item.length-1].date.split('-');
        for(var i = 0; i < item.length; i++) {
          number += parseInt(item[i].level);
        }
        returnData.push({'date': first[1] + '月' + first[2] + '日 - ' + last[1] + '月' + last[2] + '日', 'level': parseInt(number / item.length)});
      });
      return returnData;
    }

    if (str == 'day') {
      return sort_day(data);
    }
    else if (str == 'month') {
      return sort_month(data);
    }
    else if (str == 'week') {
      return sort_week(data);
    }
  };

  function render_wrap(data/* array */) {
    /* 渲染柱形图
    * 设置每个柱形图的宽度和高度*/
    $box.removeChild($box_wrap);
    $box_wrap = createElement('ul');
    $box_wrap.className = 'aqi-chart-wrap';
    $box.appendChild($box_wrap);

    var width = ((1 / data.length) * $box_wrap.offsetWidth) / 2;
    
    for(var i = 0; i < data.length; i++) {
      var $item_wrap = createElement('li');
      $item_wrap.style.width = width + 'px';
      $item_wrap.style.height = data[i].level + 'px';
      $item_wrap.setAttribute('title', data[i].date + ' : ' + data[i].level);
      $box_wrap.appendChild($item_wrap);
    }
  }

  function init() {
    // 绑定两个选择的点击事件
    for (var i = 0; i < $radio.length; i++) {
      $radio[i].onclick = function () {
        if (judge.radio !== this.value) {
          judge.radio = this.value;
          var render_data = sort_data(this.value, data[judge.city]);
          render_wrap(render_data);
        }
      }
    }
    $city.onchange = function () {
      for (var i = 0; i < $option.length; i++) {
        if ($option[i].selected) {
          judge.city = $option[i].value;
          if (judge.radio) {
            var render_data = sort_data(judge.radio, data[judge.city]);
            render_wrap(render_data);
          }
        }
      }
    }
  }

  // 数据的储存
  var data = {
    'beijing' : getData(500),
    'chengdu' : getData(300)
  };

  // 确保选择相同不重新渲染
  var judge = {radio: '', city: 'beijing'};

  init();
};