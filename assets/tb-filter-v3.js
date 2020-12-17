/**
 * SHOPIFY PUBLIC AND PRIVATE APP
 * ----------------------------------------------
 * @Author : Ormachea Alvarado Alexander V - videlxu@hotmail.com
 * @updated : Ormachea 2019
 * ----------------------------------------------
 * DEVELOPER APP KEYS:
 * {@api_key},{@secret}
 * ----------------------------------------------
 * STORE PUBLIC OWNER KEYS:
 * {@shop_domain},{@token}
 * ----------------------------------------------
 * STORE PRIVATE OWNER KEYS:
 * {@api_key} , {@api_password} , {@shop_domain}
 * ----------------------------------------------
 */

document.ontouchmove = function(e){ e.preventDefault(); }
document.ontouchmove = function(e){ return true; }
document.addEventListener('touchmove', function(event) {
  event = event.originalEvent || event;
  if(event.scale > 1) {
    event.preventDefault();
  }
}, false);
window.snappy = window.snappy || {};
 /* ================ CURRENCY ================ */
window.snappy = window.snappy || {};
snappy.Currency = (function() {
  var moneyFormat = '${{amount}}'; // eslint-disable-line camelcase
 
  function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || moneyFormat);

    function formatWithDelimiters(number, precision, thousands, decimal) {
      thousands = thousands || ',';
      decimal = decimal || '.';

      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsAmount = parts[1] ? (decimal + parts[1]) : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  return {
    formatMoney: formatMoney
  }
})();

