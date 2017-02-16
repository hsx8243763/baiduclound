var aData =[{
				id:1,
				name:'js课程',
				pId:0
			},
			{
				id:2,
				name:'css课程',
				pId:0
			},
			{
				id:3,
				name:'html课程',
				pId:0
			},
			{
				id:4,
				name:'php课程',
				pId:1
			},]
var num = 0+aData.length;//文件夹id
var aBoxs = getClassName('right_main_box');//单个文件夹
var pid = 0;
var left_btn_on = true; 
var showStyle = getTagName('img',$('right_img'));//显示风格按钮
var showStyle_onOff = true;//切换风格开关
var main_box = getClassName('right_main')[0];
var newfloer_onOff = true;
var ul = getClassName('reightKey')[0]
//改变文件显示风格
showStyle[0].onclick = function(){
	showStyle[0].src = 'img/images/6.png';
	showStyle[1].src = 'img/images/8.png';
}
showStyle[1].onclick = function(){
	showStyle[0].src = 'img/images/7.png';
	showStyle[1].src = 'img/images/9.png';
}
var left_btn = getTagName('a',getClassName('left_main_menu')[0])[0]
var left_ul = getTagName('ul',getClassName('left_main_menu')[0])[0]
left_btn.onclick = function(){
	if(left_btn_on){
		left_ul.style.display = 'block';
		left_btn_on = false;
	}else{
		left_ul.style.display = 'none';
		left_btn_on = true;
	}
}

