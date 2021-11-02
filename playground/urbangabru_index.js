/* onload body display discount code ajax, product suggestion ajax*/
function getShopifyCartData() {
    return $.ajax({
        type: 'GET',
        url: '/cart.js',
        cache: false,
        dataType: 'json',

    });

}

function getShopifyDiscountData() {
    return $.ajax({
        url: "http://custoengage.uglifestyle.in/getDiscountDetails",
        type: "POST",
        dataType: "JSON",

    });

}

//   $(document).ready(function() {



/*below code is for home page drawer*/
$('.gf_add-to-cart').click(function() {

    setTimeout(function() {
        $('.site-header__cart ').click()
      

    }, 1500);



    $.ajax({
        type: 'GET',
        url: '/cart.js',
        cache: false,
        dataType: 'json',
        success: function(cart) {


            var item_count = cart['item_count'];

            $('.cart_count_info').html(item_count);

            $(".cart_count_info").load(window.location.href + " .cart_count_info");


            getCartDetails();
            //            getDiscountDetails();
            //             test();

        }

    });


});




$(document).ready(function() {

    getCartDetails();
    //   test();
    //     getDiscountDetails();


});

function getCartDetails() {
    $.ajax({
        type: 'GET',
        url: '/cart.js',
        cache: false,
        dataType: 'json',
        success: function(cart) {
         console.log(cart);
            var total_price = cart['total_price'] / 100;
            var item_count = cart['item_count'];
            if (item_count > 0) {
                $('.cart-item-count span').text(item_count);
                // mini cart data
                $('.cart-popup').attr('id', 'cartPopup');
                $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));

                $(".subtotal").load(window.location.href + " .subtotal");
            }
            var totalsave = 0;
            cart = addCompareAtPrice(cart);

            //           var price_list = [];
            //             for (var i = 0; i < cart.items.length; i++) {
            //                             if (cart['items'][i]['id'] != null) {
            //                                 var item_id = cart['items'][i]['id'];
            //                                  var quantity = cart['items'][i]['quantity'];
            //                                 var compare_price = cart['items'][i]['compare_at_price'] / 100;
            //                                 var compare_line_price = (compare_price) * (quantity);
            //                                 var product_id = cart['items'][i]['product_id'];
            //                                console.log(compare_line_price);

            //                               var selected_options = options.join('');
            //                                 price_list.push('<div id="loadingDiv" style="display:none;">' + '<div class="loader">' + '<center> <img src="https://custoengage.uglifestyle.in/public/loader-transperent.gif">' + '</center></div></div>' + '<div class="cartpopup-item product-item">' +
            //                                     '<span class="remove-item"> <a class="remove1" onclick="removeItem(' + item_id + ')" data-variant="' + item_id + '"> ' +
            //                                     ' <span>✕</span></a> </span>' + '<div class="product-image">' + '<input type="hidden" id="product_id" value="' + product_id + '">' + '<img class="img-fluid d-block" src="' + image_url + '"  alt="' + product_title + '" align="left"/>' + '</div>' + '<div class="product-detail">' + '<h4 class="expand">' + product_url + '</h4>' + '<p class="txt--minor">' + selected_options + '</p>' + '<div class="quantity buttons_added quantity-box">' + '<button class="minus quantity-button qminus" role="button" type="button" onclick="minusQuantity(' + item_id + ' , ' + quantity +')" data-variant="' + item_id + '" style="margin-right: -10px;">-</button>' + '<input class="quantity-input input-text qty text" type="number" disabled name="updates[]" id="updates_' + item_id + '" value="' + quantity + '" min="1" />' + '<button class="plus quantity-button qplus" role="button" onclick="addQuantity(' + item_id + ')" type="button" data-variant="' + item_id + '">+</button>' +
            //                                     '<div class="detail-price"><span class="price">Rs' + ' ' + line_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') +
            //                                     '&nbsp;&nbsp;<del style="font-size: 11px;font-weight: normal;">Rs' + ' ' + compare_line_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</del>' +
            //                                     '</span>' + '</div>'

            //                                     +
            //                                     '</div>' + '</div>' + '</div>');

            //                             } //endif
            //                         }; 
            //            $('.cartpopup-body').html(price_list.join(''));

            for (var itm in cart.items) {
                if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                    var kwe = "#psub_" + cart.items[itm].variant_id;
                    var calqty = cart.items[itm].price * cart.items[itm].quantity;
                    var line_compare_price = (cart.items[itm].compare_at_price) / 100 * cart.items[itm].quantity;
                    //                     console.log(line_compare_price);
                    $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                    totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                }
            }
            //          $(".compare-price").html("Rs" + ' ' + (line_compare_price));


            var totalPrice = (totalsave / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            //           console.log(totalPrice);
 $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2))).toFixed(2));

          
//             $("#totalsaving").append("Rs" + ' ' + totalPrice);
            //           console.log($("#totalsaving").val());

            /* get product suggestion when cart is not empty */

            var shopifyCartData = getShopifyCartData();
            shopifyCartData.success(function(shfyCartData) {
                if (shfyCartData.items.length > 0) {
                    let p_id = shfyCartData.items[0].product_id;

                    if (p_id) {

                        productSuggestion(p_id);
                        test();
                    }
                }

            });

        }
    });
}

