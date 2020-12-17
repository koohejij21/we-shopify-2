var gema = {
  theme: function(json,data,$){
    var tb = '',static = '',first_image = '',button_quick_view='',popup = '',classquickview = '',compare_price_hidden='',style_quick_view='',style_variants='',hover = '',badges = '',image = data.asset_url+'no-image.svg',images_thumb='',content_images_thumb='',cl_thumb='',image_content = '',compare_at_price = '',buttons = '',paginateTop='',paginateBottom='';
    if(json.collection)
    {
      $('.tb-title-collection').html(json.collection.title);
      $('.tb-bodyhtml-collection').html(json.collection.body_html);
    }
	if(json.products.length > 0)
    {
		$.each(json.products, function( index, value ) {
          images_thumb = '';
          content_images_thumb = '';
          cl_thumb = '';
          style_quick_view = '';
          style_variants = '';
		  first_image = '';
            if(value.images)
            {
              $.each(value.images, function( x, u ) {
                cl_thumb = '';
                first_image = '';
                if(x == 0)
                {
                  first_image = ' tb-first-image-thumb';
                  cl_thumb = ' active';
                }
                images_thumb = images_thumb.concat('<li><img src="'+gema.resizeImage(u.src,'x700')+'" style="display:none"><a class="tb-thumb-onclick'+cl_thumb+first_image+' tb-thumb-id-'+value.id+' tb-thumb-id-'+value.id+'-'+u.id+'" href="'+gema.resizeImage(u.src,'x700')+'" data-id="'+value.id+'" data-thumb="'+u.id+'"><img src="'+gema.resizeImage(u.src,'small')+'" /></a></li>');
              });
              content_images_thumb = '<ul class="tb-thumb-swatch tb-slick-carousel-thumb tb-thumb-function-'+value.id+'" style="display:none">'+images_thumb+'</ul>';
            }
            compare_at_price = '';
          	buttons = '<div class="tb-content-button-add-to-cart"><a class="tb-button-add-to-cart btn" data-id="'+value.id+'" href="javascript:void(0);">Add to cart</a><a href="/products/'+value.handle+'" class="tb-button-details btn btn--secondary tb-product-link-'+value.id+'" href="javascript:void(0);">Details</a></div>';
            image = data.asset_url+'tb-noimage.jpg'
            image_content = '<a href="/products/'+value.handle+'" class="tb-productitem--image-link tb-product-link-'+value.id+'">\
    						<figure class="tb-productitem--image" data-product-item-image="">\
       						<img alt="'+value.title+'" class="tb-image-fisrt-'+value.id+'" src="'+image+'">\
    						</figure>\
							</a>';
			if(value.featured_image != null)
			{
			  image = gema.resizeImage(value.featured_image.src,'x700');
              image_content = '<a href="/products/'+value.handle+'" class="tb-productitem--image-link tb-product-link-'+value.id+'">\
    						<figure class="tb-productitem--image" data-product-item-image="">\
    						<img alt="'+value.title+'" class="tb-image-fisrt-'+value.id+'" src="'+image+'">\
    						</figure>\
    						</a>';
            }

			if(data.compare_price > 0)
            {
              if(value.price < value.compare_at_price)
              {
                if(value.compare_at_price)
                {
                  compare_at_price = snappy.Currency.formatMoney(value.compare_at_price, data['money_format']);
                }
              }
            }else{
              compare_price_hidden = ' style="display:none;"';
            }
          
            badges = value.badges;
          
          	if(data.quickv == 0)
            {
              style_variants = ' style="display:none;"';
            }
            if(data.swatchv == 0)
            {
              buttons = '<div class="tb-content-button-add-to-cart"><a href="/products/'+value.handle+'" class="tb-button-details tb-w-100 btn btn--secondary tb-product-link-'+value.id+'" href="javascript:void(0);">Details</a></div>';
            }
          
            if(data.quick_view_status == 0)
            {
              style_quick_view = ' style="display:none;"';
            }
            
            hover = '<div class="tb-product-inner-snappy-filter tb-content-hover" data-id="'+value.id+'"'+style_quick_view+'>\
			  <div class="tb-content-image-turbofilter">\
				<div class="tb-content-hover-badges">'+badges+'</div>'+image_content+'\
			  </div>\
			  '+content_images_thumb+'\
			  <div class="tb-product-card-details">\
				<div class="tb-grid-view-item__title">'+value.title+'</div>\
				  <div class="tb-grid-view-item__meta">\
					<s class="tb-product-compare-price tb-compare-at-price-'+value.id+'"'+compare_price_hidden+'>'+compare_at_price+'</s>\
					<span class="tb-product-price__price tb-price-'+value.id+' product-price__sale">\
						<span class="tb-product__price">'+snappy.Currency.formatMoney(value.price, data['money_format'])+'</span>\
				    </span>\
				  </div>\
				  <div class="tb-left-quantity"></div>\
			  </div>\
			  <div class="tb-content-swatches-cn tb-swatch-products-'+value.id+'"'+style_variants+'></div>\
			  '+buttons+'\
			</div>';
          
            if(data.design_quickview == 1)
            {
              button_quick_view = '<div class="tb-quickview-button"><a href="tb-content-quick-view-'+value.id+'" class="tb-open-quick-view" data-href="/products/'+value.handle+'" data-id="'+value.id+'">Quick View</a></div>';
              hover = '';
              classquickview = ' tb-quick-view';
              popup = '<div class="tb-popup-quick-view-'+value.id+' tb-content-mega-quick-view mfp-hide white-popup-block" id="tb-content-quick-view-'+value.id+'" data-id="'+value.id+'"><div class="tb-content-image-src"><div class="tb-content-image-turbofilter">\
				<div class="tb-content-hover-badges">'+badges+'</div>'+image_content+'\
			  </div>\
			  '+content_images_thumb+'</div>\
			  <div class="tb-content-details">\
			  <div class="tb-product-card-details">\
				<div class="tb-grid-view-item__title">'+value.title+'</div>\
				  <div class="tb-grid-view-item__meta">\
					<s class="tb-product-compare-price tb-compare-at-price-'+value.id+'"'+compare_price_hidden+'>'+compare_at_price+'</s>\
					<span class="tb-product-price__price tb-price-'+value.id+' product-price__sale">\
						<span class="tb-product__price">'+snappy.Currency.formatMoney(value.price, data['money_format'])+'</span>\
				    </span>\
				  </div>\
				  <div class="tb-left-quantity"></div>\
			  </div>\
			  <div class="tb-content-swatches-cn tb-swatch-products-'+value.id+'"'+style_variants+'></div>\
'+buttons+'<div class="tb-description-onload"></div></div></div>';
            }

            static = '<div class="tb-product-inner-snappy-filter tb-content-static'+classquickview+'" data-id="'+value.id+'"><div class="tb-content-static-badges">'+badges+'</div>\
			  <div class="tb-content-image-turbofilter">\
				'+image_content+button_quick_view+'\
			  </div>\
			  <div class="tb-product-card-details">\
				<div class="tb-grid-view-item__title">'+value.title+'</div>\
				  <div class="tb-grid-view-item__meta">\
					<s class="tb-product-compare-price tb-compare-at-price-'+value.id+'"'+compare_price_hidden+'>'+compare_at_price+'</s>\
					<span class="tb-product-price__price tb-price-'+value.id+' product-price__sale">\
					<span class="tb-product__price">'+snappy.Currency.formatMoney(value.price, data['money_format'])+'</span>\
				  </span>\
				  <div class="tb-left-quantity"></div>\
				</div>\
			  </div>\
			</div>';
			tb = tb.concat('<li class="tb-product product-'+value.id+'" data-id="'+value.id+'" data-quantity="'+value.count_stock+'">\
			<div class="tb-apolomultimedia-data-product" data-id="'+value.id+'" data-handle="'+value.handle+'"></div>\
			'+static+hover+popup+'\
			</li>');
		});
 	  paginateTop = '<div class="tb-content-paginate tb-top" data-pisition="top">'+json.paginate+'</div>';
      paginateBottom = '<div class="tb-content-paginate tb-bottom" data-pisition="bottom">'+json.paginate+'</div>';
      gema.loadContent(paginateTop+'<ul class="tb-products-content">'+tb+'</ul>'+paginateBottom);
      gema.addStyle(json,data,$);
	}else{
        gema.loadContent('<div class="tb-no-products-found">No products found</div>');
    }
  },
  addStyle:function(json,data,$){
    if(data.filter_status == 0)
    {
      $('#snappy_filter__filters').css('width','100%');
      $('#snappy_filter__filters').css('margin-bottom','20px');
      return false;
    }
    $('#load-ajax-products').css('width','80%');
    $('#load-ajax-products').css('display','inline-block');
    $('#load-ajax-products').css('float','left');
  },
  loadContent:function(result){
    $('#load-ajax-products').html(result);
  },
  resizeImage:function(t, r) {
    var em = '';
    try {
        if ("original" == r) return t;
        var e = t.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);
        if(e.input.indexOf('?v=') > -1)
        {
          em = e.input.split('?v=');
          em = em[1];
        }
        return e[1] + "_" + r + "." + e[2]+'?v='+em
    } catch (r) {
        return t
    }
  },
}