/*
 	运动函数(时间版)
 		move(obj,attrs,duration,fx,endFn)
 		参数：
 		obj:要运动的元素，object
 		attrs:要运动的多个样式,object，{left:400},即使只运动一个样式，也要写成对象形式
 		duration:运动持续时间，毫秒不带单位，number
 		fx:运动形式，string，linear匀速easeIn加速easeOut减速backIn回退渐入
 		endFn:回调函数，function
 * */

/*
 	抖动函数：
 * 		shake(obj,attr,endFn)
 * 	参数：
 * 	 obj：要抖动的元素，object
 * 	attr：抖动的属性（left,top）,string
 * endFn：回调函数,function
 * 
 * */
function move(obj,attrs,duration,fx,endFn){
	//运动开始的时间
	var old = new Date();
	var oldTime = old.getTime();
	//duration运动持续时间
	var d = duration;
	//接收传入的要运动的属性和值
	var j = {};
	//遍历传入的对象，获取要运动的属性和值
	for(var attr in attrs){
		j[attr] = {}
		//起始位置
		j[attr].b =  parseFloat(getComputedStyle(obj)[attr]);
		//运动距离
		j[attr].c = attrs[attr] - j[attr].b;
	}
	clearInterval(obj.timer);
	//一个定时器可以控制多个属性运动，方便定时器管理
	obj.timer = setInterval(function(){
		//监测时间
		var New = new Date();
		var NewTime = New.getTime();
		//算出已过时间
		var t = NewTime - oldTime;
		//已经运动的时间等于设置的运动时间，就证明到目标点了
		if(t >= d){
			t = d;	
		}
		//遍历对象，操作多个属性运动
		for(var attr in j){
			var b = j[attr].b;
			var c = j[attr].c;
			//运动形式设置
			var v = Tween[fx](t,b,c,d);
			if(attr == 'opacity'){
				obj.style[attr] = v;
			}else{
				obj.style[attr] = v +'px';
			}
		}
		if(t >= d){
			clearInterval(obj.timer);
			//回调函数，运动完要执行的代码，写在回调函数里传入
			if(typeof endFn == 'function'){
				endFn && endFn();
			}
		}	
	},20)			
}
function addClass(obj,name){
	classname = obj.className;
	clan = obj.className.split(' ')
	if(classname == ''){
		return obj.className = name;
	}else{
		var arr = classname.split(' ')
		for (var i = 0; i < arr.length; i++) {
			if(arr[i] == name){
				return
			}
		}
		return obj.className += ' ' + name
	}
}
function $(name){
	return document.getElementById(name);
}
function getTagName(name,obj){
	var obj = obj || document;
	return obj.getElementsByTagName(name);
}
function getClassName(name,obj){
	var obj = obj || document;
	return obj.getElementsByClassName(name);
}
/*
 	t:已运动时间（需要计算）
 	b:起始位置（直接获取）
 	c:要运动距离（需要计算）
 	d:运动时间(传入)
 * */