function test() {
    var itemsList = getShopifyDiscountData();
    itemsList.success(function(shfyDiscountData) {
        var selctoption = "";

        $('#code').html('');
        shfyDiscountData.data.rows.forEach(myFunction);

        function myFunction(item, index) {
            selctoption += '<option value="' + item.discount_code + '" data-valuea="' + item.discount_type + '" data-valueb="' + item.discount_value + '" data-valuec="' + item.minimum_amount + '">' + '<span style="font-weight">' + item.discount_code + '</strong>' + '&nbsp;' + ':' + '&nbsp;' + item.discount_title + "</option>"

        }
        $('#code').html(selctoption);
        $("#code").prepend("<option value='Please select offer' selected='selected' disabled='disabled'>Please Select Offer</option>");
        //                               var select = $('#code').val();
        //     console.log(select);
        //     var input1 = document.getElementById('code-value');
        //                                 input1.value = '';
        var input1 = document.getElementById('code-value');

        $('#code').on('change', function() {
            input1.value = code.value;
            var discount_type = jQuery(this).children(":selected").data('valuea');
            var discount_value = jQuery(this).children(":selected").data('valueb');
            var min_value = jQuery(this).children(":selected").data('valuec');
            var min_quantity = jQuery(this).children(":selected").data('valued');

            if (discount_type == 'percentage') {
                $.ajax({
                    type: 'GET',
                    url: '/cart.js',
                    cache: false,
                    dataType: 'json',
                    success: function(cart) {
                        var subtotal_price = cart['total_price'] / 100;
                        var item_count = cart['item_count'];
                        if (subtotal_price >= min_value) {
                            var dec = (discount_value / 100).toFixed(2);
                            var per_discount_new = subtotal_price * dec;
                            if (item_count > 0) {
                                $('#discount').text('(-)' + ' ' + 'Rs' + ' ' + per_discount_new.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                var total_price = cart['total_price'] / 100 - per_discount_new;
                                $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                var totalsave = 0;
                                cart = addCompareAtPrice(cart);
                                for (var itm in cart.items) {
                                    if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                        var kwe = "#psub_" + cart.items[itm].variant_id;
                                        var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                        $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                        totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                    }
                                }
                                $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((per_discount_new).toFixed(2))).toFixed(2));
                                //$(".success-msg").show();
                                $(".success-msg").html("Discount code applied successfully.").show();
                                $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").hide();
                            }
                        } else {

                            var per_discount_new = 0.00;
                            $('#discount').text('Rs' + ' ' + per_discount_new.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                            var total_price = cart['total_price'] / 100 - per_discount_new;
                            $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                            $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));

                            /* total save after discount apply*/
                            var totalsave = 0;
                            cart = addCompareAtPrice(cart);
                            for (var itm in cart.items) {
                                if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                    var kwe = "#psub_" + cart.items[itm].variant_id;
                                    var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                    $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                    totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                }
                            }
                            $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((per_discount_new).toFixed(2))).toFixed(2));
                            $(".success-msg").html("Discount code applied successfully.").hide();

                            $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").show();
                        }
                    }
                });
            } else {
                $.ajax({
                    type: 'GET',
                    url: '/cart.js',
                    cache: false,
                    dataType: 'json',
                    success: function(cart) {
                        var subtotal_price = cart['total_price'] / 100;
                        var item_count = cart['item_count'];
                        if (subtotal_price >= min_value) {
                            var subtotal_new_price = subtotal_price - discount_value;
                            var discount = subtotal_price - subtotal_new_price;
                            if (item_count > 0) {
                                $('#discount').text('(-)' + ' ' + 'Rs' + ' ' + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                var total_price = cart['total_price'] / 100 - discount;
                                $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                $(".success-msg").html("Discount code applied successfully.").show();

                                $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").hide();

                            }
                            var totalsave = 0;
                            cart = addCompareAtPrice(cart);
                            for (var itm in cart.items) {
                                if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                    var kwe = "#psub_" + cart.items[itm].variant_id;
                                    var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                    $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                    totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                }
                            }
                            $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((discount).toFixed(2))).toFixed(2));
                        } else {
                            var discount = 0.00;
                            $('#discount').text('Rs' + ' ' + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                            var total_price = cart['total_price'] / 100 - discount;
                            $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                            $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                            var totalsave = 0;
                            cart = addCompareAtPrice(cart);
                            for (var itm in cart.items) {
                                if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                    var kwe = "#psub_" + cart.items[itm].variant_id;
                                    var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                    $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                    totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                }
                            }
                            $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((discount).toFixed(2))).toFixed(2));
                            $(".success-msg").html("Discount code applied successfully.").hide();

                            $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").show();

                        }
                    }
                });
            }
        });
        //                                 select.onchange = function() {
        // //                                     input1.value = select.value;

        //                                 }


    })
    //   var itemsList = ['a', 'b', 'c'];
    // var options = "";
    // for (var i = 0; i < itemsList.length; i++) {

    //     options += '<option value= "' + itemsList[i] + '">' + itemsList[i] + '</option>';


    // }
    // $('#code').html(options);
}

function getDiscountDetails() {
    /* discount ajax*/
    $.ajax({
        url: "http://custoengage.uglifestyle.in/getDiscountDetails",
        type: "POST",
        dataType: "JSON",
        success: function(data) {

            var selctoption = "";

            //                                  $('#code').html('');
            data.data.rows.forEach(myFunction);

            function myFunction(item, index) {
                selctoption += '<option value="' + item.discount_code + '" data-valuea="' + item.discount_type + '" data-valueb="' + item.discount_value + '" data-valuec="' + item.minimum_amount + '">' + '<span style="font-weight">' + item.discount_code + '</strong>' + '&nbsp;' + ':' + '&nbsp;' + item.discount_title + "</option>"

            }
            $('#code').html(selctoption);
            $("#code").prepend("<option value='Please select offer' selected='selected' disabled='disabled'>Please Select Offer</option>");


           
            $('#code').on('change', function() {
                var discount_type = jQuery(this).children(":selected").data('valuea');
                var discount_value = jQuery(this).children(":selected").data('valueb');
                var min_value = jQuery(this).children(":selected").data('valuec');
                var min_quantity = jQuery(this).children(":selected").data('valued');
                if (discount_type == 'percentage') {
                    $.ajax({
                        type: 'GET',
                        url: '/cart.js',
                        cache: false,
                        dataType: 'json',
                        success: function(cart) {
                            var subtotal_price = cart['total_price'] / 100;
                            var item_count = cart['item_count'];
                            if (subtotal_price >= min_value) {
                                var dec = (discount_value / 100).toFixed(2);
                                var per_discount_new = subtotal_price * dec;
                                if (item_count > 0) {
                                    $('#discount').text('(-)' + ' ' + 'Rs' + ' ' + per_discount_new.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                    var total_price = cart['total_price'] / 100 - per_discount_new;
                                    $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                    $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                    var totalsave = 0;
                                    cart = addCompareAtPrice(cart);
                                    for (var itm in cart.items) {
                                        if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                            var kwe = "#psub_" + cart.items[itm].variant_id;
                                            var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                            $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                            totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                        }
                                    }
                                    $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((per_discount_new).toFixed(2))).toFixed(2));
                                    //$(".success-msg").show();
                                    $(".success-msg").html("Discount code applied successfully.").show();
                                    $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").hide();
                                }
                            } else {

                                var per_discount_new = 0.00;
                                $('#discount').text('Rs' + ' ' + per_discount_new.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                var total_price = cart['total_price'] / 100 - per_discount_new;
                                $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));

                                /* total save after discount apply*/
                                var totalsave = 0;
                                cart = addCompareAtPrice(cart);
                                for (var itm in cart.items) {
                                    if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                        var kwe = "#psub_" + cart.items[itm].variant_id;
                                        var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                        $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                        totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                    }
                                }
                                $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((per_discount_new).toFixed(2))).toFixed(2));
                                $(".success-msg").html("Discount code applied successfully.").hide();

                                $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").show();
                            }
                        }
                    });
                } else {
                    $.ajax({
                        type: 'GET',
                        url: '/cart.js',
                        cache: false,
                        dataType: 'json',
                        success: function(cart) {
                            var subtotal_price = cart['total_price'] / 100;
                            var item_count = cart['item_count'];
                            if (subtotal_price >= min_value) {
                                var subtotal_new_price = subtotal_price - discount_value;
                                var discount = subtotal_price - subtotal_new_price;
                                if (item_count > 0) {
                                    $('#discount').text('(-)' + ' ' + 'Rs' + ' ' + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                    var total_price = cart['total_price'] / 100 - discount;
                                    $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                    $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                    $(".success-msg").html("Discount code applied successfully.").show();

                                    $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").hide();

                                }
                                var totalsave = 0;
                                cart = addCompareAtPrice(cart);
                                for (var itm in cart.items) {
                                    if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                        var kwe = "#psub_" + cart.items[itm].variant_id;
                                        var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                        $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                        totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                    }
                                }
                                $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((discount).toFixed(2))).toFixed(2));
                            } else {
                                var discount = 0.00;
                                $('#discount').text('Rs' + ' ' + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                var total_price = cart['total_price'] / 100 - discount;
                                $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                var totalsave = 0;
                                cart = addCompareAtPrice(cart);
                                for (var itm in cart.items) {
                                    if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                        var kwe = "#psub_" + cart.items[itm].variant_id;
                                        var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                        $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                        totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                    }
                                }
                                $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((discount).toFixed(2))).toFixed(2));
                                $(".success-msg").html("Discount code applied successfully.").hide();

                                $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").show();

                            }
                        }
                    });
                }
            });
        }
    });
}

