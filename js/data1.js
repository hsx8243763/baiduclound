var check_all = document.getElementsByClassName('check_all');	//全选
var showStyle = getTagName('img',$('right_img'));//显示风格按钮1
var list_style = document.getElementsByClassName('list_sort');	//列表样式切换
var aBoxs = getClassName('right_main_box');//单个文件夹1
var lis = getClassName('lis_style');//单个文件夹列表样式1
var checkBox = getClassName('checkBox');//全选1
var grid = document.getElementsByClassName('grid');	//块样式
var list = document.getElementsByClassName('list');	//列表样式
var nav_list = document.getElementById('nav_list');
var old_style = {elem:aBoxs[0],index:0};	//默认样式
var all_check = false;	//全选状态
var pid = 0;//当前位置hash值
var arr_pid = [];//当前位置hash对应数据
var Id = 0;
var data = [{	//文件数据列表
	fid : 1,
	file_name : 111,
	pid : 0
},
{
	fid : 2,
	file_name : 'CSS课程',
	pid : 0
},
{
	fid : 3,
	file_name : 'HTML课程',
	pid : 0
},
{
	fid : 4,
	file_name : 'JS课程',
	pid : 0
}]
//创建DOM结构，录入相应数据
function newDOM(obj,num,arr,insert){
	pid = location.hash.split('=')[1];	//获取当前所在位置；
	pid = pid?parseInt(pid):0;	//当前位置不存在 默认首页；
	arr_pid = arr.filter(function(a){ return a.pid == pid;});	//取出当前位置下文件列表
	if(!insert){	//插入数据 不执行清除
		obj.innerHTML = '';	//构建数据前执行数据清除
	}
	if(num){
		for(var i=0;i<arr_pid.length;i++){
			var li = document.createElement('li');
			var input = document.createElement('input');
			var a = document.createElement('a');
			input.type = 'checkbox';
			input.onclick = function(){
				checked_fun(old_style.index);	//处理选中状态
			}
			a.href = 'javascript:;';
			a.innerText = arr_pid[i].file_name;
			li.appendChild(input);
			li.appendChild(a);
			li.onmousedown = function(ev){	//右击事件
				if(ev.button == 2){
					tips_fun(this,obj);
				}
			}
			li.fid = arr_pid[i].fid;	//记录元素编号 用于重命名
			li.pid = arr_pid[i].pid;
			li.ondblclick = function(ev){
				ev.cancelBubble = true;	//阻止冒泡 双击时单击会被触发两次
				location.hash = 'pid='+this.fid;	//记录打开文件路径
			}
			if(!insert){	//列表展现 数据插入尾部
				obj.appendChild(li);
			}else{	//新增 数据插入头部
				return obj.insertBefore(li,obj.firstElementChild);
			}
		}
	}else{
		for(var i=0;i<arr_pid.length;i++){
			var dl = document.createElement('dl');
			var dt = document.createElement('dt');
			var img = document.createElement('img');
			img.src = 'img/images/6_9.png';
			var span = document.createElement('span');
			var dd = document.createElement('dd');
			var a = document.createElement('a');
			a.href = 'javascript:;';
			a.innerText = arr_pid[i].file_name;
			dd.appendChild(a);
			dt.appendChild(img);
			dt.appendChild(span);
			dt.onmouseenter = function(){	//鼠标移入
				this.className = 'active';
			}
			dt.onmouseleave = function(){	//鼠标移出
				if(this.lastElementChild.className != 'active'){
					_removeClass(this,'active');
					_removeClass(this.lastElementChild,'active');
				}
			}
			dt.onclick = function(){	//鼠标点击
				if(this.lastElementChild.className == 'active'){
					_removeClass(this.lastElementChild,'active');
				}else{
					this.lastElementChild.className = 'active';
					this.className = 'active';
				}
				checked_fun(old_style.index);	//处理选中状态
			}
			dl.appendChild(dt);
			dl.appendChild(dd);
			dl.onmousedown = function(ev){	//右击事件
				if(ev.button == 2){
					tips_fun(this,obj);
				}
			}
			dl.fid = arr_pid[i].fid;
			dl.pid = arr_pid[i].pid;	//记录文件父级
			dl.ondblclick = function(){
				location.hash = 'pid='+this.fid;	//记录打开文件路径
			}
			if(!insert){	//列表展现 数据插入尾部
				obj.appendChild(dl);
			}else{	//新建 数据插入头部
				return obj.insertBefore(dl,obj.firstElementChild);
			}
		}
	}
}
newDOM(old_style.elem,old_style.index,data);	//构建初始数据
//==============================数据操作（增、删、改）========================================
			function data_edit(obj,num,arr){	//修改数据 新数据 修改方式（新增0 删除1 修改2） 原数据
				if(num==2){
					for(var i=0;i<arr.length;i++){
						if(arr[i].fid == obj.fid){
							arr[i].file_name = obj.file_name;	//替换找到位置
						}
					}
				}else if(num==1){	//删除
					for(var i=0;i<arr.length;i++){
						if(arr[i].fid == obj.fid){
							arr.splice(i,1);	//删除找到位置
							i--;
						}
					}
				}else{
					arr.push(obj[0]);	//新增数据
				}
			}