var Tween = {
    linear: function (t, b, c, d){  //匀速
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){  //加速曲线
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //减速曲线
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //加加速曲线
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //减减速曲线
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
}
//抖动函数
function shake(obj,attr,endFn){
    var arr=[];
    var timer=null;
    var n=0;
    obj.num=parseFloat(getComputedStyle(obj)[attr]);
    //拿到一组数字，抖动的幅度。
    for(var i=20;i>0;i-=2){
        arr.push(i,-i);
    }
    arr.push(0);
    //用定时器来实现抖动效果。
    clearInterval(timer);
    timer=setInterval(function(){
        n++;
        if(n>arr.length-1){
            clearInterval(timer);
            endFn&&endFn();
        }
        obj.style[attr]=arr[n]+obj.num+'px';
    },30);
}
function _getTag(name,obj){
	var prefix = name.charAt(0);	//获取前缀
	var suffix = name.slice(1);		//获取后缀
	obj = obj || document;	//是否传递前置元素
	if(prefix == '#'){	//id选择器判断
		return obj.getElementById(suffix);	//返回id元素
	}else if(prefix == '.'){		//兼容低版本ie不能获取class class选择器判断
		var tagAll = obj.getElementsByTagName('*');	//统配符 查找下面所有元素
		var tagArr = [];	//存放所有元素
		for(var i=0;i<tagAll.length;i++){
			classArr = tagAll[i].className.split(' ');	//通过空格拆分所有class名称
			for(var j=0;j<classArr.length;j++){
				if(classArr[j] == suffix){	//判断是否是要获取的name名称
					tagArr.push(tagAll[i]);	//存储制定获取项
				}
			}
		}
		return tagArr;	//返回class元素
	}else{
		return obj.getElementsByTagName(name);	//返回标签名称元素
	}
}
//获取样式
function _getStyle(obj,arrt){	//样式值未初始化时 ie获取为auto会报错
	if(obj.currentStyle){
		return obj.currentStyle[arrt];	//ie浏览器兼容
	}else{
		return getComputedStyle(obj)[arrt];	//标准浏览器兼容
	}
}
////获取元素当前所在位置（待完成）
//function _getPos(obj,arrt){	//样式值未初始化时 ie获取为auto会报错
//	if(obj.currentStyle){
//		return obj.currentStyle[arrt];	//ie浏览器兼容
//	}else{
//		return getComputedStyle(obj)[arrt];	//标准浏览器兼容
//	}
//}
//添加className
function _addClass(obj,name){
	var thisClass = obj.className.split(' ');	//通过空格拆分所有class名称
	for(var i=0;i<thisClass.length;i++){
		if(thisClass[i] == name){	//判断添加的class是否存在
			return obj.className = thisClass.join(' ');	//存在直接拼接原class返回
		}
	}
	if(obj.className == ''){	//判断元素class为空
		return obj.className = name;	//直接给元素赋值class
	}else{
		return obj.className = thisClass.join(' ')+' '+name;	//如果class不存在 且元素已有class 直接追加
	}
}
//获取对象长度
function _getObjLen(obj){
	var objLen = 0;
	for(var item in obj){	//循环对象下标
		objLen++;	//累计下标个数
	}
	return objLen;	//返回长度
}
//删除className
function _removeClass(obj,name){
	var thisClass = obj.className.split(' ');	//通过空格拆分class
	for(var i=0;i<thisClass.length;i++){
		if(thisClass[i] == name){	//判断要删除name是否存在
			thisClass.splice(i,1);	//如果存在 直接删除name所在那1位
		}
	}
	return obj.className = thisClass.join(' ');	//拼接并直接赋予元素删除后class 返回是否成功
}
//字符串转换成DOM节点
function _strToDom(str){
	var element = document.createElement('div');	//创建一个空元素div
	element.innerHTML = str;	//向元素内添加字符串str
	return element.children;	//返回元素子节点 实现str转变成节点
}
//快速排序 递归
function _quickSort(arr){
	if(arr.length<=1){	//需排序数组小于等于1位 不需要排序 直接返回
		return arr;
	}
	var arrFirst = arr.shift();	//取出数组第一位 作为比较值（此处会直接删掉arr第一位值）
	var arrLeft = [];	//存储小于等于比较值时 数组的内容
	var arrRight = [];	//存储大于比较值时 数组的内容
	while(arr.length){	//数组长度值判断 0时停止循环
		if(arrFirst < arr[0]){	//比较值 小于 数组第一位
			arrRight.push(arr.shift());	//大于比较值得存放右数组
		}else{
			arrLeft.push(arr.shift());	//小于等于比较值得存放左数组
		}
	}
	return quickSort(arrLeft).concat(arrFirst,quickSort(arrRight)); //连接左数组 比较值 右数组 然后返回排序完毕
}
//冒泡排序
function _bubbleSort(arr){
	for(var i=0;i<arr.length-1;i++){	//控制比较多少次 由于17行+1 所以不用比较最后一位
		var onOff = true;	//设置一个小开关 判断排序是否完毕
		for(var j=0;j<arr.length-i-1;j++){	//控制相比较的两个值 由于最后一位交换成最大就不需要比较了 同理倒数第二位被交换后也不需要比较了 同理。。。-i
			var a = arr[j];	//存放第一位
			var b = arr[j+1];	//存放下一位
			if(a>b){	//判断是否交换
				arr[j] = b;	//交换第一位
				arr[j+1] = a;	//交换第二位；
				onOff = false;	//开关判断表示交换了
			}
		}
		if(onOff){	//没有交换 就表示排序完毕了 就可以终止循环了
			break;
		}
	}
	return arr;
}
//运动函数封装
function _autoPlay(obj,attrs,timing,endfn){	//对象 样式 动作 定时 回调
	var countTime = 0;	//累计运行时间
	var attr = {};	//组织属性参数
//	console.log(111);
	for(var key in attrs){
		attr[key] = {};
		attr[key].star = parseFloat(getStyle(obj,key));	//获取样式初始值
//		console.log(attr[key].star,getStyle(obj,key));
		attr[key].speed = (attrs[key] - attr[key].star)/timing;
	}
	obj.timer = setInterval(function playStar(){
		countTime+=10;	//累计计时器步长
		for(var key in attr){
			var px = key == 'opacity'?'':'px';	//转换单位
			obj.style[key] = attr[key].star + countTime*attr[key].speed + px;	//起始位置 + 计时器步长 * 速度 加单位
		}
		if(countTime>=timing){	//到达运行时间
			clearInterval(obj.timer);	//终止计时器
			endfn && endfn();	//执行函数回调
		}
	},10);	//计时器步长
}