// function allAjax(){
//   console.log("here");




// //    $('.code-value').val();
// //     var input1 = document.getElementById('code-value');
// //     input1.value = 'Please Select Offer';
// }

/*Product suggestion*/

function productSuggestion(p_id) {
    /* product suggestion ajax*/

    $.ajax({
        url: "https://custoengage.uglifestyle.in/getProductDetails",
        type: "POST",
        data: {
            "productId": p_id,
        },
        success: function(data) {

            var prod_Id = data.data.rows[0].pid;

            $.ajax({
                url: "http://custoengage.uglifestyle.in/getProductSuggestionDetails",
                type: "POST",
                data: {
                    "pId": prod_Id,
                },
                success: function(data1) {

                    if (data1.statusCode == 100) {
                        $(".fav-div").show();
                        var productSuggestion = "";
                        $('#divProductSuggestion').html('');
                        data1.data.rows.forEach(myFunction);

                        function myFunction(item, index) {
                            if (item.pid == prod_Id) {
                                productSuggestion += "<div class='product-item' style='display:none;'></div>"
                            } else {
                                productSuggestion += "<div class='product-item'>" + "<div class='product-image'>" + '<img src="' + item.product_master.product_img_url + '" alt="' + item.product_master.product_name + '" align="left">' + "</div>" + "<div class='product-detail'>" + "<h4 class='expand'>" + item.product_master.product_name + "</h4>" + "<div class='detail'>" + "<a onclick='addSuggestion(" + item.shopify_variant_id + ")' data-variant='" + item.shopify_variant_id + "' class='float' style='float: right;'>" + "<i class='fa fa-plus my-float'></i>" + "</a>" + "<span>" + 'Rs' + ' ' + item.selling_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "</span>" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "<del>" + 'Rs' + ' ' + item.base_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "</del>" + "</div>" + "</div>" + "</div>" + "</div>";
                            }
                        }
                        $('#divProductSuggestion').html(productSuggestion);
                    } else {
                        $(".fav-div").hide();
                    }
                }
            });
        }
    });
}


