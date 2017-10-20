/* 公共组件文件 */
var componentBase = function(name,cfg) {
	var cfg = cfg || {};
	//定义动态绑定id
	var id = ('slag_l_'+Math.random()).replace('.','_');
	//定义动态绑定type类
	var cls = 'slag_component_'+ cfg.type;
	//添加dom主元素，绑定默认slag_component主类以及type类，name类，id
	var component = $('<div class="slag_component '+cls+' slag_component_name_'+name+'" id="'+id+'"></div>');

	//设置基本组件属性
	cfg.text && component.text(cfg.text);
	cfg.width && component.width(cfg.width);
	cfg.height && component.height(cfg.height);
	cfg.css && component.css(cfg.css);
	cfg.bg && component.css('backgroundImage','url('+cfg.bg+')').css('backgroundSize','cover').css('backgroundRepeat','no-repeat');
	cfg.bgColor && component.css('backgroundColor',cfg.bgColor);
	//居中设置
	if (cfg.center === true) {
		component.css({
			marginLeft: (cfg.width/2*(-1))+'px',
			left: '50%'
		})
	}
	//动态添加动画
	component.on('onLoad',function(){
		component.addClass(cls+'_load').removeClass(cls+'_leave');
		cfg.animateIn && component.animate(cfg.animateIn);
		return false;
	});
	component.on('onLeave',function(){
		component.addClass(cls+'_leave').removeClass(cls+'_load');
		cfg.animateOut && component.animate(cfg.animateOut);
		return false;
	});
	//返回值dom
	return component;
}