/* ================ GEMA ================ */
var videlxu = {
  url: window.location.href,
  time : new Date().getTime(),
  shop : Shopify.shop,
  page: 1,
  arr:[],
  params:'',
  col:'',
  con:'',
  first:'',
  image:'',
  hexa: '',
  children:'',
  cn:'',
  query: false,
  json:false,
  ajaxSetup:function(data,$){
  //console.log(data);
  },
  ajaxfilter:function(data,$){
   videlxu.url = window.location.href;
   videlxu.params = videlxu.parse_query_string(videlxu.url);
   videlxu.shop = { shop: Shopify.shop};
   videlxu.collection = { collection: videlxu.collect()};
   $.extend(videlxu.collection, videlxu.shop, videlxu.params);
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        async: true,
    data:videlxu.collection,
        url: 'https://api.apolomultimedia-server3.info/api/filter/index10/collections',
        contentType: "application/json",
    beforeSend: function() {
      videlxu.loadAjaxOpen(data,$);
    },
    success: function(json) {
      videlxu.filter(json,data,$);
      videlxu.autoClick(json,data,$);
      videlxu.filterMode(data,$);
      videlxu.others(data,$);
      videlxu.loadCollection(json,data,$);
      videlxu.noviSlider(json,data,$);
      gema.theme(json,data,$);
            videlxu.totalProducts(json,data,$);
    },
        error: function(xhr) {
      //console.log('Try catch');
            videlxu.loadAjaxClose(data,$);
        },
        complete: function() {
      videlxu.contentCart(data,$);
      videlxu.onloadWidth(data,$);
      videlxu.paginate(data,$);
      videlxu.toggle(data,$);
      videlxu.ajaxcart(data,$);
            videlxu.toptags(data,$);
      videlxu.changeOption(data,$);
      videlxu.removeOption(data,$);
      videlxu.clearAll(data,$);
      videlxu.changeImageSlick(data,$);
            videlxu.addToCart(data,$);
            videlxu.closeMiniCart(data,$);
            videlxu.mobile(data,$);
            videlxu.quickView(data,$);
      videlxu.loadAjaxClose(data,$);
            videlxu.collection_search(data,$);
        }
      });
  },
  totalProducts:function(json,data,$)
  {
    $('.tb-filters-toolbar__product-count').html(json.total_product+' Products');
      $('.tb-prev').html(data.language[0].title_translator);
      $('.tb-next').html(data.language[1].title_translator);
      $('.tb-off').html(data.language[12].title_translator);
  },
  quickView:function(data,$){
      var arr = [],arrcolor = '',default_number='',default_title='',configures_style='',tcolor = '',swatch_color = '',sw = '',option_swatch = 'data-optionswatch="1"',display_type=0,optname = '',optvalue='',image_id='',variantopt='',optvalue_content = '',variantoptname='',num=0,active='',cl='',hexa = '',image = '',image_src = '',id='',status = ' tb-soldout',json_variant=[];
    $( '.tb-apolomultimedia-data-product' ).each(function( key ) {
        $('.tb-buttons-'+$(this).data('id')).html('<div class="tb-content-button-add-to-cart"><a class="tb-button-add-to-cart btn" href="javascript:void(0);">Add to cart</a><a href="/products/'+$(this).data('handle')+'" class="tb-button-details btn btn--secondary">Full Details</a></div>');
        arr.push($(this).data('id'));
      });
      if(arr.length > 0)
      {
        $.ajax({
          type: 'GET',
          dataType: 'jsonp',
          async: true,
          data:{products:arr,shop:data.shop_url},
          url: 'https://api.apolomultimedia-server3.info/api/swatch/index/swatches',
          contentType: "application/json",
          beforeSend: function() {
            //loader
          },
          success: function(json) {
            $.each(json.result, function( i, value ) {
              cl = '';
              optname = '';
              image = '';
              image_src = '';
        optvalue_content = '';
              variantoptname = '';
              num = 0;
              id= '';
        image_id = '';
              status = ' tb-soldout';
        arrcolor = '';
        tcolor = '';
        hexa = '';
              configures_style = '';
              swatch_color = '';
              sw = '';
              option_swatch = 'data-optionswatch="1"';
              display_type = 0;
              default_title = 0;
              default_number = 0;
              $.each(value.options, function( x, v ) {
                optvalue = '';
                swatch_color = 'tb-swatch-plugin'
                num = num + 1;
        hexa = '';
                sw = '';
                default_number = 0;
                $.each(v, function( z, o ) {
                  default_number = default_number + 1;
                  sw = videlxu.replaceSymbol(o.option_value);
                  active = '';
                  option_swatch = 'data-optionswatch="1"';
                  if(z == 0)
                  {
                    active = ' active';
                  }
                    cl = ' tb-box';
                    image = o.option_value;
          arrcolor = '';
                    if(o.filter_type)
                    {
                      if(o.filter_type.display_type == 3)
                      {
                        cl = ' tb-swatch';
                        option_swatch = 'data-optionswatch="2"';
                        image = '<img src="'+data.asset_url+videlxu.replaceSymbol(o.option_value)+data.image_type+'" onError="this.onerror=null;this.src=\''+data.asset_url+'tb-thumb-noimage.jpg\';" class="tb-sw-img"/>';
                        display_type = 3;
                      }
                      
                      arrcolor = o.option_value_handle;
                      arrcolor = arrcolor.replace('~','-'); 
                      swatch_color = 'tb-swatch-plugin tb-swatch-color';
                      sw = videlxu.replaceSymbol(o.option_value)+'-swatch';
                      if(o.filter_type.display_type == 3)
                      {
                        if(o.swatches !== null)
                        {
                          if(o.swatches.type != 1)
                          {
                            image = '';
                            hexa = 'background:'+o.swatches.value;
                          }
                        }
                      }
                      
          }
          tcolor = tcolor.concat('tb-vt-'+arrcolor+' ');
                    id = o.product_id;
                    status = ' tb-soldout';
                    if(num == 1)
                    {
                      status = ' tb-available';
                    }
          if(data.swatchstyles == 0)
          {
                      optvalue = optvalue.concat('<a href="javascript:void(0);" class="tb-swatch-element tb-position-'+z+' tb-autoload-'+videlxu.replaceSymbol(o.option_value)+' tb-'+videlxu.replaceSymbol(o.option_value)+'-'+o.product_id+cl+active+status+' tb-vt-'+o.handle+'-'+videlxu.replaceSymbol(o.option_value)+'-'+display_type+' swatch-option-apolo-'+videlxu.replaceSymbol(o.option_value)+'" data-swatch="'+sw+'" data-handle="'+videlxu.replaceSymbol(o.option_value)+'" '+option_swatch+' data-index="'+num+'" data-id="'+o.product_id+'" data-value="'+videlxu.escapeHtml(o.option_value)+'" style="'+hexa+'"><img class="tb-crossed-out" src="'+data.asset_url+'tb-soldout.png"><div class="'+swatch_color+'"><span>'+image+'</span></div></a>');
          }
          if(data.swatchstyles == 1)
          {
            optvalue = optvalue.concat('<option value="'+videlxu.replaceSymbol(o.option_value)+'" data-swatch="'+sw+'" data-value="'+o.option_value+'" class="swatch-option-apolo-'+videlxu.replaceSymbol(o.option_value)+'">'+o.option_value+'</option>');
          }
                    if(o.option_value === 'Default Title')
                    {
                      default_title = 1;
                    }
                    
                });
        optvalue_content = optvalue;
        if(data.swatchstyles == 1)
        {
          optvalue_content = '';
          if(optvalue !== '')
          {
            optvalue_content = optvalue_content.concat('<select class="tb-combobox-filter tb-index-'+num+' tb-position-combobox-'+num+'-'+id+' '+tcolor+'" data-index="'+num+'" data-id="'+id+'">'+optvalue+'</select>');
          }
        }
        if(x === 'Title');
                {
                  if(default_number == 1)
                  {
                    if(default_title == 1)
                    {
                      configures_style = ' style="display:none;"';
                    }
                  }
                }
                optname = optname.concat('<div class="tb-content-option tb-index-'+num+'-'+id+'"'+configures_style+'><div class="tb-option-name">'+x+'</div>'+optvalue_content+'</div>');
        
              });
              variantopt = '';
              image_src = '';
        image_id = '';
              $.each(value.variants, function( h, m ) {
                m.price = m.price * 100;
                m.compare_at_price = m.compare_at_price * 100;
                image_src = '';
                if(m.image != null){
                  image_src = m.image.src;
          image_id = m.image.id;
                }
                variantopt = variantopt.concat('<option title="'+videlxu.escapeHtml(m.title)+'" data-available="'+m.inventory_quantity+'" data-inventorymanagement="'+m.inventory_management+'" data-inventorypolicy="'+m.inventory_policy+'" data-inventoryquantity="'+m.inventory_quantity+'" data-inventoryquantitytb="'+m.inventory_quantity_tb+'" data-quantityglobal="'+m.inventory_quantity_tb+'" data-oldinventoryquantity="'+m.old_inventory_quantity+'" data-imageid="'+image_id+'" data-price="'+m.price+'" data-variantid="'+m.id+'" data-productid="'+m.product_id+'" data-compareprice="'+m.compare_at_price+'" data-src="'+m.image.src+'" value="'+videlxu.escapeHtml(m.title)+'" class="tb-image-thumb-'+id+'-'+image_id+'">'+m.title+'</option>');
              });
              json_variant = JSON.stringify(value.variants);
              variantoptname = '<div class="tb-content-select"><textarea class="tb-json-variants" style="display:none;">'+videlxu.escapeHtml(json_variant)+'</textarea><select class="tb-product-select-option" style="display:none;">'+variantopt+'</select></div>';
              $('.tb-swatch-products-'+value.variants[0].product_id).html('<div class="tb-option-name">'+optname+'</div>'+variantoptname);
            });
      
          },
          error: function(xhr) {
            //console.log('Try catch');
          },
          complete: function() {
            videlxu.imageChange(data,$);
            videlxu.autoClickSwatches(data,$);
            videlxu.loadSwatch(data,$);
          }
        });
      }
  },
  loadSwatch:function(data,$){
    videlxu.url = window.location.href;
    $.each(videlxu.parse_query_group(videlxu.url), function( index, value ) {
      if(index !== '')
      {
        if(index !== 'page')
        {
          $.each(value, function( x, v ) {
            v = decodeURIComponent(v);
            v = decodeURIComponent(v);
            v = decodeURIComponent(v);
            v = videlxu.replaceSymbol(v);
            $('select.tb-combobox-filter.tb-index-1.'+index+'-'+v).val(v).trigger('change',[{somedata:false}]);
            $('.tb-available.'+index+'-'+v+'-0').trigger('click',[{somedata:false}]);
            $('.tb-available.'+index+'-'+v+'-3').trigger('click',[{somedata:false}]);
          });
        }
      }
    });
  },
  collection_search:function(data,$){
  $('#tb-input-collection-search').unbind('keyup');
  $('#tb-input-collection-search').keyup(function(e,i,o){
      //e.preventDefault();
      var handle = $(this).data('handle'),value = $(this).val();
      console.log(value);
      if(value == " ")
      {
        videlxu.url = window.location.href;
        videlxu.url = videlxu.removeParam(handle,videlxu.url);
    window.history.pushState({}, "keywords", videlxu.url);
    videlxu.ajaxfilter(data,$);
        return false
      }
      
      if(value == "" )
      {
        videlxu.url = window.location.href;
        videlxu.url = videlxu.removeParam(handle,videlxu.url);
    window.history.pushState({}, "keywords", videlxu.url);
    videlxu.ajaxfilter(data,$);
        return false
      }
      
      setTimeout(function(){
        videlxu.url = window.location.href;
        videlxu.url = videlxu.removeParam('page',videlxu.url);
        videlxu.url = window.location.href;
        videlxu.urlFilterSingle(videlxu.url,'q',value);
        videlxu.ajaxfilter(data,$);
      }, 1000);
      
  });
  },
  autoClickSwatches:function(data,$){
    videlxu.url = window.location.href;
    var callback = function(){
     $('.tb-option-name').find('.tb-content-option').find('a.tb-swatch-element.tb-available:first').click();
    };
    $('.tb-option-name').find('.tb-content-option').find('a.tb-swatch-element.tb-available:first').bind("click", function(e, callback){
      callback();
    });
    $('.tb-option-name').find('.tb-content-option').find('a.tb-swatch-element.tb-available:first').trigger('click',[callback]);
    $('select.tb-combobox-filter.tb-index-1').trigger('change',[{somedata:false}]);
  },
  changeImageSlick:function(data,$){
  $('a.tb-thumb-onclick').unbind('click');
  $('a.tb-thumb-onclick').click(function(e,i,o){
      e.preventDefault();
      var variant = $('select option.tb-image-thumb-'+$(this).data('id')+'-'+$(this).data('thumb')).val();
      $(this).parent('li').closest('ul.tb-thumb-swatch').find('a.tb-thumb-onclick').removeClass('active');
      $('.tb-image-fisrt-'+$(this).data('id')).attr('src',$(this).attr('href'));
      $(this).addClass('active');
    if(i == true)
      {
        videlxu.loadVariants($(this).data('id'),variant,data,$);
      }
      if (!e.isTrigger)
      {
        videlxu.loadVariants($(this).data('id'),variant,data,$);
      }
  });
  },
  loadVariants:function(id,text,data,$){
    if (typeof text !== "undefined") {
      if(text.indexOf(' / ') > -1)
      {
        var variant = '',validate = '',valueswatch = '';
        text = text.split(' / ');

        $.each(text, function( index, value ) {
          (function(that, i) { 
            var t = setTimeout(function() {
              i = i + 1;
              value = videlxu.replaceSymbol(value);
              validate = $('.tb-index-'+i+'-'+id).find('.swatch-option-apolo-'+videlxu.replaceSymbol(value)).data('swatch');
              valueswatch = value+'-swatch';
              if(validate == valueswatch)
              {
                $('.tb-'+value+'-'+id).trigger('click',[{somedata:true}]);
                $('.tb-position-combobox-'+i+'-'+id).val(value).trigger('change',[{somedata:true}]);
              }
            }, 500 * i);
          })(this, index);
        });
      }
    }
  },
  imageChange:function(data,$){
    var arr = [];
  $('select.tb-combobox-filter').unbind('change');
  $('select.tb-combobox-filter').change(function(e, dataTrigger){
    e.preventDefault();
        if (typeof dataTrigger === "undefined") {
          dataTrigger = false;
        }else{
          dataTrigger = dataTrigger.somedata;
        }
    var arr = [],old = 0,select = '',left_quantity = '',src = '', variant_id = '' ,link = '',where = $(this),option_swatch = $(this).data('optionswatch'), inventory_management='',inventory_policy='',inventory_quantity='',old_inventory_quantity='',option_variant = '',option_value='',num_option_variant = 0,first_option='',image_id='',price='',compare_at_price ='',id=$(this).data('id'),json = $(this).parent('.tb-content-option').parent('.tb-option-name').parent('.tb-content-swatches-cn').find('.tb-content-select').find('textarea.tb-json-variants').val();
    var obj = jQuery.parseJSON(json);
    videlxu.url = window.location.href;
        $(this).closest('.tb-option-name').find('.tb-content-option').parent('.tb-option-name').find('.tb-content-option').each(function( index ) {
      if(index == 0)
      {
        first_option = $(this).find('select.tb-combobox-filter').find('option:selected').val();
      }
    });
    num_option_variant = 0;
        
    if($(this).data('index') == 1)
    {
      $.each(obj, function( index, value ) {
                if(value.option1)
                {
                  value.option1 = videlxu.escapeHtml(value.option1);
                }
                if(value.option2)
                {
                  value.option2 = videlxu.escapeHtml(value.option2);
                }
                if(value.option3)
                {
                  value.option3 = videlxu.escapeHtml(value.option3);
                }
        if(value.option1 == first_option)
        {
          num_option_variant = num_option_variant + 1;
          if(num_option_variant == 1)
          {
            if(value.option2 !== null)
            {
              setTimeout(function(){ 
                              var id = where.data('id');
                              value.option2 = videlxu.replaceSymbol(value.option2);
                              $('.tb-position-combobox-2-'+id).val(value.option2).trigger('change',[{somedata:true}]);
                            }, 100);
            }
            if(value.option3 !== null)
            {
              setTimeout(function(){
                              var id = where.data('id');
                              value.option3 = videlxu.replaceSymbol(value.option3);
                              $('.tb-position-combobox-3-'+id).val(value.option3).trigger('change',[{somedata:true}]) 
                            }, 100);
            }
          }
        }
      });
      
    }
    $(this).closest('.tb-option-name').find('.tb-content-option').parent('.tb-option-name').find('.tb-content-option').each(function( index ) {
      option_variant = option_variant.concat($(this).find('select.tb-combobox-filter').find('option:selected').data('value')+' / ');
    });
        select = $(this).parent('.tb-content-option').parent('.tb-option-name').parent('.tb-content-swatches-cn').find('.tb-content-select').find('select.tb-product-select-option');
    option_variant = option_variant.slice(0, -3); 
        option_variant= videlxu.escapeHtml(option_variant);
    option_value = select.find('option[title="'+option_variant+'"]').val();
    image_id = select.find('option[title="'+option_variant+'"]').data('imageid');
    price = select.find('option[title="'+option_variant+'"]').data('price');
    compare_at_price = select.find('option[title="'+option_variant+'"]').data('compareprice');
        inventory_management = select.find('option[title="'+option_variant+'"]').data('inventorymanagement');
        inventory_policy = select.find('option[title="'+option_variant+'"]').data('inventorypolicy');
        inventory_quantity = select.find('option[title="'+option_variant+'"]').data('inventoryquantity');
        old_inventory_quantity = select.find('option[title="'+option_variant+'"]').data('oldinventoryquantity');
    src = select.find('option[title="'+option_variant+'"]').data('src');
      
        id = $(this).parent('.tb-content-option').parent('.tb-option-name').parent('.tb-content-swatches-cn').find('.tb-content-select').find('select.tb-product-select-option').find('option[title="'+option_variant+'"]').data('productid');
        variant_id = select.find('option[title="'+option_variant+'"]').data('variantid');
        link = $('.tb-product-link-'+id).attr('href');
      
        arr = {id:id,inventory_management:inventory_management,inventory_policy:inventory_policy,inventory_quantity:inventory_quantity,old_inventory_quantity:old_inventory_quantity}

        left_quantity = videlxu.left_quantity(arr,data,$);
      
        arr = {id:id,compare_at_price:compare_at_price,price:price,left_quantity:left_quantity,inventory_management:inventory_management,inventory_policy:inventory_policy,inventory_quantity:inventory_quantity,old_inventory_quantity:old_inventory_quantity}

        $(this).parent('.tb-content-option').parent('.tb-option-name').parent('.tb-content-swatches-cn').find('.tb-content-select').find('select.tb-product-select-option').val(option_variant).trigger('change');

          
        if(videlxu.url.indexOf("tb-") == -1)
        {
          if(data.thumbnails_default == 1)
          {
            if(e.bubbles != true)
            {
              old = 1;
            }
          }
        }
      
        if(!dataTrigger)
        {
          if(old != 1)
          {
            $('.tb-thumb-id-'+id).removeClass('active');
            $('.tb-thumb-id-'+id+'-'+image_id).addClass('active');
            $('.tb-thumb-id-'+id+'-'+image_id).click();
          }
        }
    $(this).closest('.tb-content-swatches-cn').parent('.tb-content-hover').find('.tb-content-button-add-to-cart').find('a.tb-button-add-to-cart').removeAttr('disabled','disabled');
    $(this).closest('.tb-content-swatches-cn').parent('.tb-content-hover').find('.tb-content-button-add-to-cart').find('a.tb-button-add-to-cart').text(data.language[8].title_translator);
    if(typeof option_value  === 'undefined')
    {
      $(this).closest('.tb-content-swatches-cn').parent('.tb-content-hover').find('.tb-content-button-add-to-cart').find('a.tb-button-add-to-cart').attr('disabled','disabled');
      $(this).closest('.tb-content-swatches-cn').parent('.tb-content-hover').find('.tb-content-button-add-to-cart').find('a.tb-button-add-to-cart').text(data.language[10].title_translator);
    }
      
    $('.tb-price-'+id).html('');
    $('.tb-compare-at-price-'+id).html('');
    $('.tb-price-'+id).removeClass('tb-compare-active');
    if(price != 0)
    {
      if(typeof price !== "undefined")
      {
      $('.tb-price-'+id).html(snappy.Currency.formatMoney(price, data['money_format']));
      }
    }
    if(compare_at_price != 0)
    {
      if(typeof compare_at_price !== "undefined")
      {
            if(price < compare_at_price)
            {
              $('.tb-compare-at-price-'+id).html(snappy.Currency.formatMoney(compare_at_price, data['money_format']));
              $('.tb-price-'+id).addClass('tb-compare-active');
            }
      }
    }
      
        if(typeof variant_id !== "undefined")
        {
          link = videlxu.URL_add_parameter(link, 'variant', variant_id);
          $('.tb-product-link-'+id).attr('href',link);
        }
      
        if(data.thumbnails == 0)
        {
          if(src)
          {
            if(src !== "undefined")
            {
              src = videlxu.resizeImage(src,'700x700');
              if(data.thumbnails_default < 1)
              {
                $('.tb-product-link-'+id).find('img').attr('src',src);
              }
            }
          }
        }
      
        videlxu.preorder_products(arr);
        videlxu.sold_out_products(arr);
        videlxu.left_quantity_products(arr,data);
        videlxu.stock_products_price(arr,$(this),data,$);
    videlxu.imageChange(data,$);
    videlxu.changeImageSlick(data,$);
  });
    
    $('.tb-content-option a.tb-swatch-element.tb-available').unbind('click');
    $('.tb-content-option a.tb-swatch-element.tb-available').click(function(e,dataTrigger){
      e.preventDefault();
      if (typeof dataTrigger === "undefined") {
        dataTrigger = false;
      }else{
        dataTrigger = dataTrigger.somedata;
      }
      var arr = [],old = 0,src = '', left_quantity = '', select = '', variant_id = '' ,link = '',text = '',json = '',option_swatch = $(this).data('optionswatch'), title = $(this).data('value'),handle = $(this).data('handle'),image_id='',price='',compare_at_price = '',inventory_management = '',inventory_policy = '',inventory_quantity='',old_inventory_quantity='',i = $(this).data('index'),id = $(this).data('id'),val = '',count=0;
      $(this).parent('.tb-content-option').find('a.tb-swatch-element').removeClass('active');
      $(this).addClass('active');
      $(this).parent('.tb-content-option').parent('.tb-option-name').find('.tb-content-option').each(function( index ) {
        text = text.concat($(this).find('a.tb-swatch-element.active').data('value')+' / ');
      });
      text = text.slice(0, -3);
      
      $('.tb-index-2-'+id).find('a').removeClass('tb-available');
      $('.tb-index-2-'+id).find('a').addClass('tb-soldout');
      $('.tb-index-3-'+id).find('a').removeClass('tb-available');
      $('.tb-index-3-'+id).find('a').addClass('tb-soldout');
      
      select = $(this).parent('.tb-content-option').parent('.tb-option-name').parent('.tb-content-swatches-cn').find('.tb-content-select').find('select.tb-product-select-option');
    image_id = select.find('option[title="'+text+'"]').data('imageid');
    price = select.find('option[title="'+text+'"]').data('price');
    compare_at_price = select.find('option[title="'+text+'"]').data('compareprice');
    inventory_management = select.find('option[title="'+text+'"]').data('inventorymanagement');
      inventory_policy = select.find('option[title="'+text+'"]').data('inventorypolicy');
      inventory_quantity = select.find('option[title="'+text+'"]').data('inventoryquantity');
      old_inventory_quantity = select.find('option[title="'+text+'"]').data('oldinventoryquantity');
      variant_id = select.find('option[title="'+text+'"]').data('variantid');
      link = $('.tb-product-link-'+id).attr('href');
      src = select.find('option[title="'+text+'"]').data('src');
      
      arr = {id:id,inventory_management:inventory_management,inventory_policy:inventory_policy,inventory_quantity:inventory_quantity,old_inventory_quantity:old_inventory_quantity}

      left_quantity = videlxu.left_quantity(arr,data,$);
      
      arr = {variant_id:variant_id,id:id,compare_at_price:compare_at_price,price:price,left_quantity:left_quantity,inventory_management:inventory_management,inventory_policy:inventory_policy,inventory_quantity:inventory_quantity,old_inventory_quantity:old_inventory_quantity}
      
      select.val(text).trigger('change',[{somedata:true}]);
      val = $('.tb-index-1-'+id).find('a.tb-swatch-element.active.tb-available').data('value');
      json = JSON.parse($(this).parent('.tb-content-option').parent('.tb-option-name').parent('.tb-content-swatches-cn').find('.tb-content-select').find('.tb-json-variants').val());
      count = 0;
    
      if(videlxu.url.indexOf("tb-") == -1)
      {
        if(data.thumbnails_default == 1)
        {
            if(e.bubbles != true)
            {
              old = 1;
            }
        }
      }
      
      if(!dataTrigger)
      {
        if(old != 1)
        {
          $('.tb-thumb-id-'+id).removeClass('active');
          $('.tb-thumb-id-'+id+'-'+image_id).addClass('active');
          $('.tb-thumb-id-'+id+'-'+image_id).click();
        }
      }
      
      $('.tb-index-1-'+id).find('a').removeClass('tb-available');
      $('.tb-index-1-'+id).find('a').addClass('tb-soldout');
      $('.tb-left-products-badges-'+id).parent('.tb-tag-product-label.tb-top-left').hide();
      $('.tb-left-products-badges-'+id).parent('.tb-tag-product-label.tb-top-left').addClass('tb-left-products-badges');
      $.each(json, function( index, value ) {
        if(value.option1)
        {
          value.option1 = videlxu.escapeHtml(value.option1);
        }
        if(value.option2)
        {
          value.option2 = videlxu.escapeHtml(value.option2);
        }
        if(value.option3)
        {
          value.option3 = videlxu.escapeHtml(value.option3);
        }
        $('.tb-'+videlxu.replaceSymbol(videlxu.replaceSymbol(value.option1))+'-'+id).removeClass('tb-soldout');
        $('.tb-'+videlxu.replaceSymbol(videlxu.replaceSymbol(value.option1))+'-'+id).addClass('tb-available');
         if(value.option1 == val)
         {
           if(value.option1 !== null)
           {
             if(value.option2 !== null)
             {
                 $('.tb-'+videlxu.replaceSymbol(videlxu.replaceSymbol(value.option2))+'-'+id).removeClass('tb-soldout');
                 $('.tb-'+videlxu.replaceSymbol(videlxu.replaceSymbol(value.option2))+'-'+id).addClass('tb-available');
             }
           }
           if(value.option2 !== null)
           {
               $('.tb-'+videlxu.replaceSymbol(videlxu.replaceSymbol(value.option2))+'-'+id).removeClass('tb-soldout');
               $('.tb-'+videlxu.replaceSymbol(videlxu.replaceSymbol(value.option2))+'-'+id).addClass('tb-available');
           }
           if(value.option3 !== null)
           {
               $('.tb-'+videlxu.replaceSymbol(videlxu.replaceSymbol(value.option3))+'-'+id).removeClass('tb-soldout');
               $('.tb-'+videlxu.replaceSymbol(videlxu.replaceSymbol(value.option3))+'-'+id).addClass('tb-available');
           }
           if(value.option1 == title)
           {
             if(value.option1 !== null)
             {
               if(value.option2 !== null)
               {
                   count = count + 1;
                   if(count == 1)
                   {
                     setTimeout(function(){ $('.tb-'+videlxu.replaceSymbol(videlxu.replaceSymbol(value.option2))+'-'+id).trigger('click',[{somedata:true}]); }, 100);
                   }
               }
             }
           }
           if(value.option2 == title)
           {
             if(value.option2 !== null)
             {
               if(value.option3 !== null)
               {
                 count = count + 1;
                   if(count == 1)
                   {
                     setTimeout(function(){ $('.tb-'+videlxu.replaceSymbol(videlxu.replaceSymbol(value.option3))+'-'+id).trigger('click',[{somedata:true}]); }, 100);
                   }
               }
             }
           }
         }
      });
    $('.tb-price-'+id).html('');
    $('.tb-compare-at-price-'+id).html('');
    $('.tb-price-'+id).removeClass('tb-compare-active');
    if(price != 0)
    {
      if(typeof price !== "undefined")
      {
      $('.tb-price-'+id).html(snappy.Currency.formatMoney(price, data['money_format']));
      }
    }
    if(compare_at_price != 0)
    {
        if(typeof compare_at_price !== "undefined")
      {
              if(price < compare_at_price)
              {
              $('.tb-compare-at-price-'+id).html(snappy.Currency.formatMoney(compare_at_price, data['money_format']));
              $('.tb-price-'+id).addClass('tb-compare-active');
              }
      }
    }
      
      if(typeof variant_id !== "undefined")
      {
        link = videlxu.URL_add_parameter(link, 'variant', variant_id);
        $('.tb-product-link-'+id).attr('href',link);
      }
      
      if(data.thumbnails == 0)
      {
        if(src)
        {
          if(src !== "undefined")
          {
            src = videlxu.resizeImage(src,'700x700');
            if(data.thumbnails_default < 1)
            {
              $('.tb-product-link-'+id).find('img').attr('src',src);
            }
          }
        }
      }
      
      videlxu.preorder_products(arr);
      videlxu.sold_out_products(arr);
      videlxu.left_quantity_products(arr,data);
    videlxu.stock_products_price(arr,$(this),data,$);
      videlxu.imageChange(data,$);
      videlxu.changeImageSlick(data,$);
    });
    $('.tb-content-option a.tb-swatch-element.tb-soldout').unbind('click');
    $('.tb-content-option a.tb-swatch-element.tb-soldout').click(function(e){
      e.preventDefault();
    });
  },
  preorder_products:function(arr){
    $('.tb-preorder-badges-'+arr.id).parent('.tb-tag-product-label.tb-top-left').hide();
    if(arr.inventory_management === 'shopify')
    {
      if(arr.inventory_policy === 'continue')
      {
        if(arr.inventory_quantity < 1)
        {
          $('.tb-preorder-badges-'+arr.id).parent('.tb-tag-product-label.tb-top-left').show();
        }
      }
    }
  },
  sold_out_products:function(arr){
    $('.tb-sold-out-badges-'+arr.id).parent('.tb-tag-product-label.tb-top-left').hide();
    if(arr.inventory_management === 'shopify')
    {
      if(arr.inventory_policy !== 'continue')
      {
        if(arr.inventory_quantity < 1)
        {
          $('.tb-sold-out-badges-'+arr.id).parent('.tb-tag-product-label.tb-top-left').show();
        }
      }
    }
  },
  left_quantity_products:function(arr,data){
    var quantity = '',qty__global = parseInt($('.tb-product.product-'+arr.id).data('quantity'));
    $('.tb-left-products-badges-'+arr.id).parent('.tb-tag-product-label.tb-top-left').hide();
      if(arr.left_quantity !== '')
      {
        $('.tb-left-products-badges-'+arr.id).html(arr.left_quantity);
        $('.tb-left-products-badges-'+arr.id).parent('.tb-tag-product-label.tb-top-left').show();
      }

      if(data.count_stock == 1)
      {
        arr.inventory_quantity = qty__global;
        if(qty__global > 0)
        {

          if(arr.inventory_quantity <= data.tracking)
          {
            $('.tb-left-products-badges-'+arr.id).parent('.tb-top-left').show();
            $('.tb-left-products-badges-'+arr.id).html('<span>'+qty__global+' '+data.language[25].title_translator+'</span>');
          }
        }
      }
  },
  left_quantity:function(arr,data,$){
    var quantity = '',qty__global = $('.tb-product.product-'+arr.id).data('quantity');
    if(data.count_stock == 1)
    {
      arr.inventory_quantity = qty__global;
    }
    if(arr.inventory_management === 'shopify')
    {
      if(arr.inventory_policy !== 'continue')
      {
        if(arr.inventory_quantity > 0)
        {
          if(arr.inventory_quantity <= data.tracking)
          {
            quantity = '<span>'+arr.inventory_quantity+' '+data.language[25].title_translator+'</span>';
          }
        }
      }
    }
    return quantity;
  },
  stock_products_price:function(arr,where,data,$){
      var stock = '';
      if(arr.compare_at_price > 0)
      {
        if(arr.compare_at_price > arr.price )
        {
          stock = arr.price * 100;
          stock = stock / arr.compare_at_price;
          stock = 100 - stock;
          stock = Math.ceil(stock);
          if(stock > 0)
          {
            stock = stock+'% <span class="tb-off">'+data.language[12].title_translator+'</span>';
          }else{
            stock = '';
          }
        }
      }else{
        stock = '';
      }
      if($('.tb-discount-badges-'+arr.id).length > 0)
      {
        $('.tb-discount-badges-'+arr.id).parent('.tb-tag-product-label.tb-top-left').hide();
        if(stock !== '')
        {
           $('.tb-discount-badges-'+arr.id).parent('.tb-tag-product-label.tb-top-left').show();
           $('.tb-discount-badges-'+arr.id).html(stock);
        }
      }
  },
  contentCart:function(data,$){
      var ajaxloading='',fullw='',content_cart = '',style_sticky = '';
      if(data.style_sticky > 0)
      {
        style_sticky = ' tb-drawer-solution';
      }
      if(data.stick_cart_status == 0)
      {
        content_cart = '';
      }else{
        if($('.tb-cart-icon').length == 0)
        {
          content_cart = '<div class="tb-cart-icon" style="display:none;"><a href="javascript:void(0);" class="tb-cart-total-price btn"></a></div><div class="tb-content-cart'+style_sticky+' tb-new-cart" style="display:none;"></div>';
        }
      }
      
      if($('.tb-loding-filter-w').length == 0)
      {
        ajaxloading = '<div class="tb-loding-filter-w" style="display:none;"></div>';
      }
      if($('.tb-quick-view-products-by-full-w').length == 0)
      {
        fullw = '<div class="tb-quick-view-products-by-full-w" style="display:none;"></div>';
      }
    
    if($('.tb-content-cart').length < 1)
    {
        videlxu.url = window.location.href;
        var filter = '';
        if(data.filter_status == 1)
        {
          if($('#snappy_filter_wrapper').length > 0)
          {
            if($('.tb-sidebar-toggle').length == 0)
            {
              filter = '<div class="tb-sidebar-toggle" style="display:none;">'+data.language[13].title_translator+'</div><div class="tb-content-filter-mobile tb-sidebar"></div>';
            }
          }
        }
      $('body').append(fullw+content_cart+filter+ajaxloading);
    }
  },
  contentMobileSearch:function(data,$){
      $('body').append('<div class="tb-search-content-mobile" style="display:none;"><div class="tb-content-view-search"><a href="javascript:void(0);" class="tb-close-content-search"><img src="https://api.apolomultimedia-server3.info/assets/images/tb-cancel.png"></a><h2 class="tb-sidebar-title tb-shopping-cart">'+data.language[15].title_translator+'</h2><form action="/search" method="get"><input class="tb-search-box-mobile" type="text" name="q" placeholder="'+data.language[15].title_translator+'"></form></div></div>');
  },
  filter:function(json,data,$){
    videlxu.url = window.location.href;
    videlxu.con = '';
    if(json.filter.length > 0)
    {
      $.each(json.filter, function( index, value ) {
        if(value.display_type == 1)
        {
          videlxu.con = videlxu.con.concat(videlxu.optionList(json,data,value,index));
        }
        if(value.display_type == 2)
        {
          videlxu.con = videlxu.con.concat(videlxu.optionBox(json,data,value,index));   
        }
        if(value.display_type == 3)
        {
          videlxu.con = videlxu.con.concat(videlxu.optionSwatch(json,data,value,index));
        }
        if(value.display_type == 4)
        {
          videlxu.con = videlxu.con.concat(videlxu.optionRange(json,data,value,index));
        }
      });
    }
    $('#filter_container_collections').removeClass('tb-top-tags-slow');
    if(typeof videlxu.parse_query_group(videlxu.url).length == undefined)
    {
      $('#filter_container_collections').addClass('tb-top-tags-slow');
    }
    if(data.filter_status == 0)
    {
      return false;
    }
    $('#filter_container_collections').html(videlxu.con);
  },
  others:function(data,$){
  if(data.quickv == 0)
  {
    var o = ".tb-product-inner-snappy-filter:hover .tb-content-image-turbofilter .tb-quick-view-turbofilter{display:none;}",
      a = document.head || document.getElementsByTagName("head")[0],
      n = document.createElement("style");
      
    n.type = "text/css", n.styleSheet ? n.styleSheet.cssText = o : n.appendChild(document.createTextNode(o)), a.appendChild(n)
  }
  },
  toptags:function(data,$){
    videlxu.url = window.location.href;
    var tags_string = '',tags_sub_string = '',refine = '',key = '',cl='';
    $.each(videlxu.parse_query_group(videlxu.url), function( index, value ) {
      if(index !== '')
      {
        if(index !== 'page')
        {
          tags_sub_string = '';
          $.each(value, function( x, v ) {
            v = decodeURIComponent(v);
            v = decodeURIComponent(v);
            v = decodeURIComponent(v);
            key = '';
            cl = '';
            if(videlxu.replaceSymbol(index) == 'q')
            {
              key = data.language[14].title_translator+' : ';
              cl = ' tb-keyword';
            }
                        if (videlxu.replaceSymbol(index).indexOf("tb-") > -1 || videlxu.replaceSymbol(index).indexOf("price") > -1 || videlxu.replaceSymbol(index).indexOf("q") > -1) {
                          tags_sub_string = tags_sub_string.concat('<a href="javascript:void(0);" data-handle="'+videlxu.replaceSymbol(index)+'" data-value="'+v+'" class="tb-filter-clear'+cl+'">'+key+v+' <span>x</span></a>');
                        }
                    });
          tags_string = tags_string.concat(tags_sub_string)
        }
      }
    });
    if(tags_string !== '')
    {
      refine = refine.concat('<div class="content-refine"><h2 class="sidebar-title">'+data.language[4].title_translator+'</h2><a href="javascript:void(0);" class="tb-filter-clear-all" style="">'+data.language[3].title_translator+'</a></div>');
    }
    $('#filter-b-tags').html(refine);
    $('#filter-b-tags').find('.content-refine').append(tags_string);
  },
  removeOption:function(data,$){
    $('a.tb-filter-clear').unbind('click');
    $('a.tb-filter-clear').click(function(e){
      e.preventDefault();
      var val = videlxu.replaceSymbol($(this).data('value')),handle = $(this).data('handle');
      videlxu.url = window.location.href;
      if(handle === 'price' || handle === 'q' || handle === 'sort-by')
      {
        if(handle === 'sort-by')
        {
          handle = 'sort_by';
        }
                if(handle == 'q')
        {
          $("#tb-input-collection-search").val("");
        }
        videlxu.url = videlxu.removeParam(handle,videlxu.url);
        window.history.pushState({}, "keywords", videlxu.url);
        videlxu.ajaxfilter(data,$);
      }else{
        videlxu.removeActiveOption(handle,val);
      }
    });
  },
  removeActiveOption:function(handle,value){
      if($('.'+handle+'-'+value).length > 0)
        {
        $('.'+handle+'-'+value)[0].click();
        }
  },
  removeActiveOptionName:function(handle){
      $('.tb-n-'+handle).removeClass('active');
  },
  removeAll:function(data,$){
    $('ul.tb-filter li').find('.tb-swatch-color').removeClass('active');
    $('ul.tb-filter li').find('a').removeClass('active');
    $('a.tb-clear-option-name').hide();
    if(videlxu.url.indexOf("/collections") > -1){
      window.history.pushState({}, "keywords", '/collections/'+videlxu.collect());
    }else{
      if(videlxu.url.indexOf("/search") > -1)
      {
        window.history.pushState({}, "keywords", '/search');
      }else{
        window.history.pushState({}, "keywords", '/');
      }
    }
    videlxu.ajaxfilter(data,$);
  },
  clearAll:function(data,$){
    $('a.tb-filter-clear-all').unbind('click');
    $('a.tb-filter-clear-all').click(function(e){
      e.preventDefault();
            videlxu.removeAll(data,$);
          $("#tb-input-collection-search").val("");
    });
    $('a.tb-clear-option-name').unbind('click');
    $('a.tb-clear-option-name').click(function(e){
      e.preventDefault();
            $(this).parent('.tb-filter-content-name').find('.tb-filter-collapse').find('ul.tb-filter li').find('.tb-swatch-color').removeClass('active');
      $('.clear-name-'+$(this).data('handle')).css('display','none');
      videlxu.url = window.location.href;
      videlxu.url = videlxu.removeParam($(this).data('handle'),videlxu.url);
      videlxu.removeActiveOptionName($(this).data('handle'));
      videlxu.url = videlxu.removeParam($(this).data('handle'),videlxu.url);
      window.history.pushState({}, "keywords", videlxu.url);
      if(videlxu.getParameterByName($(this).data('handle'),videlxu.url) !== null)
      {
        $('.clear-name-'+$(this).data('handle')).css('display','block');
      }
      videlxu.ajaxfilter(data,$);
    });
    $('.tb-n-tb-cl-collections.tb-cl-collections-'+videlxu.collect()).addClass('active');
      $('.tb-cl-collections-'+videlxu.collect()).parent('li').find('.tb-content-sub-collections').show();
    
  },
  loadCollection:function(json,data,$){
    $.each(json.filter, function( i, result ) {
      if(result.handle === 'tb-cl')
      {
        $.each(result.values, function( x, r ) {
            if(r.handle === videlxu.collect())
          {
              $('body').find('.tb-h-title').html(r.title);
          }
        });
      }
    });
  },
  optionList:function(post,data,json,x){
    videlxu.col = '';
    videlxu.first = '';
    videlxu.cn = '';
    videlxu.children = 0;
    if(json.values){
      if(json.values.length > 0)
      {
        if(x == 0){
          videlxu.first = ' tb-first';
        }
        videlxu.col += '<div class="tb-filter-content-name tb-index-filter'+x+'"><a href="#collapse'+x+'" class="tb-filter-nav-toggle'+videlxu.first+'"><h2 class="tb-sidebar-title">'+json.title+'</h2></a><a href="javascript:void(0);" data-handle="'+json.tb+'" class="tb-clear-option-name clear-name-'+json.tb+'">'+data.language[2].title_translator+'</a><div id="collapse'+x+'" class="tb-filter-collapse"><ul class="tb-filter tb-list tb-scroll-'+json.handle+'">';
        var h = 0;
        $.each(json.values, function( i, result ) {
          videlxu.cn = '';
          var plus = '',text = '';
          if(json.handle === 'tb-cl'){
            if(result.subCollections){
              if(result.subCollections.length > 0)
              {
                text = '',plus = '<span class="tb-sub-collections-plus">-</span>',h = 1;
                $.each(result.subCollections, function( z, c ) {
                  text = text.concat('<li><a href="javascript:void(0);" class="tb-n-tb-tg-'+result.handle+' tb-tg-'+result.handle+'-'+c.handle+'" data-handle="tb-tg-'+result.handle+'" data-value="'+videlxu.redir(c.title)+'"><input type="checkbox"><span class="checkmark"></span>'+c.title+'</a></li>');
                });
                text = '<ul class="tb-content-sub-collections">'+text+'</ul>';
              }else{
                if(h == 1)
                {
          plus = '<span class="tb-sub-collections-spacing"></span>';
                }
              }
            }
            videlxu.col = videlxu.col.concat('<li><a href="javascript:void(0);" class="tb-n-'+json.tb+' '+json.tb+'-'+result.handle+'" data-handle="'+json.handle+'-'+json.title_handle+'" data-value="'+videlxu.redir(result.handle)+'"><input type="checkbox"><span class="checkmark"></span>'+plus+result.title+' <span class="tb-hidden-count">('+result.count_products+')</span></a>'+videlxu.cn+text+'</li>');
          }
          if(json.handle === 'tb-vt'){
            videlxu.col = videlxu.col.concat('<li><a href="javascript:void(0);" class="tb-n-'+json.tb+' '+json.tb+'-'+videlxu.replaceSymbol(result.option_value)+'" data-handle="'+json.handle+'-'+result.handle+'" data-value="'+videlxu.redir(result.option_value)+'"><input type="checkbox"><span class="checkmark"></span>'+result.option_value+'</a></li>');
          }
          if(json.handle === 'tb-vd'){
            videlxu.col = videlxu.col.concat('<li><a href="javascript:void(0);" class="tb-n-'+json.tb+' '+json.tb+'-'+videlxu.replaceSymbol(result.vendor)+'" data-handle="'+json.handle+'-'+json.title_handle+'" data-value="'+videlxu.redir(result.vendor)+'"><input type="checkbox"><span class="checkmark"></span>'+result.vendor+' <span class="tb-hidden-count">('+result.count_products+')</span></a></li>');
          }
          if(json.handle === 'tb-pt'){
            videlxu.col = videlxu.col.concat('<li><a href="javascript:void(0);" class="tb-n-'+json.tb+' '+json.tb+'-'+videlxu.replaceSymbol(result.product_type)+'" data-handle="'+json.handle+'-'+json.title_handle+'" data-value="'+videlxu.redir(result.product_type)+'"><input type="checkbox"><span class="checkmark"></span>'+result.product_type+' <span class="tb-hidden-count">('+result.count_products+')</span></a></li>');
          }
          if(json.handle === 'tb-st'){
            videlxu.col = videlxu.col.concat('<li><a href="javascript:void(0);" class="tb-n-'+json.tb+' '+json.tb+'-in-stock" data-handle="'+json.handle+'-'+json.title_handle+'" data-value="in-stock"><input type="checkbox"><span class="checkmark"></span>'+data.language[28].title_translator+' <span class="tb-hidden-count">('+result.count_products+')</span></a></li>');
          }
          if(json.handle === 'tb-tg'){
            videlxu.col = videlxu.col.concat('<li><a href="javascript:void(0);" class="tb-n-'+json.tb+' '+json.tb+'-'+videlxu.replaceSymbol(result.title)+'" data-handle="'+json.handle+'-'+json.title_handle+'" data-value="'+videlxu.redir(result.title)+'"><input type="checkbox"><span class="checkmark"></span>'+result.title+' <span class="tb-hidden-count">('+result.count_products+')</span></a></li>');
          }
          if(json.handle === 'tb-pc'){
            videlxu.col = videlxu.col.concat('<li><div class="tb-swatch tb-filter_app_media"><a href="javascript:void(0);" class="tb-swatch-element tb-swatch tb-n-'+json.tb+' '+json.tb+'-'+json.title_handle+'" data-handle="'+json.handle+'-'+json.title_handle+'" data-value="'+videlxu.redir(result.title)+'"><span>'+videlxu.image+'</span></a></div></li>');
          }
        });
        videlxu.col += '</ul></div></div>';
      }
    }
    return videlxu.col;
  },
  optionBox:function(post,data,json,x){
    videlxu.col = '';
    videlxu.first = '';
    videlxu.children = 0;
    if(json.values.length > 0)
    {
      if(x == 0){
        videlxu.first = ' tb-first';
      }
      videlxu.col += '<div class="tb-filter-content-name tb-index-filter'+x+'"><a href="#collapse'+x+'" class="tb-filter-nav-toggle'+videlxu.first+'"><h2 class="tb-sidebar-title">'+json.title+'</h2></a><a href="javascript:void(0);" data-handle="'+json.tb+'" class="tb-clear-option-name clear-name-'+json.tb+'">'+data.language[2].title_translator+'</a><div id="collapse'+x+'" class="tb-filter-collapse"><ul class="tb-filter tb-box">';
      $.each(json.values, function( i, result ) {
        if(json.handle === 'tb-cl'){
        if(result.children)
        {
          videlxu.children = 1;
        }
        videlxu.col = videlxu.col.concat('<li><div class="tb-swatch tb-filter_app_media"><a href="javascript:void(0);" class="tb-swatch-element tb-box tb-n-'+json.tb+' '+json.tb+'-'+videlxu.replaceSymbol(result.option_value)+'" data-handle="'+json.handle+'-'+json.title_handle+'" data-children="'+videlxu.children+'" data-value="'+videlxu.redir(result.option_value)+'"><span>'+result.option_value+'</span></a></div></li>');
        }
        if(json.handle === 'tb-vt'){
        videlxu.col = videlxu.col.concat('<li><div class="tb-swatch tb-filter_app_media"><a href="javascript:void(0);" class="tb-swatch-element tb-box tb-n-'+json.tb+' '+json.tb+'-'+videlxu.replaceSymbol(result.option_value)+'" data-handle="'+json.handle+'-'+result.handle+'" data-value="'+videlxu.redir(result.option_value)+'"><span>'+result.option_value+'</span></a></div></li>');
        }
        if(json.handle === 'tb-vd'){
        videlxu.col = videlxu.col.concat('<li><div class="tb-swatch tb-filter_app_media"><a href="javascript:void(0);" class="tb-swatch-element tb-box tb-n-'+json.tb+' '+json.tb+'-'+videlxu.replaceSymbol(result.vendor)+'" data-handle="'+json.handle+'-'+json.title_handle+'" data-value="'+videlxu.redir(result.vendor)+'"><span>'+result.vendor+' ('+result.count_products+')</span></a></div></li>');
        }
        if(json.handle === 'tb-pt'){
        videlxu.col = videlxu.col.concat('<li><div class="tb-swatch tb-filter_app_media"><a href="javascript:void(0);" class="tb-swatch-element tb-box tb-n-'+json.tb+' '+json.tb+'-'+videlxu.replaceSymbol(result.product_type)+'" data-handle="'+json.handle+'-'+json.title_handle+'" data-value="'+videlxu.redir(result.product_type)+'"><span>'+result.product_type+' ('+result.count_products+')</span></a></div></li>');
        }
        if(json.handle === 'tb-tg'){
        videlxu.col = videlxu.col.concat('<li><div class="tb-swatch tb-filter_app_media"><a href="javascript:void(0);" class="tb-swatch-element tb-box tb-n-'+json.tb+' '+json.tb+'-'+videlxu.replaceSymbol(result.title)+'" data-handle="'+json.handle+'-'+json.title_handle+'" data-value="'+videlxu.redir(result.title)+'"><span>'+result.title+' ('+result.count_products+')</span></a></div></li>');
        }
        if(json.handle === 'tb-pc'){
        videlxu.col = videlxu.col.concat('<li><div class="tb-swatch tb-filter_app_media"><a href="javascript:void(0);" class="tb-swatch-element tb-swatch tb-n-'+json.tb+' '+json.tb+'-'+videlxu.replaceSymbol(result.title)+'" data-handle="'+json.handle+'-'+json.title_handle+'" data-value="'+videlxu.redir(result.title)+'"><span>'+videlxu.image+'</span></a></div></li>');
        }
      });
      videlxu.col += '</ul></div></div>';
    }
    return videlxu.col;
  },
  optionSwatch:function(post,data,json,x){
    videlxu.col = '';
    videlxu.first = '';
    videlxu.hexa = '';
    videlxu.children = 0;
    if(json.values.length > 0)
    {
      if(x == 0){
        videlxu.first = ' tb-first';
      }
      videlxu.col += '<div class="tb-filter-content-name tb-index-filter'+x+'"><a href="#collapse'+x+'" class="tb-filter-nav-toggle'+videlxu.first+'"><h2 class="tb-sidebar-title">'+json.title+'</h2></a><a href="javascript:void(0);" data-handle="'+json.tb+'" class="tb-clear-option-name clear-name-'+json.tb+'">'+data.language[2].title_translator+'</a><div id="collapse'+x+'" class="tb-filter-collapse"><ul class="tb-filter tb-swatch">';
      $.each(json.values, function( i, result ) {
        videlxu.hexa = '';
        videlxu.image = data.asset_url+videlxu.replaceSymbolSwatch(result.option_value)+data.image_type;
        videlxu.image = videlxu.resizeImage(videlxu.image,'thumb');
              videlxu.image = videlxu.image+'?'+videlxu.time;
        videlxu.image = '<img src="'+videlxu.image+'" onError="this.onerror=null;this.src=\''+data.asset_url+'tb-thumb-noimage.jpg\';" class="swatch-image-filter"/>';
        if(result.children)
        {
        videlxu.children = 1;
        }
        if(result.swatches !== null)
        {
                if(result.swatches.type != 1)
                {
                  videlxu.image = '';
                  videlxu.hexa = 'background:'+result.swatches.value;
                }
        }   
        if(json.handle === 'tb-cl'){
        videlxu.col = videlxu.col.concat('<li><div class="tb-swatch tb-filter_app_media tb-swatch-color"><a href="javascript:void(0);" class="tb-swatch-element tb-swatch tb-n-'+json.tb+' '+json.tb+'-'+videlxu.replaceSymbol(result.option_value)+'" data-handle="'+json.handle+'-'+json.title_handle+'" data-children="'+videlxu.children+'" data-value="'+videlxu.redir(result.option_value)+'" style="'+videlxu.hexa+'"><span>'+videlxu.image+'</span></a></div></li>');
        }
        if(json.handle === 'tb-vt'){
        videlxu.col = videlxu.col.concat('<li><div class="tb-swatch tb-filter_app_media tb-swatch-color"><a href="javascript:void(0);" class="tb-swatch-element tb-swatch tb-n-'+json.tb+' '+json.tb+'-'+videlxu.replaceSymbol(result.option_value)+'" data-handle="'+json.handle+'-'+result.handle+'" data-value="'+videlxu.redir(result.option_value)+'" style="'+videlxu.hexa+'"><span>'+videlxu.image+'</span></a></div></li>');
        }
        if(json.handle === 'tb-vd'){
        videlxu.col = videlxu.col.concat('<li><div class="tb-swatch tb-filter_app_media tb-swatch-color"><a href="javascript:void(0);" class="tb-swatch-element tb-swatch tb-n-'+json.tb+' '+json.tb+'-'+videlxu.replaceSymbol(result.vendor)+'" data-handle="'+json.handle+'-'+json.title_handle+'" data-value="'+videlxu.redir(result.vendor)+'" style="'+videlxu.hexa+'"><span>'+videlxu.image+'</span></a></div></li>');
        }
        if(json.handle === 'tb-pt'){
        videlxu.col = videlxu.col.concat('<li><div class="tb-swatch tb-filter_app_media tb-swatch-color"><a href="javascript:void(0);" class="tb-swatch-element tb-swatch tb-n-'+json.tb+' '+json.tb+'-'+videlxu.replaceSymbol(result.product_type)+'" data-handle="'+json.handle+'-'+json.title_handle+'" data-value="'+videlxu.redir(result.product_type)+'" style="'+videlxu.hexa+'"><span>'+result.product_type+' ('+result.count_products+')</span></a></div></li>');
        }
        if(json.handle === 'tb-tg'){
        videlxu.col = videlxu.col.concat('<li><div class="tb-swatch tb-filter_app_media tb-swatch-color"><a href="javascript:void(0);" class="tb-swatch-element tb-swatch tb-n-'+json.tb+' '+json.tb+'-'+videlxu.replaceSymbol(result.title)+'" data-handle="'+json.handle+'-'+json.title_handle+'" data-value="'+videlxu.redir(result.title)+'" style="'+videlxu.hexa+'"><span>'+videlxu.image+'</span></a></div></li>');
        }
        if(json.handle === 'tb-pc'){
        videlxu.col = videlxu.col.concat('<li><div class="tb-swatch tb-filter_app_media tb-swatch-color"><a href="javascript:void(0);" class="tb-swatch-element tb-swatch tb-n-'+json.tb+' '+json.tb+'-'+videlxu.replaceSymbol(result.title)+'" data-handle="'+json.handle+'-'+json.title_handle+'" data-value="'+videlxu.redir(result.title)+'"><span>'+videlxu.image+'</span></a></div></li>');
        }
      });
      videlxu.col += '</ul></div></div>';
    }
    return videlxu.col;
  },
  optionRange:function(post,data,json,x){
    videlxu.col = '';
    videlxu.first = '';
    if(json.values.length > 0)
    {
      if(json.values[0].MinPrice != json.values[0].MaxPrice)
      {
        if(x == 0){
          videlxu.first = ' tb-first';
        }
        videlxu.col += '<div class="tb-filter-content-name tb-index-filter'+x+'"><a href="#collapse'+x+'" class="tb-filter-nav-toggle'+videlxu.first+'"><h2 class="tb-sidebar-title">'+json.title+'</h2></a><a href="javascript:void(0);" data-handle="'+json.tb+'" class="tb-clear-option-name clear-name-'+json.tb+'">'+data.language[2].title_translator+'</a><div id="collapse'+x+'" class="tb-filter-collapse-price">';
        $.each(json.values, function( i, result ) {
          if(json.handle === 'tb-pc'){
          videlxu.col = videlxu.col.concat('<div class="tb-filter-option-range-amount" id="tb-filter-option-range-amount-pf_p_price"><input id="tb-filter-option-range-amount-min" value="'+result.MinPrice+'" type="text" disabled="disabled"><div class="tb-filter-option-range-amount-split"> - </div><input id="tb-filter-option-range-amount-max" value="'+result.MaxPrice+'" type="text" disabled="disabled"></div><div id="tb-price"></div>');
          }
        });
        videlxu.col += '</div></div>';
      }
    }
    return videlxu.col;
  },
  noviSlider:function(json,data,$){
      if($('#tb-price').length > 0)
    {
      videlxu.url = window.location.href;
      var price = videlxu.capturePrice(json,data,$);
      var keypressSlider = document.getElementById('tb-price');
      var input0 = document.getElementById('tb-filter-option-range-amount-min');
      var input1 = document.getElementById('tb-filter-option-range-amount-max');
      var inputs = [input0, input1];
      var minPrice = parseFloat(price[0].values[0].MinPrice);
      var maxPrice = parseFloat(price[0].values[0].MaxPrice);
      var mintoPrice = parseFloat(price[0].values[0].MinPrice);
      var maxtoPrice = parseFloat(price[0].values[0].MaxPrice);
      var toPrice = videlxu.getParameterByName('price',videlxu.url);
      if(toPrice)
      {
        toPrice = toPrice.split('-');
        mintoPrice = toPrice[0];
        maxtoPrice = toPrice[1];
      }
      if(minPrice != maxPrice)
      {
        noUiSlider.create(keypressSlider, {
          start: [mintoPrice, maxtoPrice ],
          connect: true,
                    direction: 'ltr',
          range: {
            'min': minPrice,
            'max': maxPrice
          },
          pips: { 
                      mode: 'count', 
                      values: 5
                    },
        });
              keypressSlider.noUiSlider.on('update', function( values, handle ) {
                inputs[handle].value = values[handle];
              });
              keypressSlider.noUiSlider.on('change', function ( values, handle ) {
                videlxu.url = window.location.href;
                videlxu.urlFilterSingle(videlxu.url,'price',values[0]+'-'+values[1]);
                videlxu.ajaxfilter(data,$);
              });
              function setSliderHandle(i, value) {
                var r = [null,null];
                r[i] = value;
                keypressSlider.noUiSlider.set(r);
              }
              // Listen to keydown events on the input field.
              inputs.forEach(function(input, handle) {
                input.addEventListener('change', function(){
                  setSliderHandle(handle, this.value);
                });
                input.addEventListener('keydown', function( e ) {
                });
              });
      }
    }
  },
  capturePrice:function(json,data,$){
    var arr = [];
    $.each(json.filter, function( i, result ) {
    if(result.title_handle === 'price')
    {
      arr.push(result);
    }
    });
    return arr;
  },
  changeOption:function(data,$){
    $('ul.tb-filter li').find('a').unbind('click');
    $('ul.tb-filter li').find('a').click(function(e){
      e.preventDefault();
      $(this).addClass('active');
            $(this).parent('.tb-swatch-color').addClass('active');
      $('.clear-name-'+$(this).data('handle')).css('display','none');
      var handle = $(this).data('handle'),value = $(this).data('value');
      videlxu.url = window.location.href;
      videlxu.urlFilter(videlxu.url,handle,videlxu.redir(value));
      if(videlxu.getParameterByName($(this).data('handle'),videlxu.url) !== null)
      {
        $('.clear-name-'+$(this).data('handle')).css('display','block');
      }
      videlxu.ajaxfilter(data,$);
    });
    $('a.tb-n-tb-cl-collections').unbind('click');
    $('a.tb-n-tb-cl-collections').click(function(e){
      e.preventDefault();
      $('ul.tb-filter li').find('a.tb-n-tb-cl-collections').removeClass('active');
      var handle = $(this).data('handle'),value = $(this).data('value'),url = '',c = '',params='';
      videlxu.url = window.location.href;
      if (!videlxu.url.match('/search')) {
        videlxu.url = videlxu.url.split('/collections/');
        if (videlxu.url[1].indexOf("?") > -1) {
          params = videlxu.url[1].split('?');
          params = '?'+params[1];
        }
        url = videlxu.url[0]+'/collections/'+value;
        $('.clear-name-'+$(this).data('handle')).css('display','none');
        videlxu.urlFilterCollection(url,handle,videlxu.redir(value));
      }else{
                videlxu.url = '/search?';
        videlxu.urlFilterSingle(videlxu.url,handle,value);
      }
      $(this).addClass('active');
      if(videlxu.getParameterByName($(this).data('handle'),url) !== null)
      {
        $('.clear-name-'+$(this).data('handle')).css('display','block');
      }
      videlxu.ajaxfilter(data,$);
    });
    $('ul.tb-filter li').find('a.active').unbind('click');
    $('ul.tb-filter li').find('a.active').click(function(e){
      e.preventDefault();
      $(this).removeClass('active');
          $(this).parent('.tb-swatch-color').removeClass('active');
      $('.clear-name-'+$(this).data('handle')).css('display','none');
      var handle = $(this).data('handle'),value = $(this).data('value');
      videlxu.url = window.location.href;
      videlxu.url = videlxu.removeParam('page',videlxu.url);
      videlxu.url = videlxu.removeParamValue(handle,videlxu.redir(value),videlxu.url);
      window.history.pushState({}, "keywords", videlxu.url);
      if(videlxu.getParameterByName($(this).data('handle'),videlxu.url) !== null)
      {
        $('.clear-name-'+$(this).data('handle')).css('display','block');
      }
      videlxu.ajaxfilter(data,$);
    });
    $('a.tb-n-tb-cl-collections.active').unbind('click');
    $('a.tb-n-tb-cl-collections.active').click(function(e){
      e.preventDefault();
    });
  },
  collect:function(){
    videlxu.url = window.location.href;
    if (!videlxu.url.match('/search')) {
      if (videlxu.url.match('/collections')) {
        videlxu.url = videlxu.url.split('/collections/');
        videlxu.url = videlxu.url[1].split('?');
        videlxu.url = videlxu.url[0];
                if(videlxu.url.match('/'))
                {
                 videlxu.url = videlxu.url.split('/'); 
                 videlxu.url = videlxu.url[0];
                }
      }else{
        videlxu.url = 'all';
      }
    }else{
      videlxu.url = videlxu.getParameterByName('tb-cl-collections',videlxu.url);
      if(videlxu.url == null)
      {
        videlxu.url = 'all';
      }
    }
    return decodeURIComponent(videlxu.url);
  },
  paginate:function(data,$){
    $('.tb-content-paginate ul.tb-paginate').find('li').find('a').unbind('click');
    $('.tb-content-paginate ul.tb-paginate').find('li').find('a').click(function(e){
      e.preventDefault();
      videlxu.url = window.location.href;
      videlxu.page = videlxu.getParameterByName('page',$(this).attr('href'));
      videlxu.urlFilter(videlxu.url,'page',videlxu.page);
      videlxu.ajaxfilter(data,$);
      if($(this).parent('li').parent('ul.tb-paginate').parent('.tb-content-paginate').data('pisition') === 'bottom')
      {
        videlxu.scrollTop(data,$);
      }
    });
  },
  addToCart:function(data,$){
    videlxu.url = window.location.href;
  if(data.quickv > 0)
  {
    $('a.tb-button-add-to-cart').unbind('click');
    $('a.tb-button-add-to-cart').click(function(e){
      e.preventDefault();
      if($(this).is('[disabled=disabled]')){
        return false;
      }
          var id = $(this).data('id');
      var vid = $('.tb-swatch-products-'+id+'').find('.tb-content-select').find('select.tb-product-select-option').find('option:selected').data('variantid');
      var qty = 1;
      var where = $(this);
      var params = {id:vid,quantity:qty};
      where.html('Adding...');
      videlxu.ajaxpost(data,$,params,where);
    });
  }
  videlxu.slickCarousel(data,$);
  $( "li.tb-product" ).hover(
    function() {
      var where = $(this),id = $(this).data("id");
        if(data.thumbnails == 1)
        {
          $('.tb-slick-carousel-thumb.tb-thumb-function-'+id).show();
          $('.tb-slick-carousel-thumb.tb-thumb-function-'+id).slick("refresh");
          if(where.find('.tb-product-inner-snappy-filter.tb-content-hover').find('button.slick-prev').length == 0)
          {
            where.find('.tb-product-inner-snappy-filter.tb-content-hover').find('ul.tb-thumb-swatch').addClass('tb-no-padding');
          }
        }
    }, function() {
     var where = $(this);
    where.find('.tb-product-inner-snappy-filter.tb-content-hover').find('ul.tb-thumb-swatch').removeClass('tb-no-padding');
      }
  );
  $('.tb-product-inner-snappy-filter.tb-content-static').unbind('click');
  $('.tb-product-inner-snappy-filter.tb-content-static').click(function(e){
        e.preventDefault();
        var where = $(this),tbslick = '';
      
        if(data.quick_view_status == 0)
        {
          window.location.href = $(this).find('.tb-content-image-turbofilter').find('a').attr('href');
          return false;
        }
        if($( window ).width() <= 600)
        {
          
          if(data.quick_view_status_mobile == 0)
          {
            window.location.href = $(this).find('.tb-content-image-turbofilter').find('a').attr('href');
            return false;  
          }
          if(data.quickv == 0)
          {
            window.location.href = $(this).find('.tb-content-image-turbofilter').find('a').attr('href');
            return false;
          }
          $('.tb-content-image-turbofilter a').unbind('click');
          $('.tb-content-image-turbofilter a').click(function(e){
            e.preventDefault();
          });
        }
        
        $('.tb-quick-view-products-by-full-w').css({"visibility":"hidden"});
        $('.tb-quick-view-products-by-full-w').show();
        if($('.tb-quick-view-products-by-full-w').html(where.closest('.tb-product').find('.tb-product-inner-snappy-filter.tb-content-hover')))
        {
          $('.tb-quick-view-products-by-full-w').append('<a href="javascript:void(0);" class="tb-close-products"><img src="https://api.apolomultimedia-server3.info/assets/images/tb-cancel.png" /></a>');
          tbslick = $('.tb-quick-view-products-by-full-w').find('.tb-product-inner-snappy-filter.tb-content-hover').find('.tb-slick-carousel-thumb')
          if(tbslick)
          {
            tbslick.slick("refresh");
            $('.tb-quick-view-products-by-full-w').css({"visibility":"visible"});
          }
        }
        if($('.tb-content-cart').html() !== '')
        {
          $('.tb-cart-icon').hide();
          $('.tb-content-cart').removeClass('active');
        }
        if(where.closest('.tb-product').find('.tb-product-inner-snappy-filter.tb-content-hover').find('button.slick-prev').length == 0)
        {
          where.closest('.tb-product').find('.tb-product-inner-snappy-filter.tb-content-hover').find('ul.tb-thumb-swatch').addClass('tb-no-padding');
        }
        if($( window ).width() <= 600)
        {
          $('body').addClass('tb-scroll-hidden-product');
          $('html').addClass('tb-scroll-hidden-product');
        }else{
          $('body').removeClass('tb-scroll-hidden-product');
          $('html').removeClass('tb-scroll-hidden-product');
        }
        videlxu.imageChange(data,$);
        videlxu.changeImageSlick(data,$);
        videlxu.closeProduct(data,$);
        
  });
  $('.tb-products-content .tb-product').unbind('click');
  $('.tb-products-content .tb-product').click(function(e){
    e.preventDefault();
    if($('.tb-scroll-hidden').length > 0)
    {
      $('.tb-content-cart').removeClass('active');
    }
  });
  $('.tb-button-details').unbind('click');
  $('.tb-button-details').click(function(e){
    e.preventDefault();
    window.location.href = $(this).attr('href');
  });
  $('.tb-product-inner-snappy-filter.tb-content-hover .tb-content-image-turbofilter a').unbind('click');
  $('.tb-product-inner-snappy-filter.tb-content-hover .tb-content-image-turbofilter a').click(function(e){
    e.preventDefault();
    window.location.href = $(this).attr('href');
  });
  $('.tb-button-details').html(data.language[9].title_translator);
  $('.tb-button-add-to-cart').html(data.language[8].title_translator);
    
    if($('#snappy_filter_wrapper').length > 0)
    {
      $('.tb-sidebar-toggle').show();
    }
    videlxu.loadQuickView(data,$);
  },
  loadQuickView:function(data,$)
  {
    $('.tb-product-inner-snappy-filter.tb-content-static.tb-quick-view').unbind('click');
    $('.tb-product-inner-snappy-filter.tb-content-static.tb-quick-view').click(function(e){
      e.preventDefault();
      var href = $(this).find('.tb-content-image-turbofilter').find('a').attr('href'),id = $(this).data('id'),where = $(this),tbslick = '';
      if(data.quick_view_status == 0)
      {
        window.location.href = href;
        return false;
      }
      if($( window ).width() <= 600)
      {

        if(data.quick_view_status_mobile == 0)
        {
          window.location.href = href;
          return false;  
        }
        if(data.quickv == 0)
        {
          window.location.href = href;
          return false;
        }
        $('.tb-content-image-turbofilter a').unbind('click');
        $('.tb-content-image-turbofilter a').click(function(e){
          e.preventDefault();
        });

      }else{
        if(data.quickv == 1)
        {
          window.location.href = href;
        }
        return false;
      }

      $('.tb-quick-view-products-by-full-w').css({"visibility":"hidden"});
      $('.tb-quick-view-products-by-full-w').show();
      if($('.tb-quick-view-products-by-full-w').html(where.closest('.tb-product').find('.tb-content-mega-quick-view')))
      {
        $('.tb-quick-view-products-by-full-w').append('<a href="javascript:void(0);" class="tb-close-products-quick-view"><img src="https://api.apolomultimedia-server3.info/assets/images/tb-cancel.png" /></a>');
        tbslick = $('.tb-quick-view-products-by-full-w').find('.tb-content-mega-quick-view').find('.tb-slick-carousel-thumb')
        if(tbslick)
        {
          tbslick.slick("refresh");
          $('.tb-quick-view-products-by-full-w').css({"visibility":"visible"});
        }
      }
      if($('.tb-content-cart').html() !== '')
      {
        $('.tb-cart-icon').hide();
        $('.tb-content-cart').removeClass('active');
      }
      if($('.tb-popup-quick-view-'+id).find('button.slick-prev').length == 0)
      {
        $('.tb-popup-quick-view-'+id).find('ul.tb-thumb-swatch').addClass('tb-no-padding');
      }
      if($( window ).width() <= 600)
      {
        $('body').addClass('tb-scroll-hidden-product');
        $('html').addClass('tb-scroll-hidden-product');
      }else{
        $('body').removeClass('tb-scroll-hidden-product');
        $('html').removeClass('tb-scroll-hidden-product');
      }
      videlxu.imageChange(data,$);
      videlxu.changeImageSlick(data,$);
      videlxu.closeProduct(data,$);
      videlxu.ajaxProductDescription(href,data,$);
      videlxu.loadQuickView(data,$);
    });

    $('.tb-product-inner-snappy-filter.tb-content-static.tb-quick-view').find('.tb-open-quick-view').unbind('click');
    $('.tb-product-inner-snappy-filter.tb-content-static.tb-quick-view').find('.tb-open-quick-view').click(function(e){
      e.preventDefault();
      e.stopPropagation();
      var url = $(this).attr('href'),href = $(this).data('href'),id = $(this).data('id');
      if(data.quick_view_status == 0)
      {
        window.location.href = href;
        return false;
      }
      if($( window ).width() <= 600)
      {

        if(data.quick_view_status_mobile == 0)
        {
          window.location.href = href;
          return false;  
        }
        if(data.quickv == 0)
        {
          window.location.href = href;
          return false;
        }
      }
    $('.tb-description-onload').html('');
      $.magnificPopup.open({
        items: {
          src: '#'+url
        },
        type: 'inline',
        callbacks: {
          lazyLoad: function(item) {
            $('.tb-slick-carousel-thumb.tb-thumb-function-'+id).slick("refresh");
          },
          beforeOpen: function() {
            videlxu.ajaxProductDescription(href,data,$);
            videlxu.loadQuickView(data,$);
          }
        }
      });

      $('.tb-slick-carousel-thumb.tb-thumb-function-'+id).slick("refresh");
      videlxu.loadQuickView(data,$);
    });
  },
  ajaxProductDescription:function(href,data,$)
  {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      async: true,
      url: href+'.json',
      contentType: "application/json",
      beforeSend: function() {
      },
      success: function(json) {
        if(json)
        {
          if(json.product.body_html !== '')
          {
            $('.tb-description-onload').html('<div class="tb-content-body-html">'+videlxu.strip(json.product.body_html)+'</div>');
          }
        }
      },
      error: function(xhr) {
      },
      complete: function() {
      }
    });
  },
  strip:function(html){
    var tmp = document.implementation.createHTMLDocument("New").body;
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  },
  closeProduct:function(data,$){
  $('.tb-close-products').unbind('click');
  $('.tb-close-products').click(function(e){
    e.preventDefault();
    var id = $(this).parent('.tb-quick-view-products-by-full-w').find('.tb-product-inner-snappy-filter.tb-content-hover').data('id');
    if($('.tb-content-cart').html() !== '')
    {
      $('.tb-cart-icon').show();
      $('.tb-content-cart').removeClass('active');
    }
    $(this).parent('.tb-product-inner-snappy-filter.tb-content-hover').find('ul.tb-thumb-swatch').removeClass('tb-no-padding');
    $('.tb-product.product-'+id).append($(this).parent('.tb-quick-view-products-by-full-w').find('.tb-product-inner-snappy-filter.tb-content-hover'));
    $('.tb-quick-view-products-by-full-w').hide();
    $('.tb-close-products').remove();
    $('body').removeClass('tb-scroll-hidden-product');
    $('html').removeClass('tb-scroll-hidden-product');
    videlxu.imageChange(data,$);
    videlxu.changeImageSlick(data,$);
    videlxu.closeProduct(data,$);
  });
    $('.tb-close-products-quick-view').unbind('click');
  $('.tb-close-products-quick-view').click(function(e){
    e.preventDefault();
    var id = $(this).parent('.tb-quick-view-products-by-full-w').find('.tb-content-mega-quick-view').data('id');
    if($('.tb-content-cart').html() !== '')
    {
      $('.tb-cart-icon').show();
      $('.tb-content-cart').removeClass('active');
    }
    $(this).parent('.tb-content-mega-quick-view').find('ul.tb-thumb-swatch').removeClass('tb-no-padding');
    $('.tb-product.product-'+id).append($(this).parent('.tb-quick-view-products-by-full-w').find('.tb-content-mega-quick-view'));
    $('.tb-quick-view-products-by-full-w').hide();
    $('.tb-close-products-quick-view').remove();
    $('body').removeClass('tb-scroll-hidden-product');
    $('html').removeClass('tb-scroll-hidden-product');
    videlxu.imageChange(data,$);
    videlxu.changeImageSlick(data,$);
    videlxu.closeProduct(data,$);
  });
  },
  ajaxpost:function(data,$,params,where){
  $.ajax({
    type: 'POST',
    url : '/cart/add.js',
    dataType: 'json',
    async: false,
    data : params,
    beforeSend: function() {
      //
    },
    success: function(result){
      if(result)
            {
              if(data.stick_cart_status == 0)
              {
                /*setTimeout(function(){
                  $('.js-drawer-open-cart')[0].click();
                });*/
                window.location.href = '/cart';
                return false;
              }
              videlxu.showCartStick(data,$);
            }
    },
    error: function(xhr, textStatus, error){
      var obj = $.parseJSON(xhr.responseText);
      if(xhr.responseText)
      {
        videlxu.notifyError(obj.description,$);
            }
    },
        complete: function() {
      setTimeout(function(){ where.html(data.language[8].title_translator); where.removeClass('btn--loading');}, 500);
      videlxu.ajaxcart(data,$);
        }
  });
  },
  showCartStick:function(data,$){
      if($( window ).width() > 600)
    {
      $('.tb-content-cart').addClass('active');
      $('.tb-content-cart').show();
      
    }else{
      if($('.tb-scroll-hidden-product').length > 0)
      {
        $('.tb-content-cart').addClass('active');
        $('.tb-content-cart').show();
      } 
    }
  },
  ajaxpostCarousel:function(where,data,$,params){
  $.ajax({
    type: 'POST',
    url : '/cart/change.js',
    dataType: 'json',
    async:false,
    data : params,
    beforeSend: function() {
    },
    success: function(result){
      if(result.total_price == parseInt(where.parent('.tb-pro-quantity').find('input.tb-total-price').val()))
      {
        videlxu.notifyError('There is no stock available for the product '+where.parent('.tb-pro-quantity').find('input[name="quantity"]').data('title')+' '+where.parent('.tb-pro-quantity').find('input[name="quantity"]').data('variantitle'),$);
      }
      //console.log(result);
    },
    error: function(xhr) {
      //console.log(xhr);
        },
        complete: function() {
      videlxu.ajaxcart(data,$);
        }
  });
  },
  ajaxcart:function(data,$){
  $.ajax({
    type: 'GET',
    url : '/cart.js?_=999666333',
    dataType: 'json',
    success: function(result){
            //setTimeout(function(){ console.log(theme.AjaxProduct($('#AddToCartForm-1950840455217'))); }, 500);
      videlxu.loadCart(data,$,result);
    },
    beforeSend: function() {
      //videlxu.loadAjaxOpen(data,$);
    },
    error: function(xhr, textStatus, error){
        //console.log(xhr.statusText);
        //console.log(textStatus);
        //console.log(error);
    },
        complete: function() {
            videlxu.automaticResponsive(data,$);
      videlxu.loadQuantity(data,$);
      //videlxu.loadAjaxClose(data,$);
            videlxu.clearAllCart(data,$);
            videlxu.tooltipster(data,$);
            //videlxu.scrollPopup(data,$);
        }
  });
  },
  addToCartDrawer:function(data,$)
  {
    $('.tb-add-to-cart-drawer').unbind('click');
    $('.tb-add-to-cart-drawer').click(function(e){
      e.preventDefault();
      var id = $(this).data('id'),quantity = $('#Quantity-'+id).val(),variantid = $('#ProductSelect-'+id).val(),params = {id:variantid,quantity:quantity},where = $(this);
      $(this).addClass('btn--loading');
      videlxu.ajaxpost(data,$,params,where);
    });
  },
  openCartDrawer:function(data,$){
    $('.tb-js-drawer-turbo').unbind('click');
    $('.tb-js-drawer-turbo').click(function(e){
      e.preventDefault();
      videlxu.showCartStick(data,$);
    });
  },
  clearAllCart:function(data,$){
    $('a.tb-filter-clear-all-cart').unbind('click');
    $('a.tb-filter-clear-all-cart').click(function(e){
      e.preventDefault();
        $.ajax({
          type: "POST",
          url: '/cart/clear.js',
          dataType: 'json',
          success: function(cart){
            //console.log(cart);
          },
          error: function(e) {
            //console.log(e);
          },
          complete:function(e){
            videlxu.removeHidden(data,$);
            videlxu.ajaxcart(data,$);
          } 
        });
    });
  },
  removeHidden:function(data,$){
    $('body').removeClass('tb-scroll-hidden');
    $('html').removeClass('tb-scroll-hidden');
  },
  tooltipster:function(data,$){
    if(data.style_sticky == 0)
    {
      $('.tb-tooltip').tooltipster({
          contentAsHTML: true,
          animationDuration: 200,
          trigger: 'ontouchstart' in window || navigator.maxTouchPoints ? 'click' : 'hover'
      });
    }
  },
  scrollPopup:function(data,$){
    $('.tb-slick-carousel').jScrollPane();
  },
  onloadWidth:function(data,$){
  $( window ).resize(function() {
    videlxu.automaticResponsive(data,$);
      videlxu.loadQuickView(data,$);
  });
  },
  onLoadCartClick:function(data,$)
  {
    $('.tb-cart-icon .tb-cart-total-price').unbind('click').bind('click',function(e){
      e.preventDefault();
      if($('.tb-content-cart').hasClass('active'))
      {
        $('.tb-content-cart').removeClass('active');
      }else{
        $('.tb-content-cart').addClass('active');
      }
    });
  },
  automaticResponsive:function(data,$){
  var width_body = parseInt($('body').width());
  var width = parseInt($('.tb-load-cart-content.item').length) * 60;
  var top = 137.5;
    var hidden = $('.tb-cart-icon .tb-cart-total-price').html();
  $('.tb-content-cart').css('top',top+'px');
    
  videlxu.onLoadCartClick(data,$);
    
    $('.tb-cart-icon.tb-mobile-cart a').unbind('click');
    $('.tb-cart-icon.tb-mobile-cart a').click(function(e){
      e.preventDefault();
      if($('.tb-content-cart').hasClass('active'))
      {
        $('body').removeClass('tb-scroll-hidden');
        $('html').removeClass('tb-scroll-hidden');
        $('.tb-content-cart').removeClass('active');
      }else{
        $('body').addClass('tb-scroll-hidden');
        $('html').addClass('tb-scroll-hidden');
        $('.tb-content-cart').addClass('active');
      }
    });
    $('.tb-quick-view-products-by-full-w').unbind('click');
    $('.tb-quick-view-products-by-full-w').click(function(e){
      e.preventDefault();
      $('.tb-content-cart').removeClass('active');
    });
    $('.tb-cart-icon').removeClass('tb-mobile-cart');
    if($( window ).width() < 768)
    {
      $('.tb-cart-icon').addClass('tb-mobile-cart');
    }
    if($( window ).width() > 768)
    {
      //$('.tb-content-cart').addClass('active');
      //$('.tb-content-cart').show();
      if(hidden !== '')
      {
        if(data.style_sticky == 0)
        {
          $('.tb-cart-icon').show();
        }else{
          $('.tb-cart-icon').hide();
        }
      }
    }else{
      if(hidden !== '')
      {
        $('.tb-cart-icon').show();
      }
    }
  },
  escapeHtml:function(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
  },
  loadCart:function(data,$,obj){
  if(data.quickv > 0)
  {
      var text = '',title = '',image = '';

      $.each(obj.items, function( key, value ) {
        if(value.variant_title == null)
        {
          value.variant_title = '';
        }
        image = videlxu.resizeImage(value.image,'small');
        title = '';
        if(data.style_sticky > 0)
        {
          title = '<a href="'+value.url+'" class="ajaxcart__product-name">'+videlxu.escapeHtml(value.product_title)+'</a>';
          image = videlxu.resizeImage(value.image,'large');
        }
        text = text.concat('<div class="tb-load-cart-content item tb-tooltip" title="'+videlxu.escapeHtml(value.product_title)+'<br />'+videlxu.escapeHtml(value.variant_title)+'"><div class="tb-cart-image"><img src="'+image+'" /></div><div class="tb-content-drawer-cart-loop"><div class="tb-title-cart-shopify">'+title+'<p>'+value.variant_title+'</p></div><div class="tb-cart-description tb-mobile"><span class="tb-cart-price">'+snappy.Currency.formatMoney(value.original_price, data['money_format'])+'</span><span class="tb-cart-title" style="display:none;">'+value.variant_title+'</span></div><div class="tb-pro-quantity"><input type="hidden" class="tb-total-price" value="'+obj.total_price+'" /><a href="javascript:void(0);" class="tb-cart-item-decrease tb-qtyminus" field="quantity">-</a><input type="text" name="quantity" data-title="'+value.product_title+'" data-variantitle="'+value.variant_title+'" value="'+value.quantity+'" data-id="'+value.variant_id+'" /><a href="javascript:void(0);" class="tb-cart-item-increase tb-qtyplus" field="quantity">+</a></div><div class="tb-cart-description tb-desktop"><span class="tb-cart-price">'+snappy.Currency.formatMoney(value.original_price, data['money_format'])+'</span><span class="tb-cart-title" style="display:none;">'+value.variant_title+'</span></div></div></div>')
      });
      
      if(obj.items.length > 0)
      {
          $('.tb-content-cart').html('<div class="tb-content-new-drawer"><div class="load-ajax-snappy-filter" style="display:none;"></div><h2 class="tb-sidebar-title tb-shopping-cart">'+data.language[11].title_translator+'</h2><a href="javascript:void(0);" class="tb-filter-clear-all-cart tb-cart-drawer-clear">'+data.language[3].title_translator+'</a><a class="tb-cart-close" href="javascript:void(0);" style="display:none;"><img src="https://api.apolomultimedia-server3.info/assets/images/tb-cancel.png"></a><div class="tb-slick-carousel">'+text+'</div><div class="tb-content-add-check-drawer"><div class="tb-sub-total--full"><div class="tb-sub-total-content"><p class="tb-ajaxcart__subtotal">'+data.language[26].title_translator+'</p></div><div class="tb-sub-total-content"><p class="tb-ajaxcart__price">'+snappy.Currency.formatMoney(obj.items_subtotal_price, data['money_format'])+'</p></div></div><p class="tb-ajaxcart__note">'+data.language[27].title_translator+'</p><a href="/checkout" class="tb-add-to-checkout-items btn"><span>'+data.language[6].title_translator+'</span></a><a href="/cart" class="tb-add-to-cart-items btn btn--secondary"><span>'+data.language[7].title_translator+'</span></a><a href="javascript:void(0);" class="tb-continue-shopping btn btn--secondary"><span>'+data.language[21].title_translator+'</span></a></div></div>');
          $('.tb-cart-total-price').html('<span>'+snappy.Currency.formatMoney(obj.total_price, data['money_format'])+'</span>');
          //$('.tb-cart-icon').show();
          if($( window ).width() > 768)
          {
              //$('.tb-content-cart').addClass('active');
              //$('.tb-content-cart').show();
              if(data.style_sticky == 0)
                {
                  $('.tb-cart-icon').show();
                }else{
                  $('.tb-cart-icon').hide();
                }
          }else{
              $('.tb-cart-icon').show();
              if($('.tb-scroll-hidden-product').length > 0)
              {
                  $('.tb-content-cart').addClass('active');
                  $('.tb-content-cart').show();
              } 
          }
      }else{
          $('.tb-content-cart').html('');
          $('.tb-cart-total-price').html('');
          $('.tb-content-cart').removeClass('active');
          $('.tb-cart-icon').hide();
      }
  }
    videlxu.closeMiniCart(data,$);
  },
  loadQuantity:function(data,$){
  $('.tb-qtyplus').unbind('click');
    $('.tb-qtyplus').click(function(e){
      // Stop acting like a button
      e.preventDefault();
      // Get the field name
      fieldName = $(this).attr('field');
      // Get its current value
    var id = $(this).parent('.tb-pro-quantity').find('input[name='+fieldName+']').data('id');
      var currentVal = parseInt($(this).parent('.tb-pro-quantity').find('input[name='+fieldName+']').val());
    var currentPlus = currentVal + 1;
    var params = {id:id,quantity:currentPlus};
      // If is not undefined
      if (!isNaN(currentVal)) {
        // Increment
        $(this).parent('.tb-pro-quantity').find('input[name='+fieldName+']').val(currentVal + 1);
      } else {
        // Otherwise put a 0 there
        $(this).parent('.tb-pro-quantity').find('input[name='+fieldName+']').val(0);
      }
    videlxu.ajaxpostCarousel($(this),data,$,params);
    });
    // This button will decrement the value till 0
  $('.tb-qtyminus').unbind('click');
    $(".tb-qtyminus").click(function(e) {
      // Stop acting like a button
      e.preventDefault();
      // Get the field name
      fieldName = $(this).attr('field');
      // Get its current value
    var id = $(this).parent('.tb-pro-quantity').find('input[name='+fieldName+']').data('id');
      var currentVal = parseInt($(this).parent('.tb-pro-quantity').find('input[name='+fieldName+']').val());
    var currentMin = currentVal - 1;
    var params = {id:id,quantity:currentMin};
    
      // If it isn't undefined or its greater than 0
      if (!isNaN(currentVal) && currentVal > 0) {
        // Decrement one
        $(this).parent('.tb-pro-quantity').find('input[name='+fieldName+']').val(currentVal - 1);
      } else {
        // Otherwise put a 0 there
        $(this).parent('.tb-pro-quantity').find('input[name='+fieldName+']').val(0);
      }
    videlxu.ajaxpostCarousel($(this),data,$,params);
    });
  },
  slickCarousel:function(data,$){
  if($('.tb-slick-carousel-thumb').length > 0)
  {
    
    $('.tb-slick-carousel-thumb').slick({
      infinite: false,
      slidesToShow: 5,
      centerMode: false,
      slidesToScroll: 1,
      arrows: true,
      adaptiveHeight: true,
      responsive: [
        {
        breakpoint: 2000,
        settings: {
        slidesToShow: 4
        }
      },
      {
        breakpoint: 1920,
        settings: {
        slidesToShow: 4
        }
      },
        {
        breakpoint: 1680,
        settings: {
        slidesToShow: 4
        }
      },
        {
        breakpoint: 1360,
        settings: {
        slidesToShow: 4
        }
      },
      {
        breakpoint: 1200,
        settings: {
        slidesToShow: 4
        }
      },
      {
        breakpoint: 1050,
        settings: {
        slidesToShow: 3
        }
      },
      {
        breakpoint: 1024,
        settings: {
        slidesToShow: 3
        }
      },
            {
        breakpoint: 990,
        settings: {
        slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
        slidesToShow: 4,
        }
      },
      {
        breakpoint: 680,
        settings: {
        slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
        slidesToShow: 6,
        },
      },
      {
        breakpoint: 550,
        settings: {
        slidesToShow: 6,
        },
      },
      {
        breakpoint: 520,
        settings: {
        slidesToShow: 6,
        },
      },
      {
        breakpoint: 480,
        settings: {
        slidesToShow: 6,
        },
      },
      {
        breakpoint: 420,
        settings: {
        slidesToShow: 6,
        },
      },
      {
        breakpoint: 380,
        settings: {
        slidesToShow: 5,
        },
      },
      {
        breakpoint: 320,
        settings: {

        slidesToShow: 4,
      },
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
      ]
    });
  }
  },
  redir:function(url) {
      url = encodeURIComponent(url);
    return url;
  },
  replaceSymbol:function(string){
    string = string.toString();
    string = string.replace(/\./g,'-');
    string = string.replace(/[^a-zA-Z0-9]/g,'-');
    string = string.toLowerCase();
    return string;
  },
  replaceSymbolSwatch:function(string){
    string = string.toString();
      string = string.replace(/\s/g, '');
    string = string.replace(/\./g,'');
    string = string.replace(/[^a-zA-Z0-9]/g,'-');
    string = string.toLowerCase();
    return string;
  },
  updateQueryStringParameter: function(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
    return uri + separator + key + "=" + value;
    }
  },
  addParameter:function(url, parameterName, parameterValue, atStart){
    replaceDuplicates = false;
    if(url.indexOf('*#') > 0){
        var cl = url.indexOf('*#');
        urlhash = url.substring(url.indexOf('*#'),url.length);
    } else {
        urlhash = '';
        cl = url.length;
    }
    sourceUrl = url.substring(0,cl);

    var urlParts = sourceUrl.split("?");
    var newQueryString = "";

    if (urlParts.length > 1)
    {
        var parameters = urlParts[1].split("&");
        for (var i=0; (i < parameters.length); i++)
        {
            var parameterParts = parameters[i].split("=");
            if (!(replaceDuplicates && parameterParts[0] == parameterName))
            {
                if (newQueryString == "")
                    newQueryString = "?";
                else
                    newQueryString += "&";
                newQueryString += parameterParts[0] + "=" + (parameterParts[1]?parameterParts[1]:'');
            }
        }
    }
    if (newQueryString == "")
        newQueryString = "?";

    if(atStart){
        newQueryString = '?'+ parameterName + "=" + parameterValue + (newQueryString.length>1?'&'+newQueryString.substring(1):'');
    } else {
        if (newQueryString !== "" && newQueryString != '?')
            newQueryString += "&";
        newQueryString += parameterName + "=" + (parameterValue?parameterValue:'');
    }
    return urlParts[0] + newQueryString + urlhash;
  },
  dataFilter:function(filter,x,page){
    var urlParams;
    (window.onpopstate = function () {
      var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);
    
      urlParams = {};
      while (match = search.exec(query))
         urlParams[decode(match[1])] = decode(match[2]);
    })();
    urlParams.collections = videlxu.captureCollection(window.location.href);
    if(videlxu.pathname.match('/search')) {
      urlParams.collections = 'all';
    }
    urlParams.shop = Shopify.shop;
    return urlParams;
  },
  getQueryParams:function(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
  },
  urlFilter:function(url, param, value){
    videlxu.url = '';
    url = videlxu.removeParam('page',url);
    videlxu.url = videlxu.addParameter(url, param, value,false);
    window.history.pushState({}, "keywords", videlxu.url);
  },
  urlFilterSingle:function(url, param, value){
    videlxu.url = '';
    url = videlxu.removeParam('page',url);
    videlxu.url = videlxu.URL_add_parameter(url, param, value);
    window.history.pushState({}, "keywords", videlxu.url);
  },
  urlFilterCollection:function(url, param, value){
    videlxu.url = videlxu.removeParam('page',url);
    window.history.pushState({}, "keywords", videlxu.url);
  },
  URL_add_parameter: function(url, param, value){
    var hash       = {};
    var parser     = document.createElement('a');

    parser.href    = url;

    var parameters = parser.search.split(/\?|&/);

    for(var i=0; i < parameters.length; i++) {
        if(!parameters[i])
            continue;

        var ary      = parameters[i].split('=');
        hash[ary[0]] = ary[1];
    }

    hash[param] = value;

    var list = [];  


    Object.keys(hash).forEach(function (key) {
        list.push(key + '=' + hash[key]);
    });

    parser.search = '?' + list.join('&');
    return parser.href;
  },
  scrollTop:function(data,$){
    $("html, body").animate({ scrollTop: "300px" });
  },
  jscrollpane:function(data,$){
    $('.tb-filter-collapse').jScrollPane();
  },
  getParameterByName:function (name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, "+"));
  },
  removeParam:function(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
  },
  removeParamValue:function(key,v, sourceURL) {
    var rtn = sourceURL.split("?")[0],r,
        param,
        params_arr = [],
    v = decodeURIComponent(key+'='+v);
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = decodeURIComponent(params_arr[i]);
      if(param === v)
      {
        params_arr.splice(i, 1);
      }
        }
    if(rtn !== '')
    {
      r = "?";
    }
        rtn = rtn + r + params_arr.join("&");
    }
    return rtn;
  },
  parse_query_string: function(url) {
  var params = {};
  var arr = [];
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');
  var divisionCodeGroups = {};
  if(vars.length > 0)
  {
    for (var i = 0; i < vars.length; i++) 
    {
      var pair = vars[i].split('=');
      var key = pair[0];
      if(key !== '')
      {
        if (!divisionCodeGroups.hasOwnProperty(key)) {
          divisionCodeGroups[key] = [];
        }
        divisionCodeGroups[key].push(encodeURIComponent(pair[1]));
      }
    }
  }
  return divisionCodeGroups;
  },
  parse_query_group: function(url) {
  var params = {};
  var arr = [];
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');
  var divisionCodeGroups = {};
  if(vars.length > 0)
  {
    for (var i = 0; i < vars.length; i++) 
    {
      var pair = vars[i].split('=');
      var key = pair[0];
      if (!divisionCodeGroups.hasOwnProperty(key)) {
        divisionCodeGroups[key] = [];
      }
      divisionCodeGroups[key].push(encodeURIComponent(pair[1]));
    }
  }
  return divisionCodeGroups;
  },
  getParam:function(a, b) {
    b || (b = window.location.href), a = a.replace(/[\[\]]/g, "\\$&");
    var c = new RegExp("[?&]" + a + "(=([^&#]*)|&|#|$)"),
        d = c.exec(b);
    return d ? d[2] ? decodeURIComponent(d[2].replace(/\+/g, " ")) : "" : null
  },
  toggle:function(data,$){
  $('.tb-filter-nav-toggle').unbind('click');
  $('.tb-filter-nav-toggle').click(function(e){
    e.preventDefault();
  });
  if(data.related != 1)
  {
    $('.tb-filter-nav-toggle').unbind('click');
    $('.tb-filter-nav-toggle').click(function(e){
          e.preventDefault();
          //get collapse content selector
          var collapse_content_selector = $(this).attr('href');
          //make the collapse content to be shown or hide
          var toggle_switch = $(this);
          $(collapse_content_selector).slideToggle(function(){
            if($(this).css('display')=='none'){
              //change the button label to be 'Show'
              toggle_switch.addClass('up');
            }else{
              //change the button label to be 'Hide'
              toggle_switch.removeClass('up');
            }
          });
    });
  }
  if($(window).width() < 750){
    $('.tb-filter-nav-toggle').unbind('click');
    $('.tb-filter-nav-toggle').click(function(e){
      e.preventDefault();
      //get collapse content selector
      var collapse_content_selector = $(this).attr('href');
      //make the collapse content to be shown or hide
      var toggle_switch = $(this);
      $(collapse_content_selector).slideToggle(function(){
      if($(this).css('display')=='none'){
        //change the button label to be 'Show'
        toggle_switch.addClass('up');
      }else{
        //change the button label to be 'Hide'
        toggle_switch.removeClass('up');
      }
    });
    });
  }
  },
  loadAjaxOpen:function(data,$){
    $('.tb-loding-filter-w').show();
  },
  loadAjaxClose:function(data,$){
      $('.tb-loding-filter-w').hide();
      /*if($(window).width() < 750){
        setTimeout(function(){ $('.tb-sidebar-close').trigger('click');}, 500);
      }*/
  },
  backLoad:function(data,$){
    if (window.history && window.history.pushState) {
    $(window).on('popstate', function() {
      var hashLocation = location.hash;
      var hashSplit = hashLocation.split("#!/");
      var hashName = hashSplit[1];
      if (hashName !== '') {
      var hash = window.location.hash;
      if (hash === '') {
        videlxu.ajaxfilter(data,$);
      }
      }
    });
    }
  },
  view_search:function(data,$){
    e.addstyle(data,$),e.searchengineinrealtime(data,$),e.removeDiv($),e.openMobileSearch(data,$),e.closeSearch(data,$);
  },
  sortBy__filter:function(data,$){
    $('.tb-sortby').unbind('change');
    $('.tb-sortby').change(function(e){
      e.preventDefault();
      if($('a.tb-n-tb-cl-collections.active').parent('li').find('input.tb-children-collection').val() == 1)
      {
        return false;
      }
      videlxu.url = window.location.href;
      videlxu.url = videlxu.removeParam('sort_by', videlxu.url);
      videlxu.urlFilter(videlxu.url,'sort_by',$(this).val());
      videlxu.ajaxfilter(data,$);
    });
  },
  resizeImage:function(t, r) {
    try {
        if ("original" == r) return t;
        var e = t.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);
        return e[1] + "_" + r + "." + e[2]
    } catch (r) {
        return t
    }
  },
  autoClick:function(json,data,$){
  var title;
  videlxu.url = window.location.href;
  videlxu.params = videlxu.parse_query_group(videlxu.url);
  //$('ul.tb-filter').find('li').find('a').removeClass('active');
  $('a.tb-clear-option-name').css('display','none');
    $.each(json.filter, function( index, value ) {
      if(value.handle == 'tb-cl')
      {
        if(value.values)
        {
          $.each(value.values, function( x, y ) {
            title = 'tb-tg-'+y.handle;
            if(typeof videlxu.params[title] !== "undefined")
            {
              $.each(videlxu.params[title], function( i, v ) {
                v = decodeURIComponent(v);
                v = decodeURIComponent(v);
                v = decodeURIComponent(v);
                $('.'+title+'-'+videlxu.replaceSymbol(v)).addClass('active');
              });
            }
          });
        }
      }
    });
  $.each(json.filter, function( index, value ) {
    title = videlxu.replaceSymbol(value.tb);
    if(typeof videlxu.params[title] !== "undefined")
    {
      $.each(videlxu.params[title], function( i, v ) {
        v = decodeURIComponent(v);
        v = decodeURIComponent(v);
        v = decodeURIComponent(v);
        $('.'+title+'-'+videlxu.replaceSymbol(v)).addClass('active');
                $('.'+title+'-'+videlxu.replaceSymbol(v)).parent('.tb-swatch-color').addClass('active');
      });
      $('.clear-name-'+title).css('display','block');
    }
  });
  },
  mobile:function(data,$){
  $containers = document.querySelectorAll('.tb-filter-collapse');
  $('#snappy_bc-sf-filter-tree-mobile-button').click(function(e){
    $parent_box = $(this).closest('#snappy_filter_wrapper');
    $parent_box.siblings().find('#snappy_filter__filters').slideUp();
    $parent_box.find('#snappy_filter__filters').slideToggle(500, 'swing');
  });
  $( window ).resize(function() {
    //$('#snappy_filter__filters').show();
    $('ul.paginate-snappy-filter li a.prev').text('« '+data.language[0].title_translator);
    $('ul.paginate-snappy-filter li a.next').text(data.language[1].title_translator+' »');
    
    if($('ul.paginate-snappy-filter li.disabled span').text() == '« '+data.language[0].title_translator+'« '+data.language[0].title_translator+'')
    {
      $('ul.paginate-snappy-filter li.disabled span').text('« '+data.language[0].title_translator+'');
    }else{
      $('ul.paginate-snappy-filter li.disabled span').text(data.language[1].title_translator+' »');
    }
    
    if($(window).width() < 750){
      //$('#snappy_filter__filters').hide();
      $('ul.paginate-snappy-filter li a.prev').text('<');
      $('ul.paginate-snappy-filter li a.next').text('>');
      if($('ul.paginate-snappy-filter li.disabled span').text() == '« '+data.language[0].title_translator+'« '+data.language[0].title_translator+'')
      {
        $('ul.paginate-snappy-filter li.disabled span').text('<');
      }else{
        $('ul.paginate-snappy-filter li.disabled span').text('>');
      }
    }
    videlxu.toggle(data,$);
  });
    // Sidebar Toggle on Mobile
    //------------------------------------------------------------------------------
    var sidebar = $('.tb-sidebar'),
        sidebarToggle = $('.tb-sidebar-toggle');
    sidebarToggle.unbind('click');
    sidebarToggle.click(function(e){
      $('.tb-content-filter-mobile').html($('#snappy_filter__filters'));
      $(this).addClass('tb-sidebar-open');
      sidebar.addClass('tb-open');
      $('body').addClass('tb-scroll-hidden');
      $('html').addClass('tb-scroll-hidden');
    });
    $('.tb-sidebar-close').unbind('click');
    $('.tb-sidebar-close').click(function(e){
      sidebarToggle.removeClass('tb-sidebar-open');
      sidebar.removeClass('tb-open');
      $('body').removeClass('tb-scroll-hidden');
      $('html').removeClass('tb-scroll-hidden');
      setTimeout(function(){ $('#snappy_filter_wrapper').prepend($('#snappy_filter__filters')); }, 500);
    });
  },
  closeMiniCart:function(data,$){
    // Close Mini Cart
    //------------------------------------------------------------------------------
    $('a.tb-cart-close').unbind('click');
    $('a.tb-cart-close').click(function(e){
      e.preventDefault();
      if($('.tb-quick-view-products-by-full-w').html() === '')
      {
        $('body').removeClass('tb-scroll-hidden');
        $('html').removeClass('tb-scroll-hidden');
      }
      $('.tb-content-cart').removeClass('active');
    });
    $('a.tb-continue-shopping').click(function(e){
      e.preventDefault();
      $('a.tb-cart-close').trigger('click');
    });
  },
  filterMode:function(data,$){
  if(data.related == 1)
  {
    $('#snappy_filter_wrapper').addClass('tb-design-horizontal');
  }else{
    $('#snappy_filter_wrapper').removeClass('tb-design-horizontal');
  }
  },
  notifySucess: function(msg,$){
    $.notify({
      message: msg
    },{
      // settings
      type: 'info'
    });
  },
  notifyError: function(msg,$){
    $.notify({
      message: msg
    },{
      // settings
      type: 'danger'
    });
  },
  notifications: function(data,$){
    $.notifyDefaults({
      element: 'body',
      position: null,
      allow_dismiss: true,
      newest_on_top: false,
      placement: {
        from: "bottom",
        align: "center"
      },
      offset: 20,
      spacing: 10,
      z_index: 2147483644,
      delay: 3000,
      timer: 2000,
      url_target: '_blank',
      mouse_over: null,
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
      },
      onShow: null,
      onShown: null,
      onClose: null,
      onClosed: null,
      icon_type: 'class',
      template: '<div data-notify="container" class="tb-notify-turbofilter alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    });
  },
  hash:function(data,$){
    videlxu.url = window.location.href;
    if(videlxu.url.indexOf("/collections") > -1 || videlxu.url.indexOf("/search") > -1)
    {
      if(videlxu.url.indexOf("#") > -1)
      {
        videlxu.url = videlxu.url.replace('#','');
        window.location.href = videlxu.url;
      }
    }
    return false;
  },
  init: function(data,$){
    this.hash(data,$);
    this.ajaxfilter(data,$);
    this.backLoad(data,$);
    this.sortBy__filter(data,$);

    this.notifications(data,$);
    this.contentMobileSearch(data,$);
    this.view_search(data,$);
    this.openCartDrawer(data,$);
    this.addToCartDrawer(data,$);
    this.ajaxSetup(data,$);
  }
}
var e = (function() {
            var t = 0
        }(), {
            removeDiv: function(t) {
                t(".tt-menu").appendTo(document.body)
            },
            closeSearch:function(o, e){
              e('.tb-close-content-search').unbind('click');
              e('.tb-close-content-search').click(function(event){
                event.preventDefault();
                e('.tb-search-content-mobile').hide();
                e('body').removeClass('tb-scroll-hidden');
                e('html').removeClass('tb-scroll-hidden');
              });
            },
            openMobileSearch:function(o, e){
              e('.tb-open-mobile-search').unbind('click');
              e('.tb-open-mobile-search').click(function(event){
                event.preventDefault();
                if(e( window ).width() <= 600)
                {
                  e('body').addClass('tb-scroll-hidden');
                  e('html').addClass('tb-scroll-hidden');
                }else{
                  e('body').removeClass('tb-scroll-hidden');
                  e('html').removeClass('tb-scroll-hidden');
                }
                e('.tb-search-content-mobile').show();
              });
            },
            searchcustomize: function(t, e, o) {
                zoom = 1;
                var a = parseInt(300),
                    n = e(document).width(),
                    r = e(o).offset(),
                    c = e(o).outerHeight(),
                    i = e(o).outerWidth(),
                  mobile = screen.height - c,
                    mobile = mobile - r.top,
                  mobile = mobile - parseInt(e('.tt-dataset.tt-dataset-tb-search-theme').height());
                i > a && (a = i);
                var d = r.top + c,
                    s = r.left + i,
                    l = r.left,
                    m = r.left + 400 - n;
                l -= m = m > 0 ? r.left + a - s : 0, l = zoom * l, d = zoom * d, n < (a = zoom * a) && (l = 10 * zoom, a = zoom * (n - 20)), e(".tt-menu").css({
                    top: d + "px",
                    width: a + "px",
                    left: l + "px",
                    marginTop: t.spacing_from_search_box + "px",
                    zIndex: "999999999 !important"
                }), e(".tt-menu").each(function() {
                    this.style.setProperty("width", a + "px")
                })
                if(n < 600)
                {
                  e(".tt-menu").css({
                      maxHeight: mobile + "px",
                      overflowY: "auto",
                  });
                }
            },
            searchengineinrealtime: function(t, o) {
              if(t.smart_search_status == 0)
              {
                return false;
              }
              var tbCollections = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                prefetch: "https://api.apolomultimedia-server3.info/api/search/index/search?q=load_all&status=collections&shop="+Shopify.shop,
                remote: {
                  url: "https://api.apolomultimedia-server3.info/api/search/index/search?q=%QUERY&status=collections&shop="+Shopify.shop,
                  replace: function(t, e) {
                    return t = t.replace("%QUERY", e), t = t.replace("%QUERY", e)
                  }
                }
              });
              var tbProductType = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('product_type'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                prefetch: "https://api.apolomultimedia-server3.info/api/search/index/search?q=load_all&status=product_type&shop="+Shopify.shop,
                remote: {
                  url: "https://api.apolomultimedia-server3.info/api/search/index/search?q=%QUERY&status=product_type&shop="+Shopify.shop,
                  replace: function(t, e) {
                    return t = t.replace("%QUERY", e), t = t.replace("%QUERY", e)
                  }
                }
              });
              var tbVendor = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('vendor'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                prefetch: "https://api.apolomultimedia-server3.info/api/search/index/search?q=load_all&status=vendor&shop="+Shopify.shop,
                remote: {
                  url: "https://api.apolomultimedia-server3.info/api/search/index/search?q=%QUERY&status=vendor&shop="+Shopify.shop,
                  replace: function(t, e) {
                    return t = t.replace("%QUERY", e), t = t.replace("%QUERY", e)
                  }
                }
              });
             var tbSku = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('sku'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                prefetch: "https://api.apolomultimedia-server3.info/api/search/index/search?q=load_all&status=sku&shop="+Shopify.shop,
                remote: {
                  url: "https://api.apolomultimedia-server3.info/api/search/index/search?q=%QUERY&status=sku&shop="+Shopify.shop,
                  replace: function(t, e) {
                    return t = t.replace("%QUERY", e), t = t.replace("%QUERY", e)
                  }
                }
              });
              var tbBarcode = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('sku'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                prefetch: "https://api.apolomultimedia-server3.info/api/search/index/search?q=load_all&status=barcode&shop="+Shopify.shop,
                remote: {
                  url: "https://api.apolomultimedia-server3.info/api/search/index/search?q=%QUERY&status=barcode&shop="+Shopify.shop,
                  replace: function(t, e) {
                    return t = t.replace("%QUERY", e), t = t.replace("%QUERY", e)
                  }
                }
              });
              var tbProducts = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                prefetch: "https://api.apolomultimedia-server3.info/api/search/index/search?q=load_all&status=products&shop="+Shopify.shop,
                remote: {
                  url: "https://api.apolomultimedia-server3.info/api/search/index/search?q=%QUERY&status=products&shop="+Shopify.shop,
                  replace: function(t, e) {
                    return t = t.replace("%QUERY", e), t = t.replace("%QUERY", e)
                  }
                }
              });
              
        o('input[name=q],.tb-search-box-mobile').attr('autocomplete', 'off');
              o('input[name=q],.tb-search-box-mobile').typeahead({
                hint: !1,
                highlight: true
              },
              {
                name: 'tb-collections',
                display: 'title',
                source: tbCollections,
                templates: {
                  header: '<h3 class="league-name">'+t.language[18].title_translator+'</h3>',
                  suggestion: function(e) {
                    return "<a class='tb-search-title'>"+e.title+"</a>"
                  }
                }
              },
              {
                name: 'tb-vendor',
                display: 'vendor',
                source: tbVendor,
                templates: {
                  header: '<h3 class="league-name">'+t.language[19].title_translator+'</h3>',
                  suggestion: function(e) {
                    return "<a class='tb-search-title'>"+e.vendor+"</a>"
                  }
                }
              },
              {
                name: 'tb-producttype',
                display: 'product_type',
                source: tbProductType,
                templates: {
                  header: '<h3 class="league-name">'+t.language[20].title_translator+'</h3>',
                  suggestion: function(e) {
                    return "<a class='tb-search-title'>"+e.product_type+"</a>"
                  }
                }
              },
              {
                name: 'tb-sku',
                display: 'sku',
                source: tbSku,
                templates: {
                  header: '<h3 class="league-name">'+t.language[22].title_translator+'</h3>',
                    suggestion: function(e) {
                    if(e.compare_at_price !== '')
                    {
                      e.compare_at_price = '<s class="tb-compare-price">'+snappy.Currency.formatMoney(e.compare_at_price, t['money_format'])+'</s>';
                    }
                    return "" !== e.id ? (0 != t.show_price && (n = e.compare_at_price, a = "<span class='product-price__sale'>" + snappy.Currency.formatMoney(e.price, t['money_format']) + "</span>"), "<a><div class='content-filter_app'><div class='content-lineal-filter_app'><div class='image-thumb-filter_app'><img src='" + videlxu.resizeImage(e.src,'small') + "' /></div><div class='text-search-filter_app'><span class='title-dog-apps'>" + e.title + "</span>" + n + a + '<div class="tb-bc-sku">'+e.sku + "</div></div></div></div></a>") : "<a style='display:none;'><div class='content-filter_app'><div class='content-lineal-filter_app'><span class='image-thumb-filter_app'><img src='' /></span><div class='text-search-filter_app'><span><b></b></span></div></div></div></a>"
                  }
                },
              },
              {
                name: 'tb-barcode',
                display: 'Barcode',
                source: tbBarcode,
                templates: {
                  header: '<h3 class="league-name">'+t.language[23].title_translator+'</h3>',
                    suggestion: function(e) {
                    if(e.compare_at_price !== '')
                    {
                      e.compare_at_price = '<s class="tb-compare-price">'+snappy.Currency.formatMoney(e.compare_at_price, t['money_format'])+'</s>';
                    }
                    return "" !== e.id ? (0 != t.show_price && (n = e.compare_at_price, a = "<span class='product-price__sale'>" + snappy.Currency.formatMoney(e.price, t['money_format']) + "</span>"), "<a><div class='content-filter_app'><div class='content-lineal-filter_app'><div class='image-thumb-filter_app'><img src='" + videlxu.resizeImage(e.src,'small') + "' /></div><div class='text-search-filter_app'><span class='title-dog-apps'>" + e.title + "</span>" + n + a + '<div class="tb-bc-sku">'+ e.barcode+ "</div></div></div></div></a>") : "<a style='display:none;'><div class='content-filter_app'><div class='content-lineal-filter_app'><span class='image-thumb-filter_app'><img src='' /></span><div class='text-search-filter_app'><span><b></b></span></div></div></div></a>"
                  }
                },
              },
              {
                name: 'tb-products',
                display: 'title',
                source: tbProducts,
                templates: {
                  header: '<h3 class="league-name">'+t.language[17].title_translator+'</h3>',
                  suggestion: function(e) {
                    if(e.compare_at_price !== '')
                    {
                      e.compare_at_price = '<s class="tb-compare-price">'+snappy.Currency.formatMoney(e.compare_at_price, t['money_format'])+'</s>';
                    }
                    return "" !== e.id ? (0 != t.show_price && (n = e.compare_at_price, a = "<span class='product-price__sale'>" + snappy.Currency.formatMoney(e.price, t['money_format']) + "</span>"), "<a><div class='content-filter_app'><div class='content-lineal-filter_app'><div class='image-thumb-filter_app'><img src='" + videlxu.resizeImage(e.src,'small') + "' /></div><div class='text-search-filter_app'><span class='title-dog-apps'>" + e.title + "</span>" + n + a + e.variants_count+ "</div></div></div></a>") : "<a style='display:none;'><div class='content-filter_app'><div class='content-lineal-filter_app'><span class='image-thumb-filter_app'><img src='' /></span><div class='text-search-filter_app'><span><b></b></span></div></div></div></a>"
                  },
                  footer: function(e){
                    return '<div class="tt-dataset tt-dataset-tb-search-theme"><a class="filter_app-footer" href="/search?q=' + e.query + '"><div class="search-all-result">'+t.language[16].title_translator+'</div></a></div>';
                  },
                  notFound: '<div class="tt-suggestion tt-none" style="display:none;"><div class="tb-search-theme">'+t.language[24].title_translator+'</div></div>'
                }                                            
              }).on("typeahead:open", function(a) {
                    e.searchcustomize(t, o, this);
                }).on("typeahead:selected", function(a, n) {
                  if(n.status === 'products')
                  {
                    window.location = 'https://'+Shopify.shop+'/products/'+n.handle;
                  }
                  if(n.status === 'sku')
                  {
                    window.location = 'https://'+Shopify.shop+'/products/'+n.handle;
                  }
                  if(n.status === 'barcode')
                  {
                    window.location = 'https://'+Shopify.shop+'/products/'+n.handle;
                  }
                  if(n.status === 'vendor')
                  {
                    window.location = 'https://'+Shopify.shop+'/collections/all?tb-vd-vendors='+videlxu.redir(n.vendor);
                  }
                  if(n.status === 'product_type')
                  {
                    window.location = 'https://'+Shopify.shop+'/collections/all?tb-pt-product-type='+videlxu.redir(n.product_type);
                  }
                  if(n.status === 'collections')
                  {
                    window.location = 'https://'+Shopify.shop+'/collections/'+n.handle;
                  }
              }).on('typeahead:render', function(a, objs, async, name) {
                var nones = $('.tt-menu').find('.tt-none');
                var suggestions = $('.tt-menu').find('.tt-suggestion.tt-selectable').length;
        nones.hide();
                if(suggestions == 0) {
                  nones.first().show();
                }
                e.searchcustomize(t, o, this);
              });
            },
            addstyle: function(t, e) {
                var o = "a.tt-suggestion .content-filter_app {border-bottom: 1px solid #e8e9eb;}.tt-dataset {background: #fff;box-shadow: 0 0 0 1px rgba(39, 44, 48, .05), 0 1px 5px 1px rgba(39, 44, 48, .16);width: 100%;}em.compare-at-price-dog-apps span.money {text-decoration: line-through;}.tt-dataset a {background-color: " + t.background_color + ";color: " + t.text_color + ";cursor: pointer;display: block;width: 100%;text-align: left;}.tt-dataset a:hover {background-color: " + t.hover_background_color + ";color: " + t.hover_text_color + ";}.tt-dataset a img,.search-real-time-filter_app a {vertical-align: middle;font-size: 12px; }.tt-dataset .empty-message {text-align: center;color: #000;padding: 10px 0px;  }.search-all-result {text-align: center;padding: 10px 0px; }.tt-dataset a .content-filter_app .text-search-filter_app {display: inline-block;width: 79%;vertical-align: top;font-size: 14px;line-height: 18px; }.tt-dataset a .content-filter_app div.image-thumb-filter_app {text-align:left;display: inline-block;vertical-align: middle;line-height: 50px;position: relative; }.tt-dataset a .content-filter_app .text-search-filter_app span {display: inline-block;font-size: 14px;line-height: 18px;margin-left: 10px;}.tt-dataset a:hover .content-filter_app .text-search-filter_app .compare-at-price-dog-apps {color: " + t.hover_text_color + ";}.tt-dataset a .content-filter_app .text-search-filter_app .compare-at-price-dog-apps {display: inline-block;color: " + t.text_color + ";font-style: normal;margin-left: 10px;text-decoration: line-through;}.tt-dataset a .content-filter_app .text-search-filter_app span.title-dog-apps {display: block;width: 100%;}.tt-dataset a .content-filter_app .content-lineal-filter_app {padding: 10px 10px; }span.twitter-typeahead {width: 100%;display: initial !important;}span.twitter-typeahead .tt-menu {width: 100%;  }a.filter_app-footer {background-color: " + t.footer_background_color + " !important;color: " + t.footer_text_color + " !important;text-decoration: none; }a.filter_app-footer:hover {background-color: " + t.footer_background_color + " !important;color: " + t.footer_text_color + " !important;}.tt-menu {z-index: 2147483646 !important;}@media(max-width:480px) {.tt-dataset a .content-filter_app .text-search-filter_app {width: 60%; }}",
          a = document.head || document.getElementsByTagName("head")[0],
                    n = document.createElement("style");
                n.type = "text/css", n.styleSheet ? n.styleSheet.cssText = o : n.appendChild(document.createTextNode(o)), a.appendChild(n)
            }
});