/* compare price ajax*/
function addCompareAtPrice(cart) {
    cart.items.forEach(function(item) {
        $.ajax({
            url: '/products/' + item.handle + '.js',
            dataType: 'json',
            async: 0,
            success: function(product) {
                product.variants.forEach(function(variant) {
                    if (variant.compare_at_price != null && variant.id == item.variant_id) item["compare_at_price"] = variant.compare_at_price;
                    else item["compare_at_price"] = 0;
                });
            }
        });
    });
    return cart;
}
/* ajax call for minus quantity */
function minusQuantity(varient_id, qntty) {
    // $('.cart-popup .cartpopup-body').on('click', '.quantity-button.qminus', function() {

    //   if ($(this).next().val() > 0) {
    //         var quantityItem = $(this).next().val(+$(this).next().val() - 1);
    var quantityItem = qntty - 1;
  
    //     }
    //     var vId = $(this).attr("data-variant");
    var vId = varient_id;
    var quantityVal = $(this).next().val();

    $("#loadingDiv").show();
    $.ajax({
        type: 'POST',
        url: '/cart/change.js',
        dataType: 'json',
        data: {
            quantity: quantityItem,
            id: vId
        },
        success: function(data) {
            $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                url: '/cart.json',
                success: function(cart) {
                    var discount = 0.00;
                    var item_count = cart['item_count'];
                    var total_price = cart['total_price'] / 100 - discount;
                    if (item_count > 0) {
                        /* minus item */
                        $(".cart_title").load(window.location.href + " .cart_title");
                        $('.cart-popup').attr('id', 'cartPopup');
                        $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                        $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                        $(".subtotal").load(window.location.href + " .subtotal");
                        var cart_list = [];
                        cart = addCompareAtPrice(cart);
                        for (var i = 0; i < cart.items.length; i++) {
                            if (cart['items'][i]['id'] != null) {
                                var item_id = cart['items'][i]['id'];
                                var product_title = cart['items'][i]['product_title'];
                                var product_handle = cart['items'][i]['handle'];
                                var quantity = cart['items'][i]['quantity'];
                                var line_price = cart['items'][i]['line_price'] / 100;

                                var compare_price = cart['items'][i]['compare_at_price'] / 100;
                                var compare_line_price = (compare_price) * (quantity);

                                var product_id = cart['items'][i]['product_id'];
                                var url = cart['items'][i]['url'];
                                var image_url = cart['items'][i]['image'];
                                var variants = cart['items'][i]['variant_options'];
                                if (product_title == 'Gift Wrap') {
                                    var product_url = product_title;
                                } else {
                                    var product_url = '<a href="' + url + '">' + product_title + '</a>';
                                }
                                var options = [];
                                for (var o = 0; o < variants.length; o++) {
                                    var selected = cart['items'][i]['variant_options'][o];
                                    if (selected !== 'Default Title') {
                                        options.push(selected + '<br>');
                                    }
                                };

                                var selected_options = options.join('');
                                cart_list.push('<div id="loadingDiv" style="display:none;">' + '<div class="loader">' + '<center> <img src="https://custoengage.uglifestyle.in/public/loader-transperent.gif">' + '</center></div></div>' + '<div class="cartpopup-item product-item">' +
                                    '<span class="remove-item"> <a class="remove1" onclick="removeItem(' + item_id + ')" data-variant="' + item_id + '"> ' +
                                    ' <span>✕</span></a> </span>' + '<div class="product-image">' + '<input type="hidden" id="product_id" value="' + product_id + '">' + '<img class="img-fluid d-block" src="' + image_url + '"  alt="' + product_title + '" align="left"/>' + '</div>' + '<div class="product-detail">' + '<h4 class="expand">' + product_url + '</h4>' + '<p class="txt--minor">' + selected_options + '</p>' + '<div class="quantity buttons_added quantity-box">' + '<button class="minus quantity-button qminus" role="button" type="button" onclick="minusQuantity(' + item_id + ' , ' + quantity + ')" data-variant="' + item_id + '" style="margin-right: -10px;">-</button>' + '<input class="quantity-input input-text qty text" type="number" disabled name="updates[]" id="updates_' + item_id + '" value="' + quantity + '" min="1" />' + '<button class="plus quantity-button qplus" role="button" onclick="addQuantity(' + item_id + ', ' + line_price + ')" type="button" data-variant="' + item_id + '">+</button>' +
                                    '<div class="detail-price"><span class="price">Rs' + ' ' + line_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') +
                                    '&nbsp;&nbsp;<del style="font-size: 11px;font-weight: normal;">Rs' + ' ' + compare_line_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</del>' +
                                    '</span>' + '</div>'

                                    +
                                    '</div>' + '</div>' + '</div>');
                            } //endif
                        }; // endfor
                        $('.cartpopup-body').html(cart_list.join(''));
                        $('.cart-item-count span').text(item_count);
                        $('#discount').text('Rs' + ' ' + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                        /* discount ajax call after minus item */
                        $.ajax({
                            url: "http://custoengage.uglifestyle.in/getDiscountDetails",
                            type: "POST",
                            dataType: "JSON",
                            success: function(data) {
                                var selctoption = "";
                                $('#code').html('');
                                data.data.rows.forEach(myFunction);

                                function myFunction(item, index) {
                                    selctoption += '<option value="' + item.discount_code + '" data-valuea="' + item.discount_type + '" data-valueb="' + item.discount_value + '" data-valuec="' + item.minimum_amount + '">' + '<span style="font-weight">' + item.discount_code + '</strong>' + '&nbsp;' + ':' + '&nbsp;' + item.discount_title + "</option>"
                                }
                                $('#code').html(selctoption);
                                $("#code").prepend("<option value='Please select offer' selected='selected' disabled='disabled'>Please Select Offer</option>");
                                var select = document.getElementById('code');
                                var input1 = document.getElementById('code-value');
                                input1.value = '';
                                select.onchange = function() {
                                    input1.value = select.value;
                                    var discount_type = jQuery(this).children(":selected").data('valuea');
                                    var discount_value = jQuery(this).children(":selected").data('valueb');
                                    var min_value = jQuery(this).children(":selected").data('valuec');
                                    var min_quantity = jQuery(this).children(":selected").data('valued');
                                    if (discount_type == 'percentage') {
                                        $.ajax({
                                            type: 'GET',
                                            url: '/cart.js',
                                            cache: false,
                                            dataType: 'json',
                                            success: function(cart) {
                                                var subtotal_price = cart['total_price'] / 100;
                                                var item_count = cart['item_count'];
                                                if (subtotal_price >= min_value) {
                                                    var dec = (discount_value / 100).toFixed(2);
                                                    var per_discount_new = subtotal_price * dec;
                                                    if (item_count > 0) {
                                                        $('#discount').text('(-)' + ' ' + 'Rs' + ' ' + per_discount_new.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        var total_price = cart['total_price'] / 100 - per_discount_new;
                                                        $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        var totalsave = 0;
                                                        cart = addCompareAtPrice(cart);
                                                        for (var itm in cart.items) {
                                                            if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                                                var kwe = "#psub_" + cart.items[itm].variant_id;
                                                                var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                                                $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                                                totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                                            }
                                                        }
                                                        $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((per_discount_new).toFixed(2))).toFixed(2));
                                                        //$(".success-msg").show();
                                                        $(".success-msg").html("Discount code applied successfully.").show();
                                                        $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").hide();
                                                    }
                                                } else {

                                                    var per_discount_new = 0.00;
                                                    $('#discount').text('Rs' + ' ' + per_discount_new.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                    var total_price = cart['total_price'] / 100 - per_discount_new;
                                                    $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                    $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));

                                                    /* total save after discount apply*/
                                                    var totalsave = 0;
                                                    cart = addCompareAtPrice(cart);
                                                    for (var itm in cart.items) {
                                                        if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                                            var kwe = "#psub_" + cart.items[itm].variant_id;
                                                            var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                                            $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                                            totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                                        }
                                                    }
                                                    $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((per_discount_new).toFixed(2))).toFixed(2));
                                                    $(".success-msg").html("Discount code applied successfully.").hide();

                                                    $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").show();
                                                }
                                            }
                                        });
                                    } else {
                                        $.ajax({
                                            type: 'GET',
                                            url: '/cart.js',
                                            cache: false,
                                            dataType: 'json',
                                            success: function(cart) {
                                                var subtotal_price = cart['total_price'] / 100;
                                                var item_count = cart['item_count'];
                                                if (subtotal_price >= min_value) {
                                                    var subtotal_new_price = subtotal_price - discount_value;
                                                    var discount = subtotal_price - subtotal_new_price;
                                                    if (item_count > 0) {
                                                        $('#discount').text('(-)' + ' ' + 'Rs' + ' ' + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        var total_price = cart['total_price'] / 100 - discount;
                                                        $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        $(".success-msg").html("Discount code applied successfully.").show();

                                                        $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").hide();

                                                    }
                                                    var totalsave = 0;
                                                    cart = addCompareAtPrice(cart);
                                                    for (var itm in cart.items) {
                                                        if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                                            var kwe = "#psub_" + cart.items[itm].variant_id;
                                                            var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                                            $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                                            totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                                        }
                                                    }
                                                    $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((discount).toFixed(2))).toFixed(2));
                                                } else {
                                                    var discount = 0.00;
                                                    $('#discount').text('Rs' + ' ' + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                    var total_price = cart['total_price'] / 100 - discount;
                                                    $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                    $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                    var totalsave = 0;
                                                    cart = addCompareAtPrice(cart);
                                                    for (var itm in cart.items) {
                                                        if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                                            var kwe = "#psub_" + cart.items[itm].variant_id;
                                                            var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                                            $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                                            totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                                        }
                                                    }
                                                    $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((discount).toFixed(2))).toFixed(2));
                                                    $(".success-msg").html("Discount code applied successfully.").hide();

                                                    $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").show();

                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        });
                        $(".success-msg").hide();
                        $(".empty-msg").hide();
                        $(".error-msg").hide();
                        /* product suggestion detail call ajax after minus item */
                        var p_id = document.getElementById("product_id").value;

                        productSuggestion(p_id);
                    } else {

                        $(".cart").load(window.location.href + " .cart");
                    }
                    $("#loadingDiv").fadeOut(550, function() {
                        // fadeOut complete. Remove the loading div
                        $("#loadingDiv").hide(); //makes page more lightweight 
                    });
                    /* total save script */
                    var totalsave = 0;
                    cart = addCompareAtPrice(cart);
                    for (var itm in cart.items) {
                        if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                            var kwe = "#psub_" + cart.items[itm].variant_id;
                            var calqty = cart.items[itm].price * cart.items[itm].quantity;
                            $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                            totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                        }
                    }
                    $(".saving-msg .money").html("Rs" + ' ' + (totalsave / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                }
            });
        }
    });
    // });
}
/* ajax call for plus quantity */
function addQuantity(varient_id, item_price) {
  
  var item_price = item_price;
 
   if (item_price <= 0){
   return false;
   }
    // $('.cart-popup .cartpopup-body').on('click', '.quantity-button.qplus', function() {
    $(this).prev().val(+$(this).prev().val() + 1);
    //     var vId = $(this).attr("data-variant");
    var vId = varient_id;
    var quantityVal = $(this).prev().val();
    $("#loadingDiv").show();
    $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        dataType: 'json',
        data: {
            quantity: 1,
            id: vId
        },
        success: function(data) {
            $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                url: '/cart.json',
                success: function(cart) {
                    var item_count = cart['item_count'];
                    var discount = 0.00;
                    var total_price = cart['total_price'] / 100 - discount;
                    if (item_count > 0) {
                        /* plus item */
                        $('.cart-item-count span').text(item_count);
                        $(".cart_title").load(window.location.href + " .cart_title");
                        $('.cart-popup').attr('id', 'cartPopup');
                        $('.first .price').html('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                        $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                        $(".subtotal").load(window.location.href + " .subtotal");
                        var cart_list = [];
                        cart = addCompareAtPrice(cart);
                        for (var i = 0; i < cart.items.length; i++) {
                            if (cart['items'][i]['id'] != null) {
                                var item_id = cart['items'][i]['id'];
                                var product_title = cart['items'][i]['product_title'];
                                // var product_title = data['items'][i]['title'];
                                var product_handle = cart['items'][i]['handle'];
                                var quantity = cart['items'][i]['quantity'];
                                var line_price = cart['items'][i]['line_price'] / 100;
                                var compare_price = cart['items'][i]['compare_at_price'] / 100;
                                var compare_line_price = (compare_price) * (quantity);
                                var url = cart['items'][i]['url'];
                                var image_url = cart['items'][i]['image'];
                                var variants = cart['items'][i]['variant_options'];
                                if (product_title == 'Gift Wrap') {
                                    var product_url = product_title;
                                } else {
                                    var product_url = '<a href="' + url + '">' + product_title + '</a>';
                                }
                                var options = [];
                                for (var o = 0; o < variants.length; o++) {
                                    var selected = cart['items'][i]['variant_options'][o];
                                    if (selected !== 'Default Title') {
                                        options.push(selected + '<br>');
                                    }
                                };
                                var selected_options = options.join('');
                                cart_list.push('<div id="loadingDiv" style="display:none;">' + '<div class="loader">' +
                                    '<center> <img src="https://custoengage.uglifestyle.in/public/loader-transperent.gif">' +
                                    '</center></div></div>' + '<div class="cartpopup-item product-item">' +
                                    '<span class="remove-item"> <a class="remove1" onclick="removeItem(' + item_id + ')" data-variant="' + item_id + '"> ' +
                                    ' <span>✕</span></a> </span>' + '<div class="product-image">' +
                                    '<img class="img-fluid d-block" src="' + image_url + '"  alt="' + product_title + '" align="left"/>' +
                                    '</div>' + '<div class="product-detail">' + '<h4 class="expand">' + product_url + '</h4>' +
                                    '<p class="txt--minor">' + selected_options + '</p>' +
                                    '<div class="quantity buttons_added quantity-box">' + '<button class="minus quantity-button qminus" role="button" type="button" onclick="minusQuantity(' + item_id + ', ' + quantity + ')" data-variant="' + item_id + '" style="margin-right: -10px;">-</button>' +
                                    '<input class="quantity-input input-text qty text" type="number" disabled name="updates[]" id="updates_' + item_id + '" value="' + quantity + '" min="1" />' +
                                    '<button class="plus quantity-button qplus" role="button" type="button" onclick="addQuantity(' + item_id + ', ' + line_price + ')" data-variant="' + item_id + '">+</button>' +
                                    '<div class="detail-price"><span class="price">Rs' + ' ' + line_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') +
                                    '&nbsp;&nbsp;<del style="font-size: 11px;font-weight: normal;">Rs' + ' ' + compare_line_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</del>' +

                                    '</span>' + '</div>' +

                                    '</div>' + '</div>' + '</div>');
                            } //endif
                        }; // endfor
                        $('.cartpopup-body').html(cart_list.join(''));
                        $('#discount').text('Rs' + ' ' + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                        /* discount code ajax call after plus item */
                        $.ajax({
                            url: "http://custoengage.uglifestyle.in/getDiscountDetails",
                            type: "POST",
                            dataType: "JSON",
                            success: function(data) {
                                var selctoption = "";
                                $('#code').html('');
                                data.data.rows.forEach(myFunction);

                                function myFunction(item, index) {
                                    selctoption += '<option value="' + item.discount_code + '" data-valuea="' + item.discount_type + '" data-valueb="' + item.discount_value + '" data-valuec="' + item.minimum_amount + '">' + '<span style="font-weight">' + item.discount_code + '</strong>' + '&nbsp;' + ':' + '&nbsp;' + item.discount_title + "</option>"
                                }
                                $('#code').html(selctoption);
                                $("#code").prepend("<option value='Please select offer' selected='selected' disabled='disabled'>Please Select Offer</option>");
                                var select = document.getElementById('code');
                                var input1 = document.getElementById('code-value');
                                input1.value = '';
                                select.onchange = function() {
                                    input1.value = select.value;
                                    var discount_type = jQuery(this).children(":selected").data('valuea');
                                    var discount_value = jQuery(this).children(":selected").data('valueb');
                                    var min_value = jQuery(this).children(":selected").data('valuec');
                                    var min_quantity = jQuery(this).children(":selected").data('valued');
                                    if (discount_type == 'percentage') {
                                        $.ajax({
                                            type: 'GET',
                                            url: '/cart.js',
                                            cache: false,
                                            dataType: 'json',
                                            success: function(cart) {
                                                var subtotal_price = cart['total_price'] / 100;
                                                var item_count = cart['item_count'];
                                                if (subtotal_price >= min_value) {
                                                    var dec = (discount_value / 100).toFixed(2);
                                                    var per_discount_new = subtotal_price * dec;
                                                    if (item_count > 0) {
                                                        $('#discount').text('(-)' + ' ' + 'Rs' + ' ' + per_discount_new.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        var total_price = cart['total_price'] / 100 - per_discount_new;
                                                        $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        var totalsave = 0;
                                                        cart = addCompareAtPrice(cart);
                                                        for (var itm in cart.items) {
                                                            if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                                                var kwe = "#psub_" + cart.items[itm].variant_id;
                                                                var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                                                $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                                                totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                                            }
                                                        }
                                                        $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((per_discount_new).toFixed(2))).toFixed(2));
                                                        //$(".success-msg").show();
                                                        $(".success-msg").html("Discount code applied successfully.").show();
                                                        $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").hide();
                                                    }
                                                } else {

                                                    var per_discount_new = 0.00;
                                                    $('#discount').text('Rs' + ' ' + per_discount_new.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                    var total_price = cart['total_price'] / 100 - per_discount_new;
                                                    $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                    $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));

                                                    /* total save after discount apply*/
                                                    var totalsave = 0;
                                                    cart = addCompareAtPrice(cart);
                                                    for (var itm in cart.items) {
                                                        if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                                            var kwe = "#psub_" + cart.items[itm].variant_id;
                                                            var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                                            $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                                            totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                                        }
                                                    }
                                                    $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((per_discount_new).toFixed(2))).toFixed(2));
                                                    $(".success-msg").html("Discount code applied successfully.").hide();

                                                    $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").show();
                                                }
                                            }
                                        });
                                    } else {
                                        $.ajax({
                                            type: 'GET',
                                            url: '/cart.js',
                                            cache: false,
                                            dataType: 'json',
                                            success: function(cart) {
                                                var subtotal_price = cart['total_price'] / 100;
                                                var item_count = cart['item_count'];
                                                if (subtotal_price >= min_value) {
                                                    var subtotal_new_price = subtotal_price - discount_value;
                                                    var discount = subtotal_price - subtotal_new_price;
                                                    if (item_count > 0) {
                                                        $('#discount').text('(-)' + ' ' + 'Rs' + ' ' + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        var total_price = cart['total_price'] / 100 - discount;
                                                        $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        $(".success-msg").html("Discount code applied successfully.").show();

                                                        $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").hide();

                                                    }
                                                    var totalsave = 0;
                                                    cart = addCompareAtPrice(cart);
                                                    for (var itm in cart.items) {
                                                        if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                                            var kwe = "#psub_" + cart.items[itm].variant_id;
                                                            var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                                            $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                                            totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                                        }
                                                    }
                                                    $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((discount).toFixed(2))).toFixed(2));
                                                } else {
                                                    var discount = 0.00;
                                                    $('#discount').text('Rs' + ' ' + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                    var total_price = cart['total_price'] / 100 - discount;
                                                    $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                    $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                    var totalsave = 0;
                                                    cart = addCompareAtPrice(cart);
                                                    for (var itm in cart.items) {
                                                        if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                                            var kwe = "#psub_" + cart.items[itm].variant_id;
                                                            var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                                            $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                                            totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                                        }
                                                    }
                                                    $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((discount).toFixed(2))).toFixed(2));
                                                    $(".success-msg").html("Discount code applied successfully.").hide();

                                                    $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").show();

                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        });
                        $(".success-msg").hide();
                        $(".empty-msg").hide();
                        $(".error-msg").hide();
                    }
                    $("#loadingDiv").fadeOut(550, function() {
                        // fadeOut complete. Remove the loading div
                        $("#loadingDiv").hide(); //makes page more lightweight 
                    });
                    /* total save after plus item */
                    var totalsave = 0;
                    cart = addCompareAtPrice(cart);
                    for (var itm in cart.items) {
                        if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                            var kwe = "#psub_" + cart.items[itm].variant_id;
                            var calqty = cart.items[itm].price * cart.items[itm].quantity;
                            $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                            totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                        }
                    }
                    $(".saving-msg .money").html("Rs" + ' ' + (totalsave / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                }
            });
        }
    });
    // });
}
/* ajax call for remove item */
function removeItem(varient_id) {

    // $('.cart-popup .cartpopup-body').on('click', '.cartpopup-item .remove1', function(e) {
    //     var obj = $(this);
    //     e.preventDefault();
    //     e.stopPropagation();
    //     var vId = $(this).attr("data-variant");
    var vId = varient_id;
   
    var quantityVal = 0;
    $("#loadingDiv").show();
    $.ajax({
        type: 'POST',
        url: '/cart/change.js',
        dataType: 'json',
        data: {
            quantity: 0,
            id: vId
        },
        success: function(data) {

            getUpdatedCart();
        }
    });
}
// });

