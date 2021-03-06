/*折线图表通用组件对象*/
var H5ComponentPolyline = function(name,cfg){
	var component = new H5ComponentBase(name , cfg);
	//绘制网格线
	var w = cfg.width;
	var h = cfg.height;
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	/*网格线不动，折线图动*/
	component.append(cns);
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	/*绘制网格*/
	//水平网格分10份
	var step = 10;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#AAA";

	window.ctx = ctx;
	for (var i=0;i<step+1;i++) {
		var y = (h/step)*i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}
	//垂直网格
	step = cfg.data.length+1;
	var text_w = w/step>>0;
	for (var i=0;i<step+1;i++) {
		var x = (w/step)*i;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);
		if (cfg.data[i]) {
			var text = $('<div class="text">');
			text.text(cfg.data[i][0]);
			text.css('width',text_w/2).css('left',x/2 + text_w/4);

			component.append(text);
		}
	}
	ctx.stroke();
	//绘制折线数据,加入画布
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);
	/**
	 * 绘制折线以及阴影
	 * per  百分数，表示数据对应折线绘制状态
	 */
	var draw = function(per){
		ctx.clearRect(0,0,w,h);//清空画布
		//绘制折线数据
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#ff8878";

		var x = 0;
		var y = 0;
		//step = cfg.data.length+1;
		var row_w = (w/(cfg.data.length+1));
		//画点
		for (i in cfg.data) {
			var item = cfg.data[i];
			x = row_w*i + row_w;
			//per决定位置
			y = h-h*item[1]*per;
			ctx.moveTo(x,y);
			ctx.arc(x,y,2,0,2*Math.PI);
		}
		//连线
		ctx.moveTo(row_w,h-h*cfg.data[0][1]*per);
		for (i in cfg.data) {
			var item = cfg.data[i];
			x = row_w*i + row_w;
			y = h-h*item[1]*per;
			ctx.lineTo(x,y);
		}
		ctx.stroke();
		//绘制阴影
		ctx.lineTo(x,h);
		ctx.lineTo(row_w,h);
		ctx.fillStyle = 'rgba(255,136,120,0.3)';
		ctx.fill();
		//写数据
		for (i in cfg.data) {
			var item = cfg.data[i];
			x = row_w*i + row_w;
			y = h-h*item[1]*per;
			ctx.fillStyle = item[2]? item[2]:'#595959';
			ctx.fillText(((item[1]*100)>>0)+'%' , x-10, y-10 );
		}
		//ctx.stroke();
	}
	//draw(0);

	//动画
	component.on('onLoad',function(){
		var s = 0;
		for (i = 0; i <100 ; i++ ) {
			setTimeout(function(){
				s+=.01;
				draw(s);
			},i*10+500);//序列递增
		}
	});
	component.on('onLeave',function(){
		var s = 1;
		for (i = 0; i <100 ; i++ ) {
			setTimeout(function(){
				s-=.01;
				draw(s);
			},i*10+500);//序列递增
		}
	});
	
	return component;
}