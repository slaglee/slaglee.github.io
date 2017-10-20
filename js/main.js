/* 主页组件文件 */
var componentMain = function(name,cfg){
	var component = new componentBase(name , cfg);
	$.each(cfg.data,function(index, item){
		var cont = $('<div class="content">');
		var title = $('<div class="title">');
		var text = $('<div class="text">');
		var bg = $('<div class="bgshow">');

		title.text(item[0]);
		text.text(item[1]);

		cont.append(bg).append(title).append(text);
		cont.bind('click',function(){
			window.open(item[2]);
		});
		cont.hover(function(){
			bg.addClass('scale_0').removeClass('scale_1');
		},function(){
			bg.addClass('scale_1').removeClass('scale_0');
		});
		component.append(cont);
	})
	return component;
}