/* ajax call for remove cart item*/

function getUpdatedCart() {
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: '/cart.json',
        success: function(cart) {
            var discount = 0.00;
            var item_count = cart['item_count'];
            var total_price = cart['total_price'] / 100 - discount;
            if (item_count > 0) {
                /* remove item */
                $(this).parents('.cartpopup-item').remove();
                $("#loadingDiv").fadeOut(550, function() {
                    // fadeOut complete. Remove the loading div
                    $("#loadingDiv").hide(); //makes page more lightweight 
                });
                $(".cartpopup-body").load(window.location.href + " .cartpopup-body");
                $(".cart_title").load(window.location.href + " .cart_title");
                $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                $(".subtotal").load(window.location.href + " .subtotal");
                var cart_list = [];
                for (var i = 0; i < cart.items.length; i++) {
                    if (cart['items'][i]['id'] != null) {
                        var item_id = cart['items'][i]['id'];
                        var product_title = cart['items'][i]['product_title'];

                        var product_handle = cart['items'][i]['handle'];
                        var quantity = cart['items'][i]['quantity'];
                        var line_price = cart['items'][i]['line_price'] / 100;
                        var product_id = cart['items'][i]['product_id'];
                        var url = cart['items'][i]['url'];
                        var image_url = cart['items'][i]['image'];
                        var variants = cart['items'][i]['variant_options'];
                        if (product_title == 'Gift Wrap') {
                            var product_url = product_title;
                        } else {
                            var product_url = '<a href="' + url + '">' + product_title + '</a>';
                        }
                        var options = [];
                        for (var o = 0; o < variants.length; o++) {
                            var selected = cart['items'][i]['variant_options'][o];
                            if (selected !== 'Default Title') {
                                options.push(selected + '<br>');
                            }
                        };
                        var selected_options = options.join('');
                        cart_list.push('<div class="cartpopup-item product-item">' + '<span class="remove-item"> <a onclick="removeItem(' + item_id + ')" class="remove1" data-variant="' + item_id + '"> ' +
                            ' <span>✕</span> </a></span>' + '<div class="product-image">' + '<input type="hidden" id="product_id" value="' + product_id + '">' + '<img class="img-fluid d-block" src="' + image_url + '"  alt="' + product_title + '" align="left"/>' + '</div>' + '<div class="product-detail">' + '<h4 class="expand">' + product_url + '</h4>' + '<p class="txt--minor">' + selected_options + '</p>' + '<div class="quantity buttons_added quantity-box">' + '<button class="minus quantity-button qminus" role="button" type="button" onclick="minusQuantity(' + item_id + ', ' + quantity + ')" data-variant="' + item_id + '" style="margin-right: -10px;">-</button>' + '<input class="quantity-input input-text qty text" type="number" disabled name="updates[]" id="updates_' + item_id + '" value="' + quantity + '" min="1" />' + '<button class="plus quantity-button qplus" role="button" type="button" onclick="addQuantity(' + item_id + ', ' + line_price + ')" data-variant="' + item_id + '">+</button>' +
                            '<div class="detail-price"><span class="price">Rs' + ' ' + line_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</span>' + '</div>'

                            +
                            '</div>' + '</div>' + '</div>');
                    } //endif
                }; // endfor
                $('.cartpopup-body').html(cart_list.join(''));
                $('#discount').text('Rs' + ' ' + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                /* discount ajax call after remove item */
                $.ajax({
                    url: "http://custoengage.uglifestyle.in/getDiscountDetails",
                    type: "POST",
                    dataType: "JSON",
                    success: function(data) {
                        var selctoption = "";
                        $('#code').html('');
                        data.data.rows.forEach(myFunction);

                        function myFunction(item, index) {
                            selctoption += '<option value="' + item.discount_code + '" data-valuea="' + item.discount_type + '" data-valueb="' + item.discount_value + '" data-valuec="' + item.minimum_amount + '">' + '<span style="font-weight">' + item.discount_code + '</strong>' + '&nbsp;' + ':' + '&nbsp;' + item.discount_title + "</option>"
                        }
                        $('#code').html(selctoption);
                        $("#code").prepend("<option value='' selected='selected' disabled='disabled'>Please Select Offer</option>");
                        var select = document.getElementById('code');
                        var input1 = document.getElementById('code-value');
                        input1.value = '';
                        select.onchange = function() {
                            input1.value = select.value;
                            var discount_type = jQuery(this).children(":selected").data('valuea');
                            var discount_value = jQuery(this).children(":selected").data('valueb');
                            var min_value = jQuery(this).children(":selected").data('valuec');
                            var min_quantity = jQuery(this).children(":selected").data('valued');
                            if (discount_type == 'percentage') {
                                $.ajax({
                                    type: 'GET',
                                    url: '/cart.js',
                                    cache: false,
                                    dataType: 'json',
                                    success: function(cart) {
                                        var subtotal_price = cart['total_price'] / 100;
                                        var item_count = cart['item_count'];
                                        if (subtotal_price >= min_value) {
                                            var dec = (discount_value / 100).toFixed(2);
                                            var per_discount_new = subtotal_price * dec;
                                            if (item_count > 0) {
                                                $('#discount').text('(-)' + ' ' + 'Rs' + ' ' + per_discount_new.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                var total_price = cart['total_price'] / 100 - per_discount_new;
                                                $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                var totalsave = 0;
                                                cart = addCompareAtPrice(cart);
                                                for (var itm in cart.items) {
                                                    if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                                        var kwe = "#psub_" + cart.items[itm].variant_id;
                                                        var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                                        $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                                        totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                                    }
                                                }
                                                $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((per_discount_new).toFixed(2))).toFixed(2));
                                                //$(".success-msg").show();
                                                $(".success-msg").html("Discount code applied successfully.").show();
                                                $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").hide();
                                            }
                                        } else {

                                            var per_discount_new = 0.00;
                                            $('#discount').text('Rs' + ' ' + per_discount_new.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                            var total_price = cart['total_price'] / 100 - per_discount_new;
                                            $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                            $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));

                                            /* total save after discount apply*/
                                            var totalsave = 0;
                                            cart = addCompareAtPrice(cart);
                                            for (var itm in cart.items) {
                                                if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                                    var kwe = "#psub_" + cart.items[itm].variant_id;
                                                    var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                                    $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                                    totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                                }
                                            }
                                            $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((per_discount_new).toFixed(2))).toFixed(2));
                                            $(".success-msg").html("Discount code applied successfully.").hide();

                                            $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").show();
                                        }
                                    }
                                });
                            } else {
                                $.ajax({
                                    type: 'GET',
                                    url: '/cart.js',
                                    cache: false,
                                    dataType: 'json',
                                    success: function(cart) {
                                        var subtotal_price = cart['total_price'] / 100;
                                        var item_count = cart['item_count'];
                                        if (subtotal_price >= min_value) {
                                            var subtotal_new_price = subtotal_price - discount_value;
                                            var discount = subtotal_price - subtotal_new_price;
                                            if (item_count > 0) {
                                                $('#discount').text('(-)' + ' ' + 'Rs' + ' ' + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                var total_price = cart['total_price'] / 100 - discount;
                                                $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                $(".success-msg").html("Discount code applied successfully.").show();

                                                $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").hide();

                                            }
                                            var totalsave = 0;
                                            cart = addCompareAtPrice(cart);
                                            for (var itm in cart.items) {
                                                if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                                    var kwe = "#psub_" + cart.items[itm].variant_id;
                                                    var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                                    $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                                    totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                                }
                                            }
                                            $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((discount).toFixed(2))).toFixed(2));
                                        } else {
                                            var discount = 0.00;
                                            $('#discount').text('Rs' + ' ' + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                            var total_price = cart['total_price'] / 100 - discount;
                                            $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                            $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                            var totalsave = 0;
                                            cart = addCompareAtPrice(cart);
                                            for (var itm in cart.items) {
                                                if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                                    var kwe = "#psub_" + cart.items[itm].variant_id;
                                                    var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                                    $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                                    totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                                }
                                            }
                                            $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((discount).toFixed(2))).toFixed(2));
                                            $(".success-msg").html("Discount code applied successfully.").hide();

                                            $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").show();

                                        }
                                    }
                                });
                            }
                        }
                    }
                });
                $(".success-msg").hide();
                $(".empty-msg").hide();
                $(".error-msg").hide();
                /* product suggestion ajax call after remove item */
                var p_id = document.getElementById("product_id").value;
                productSuggestion(p_id);

            } else {
                $(".cart").load(window.location.href + " .cart");
            }
            /* total save script after remove item */
            var totalsave = 0;
            cart = addCompareAtPrice(cart);
            for (var itm in cart.items) {
                if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                    var kwe = "#psub_" + cart.items[itm].variant_id;
                    var calqty = cart.items[itm].price * cart.items[itm].quantity;
                    $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                    totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                }
            }
            $(".saving-msg .money").html("Rs" + ' ' + (totalsave / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
        }
    });
}