(function($){

  var loadScript = function(url, callback){
    var script = document.createElement("script");
    script.type = "text/javascript";
    // If the browser is Internet Explorer.
    if (script.readyState){ 
      script.onreadystatechange = function(){
        if (script.readyState == "loaded" || script.readyState == "complete"){
          script.onreadystatechange = null;
          callback();
        }
      };
      // For any other browser.
    } else {
      script.onload = function(){
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);

  };
  var loadScripts = function($,scripts, callback) {
    var deferred = $.Deferred();
    function loadScript(scripts, callback, i) {
      $.ajax({
        url: scripts[i],
        dataType: "script",
        cache: true,
        success: function() {
          if (i + 1 < scripts.length) {
            loadScript(scripts, callback, i + 1);
          } else {
            if (callback) {
              callback();
            }
            deferred.resolve();
          }
        }
      });
    }
    loadScript(scripts, callback, 0);
    return deferred;
  }
  var jsonp = function(url, callback){
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };
    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }

  var myAppJavaScript = function($){
    var d = new Date();
    var n = d.getTime();
    videlxu.query = $;
    $('head').append('<link rel="stylesheet" href="//api.apolomultimedia-server3.info/assets/css/tb-filter-responsive.css?'+n+'" type="text/css" />');
    jsonp('https://api.apolomultimedia-server3.info/api/preferences/index/call?shop='+Shopify.shop, function(data) {
      videlxu.json = data;
      videlxu.init(data,$);
    });
  };

  if((typeof jQuery === 'undefined') || (parseInt(jQuery.fn.jquery) === 1 && parseFloat(jQuery.fn.jquery.replace(/^1\./,"")) < 9.1)) {
    loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function(){
      jQuery191 = jQuery.noConflict(false);
      myAppJavaScript(jQuery191); 
    });
  }else{
    myAppJavaScript(jQuery);
  }

})(jQuery);

document.addEventListener("DOMContentLoaded", function(event) { 
  $(document).ajaxSuccess(function (a,b,c) {
    if(c.url !== '/cart.js?_=999666333')
    {
      if(c.url.indexOf('/cart.js') > -1)
      {
        videlxu.showCartStick(videlxu.json,videlxu.query);
        videlxu.ajaxcart(videlxu.json,videlxu.query);
        return false;
      }
    }
  });
});