TxtName();//
var floar_name = getClassName('floar_name')[0];//文本输入框
//创建DOM结构，录入相应数据
function newDOM(pId,index){
	var b = location.hash.split('#')[1];
	if(showStyle_onOff){
		var box = document.createElement('div');
		box.className = 'right_main_box';
		box.onOff = true;
		if(index == undefined){
			box.bb = num+1;
		}else{
			box.bb = index+1;
		}
		var boxx = document.createElement('div');
		boxx.className = 'boxx';
		var img = document.createElement('img');
		img.src = 'img/images/6_9.png';
		img.className = 'img';
		var txt = document.createElement('div');
		if(newfloer_onOff){
			if(pId == 0){
				txt.innerHTML = aData[index].name;
			}else{
				if(aData[index].pId == b){
					txt.innerHTML = aData[index].name;
				}			
			}
		}
		txt.className = 'right_main_box_txt';
		box.appendChild(boxx);
		box.appendChild(img);
		box.appendChild(txt);
		$('foler').appendChild(box);
		floar_name.style.display = 'inline';
		floar_name.style.top = box.offsetTop+120 + 'px';
		floar_name.style.left = box.offsetLeft +12+ 'px';
		//鼠标移入文件夹
		box.onmouseover = function(ev){
			ev.cancelBubble = true;
			if(floar_name.style.display == 'none'&&box.chack != 'on'){
				img.src = 'img/images/6_59.png';
			}
		}
		//鼠标移出文件夹
		box.onmouseout = function(ev){
			ev.cancelBubble = true;
			if(box.chack != 'on'){
				img.src = 'img/images/6_9.png';
			}
		}
		//鼠标点击文件夹左上角
		boxx.onclick = function(ev){
			ev.cancelBubble = true;	
			if(ul.style.display == 'block'){
			}else{
				ev.cancelBubble = true;
				if(box.onOff){
				}else{
					img.src = 'img/images/6_9.png';
					box.chack = 'off';
					box.onOff = true;
				}
			}
			checkAll()
		}
		//鼠标双击
		box.ondblclick = function(ev){
			if(floar_name.style.display == 'none'){
				location.hash = '#'+ this.bb;
				getClassName('right_title')[0].innerHTML += '<span>> '+aData[this.bb-1].name+'</span>';
			}else{
				alert('请先完成新建~~')
			}
		}
		//鼠标右击
		box.oncontextmenu = function(ev){
			var aBoxs = getClassName('right_main_box');
			ev.preventDefault();
			ul.style.display = 'block';
			ul.style.left = ev.clientX + 'px';
			ul.style.top = ev.clientY + 'px';
			var lis = getTagName('li',ul);
			lis[0].onclick = function(){
				box.ondblclick();
				ul.style.display = '';
			}
			lis[1].onclick = function(){
				$('right_btn_btn2').onclick();
				ul.style.display = '';
			}
			lis[2].onclick = function(){
				 $('right_btn_btn3').onclick();
				 ul.style.display = '';
			}
		}
		main_box.onclick = function(ev){
			if(ev.target.parentNode != ul){
				ul.style.display = '';
			}
		}
	}
	getClassName('right_main_text')[0].select();
	getClassName('right_main_text')[0].focus();
	//文件名输入框旁的创建按钮
	getClassName('right_main_btn1')[0].onclick = function(){
		var c = true;
		newfloer_onOff = true;
		txt.innerHTML = getClassName('right_main_text')[0].value;
		for(var i = 0;i<aData.length;i++){
			if(txt.innerHTML == aData[i].name){
				c = false;
			}
		}
		//录入文件夹数据
		if(c){
			var j = {};
			j.name = txt.innerHTML;
			num++;
			j.id = num;
			if(location.hash ==''){
				j.pId = 0;
			}else{
				j.pId = location.hash.split('#')[1];
			}
			aData.push(j);
			getClassName('right_main_text')[0].value = '新建文件夹';
			floar_name.style.display = 'none';
		}else{
			alert('文件名重复~~')
		}
	}
	//文件名输入框旁的删除按钮
	getClassName('right_main_btn2')[0].onclick = function(){
		$('foler').removeChild(box);
		floar_name.style.display = 'none';
	}
}
// 新建文件夹
$('right_btn_btn1').onclick = function(){
	newfloer_onOff = false;
	newDOM();
};
//初始化
if(location.hash == ''||location.hash == "#0"){
	newfloer_onOff = true;
	for(var i = 0;i<aData.length;i++){
		if(aData[i].pId == 0){
			newDOM(0,i);
		}
	}
	floar_name.style.display = 'none';
	var aBoxs = getClassName('right_main_box');
	var many = getTagName('strong',$('right'))[0];
	many.innerHTML = aBoxs.length;
}
//页面跳转
window.onhashchange = function(){
	var aBoxs = getClassName('right_main_box');
	newfloer_onOff = true;
	var b = location.hash.split('#')[1]//hash值改变时 刷新列表
	for(var i = 0;i<aBoxs.length;i++){
		$('foler').innerHTML = '';
	}
	if(!b){
		for(var i = 0;i<aData.length;i++){
			if(aData[i].pId == 0){
				newDOM(0,i);
			}	
		}	
	}
	for(var i = 0;i<aData.length;i++){
		if(aData[i].pId == b){
			newDOM(b,i);
		}	
	}
	floar_name.style.display = 'none';
	var aBoxs = getClassName('right_main_box');
	var many = getTagName('strong',$('right'))[0];
	many.innerHTML = aBoxs.length;
	//面包屑
	crumb();
	checkAll()
}
//文件名输入框
function TxtName(){
	var main_box = getClassName('right_main')[0];
	var floar_name = document.createElement('div');
	floar_name.className = 'floar_name';
	var textbox = document.createElement('input');
	textbox.type = 'text';
	textbox.value = '新建文件夹';
	textbox.className = 'right_main_text';
	var sure = document.createElement('input');
	sure.type = 'button';
	sure.className = 'right_main_btn1';
	var close = document.createElement('input');
	close.type = 'button';
	close.className = 'right_main_btn2';
	floar_name.appendChild(textbox)
	floar_name.appendChild(sure)
	floar_name.appendChild(close)
	main_box.appendChild(floar_name);
}
//重命名
$('right_btn_btn2').onclick = function(){
	var aBoxs = getClassName('right_main_box');
	var floar_name = getClassName('floar_name')[0];
	var txt = getClassName('right_main_box_txt');
	var n = 0;
	var k = 0;
	for(var i = 0;i< aBoxs.length; i++){
		if(aBoxs[i].chack == 'on'){
			n++;
			k = i;
		}
	}
	if(n == 1){
		floar_name.style.top = aBoxs[k].offsetTop+120 + 'px';
		floar_name.style.left = aBoxs[k].offsetLeft-6 + 'px';
		floar_name.style.display = 'inline';
		getClassName('right_main_text')[0].select();
		getClassName('right_main_text')[0].focus();
		getClassName('right_main_btn1')[0].onclick = function(){
			var c = true;		
			for(var i = 0;i<aData.length;i++){
				if(getClassName('right_main_text')[0].value == aData[i].name){
					c = false;
				}
			}
			if(c){	
				txt[k].innerHTML = getClassName('right_main_text')[0].value;
				aData[k].name = txt[k].innerHTML;
				aBoxs[k].chack == 'off'
				floar_name.style.display = 'none';
			}else{
				alert('文件名重复~~')
			}
		}
		getClassName('right_main_btn2')[0].onclick = function(){
			floar_name.style.display = 'none';
		}
	}
}
//删除文件夹
$('right_btn_btn3').onclick = function(){	
	var aBoxs = getClassName('right_main_box');
	var n = 0
	for(var i = 0;i< aBoxs.length; i++){
		if(aBoxs[i].chack == 'on'){	
			n++;
			var txt1 = getClassName('right_main_box_txt',aBoxs[i])[0]
			for(var j = 0;j<aData.length;j++){
				if(txt1.innerHTML == aData[j].name){
					aData.splice(j,1);//删除相应数据
				}
			}
			$('foler').removeChild(aBoxs[i]);
			i--;
		}
	}
	if(n = 0){
		alert('请选择要删除的文件夹');
	}
	var many = getTagName('strong',$('right'))[0];
	many.innerHTML = aBoxs.length;
	if(aBoxs.length == 0){
		checkBox.checked = false;
	}
}
//全选
var checkBox = getClassName('checkBox')[0];
checkBox.onclick = function(){
	var aBoxs = getClassName('right_main_box');
	var img = getTagName('img',$('foler'));
	var lis_chack =getTagName('input',getClassName('lis_style')[0]);
	if(checkBox.checked){
		for (var i = 0;i<aBoxs.length;i++) {
			aBoxs[i].chack = 'on';
			img[i].src = 'img/images/6_57.png';
		}
	}else{
		for (var i = 0;i<aBoxs.length;i++) {
			aBoxs[i].chack = 'off';
			img[i].src = 'img/images/6_9.png';
		}
	}
}
//判断是否都选中
function checkAll(){
	var n = 0;
	if(showStyle_onOff){
		for(var i=0;i<aBoxs.length;i++){
			if(aBoxs[i].chack == 'on'){
				n++;
			}	
		}
	}else{
		for(var i=0;i<lis_chack.length;i++){
			if(lis_chack[i].checked){
				n++;
			}	
		}
	}
	if(n == aBoxs.length){	
		checkBox.checked = true;
	}else{
		checkBox.checked = false;
	}
}
//面包屑
function crumb(){
	var aline = getTagName('span',getClassName('right_title')[0]);
	for(var i = 0;i<aline.length;i++){
		aline[i].index = i
		aline[i].onclick = function(){
			var crumb_num = this.index+1
			var aline = getTagName('span',getClassName('right_title')[0]);
			if(this.index > 0){
				var name = aline[this.index].innerHTML.split('&gt; ')[1]
			}else{
				var name = aline[this.index];
				for(var n = 1;n<aline.length;n++){
					aline[n].innerHTML = '';
				}
				location.hash = 0;
			}
			for(var j=0;j<aData.length;j++){
				if(name == aData[j].name){
					location.hash = aData[j].id
				}
			}
			for(var a = crumb_num;a<aline.length;a++) {
				console.log(aline.length,a)
				getClassName('right_title')[0].removeChild(aline[a])
				a--;
			}
		}
	}
}
//框选,拖拽
var shadow = document.getElementById("shadow");
var pos = {};
var pos2 = [];
var box_name = '';
var isRect = false;
var isDrag = false;
var b = 0;
var d = 0;
main_box.onmousedown = function(ev){	
	if(ev.target.parentNode.parentNode != $('foler')){
		pos.x = ev.clientX
		pos.y = ev.clientY
		b = window.pageYOffset;
		d = window.pageXOffset;
		isRect = true;	
	}else{
		if(ev.target.parentNode.chack == 'on'){
			pos.x = ev.clientX;
			pos.y = ev.clientY;
			isDrag = true;
			pos2 = [];
			for(var i=0;i<aBoxs.length;i++){
				if(aBoxs[i].chack == 'on'){
					aBoxs[i].h = 1;
					pos2.push({
						x:aBoxs[i].getBoundingClientRect().left,
						y:aBoxs[i].getBoundingClientRect().top,
						e:aBoxs[i]
					})
				}
			}
		}else{
			for(var i=0;i<aBoxs.length;i++){
				if(aBoxs[i].isCheck){
					var img = getTagName('img',aBoxs[i])[0];
					img.src = 'img/images/6_9.png';
					aBoxs[i].chack = 'off';
					aBoxs.onOff = true;
					aBoxs[i].style.zIndex = '';
					aBoxs[i].isCheck = false;
				}
			}
			pos2 = [];
			var img = getTagName('img',ev.target.parentNode)[0];
			img.src = 'img/images/6_57.png';
			ev.target.parentNode.chack = 'on';
			ev.target.parentNode.onOff = false;
			ev.target.parentNode.h = 1;
			ev.target.parentNode.style.zIndex = 10;
			ev.target.parentNode.isCheck = true;
			checkAll()
			pos2.push({
				x:ev.target.parentNode.getBoundingClientRect().left,
				y:ev.target.parentNode.getBoundingClientRect().top,
				e:ev.target.parentNode
			})
			pos.x = ev.clientX;
			pos.y = ev.clientY;
			isDrag = true;
		}
	}
	ev.preventDefault();
}
document.onmousemove = function(ev){
	if(isRect){		
		var l = ev.clientX;
		var t = ev.clientY;
		console.log(ev.clientY)
		if(l < 210){
			l = 224
		}
		if(t < 190 - window.pageYOffset){
			t = 190 - window.pageYOffset
		}
		var w = Math.abs(l-pos.x);
		var h = Math.abs(t-pos.y);
		var iL = l<pos.x?l+window.pageXOffset:pos.x+window.pageXOffset;
		var iT = t<pos.y?t+window.pageYOffset:pos.y+window.pageYOffset;	
		shadow.style.display = 'block';
		shadow.style.left = iL + 'px';
		shadow.style.top = iT + 'px';
		shadow.style.width = w + 'px';
		shadow.style.height = h + 'px';
		for(var i=0;i<aBoxs.length;i++){
			if(duang(shadow,aBoxs[i])){
				var img = getTagName('img',aBoxs[i])[0];
				img.src = 'img/images/6_57.png';
				aBoxs[i].chack = 'on';
				aBoxs[i].isCheck = true;
				aBoxs[i].style.zIndex = 10;
				checkAll()	
			}else{
				var img = getTagName('img',aBoxs[i])[0];
				img.src = 'img/images/6_9.png';
				aBoxs[i].chack = 'off';
				aBoxs[i].isCheck = false;
				aBoxs[i].style.zIndex = '';
				checkAll()	
			}
		}
	}
	if(isDrag){
		var forder_shadow = getClassName('foler_shadow')[0]
		var forder_number = getTagName('span',$('circle'))[0]
		forder_number.innerHTML = pos2.length;
		var l = ev.clientX;
		var t = ev.clientY;	
		if(l < 210){
			l = 224
		}
		if(t < 190 - window.pageYOffset){
			t = 190 - window.pageYOffset
		}
		for(var i=0;i<pos2.length;i++){
			forder_shadow.style.display = 'block';
			forder_shadow.style.left = l - forder_shadow.getBoundingClientRect().left +forder_shadow.offsetLeft + 'px';
			forder_shadow.style.top = t - forder_shadow.getBoundingClientRect().top + forder_shadow.offsetTop + 'px';
			for (var j=0;j<aBoxs.length;j++) {
				if(aBoxs[j].h != 1){
					if(duang(forder_shadow,aBoxs[j])){
						var img = getTagName('img',aBoxs[j])[0];
						var txts = getTagName('div',aBoxs[j])[1];
						img.src = 'img/images/6_57.png';
						aBoxs[j].chack = 'on';
						box_name = txts.innerHTML;
						checkAll()			
					}else{
						var img = getTagName('img',aBoxs[j])[0];
						img.src = 'img/images/6_9.png';
						aBoxs[j].chack = 'off';
						checkAll()		
					}
				}
			}
		}
	}
}	
document.onmouseup = function(){
	var forder_shadow = getClassName('foler_shadow')[0];
	var aBoxs = getClassName('right_main_box');
	c = 0;
	if(isRect){
		isRect = false;
		shadow.style.cssText = '';
	}
	if(isDrag){
		if(box_name){
			for(var i=0;i<aData.length;i++){
				if(box_name == aData[i].name){
					var forer_id = aData[i].id
					for (var j=0;j<pos2.length;j++) {
						aData[pos2[j].e.bb-1].pId = forer_id;
						$('foler').removeChild(pos2[j].e);
					}
				}
			}
		}
		for(var i=0;i<pos2.length;i++){
			forder_shadow.style.display = 'none'
		}
		for (var j=0;j<aBoxs.length;j++) {
			aBoxs[j].h = ''
		}
		box_name = ''
		pos2 = [];
		isDrag = false;
	}
	var many = getTagName('strong',$('right'))[0];
	many.innerHTML = aBoxs.length;
	for(var i=0;i<aBoxs.length;i++){
		aBoxs[i].style.position = '';
	}
}
//检测碰撞函数
function duang(obj1,obj2){
	var pos1 = obj1.getBoundingClientRect();
	var pos2 = obj2.getBoundingClientRect();
	if(pos1.right<pos2.left || pos1.bottom<pos2.top || pos1.left>pos2.right || pos1.top>pos2.bottom){
		//没碰上
		return false;
	}else{
		//碰上
		return true;
	}
}				