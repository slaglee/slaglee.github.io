/*内容管理对象*/
//var Jdata = [];
var H5 = function() {
	this.id = ('h5_'+Math.random()).replace('.','_');
	this.el = $('<div class="h5" id="'+this.id+'">').hide();
	this.page = [];
	$('body').append( this.el );
	//新增页
	/**
	 * 新增一个页
	 * @param {string} name 组件的名称，添加到ClassName中
	 * @param {string} text 页内默认文本
	 * @return {H5} H5对象 重复使用对H5对象支持方法
	 */
	this.addPage = function( name , text ) {
		//Jdata.push({isPage:true,name:name,text:text});
		var page = $('<div class="h5_page section">');
		if ( name != undefined) {
			page.addClass('h5_page_'+name);
		}
		if ( text != undefined) {
			page.text(text);
		}
		this.el.append(page);
		this.page.push(page);
		//自动添加滑动导航
		if (typeof this.whenAddpage === 'function') {
			this.whenAddpage();
		}
		return this;
	};
	//新增组件
	this.addComponent = function( name , cfg ) {
		//Jdata.push({isPage:false,name:name,cfg:cfg});
		var cfg = cfg || {};
		cfg = $.extend({
			type: 'base'
		},cfg);
		var component;//定义一个变量，存储组件元素
		var page = this.page.slice(-1)[0];

		switch(cfg.type){
			case 'base' :
				component = new H5ComponentBase(name,cfg);
			break;
			case 'Polyline' :
				component = new H5ComponentPolyline(name,cfg);
			break;
			case 'bar' :
				component = new H5ComponentBar(name,cfg);
			break;
			case 'point' :
				component = new H5ComponentPoint(name,cfg);
			break;
			case 'Radar' :
				component = new H5ComponentRadar(name,cfg);
			break;
			case 'Pai' :
				component = new H5ComponentPai(name,cfg);
			break;

			default:
		}
		page.append(component);
		return this;
	};
	/*H5对象初始化*/
	this.loader = function(fristPage) {
		this.el.fullpage({
			onLeave:function(index, nextIndex, direction){
				//debugger
				$(this).find('.h5_component').trigger('onLeave');
			},
			afterLoad:function(anchorLink, index){
				//debugger
				$(this).find('.h5_component').trigger('onLoad');
			}
		});
		this.page[0].find('.h5_component').trigger('onLoad');
		this.el.show();
		if (fristPage) {
			$.fn.fullpage.moveTo(fristPage);
		}
	};
	this.loader = typeof H5_loading == 'function'? H5_loading : this.loader;
	return this;
}