/* ajax call for product add to cart from product suggestion div */
function addSuggestion(varient_id) {

    var vId = varient_id;
    var quantityVal = 1;
    $("#loadingDiv").show();
    $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        dataType: 'json',
        data: {
            quantity: 1,
            id: vId
        },
        success: function(data) {
            $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                url: '/cart.json',
                success: function(cart) {
                    var discount = 0.00;
                    var item_count = cart['item_count'];
                    var total_price = cart['total_price'] / 100;
                    /* product add to cart*/
                    if (item_count > 0) {
                        $('.cart-item-count span').text(item_count);
                        $(".cart_title").load(window.location.href + " .cart_title");
                        // mini cart data
                        $('.cart-popup').attr('id', 'cartPopup');
                        $('.first .price').html('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                        $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                        $(".subtotal").load(window.location.href + " .subtotal");
                        var cart_list = [];
                        cart = addCompareAtPrice(cart);
                        for (var i = 0; i < cart.items.length; i++) {
                            if (cart['items'][i]['id'] != null) {
                                var item_id = cart['items'][i]['id'];
                                var product_title = cart['items'][i]['product_title'];
                                // var product_title = data['items'][i]['title'];
                                var product_handle = cart['items'][i]['handle'];
                                var quantity = cart['items'][i]['quantity'];
                                var line_price = cart['items'][i]['line_price'] / 100;
                                var compare_price = cart['items'][i]['compare_at_price'] / 100;
                                var compare_line_price = (compare_price) * (quantity);

                               
                                var product_id = cart['items'][i]['product_id'];
                                var url = cart['items'][i]['url'];
                                var image_url = cart['items'][i]['image'];
                                var variants = cart['items'][i]['variant_options'];
                                if (product_title == 'Gift Wrap') {
                                    var product_url = product_title;
                                } else {
                                    var product_url = '<a href="' + url + '">' + product_title + '</a>';
                                }
                                var options = [];
                                for (var o = 0; o < variants.length; o++) {
                                    var selected = cart['items'][i]['variant_options'][o];
                                    if (selected !== 'Default Title') {
                                        options.push(selected + '<br>');
                                    }
                                };
                                var selected_options = options.join('');
                                cart_list.push('<div id="loadingDiv" style="display:none;">' + '<div class="loader">' + '<center> <img src="https://custoengage.uglifestyle.in/public/loader-transperent.gif">' + '</center></div></div>' + '<div class="cartpopup-item product-item">' + '  <span class="remove-item"> <a onclick="removeItem(' + item_id + ')" class="remove1" data-variant="' + item_id + '"> ' +
                                    ' <span>✕</span> </a></span>' + '<div class="product-image">' + '<input type="hidden" id="product_id" value="' + product_id + '">' + '<img class="img-fluid d-block" src="' + image_url + '"  alt="' + product_title + '" align="left"/>' + '</div>' + '<div class="product-detail">' + '<h4 class="expand">' + product_url + '</h4>' + '<p class="txt--minor">' + selected_options + '</p>' + '<div class="quantity buttons_added quantity-box">' + '<button class="minus quantity-button qminus" onclick="minusQuantity(' + item_id + ' , ' + quantity + ')" role="button" type="button" data-variant="' + item_id + '" style="margin-right: -10px;">-</button>' + '<input class="quantity-input input-text qty text" type="number" disabled name="updates[]" id="updates_' + item_id + '" value="' + quantity + '" min="1" />' + '<button class="plus quantity-button qplus" role="button" onclick="addQuantity(' + item_id + ', ' + line_price + ')" type="button" data-variant="' + item_id + '">+</button>' +
                                    '<div class="detail-price"><span class="price">Rs' + ' ' + line_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') +
                                    '&nbsp;&nbsp;' + '<del style="font-size: 11px;font-weight: normal;">Rs' + ' ' + compare_line_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '</del>' +
                                    '</span>' + '</div>'

                                    +
                                    '</div>' + '</div>' + '</div>');
                            } //endif
                        }; // endfor
                        $('.cartpopup-body').html(cart_list.join(''));
                        $('#discount').text('Rs' + ' ' + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                        /* discount ajax call after remove item */
                        $.ajax({
                            url: "http://custoengage.uglifestyle.in/getDiscountDetails",
                            type: "POST",
                            dataType: "JSON",
                            success: function(data) {
                                var selctoption = "";
                                $('#code').html('');
                                data.data.rows.forEach(myFunction);

                                function myFunction(item, index) {
                                    selctoption += '<option value="' + item.discount_code + '" data-valuea="' + item.discount_type + '" data-valueb="' + item.discount_value + '" data-valuec="' + item.minimum_amount + '">' + '<span style="font-weight">' + item.discount_code + '</strong>' + '&nbsp;' + ':' + '&nbsp;' + item.discount_title + "</option>"
                                }
                                $('#code').html(selctoption);
                                $("#code").prepend("<option value='' selected='selected' disabled='disabled'>Please Select Offer</option>");
                                var select = document.getElementById('code');
                                var input1 = document.getElementById('code-value');
                                input1.value = '';
                                select.onchange = function() {
                                    input1.value = select.value;
                                    var discount_type = jQuery(this).children(":selected").data('valuea');
                                    var discount_value = jQuery(this).children(":selected").data('valueb');
                                    var min_value = jQuery(this).children(":selected").data('valuec');
                                    var min_quantity = jQuery(this).children(":selected").data('valued');
                                    if (discount_type == 'percentage') {
                                        $.ajax({
                                            type: 'GET',
                                            url: '/cart.js',
                                            cache: false,
                                            dataType: 'json',
                                            success: function(cart) {
                                                var subtotal_price = cart['total_price'] / 100;
                                                var item_count = cart['item_count'];
                                                if (subtotal_price >= min_value) {
                                                    var dec = (discount_value / 100).toFixed(2);
                                                    var per_discount_new = subtotal_price * dec;
                                                    if (item_count > 0) {
                                                        $('#discount').text('(-)' + ' ' + 'Rs' + ' ' + per_discount_new.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        var total_price = cart['total_price'] / 100 - per_discount_new;
                                                        $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        var totalsave = 0;
                                                        cart = addCompareAtPrice(cart);
                                                        for (var itm in cart.items) {
                                                            if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                                                var kwe = "#psub_" + cart.items[itm].variant_id;
                                                                var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                                                $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                                                totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                                            }
                                                        }
                                                        $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((per_discount_new).toFixed(2))).toFixed(2));
                                                        //$(".success-msg").show();
                                                        $(".success-msg").html("Discount code applied successfully.").show();
                                                        $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").hide();
                                                    }
                                                } else {

                                                    var per_discount_new = 0.00;
                                                    $('#discount').text('Rs' + ' ' + per_discount_new.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                    var total_price = cart['total_price'] / 100 - per_discount_new;
                                                    $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                    $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));

                                                    /* total save after discount apply*/
                                                    var totalsave = 0;
                                                    cart = addCompareAtPrice(cart);
                                                    for (var itm in cart.items) {
                                                        if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                                            var kwe = "#psub_" + cart.items[itm].variant_id;
                                                            var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                                            $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                                            totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                                        }
                                                    }
                                                    $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((per_discount_new).toFixed(2))).toFixed(2));
                                                    $(".success-msg").html("Discount code applied successfully.").hide();

                                                    $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").show();
                                                }
                                            }
                                        });
                                    } else {
                                        $.ajax({
                                            type: 'GET',
                                            url: '/cart.js',
                                            cache: false,
                                            dataType: 'json',
                                            success: function(cart) {
                                                var subtotal_price = cart['total_price'] / 100;
                                                var item_count = cart['item_count'];
                                                if (subtotal_price >= min_value) {
                                                    var subtotal_new_price = subtotal_price - discount_value;
                                                    var discount = subtotal_price - subtotal_new_price;
                                                    if (item_count > 0) {
                                                        $('#discount').text('(-)' + ' ' + 'Rs' + ' ' + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        var total_price = cart['total_price'] / 100 - discount;
                                                        $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                        $(".success-msg").html("Discount code applied successfully.").show();

                                                        $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").hide();

                                                    }
                                                    var totalsave = 0;
                                                    cart = addCompareAtPrice(cart);
                                                    for (var itm in cart.items) {
                                                        if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                                            var kwe = "#psub_" + cart.items[itm].variant_id;
                                                            var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                                            $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                                            totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                                        }
                                                    }
                                                    $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((discount).toFixed(2))).toFixed(2));
                                                } else {
                                                    var discount = 0.00;
                                                    $('#discount').text('Rs' + ' ' + discount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                    var total_price = cart['total_price'] / 100 - discount;
                                                    $('.total').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                    $('.first .price').text('Rs' + ' ' + total_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                                                    var totalsave = 0;
                                                    cart = addCompareAtPrice(cart);
                                                    for (var itm in cart.items) {
                                                        if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                                                            var kwe = "#psub_" + cart.items[itm].variant_id;
                                                            var calqty = cart.items[itm].price * cart.items[itm].quantity;
                                                            $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                                                            totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                                                        }
                                                    }
                                                    $(".saving-msg .money").html("Rs" + ' ' + (parseInt((totalsave / 100).toFixed(2)) + parseInt((discount).toFixed(2))).toFixed(2));
                                                    $(".success-msg").html("Discount code applied successfully.").hide();

                                                    $(".error-msg").html("Discount code valid on total cart value above Rs. " + min_value + ".").show();

                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        });
                        $(".success-msg").hide();
                        $(".empty-msg").hide();
                        $(".error-msg").hide();
                        /* product suggestion div */
                        var p_id = document.getElementById("product_id").value;

                        productSuggestion(p_id);
                    } else {
                        $(".cart").load(window.location.href + " .cart");
                    }
                    $("#loadingDiv").fadeOut(550, function() {
                        // fadeOut complete. Remove the loading div
                        $("#loadingDiv").hide(); //makes page more lightweight 
                    });
                    /* total save after product add to cart*/
                    var totalsave = 0;
                    cart = addCompareAtPrice(cart);
                    for (var itm in cart.items) {
                        if (cart.items[itm].compare_at_price > cart.items[itm].price) {
                            var kwe = "#psub_" + cart.items[itm].variant_id;
                            var calqty = cart.items[itm].price * cart.items[itm].quantity;
                            $(kwe).html("Rs" + ' ' + (calqty / 100).toFixed(2));
                            totalsave = totalsave + (cart.items[itm].compare_at_price - cart.items[itm].price) * cart.items[itm].quantity;
                        }
                    }
                    $(".saving-msg .money").html("Rs" + ' ' + (totalsave / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
                }
            });
        }
    });
}
//});
/* js for checkout button */
$(document).on('click', '.checkout', function(event) {
    //disable the button event
    event.preventDefault();
    c
    //write the url format
    var theUrl = '/checkout?discount=';
    //grab the discount code from the input
    var theDiscount = $('#code-value').val();
//     console.log(theDiscount);
    //full url to redirect to checkout with promo code
    var toRedirect = theUrl + theDiscount;
//     console.log(toRedirect);

    //redirect
    window.location.href = toRedirect;
});