//==============================新建文件夹========================================
			$('right_btn_btn1').onclick = function(){	//增加文件夹
				Id = Id?Id:data.length;	//Id号设置
				Id++;
				var new_data = [{	//新建数据
					fid : Id,
					file_name : '新建文件夹',
					pid : pid
				}];
				var obj = newDOM(old_style.elem,old_style.index,new_data,1);	//列表显示添加数据
				data_edit(new_data,0,data);	//添加数据记录
				checked_fun(old_style.index);	//处理选中状态
//				rename_fun(obj);
			}
//==============================列表样式切换========================================
			showStyle[0].onclick = function(){	//列表样式切换
				if(!old_style.index){	//判断列表展现样式
					showStyle[0].src = 'img/images/6.png';
					showStyle[1].src = 'img/images/8.png';
					old_style.elem = lis[0];
					old_style.index = 1;
			showStyle[1].onclick = function(){
					showStyle[0].src = 'img/images/7.png';
					showStyle[1].src = 'img/images/9.png';
					old_style.elem = aBoxs[0];
					old_style.index = 0;
				}
				newDOM(old_style.elem,old_style.index,data);	//样式改变重构数据
				checked_fun(old_style.index,1);	//处理选中状态
			}
//==============================右键列表层========================================
			function tips_fun(obj,parObj){	//右键列表
				obj.oncontextmenu = function(ev){	//阻止默认鼠标事件
					ev = ev || event;
            		ev.preventDefault();
           		};
				var tips = getClassName('tips');	//获取右键列表
				var tips_lis = tips[0].getElementsByTagName('li');	//获取右键列表
				tips[0].oncontextmenu = function(ev){	//阻止默认鼠标事件
					ev = ev || event;
            		ev.preventDefault();
           		};
				tips[0].style.display = 'block';
				tips[0].style.left = obj.offsetLeft+60+'px';
				tips[0].style.top = obj.offsetTop+'px';
				for(var i=0;i<tips_lis.length;i++){
					tips_lis[i].index = i;
					tips_lis[i].onclick = function(){
						if(this.index==1){	//重命名
							rename_fun(obj);
						}else if(this.index==2){	//删除元素
							parObj.removeChild(obj);
							data_edit(obj,1,data);	//删除数据列表中对应数据
							checked_fun(old_style.index);	//处理选中状态
						}else{	//打开文件夹
							location.hash = 'pid='+obj.fid;	//记录打开文件路径
//							newDOM(parObj,0,data);	//展开子级文件列表
						}
						tips[0].style.display = 'none';
					}
				}
				tips[0].onmouseleave = function(){	//鼠标移出 关闭右键列表
					this.style.display = 'none';
				}
				for(var i=0;i<tips_lis.length;i++){
					tips_lis[i].onmouseenter = function(){	//右键列表 鼠标经过状态
						for(var j=0;j<tips_lis.length;j++){
							_removeClass(tips_lis[j],'active');
						}
						this.className = 'active';
					}
				}
			}
//==============================文件重命名层========================================
			function rename_fun(obj){	//重命名
				var rename = document.getElementsByClassName('rename');
				var inputs = rename[0].getElementsByTagName('input');
				inputs[0].value = '';
				rename[0].style.display = 'none';
				if(!old_style.index){	//判断列表展现样式
					rename[0].style.left = obj.offsetLeft+'px';
					rename[0].style.top = obj.offsetTop+obj.offsetHeight-20+'px';
				}else{
					rename[0].style.left = obj.offsetLeft+48+'px';
					rename[0].style.top = obj.offsetTop+5+'px';
				}
				rename[0].style.display = 'block';	//打开重命名层
				inputs[0].focus();
				inputs[1].onclick = function(){	//确认按钮
					if(inputs[0].value == ''){
						alert('请输入文件名！');
						inputs[0].focus();
					}else{
						if(!old_style.index){
							obj.lastElementChild.lastElementChild.innerText = inputs[0].value;	//替换名称
						}else{
							obj.lastElementChild.innerText = inputs[0].value;	//替换名称
						}
						obj.file_name = inputs[0].value;
						rename[0].style.display = 'none';
						data_edit(obj,2,data);	//修改数据列表对应名称
					}
				}
				inputs[2].onclick = function(){	//取消按钮
					inputs[0].value = '';
					rename[0].style.display = 'none';
				}
				document.onmousedown = function(ev){	//重命名打开时检测鼠标按下事件
					ev = ev || event;
					if(ev.target != inputs[0] && ev.target != inputs[1]){	//不是输入框 也不是确认按钮
						inputs[2].onclick();	//关闭重命名层
						document.onmousedown = null;	//清空鼠标按下事件
					}
				}
			}
//==============================选择处理========================================
			var check_ed = [];	//记录选中状态
			checkBox.ed = false;
			checkBox[0].onclick = function(){
				if(this.checked){
					checkBox.ed = true;
					checked_fun(old_style.index,1);	//全选
				}else{
					check_ed = [];	//清除记录状态
					checkBox.ed = false;	//清除全选
					checked_fun(old_style.index,1);	//全不选
				}
			}
			function checked_fun(index,style,check){	//选择处理(当前样式，切换)
				if(style){	//切换列表 还原已选中状态
					if(index){	//还原对应样式
						var lis = lis[0].children;
						for(var i=0;i<lis.length;i++){	//循环列表
							if(check_ed[lis[i].fid] || checkBox.ed){	//记录为真的勾选
								lis[i].firstElementChild.checked = true;
							}else{
								lis[i].firstElementChild.checked = false;
							}
						}
					}else{
						var dts = aBoxs[0].children;
						for(var i=0;i<dts.length;i++){	//循环列表
							if(check_ed[dts[i].fid] || checkBox.ed){	//记录为真的添加选中状态
								dts[i].firstElementChild.className = 'active';
								dts[i].firstElementChild.lastElementChild.className = 'active';
							}else{
								dts[i].firstElementChild.className = '';
								dts[i].firstElementChild.lastElementChild.className = '';
							}
						}
					}
					return false;	//切换样式 还原选中状态 返回函数
				}
				if(index){
					var lis = lis[0].children;
					for(var i=0;i<lis.length;i++){
						if(lis[i].firstElementChild.checked){	//已选中对象 加入记录
							check_ed[lis[i].fid] = true;
						}else{
							check_ed[lis[i].fid] = false;
						}
					}
				}else{
					var dts = aBoxs[0].children;
					for(var i=0;i<dts.length;i++){	//已选中对象 加入记录
						if(dts[i].firstElementChild.lastElementChild.className == 'active'){
							check_ed[dts[i].fid] = true;
						}else{
							check_ed[dts[i].fid] = false;
						}
					}
				}
				if(check_ed.every(function(a){ return a;})){
					checkBox[0].checked = true;
				}else{
					checkBox.ed = false;	//清除全选键记录
					checkBox[0].checked = false;	//清除全选
				}
			}
//==============================当前所在位置处理========================================
			var title_left = getClassName('right_title_line')[0];
			var dis_arr = [];
			function dis_list(p_id){	//循环查找父级
				if(p_id){
					data.some(function(a){
						if(a.fid == p_id){	//存储每一级
							dis_arr.push('<a href="#pid='+a.fid+'">'+a.file_name+'</a>');
							dis_list(a.pid);
						}
					});
				}else{
					if(dis_arr.length){	//处理每一级 全部文件 返回上级
						dis_arr.push('<a href="#pid=0">全部文件</a>');
						dis_arr = dis_arr.reverse();
						var dis_last = dis_arr[dis_arr.length-2].split('">')[0]+'">返回上一级</a>';
						title_left.innerHTML = dis_last +' | '+ dis_arr.join(' > ') + ' > ';
					}else{
						title_left.innerText = '全部文件';
					}
				}
			}
//==============================页面跳转（hash改变）========================================
window.onhashchange = function(){	//hash值改变时 刷新列表
	data_list(old_style.elem,old_style.index,data);	//展开子级文件列表
	dis_arr = [];	//清空历史位置数据
	dis_list(pid);	//当前所在位置 数据重组
}
}