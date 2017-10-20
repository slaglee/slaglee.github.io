/*loading动画脚本*/
var H5_loading = function(images,fristPage){
	var id = this.id;//载入H5.js定义的ID
	//loading载入
	if (this._images === undefined) {//第一次进入
		this._images = ( images || [] ).length;
		this._loaded = 0;
		window[id] = this;//把当前对象存储在全局对象下，用来进行某图图片加载完成之后的回调
		for (s in images) {
			var item = images[s];
			var img = new Image;
			img.onload = function() {
				window[id].loader();
			}
			img.src = item;//载入图片缓存
		}
		$('#rate').text('0%');
		return this;
	} else {
		this._loaded++;
		$('#rate').text(( (this._loaded / this._images *100)>>0 )+'%');
		if (this._loaded < this._images) {
			return this;
		}
	}
	//重设window[id]
	window[id] = null;

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
}