function showProductReviewForm() {

    $("#wc_product_review_form").show();
 
    $('html, body').animate({
        scrollTop: $('#wc_product_review_form').offset().top
    }, 1000);
 
 }
 
 function showReviewSpan() {
 
    $('html, body').animate({
        scrollTop: $('#showReview').offset().top
    }, 3000);
 
 }
 
 
 // function submitProductReviewQuestion(id) {
 
 //    var reviewId = '';
 //    reviewId = $("#reviewId" + id).val();
 //    var question = '';
 //    question = $("#question" + id).val();
 
 //    $.ajax({
 //        type: 'post',
 //        url: 'http://custoengage.uglifestyle.in/createProductReviewQuestionAnswer',
 //        data: {
 //            "reviewId": reviewId,
 //            "Question": question,
 //        },
 //        success: function(data) {
 //            swal("Thank You !", "Submited Successfully !", "success");
 //            var defaultSort = window.localStorage.getItem("sortOrder");
 //            window.getReviewsBySorting(defaultSort);
 //        }
 //    });
 
 // };
 
 // $("form").on("submit", function(e) {
 //    e.preventDefault();
 
 //     	$('body').append('<div style="" id="loadingDiv"><div class="loader"> <img src="https://custoengage.uglifestyle.in/public/loader-transperent.gif"></div></div>');
 
   
 //       $( "#loadingDiv" ).fadeOut(500, function() {
 //         // fadeOut complete. Remove the loading div
 //         $( "#loadingDiv" ).remove(); //makes page more lightweight
 //       });
 //    // var pId = '';
 //    // pId = $("#pid").val();
 //    var review = '';
 //    review = $("#reviewcontent").val();
 //    var reviewTitle = '';
 //    reviewTitle = $("#reviewTitle").val();
 //    var starCount = '';
 //    var custName = '';
 //    custName = $("#fullName").val();
 //    var custEmail = '';
 //    custEmail = $("#custEmail").val();
 //    var rating = document.getElementsByName('review');
  
 //     var shopifyCustId = 0;
 
 //    for (var i = 0, length = rating.length; i < length; i++) {
 //        if (rating[i].checked) {
 //            starCount = rating[i].value;
 //        }
 //    }
 
 
 //    var pid = document.getElementById("productpId").value;
 
 //    var myIPAddress = '';
 //    var mylocation = '';
 //    $.getJSON("http://api.ipify.org/?format=json", function(e) {
 //        myIPAddress = e.ip;
 //    });
  
 //     var files = $('#photos-input').get(0).files;
 //     if(files.length <= 3)
 //    {
      
 //      jQuery.get("http://ipinfo.io/" + myIPAddress + "", function(response) {
 //     mylocation = response.city + ", " + response.region;
      
 //      // {% if customer %}
 //      //    shopifyCustId = '{{ customer.id }}'
 //      // {% endif %}
 
 //        $.ajax({
 //            url: 'http://custoengage.uglifestyle.in/createProductReview',
 //            data: {
 //                "custName": custName,
 //                "custEmail": custEmail,
 //                "review": review,
 //                "reviewTitle": reviewTitle,
 //                "mylocation": mylocation,
 //                "pId": pid,
 //                "starCount": starCount,
 //                 //"shopifyCustId": shopifyCustId,
 //            },
 //            // cache: false,
 //            // contentType: false,
 //            // processData: false,
 //            method: 'POST',
 //            type: 'POST',
 //            success: function(data) {
 
 //                let reviewId = data.data.review_id;
 
 //                // Get the files from input, create new FormData.
 //                var files = $('#photos-input').get(0).files,
 //                    formData = new FormData();
 
 //                formData.append('reviewId', reviewId);
 //                // Append the files to the formData.
 //                for (var i = 0; i < files.length; i++) {
 //                    var file = files[i];
 //                    formData.append('photos', file, file.name);
 //                }
 
 //                $.ajax({
 //                    url: 'http://custoengage.uglifestyle.in/createProductReviewFileUpload',
 //                    data: formData,
 //                    cache: false,
 //                    contentType: false,
 //                    processData: false,
 //                    method: 'POST',
 //                    type: 'POST',
 //                    success: function(data) {
 //                        $("#wc_product_review_form").hide();
 //                        swal("Good job!", "Thanking You For Your Review! Your Review Is Very Valuable For Us. After Reviewing Your Review It Will Visible On Website.", "success");
 //                        var defaultSort = window.localStorage.getItem("sortOrder");
 //                        window.getReviewsBySorting(defaultSort);
                      
 //                          $( "#loadingDiv" ).fadeOut(500, function() {
 //                            // fadeOut complete. Remove the loading div
 //                            $( "#loadingDiv" ).remove(); //makes page more lightweight
 //                        });
                     
 //                    },
 //                    error: function(error) {
 //                        swal("Oops! Something Went Wrong.", error, "danger");
 //                      $( "#loadingDiv" ).fadeOut(500, function() {
 //                         // fadeOut complete. Remove the loading div
 //                         $( "#loadingDiv" ).remove(); //makes page more lightweight
 //                       });
 //                    }
 //                });
 //                //swal("Good job!", "Review Submited Successfully!", "success");
 
 //            },
 //            error: function(error) {
 //                swal("Oops! Something Went Wrong.", error, "danger");
 //                $( "#loadingDiv" ).fadeOut(500, function() {
 //                 // fadeOut complete. Remove the loading div
 //                 $( "#loadingDiv" ).remove(); //makes page more lightweight
 //               });
 //            }
 //        });
 
 //    }, "jsonp");
      
 //    }else{
     
 //     alert("Only 3 Images Accepted! ");
 //       $( "#loadingDiv" ).fadeOut(500, function() {
 //         // fadeOut complete. Remove the loading div
 //         $( "#loadingDiv" ).remove(); //makes page more lightweight
 //       });
 //    }
    
 
 // });
 
 function hideForm(){
 $("#wc_product_review_form").hide();
   
    $('html, body').animate({
        scrollTop: $('#wc_product_review_form').offset().top
    }, 1000);
 }
 
  
 
 $(document).ready(function() {
   
      $("#wc_product_review_form").hide();
   
  var textProductReviewCounter = "";
        var textTotalCount = "";
        var textAvrageStarCount = "";
  var productId = 0;
       productId = document.getElementById('productIdForRef').value;
   //productId = '6891972427972';
    var pid = 0;
      var starCnt = 0;
        var strcntvalue = 0;
        var totalAvrage = 0;
        var multiple = 0;
        var count = 0;
    
    $.ajax({
            url: "https://urbanyogcustoengage.uglifestyle.in/getPid?shopify_id="+productId,
            type: "POST",
 //            data: {
 //                "productId": "6891972427972",
 //            },
            success: function(resultprdid) {
              
              pid = resultprdid.data.rows[0].pid;
              document.getElementById("productpId").value = pid;
 
              
       
              
                $.ajax({
                    url: "http://urbanyogcustoengage.uglifestyle.in/getProductReviewStarCount/"+pid,
                    type: "POST",
 //                    data: {
 //                        "pId": '1',
 //                    },
                    success: function(resultprdcnt) {
 
                     
                        var totalcount = 0;
 
                        const finalResultArray = [{
                                COUNT: 0,
                                star_count: 5
                            },
                            {
                                COUNT: 0,
                                star_count: 4
                            },
                            {
                                COUNT: 0,
                                star_count: 3
                            },
                            {
                                COUNT: 0,
                                star_count: 2
                            },
                            {
                                COUNT: 0,
                                star_count: 1
         
                                 }
                        ];
 
                        var arrayForStarCount = finalResultArray.map(obj => resultprdcnt.data[0].find(o => o.star_count === obj.star_count) || obj);
 
                        resultprdcnt.data[0].forEach(function(item, index, result) {
                        totalcount = totalcount + item.COUNT;
 
                        })
                        
 
                        arrayForStarCount.forEach(function(item, index, result) {
 
                            starcnt = starCnt++ + item.star_count;
                            strcntvalue = strcntvalue++ + item.COUNT;
                            multiple = (item.star_count * item.COUNT) + +multiple;
                            count = item.COUNT;
 
                            let perc = 0;
                            perc = ((count / totalcount) * 100);
 
                            let color = '';
                            if (item.star_count == 5) {
                                color = '#4CAF50'
                            } else if (item.star_count == 4) {
                                color = '#2196F3'
                            } else if (item.star_count == 3) {
                                color = '#00bcd4'
                            } else if (item.star_count == 2) {
                                color = '#ff9800'
                            } else if (item.star_count == 1) {
                                color = '#f44336'
                            }
 
                            textProductReviewCounter += "<div class='side'><div>";
                            for (let index = 1; index <= item.star_count; index++) {
                                textProductReviewCounter += "<span class='fa fa-star checked'></span>";
                            }
 
                            for (let index = item.star_count; index <= 4; index++) {
                                textProductReviewCounter += "<span class='fa fa-star'></span>";
                            }
 
                            if (perc > 0 ) {
                                textProductReviewCounter += "</div></div><div class='middle'><div class='bar-container'><div style=' width: " + perc + "%; height: 18px; background-color: " + color + "; '></div></div></div><div class='side right'><div>(" + Math.floor(perc) + "%)  " + item.COUNT + "</div></div>";
                            }else{
                                textProductReviewCounter += "</div></div><div class='middle'><div class='bar-container'><div style=' width: 0%; height: 18px; background-color: " + color + "; '></div></div></div><div class='side right'><div>(0%)  " + item.COUNT + "</div></div>";
                            }
 
                        })
 
                        var str = "0";
 
                        totalAvrage = multiple / strcntvalue;
                        totalAvrage = parseInt(totalAvrage);
                        if (Number.isNaN(totalAvrage) || totalAvrage == "" || totalAvrage === null) {
                            totalAvrage = 0 ;
                        }else{
                            totalAvrage = multiple / strcntvalue;
                        }
                        var avrstrcnt = Math.round(totalAvrage);
                        var totalnegative = 5 - avrstrcnt;
                        str = totalAvrage.toString();
 
                        if (strcntvalue == 0) {
                            textTotalCount += "0 (0 Reviews)";
                        } else {
                            textTotalCount += str.substring(0, 3) + " (" + strcntvalue + " Reviews)</p>";
                        }
 
                        for (let i = 0; i < avrstrcnt; i++) {
                            textAvrageStarCount += "<span class='fa fa-star checked'></span>";
                        }
                        for (let i = 0; i < totalnegative; i++) {
                            textAvrageStarCount += "<span class='fa fa-star'></span>";
                        }
 
                        $('#avrageStarCount').html(textAvrageStarCount);
                        $('#resultProductReviewCounterFinal').html(textTotalCount);
                        $('#basicreviewcounter').html("<p><a style='color: #000' href='javascript:void(0);' onclick='showReviewSpan();'>"+textAvrageStarCount+" " + str.substring(0, 3) + " (" + strcntvalue + " Reviews)</a></p>");
                        $('#basicreviewcountermobile').html("<p><a style='color: #000' href='javascript:void(0);' onclick='showReviewSpan();'>" + textAvrageStarCount + " " + str.substring(0, 3) + " (" + strcntvalue + " Reviews)</a></p>");
 
                        $('#resultProductReviewCounter').html(textProductReviewCounter);
 
                    },
 
                });
 
 
               var defaultSort = "Most Recent"
                 window.getReviewsBySorting(defaultSort);
              
            
   
   },
        });
  
   
        var $pagination = $('#pagination'),
            displayRecords = [],
            recPerPage = 9,
            page = 1,
            offset = 0,
            limit = 12,
            visiblepages = 1;
            totalRecords = 0,
            records = [],
            totalPages = 0,
            visiblepages = 1;
 
        window.getReviewsBySorting = function(sortBY) {
            var reviewIdArray = [];
            var resulOfProductReview = [];
            var likeCountArray = [];
            var dislikeCountArray = [];
            var resulOfProductReviewQueAns = [];
            var resulOfProductReviewFile = [];
 
            var sortBY = sortBY;
            localStorage.setItem("sortOrder", sortBY);
           var productId = document.getElementById('productIdForRef').value;
 //           var productId= '6891972427972';
 
       pid = document.getElementById("productpId").value;
          
         // pid='1';
          
         
 
            $.ajax({
                url: "http://urbanyogcustoengage.uglifestyle.in/getProductReview/"+pid+"?offset="+offset+"&limit="+limit+"&sortBy=Most Recent",
                async: true,
                dataType: 'json',
 //                data: {
 //                    "pId": pid,
 // //                    "sortBy": sortBY,
 // //                    "status": 1,
 // //                    offset: offset || 0,
 // //                    limit: limit || 12
 //                },
                type: "post",
                success: function(data) {
                  
                    if (data.data.name == "SequelizeDatabaseError") {
                        swal("Oops! Something Went Wrong.", data.data.parent.sqlMessage, "danger");
                    }
 
                    if (data.data.rows.length > 0) {
                       
 
                    totalRecords = data.data.count;
                    visiblepages = Math.ceil(totalRecords / limit);
 
                    data.data.rows.forEach(function(item, index, result) {
 
                        let resulOfProductReviewobj = {};
                        resulOfProductReviewobj = item;
 
                        resulOfProductReview.push(resulOfProductReviewobj);
 
                        reviewId = item.review_id;
                        reviewIdArray.push(reviewId);
 
                    });
 
 
                 $.ajax({
                                                url: "http://urbanyogcustoengage.uglifestyle.in/getProductReviewImg/2",
                                                type: "POST",
 //                                                data: {
 //                                                    "reviewId": reviewIdArray,
 //                                                },
                                                success: function(resultprdimg) {
                                                  
                                             
 
 //                                                    resultprdimg.data.forEach(function(itemimage, indeximage, resultimage) {
 
 //                                                        let resulOfProductReviewFileObj = {};
 //                                                        resulOfProductReviewFileObj = itemimage;
 
 //                                                        resulOfProductReviewFile.push(resulOfProductReviewFileObj);
 
 //                                                    });
 
                                                    merged = [];
                                                    
                                                    [resulOfProductReview, likeCountArray, dislikeCountArray, resulOfProductReviewQueAns, resulOfProductReviewFile].forEach((hash => a => a.forEach(b => {
                                                        if (!hash[b.review_id]) {
                                                            hash[b.review_id] = {};
                                                            merged.push(hash[b.review_id]);
                                                        }else{
                                                            
                                                        }
                                                        Object.assign(hash[b.review_id], b);
                                                    }))(Object.create(null)));
 
                                                    records = merged;
 
                                                    totalPages = (totalRecords == 0) ? 1 : totalRecords;
                                                  apply_pagination(records, totalPages);
                                                  
                                                    generate_table(records);
 
                                                  }
                                            });
                }
                }
            });
        
        }
 
    var defaultSort = "Most Recent"
        getReviewsBySorting(defaultSort);
       function generate_table(displayRecords) {
  
            var currentUserId = 123;
 
            // {% if customer %}
            //    currentUserId = '{{ customer.id }}'
            // {% endif %}
 
            var textProductReview = "";
            $('#resultProductReview').html('');
 
            if (displayRecords.length == 0) {
                textProductReview += "<p>There Are No Reviews Yet.</p>";
                $('#resultProductReview').html(textProductReview);
            } else {
 
                textProductReview += "<main class='review-section-mansoori'>";
 
                displayRecords.forEach(function(item, index, result) {
 
                    let activeStarCount = item.star_count;
                    let unactiveStarCount = 5 - item.star_count;
 
                  
                    textProductReview += "<article>";
 
                    if (item.file_id) {
                        let arraySplitfirst = item.file_path.split(',');
                        arraySplitfirst.forEach(function(itemimage, index, indeximage) {
 
                            var str = itemimage.toString();
                        
                            let last3 = str.slice(-3);
                          console.log(last3);
                          
                            if (index == 0) {
                                if (last3 == 'jpg' || last3 == 'png') {
                                    textProductReview += "<a href='" + itemimage + "' data-lightbox='image-1' data-title=''><img src='" + itemimage + "' class='img-responsive' loading='lazy' style='padding: 5px; '></a>";
                                }
                            }
                        });
                    }
 
                    if (item.cust_name) {
                        var matches = item.cust_name.match(/\b(\w)/g);
                        textProductReview += "<div class='review'><div class='description'><span class='review-customer-name'><b>" + item.cust_name + "</b></span> ";
 
                    } else {
                        textProductReview += "<div class='review'><div class='meta' style='float:left;'></div> <div class='description'><span class='review-customer-name'><b> Anonymous  </b></span> ";
                    }
 
                    if (item.status == 1) {
                        textProductReview += " <span class='verified'>VERIFIED <i class='fa fa-check' aria-hidden='true'></i></span> ";
                    }
 
 
                    if (item.cust_location != '' && item.cust_location != ' ') {
                        textProductReview += "<p class='location'> <i class='fa fa-map-marker' style='color: green; ' aria-hidden='true'></i>&nbsp; " + item.cust_location + "</p>";
                    } else {
                        textProductReview += "<p class='location'> <i class='fa fa-map-marker' style='color: green; ' aria-hidden='true'></i>&nbsp; India </p>";
                    }
 
                    textProductReview += " <div class='star'>";
 
                    for (let i = 0; i < activeStarCount; i++) {
                        textProductReview += "<span class='fa fa-star checked'></span>";
                    }
                    for (let i = 0; i < unactiveStarCount; i++) {
                        textProductReview += "<span class='fa fa-star'></span>";
                    }
 
 
                    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
 
                    var d = new Date(item.created_at);
                 
                    var dateShow = d.getDate()+" "+monthNames[d.getMonth()]+", "+d.getFullYear();
 
                    // if (item.status == 1) {
                    //     textProductReview += " <span class='verified'>VERIFIED <i class='fa fa-check' aria-hidden='true'></i></span> ";
                    // }
                  
                    textProductReview += " </div><span class='wc_review_date' style='float:right;'> " + dateShow + " </span><br></div> ";
 
                    textProductReview += " <div class='detail'>";
 
                    if (item.review_title != '' && item.review != '') {
 
                        textProductReview += "<h2 class='divmobilescreenreviewtitle'><b> " + item.review_title + " &nbsp; </b></h2> <div class='divmobilescreentext'> " + item.review + " &nbsp;"
 
                        if (item.admin_reply != '' && item.admin_reply != ' ') {
                            textProductReview += "<br><b>Reply By Admin : </b>" + item.admin_reply + "<br>";
                        }
 
                        if (item.que_id != null) {
 
                            textProductReview += "<br><b>USEFULL QUESTIONS</b>"
                            textProductReview += "<br><br><b>Question :</b> " + item.que + " <br> <b>Answer :</b> " + item.ans + " <br> ------------------------------------  <a style='font-size: 18px;' onclick='return queAnsLike(" + item.que_id + ")' > <img width='18' height='18' style='vertical-align: middle !important' src='https://cdn.shopify.com/s/files/1/0318/4076/3948/files/Wbste_Icons_50x50_Up.png?v=1622101528'> </a> " + item.like_count + " <a style='font-size: 18px;' onclick='return queAnsDislike(" + item.que_id + ")' ><img width='18' style='vertical-align: middle !important'height='18' src='https://cdn.shopify.com/s/files/1/0318/4076/3948/files/Wbste_Icons_50x50_Down2.png?v=1622101528'></a> " + item.dislike_count + " <br> ";
 
                        }
 
                        textProductReview += " </div> ";
 
                        if (item.file_id) {
                            let arraySplit = item.file_path.split(',');
                            textProductReview += "<div class='imgclassformobile imgclassfordesktop'>";
 
                            arraySplit.forEach(function(itemimage, indeximage, indeximage) {
 
                                var str = itemimage.toString();
                                let last3 = str.slice(-3);
                              
                              
 
                                if (last3 == 'jpg' || last3 == 'png') {
 
                                    textProductReview += "<a style='padding: 5px' href='" + itemimage + "' data-lightbox='image-1' data-title=''><img src='" + itemimage + "' height='70' loading='lazy'></a> ";
 
 
                                } else if (last3 == 'mp4') {
                                    var srcurl = itemimage;
                                    var id = item.file_id;
 
                                    textProductReview += "<a style='font-size: 18px;' onclick='return openVideoPopup(" + id + ") ' > <img src='https://cdn.shopify.com/s/files/1/0318/4076/3948/files/iconfinder-videologoplayicon-3993847_112649_70x70_2fd54f45-2cf8-460a-9148-9e28afea3d6c.png?v=1622116137' width='70' height='70' loading='lazy'/> </a>";
 
                                    textProductReview += "<input type='hidden' id='videosrc" + id + "' value='" + srcurl + "' >";
                                }
                            });
 
                            textProductReview += "</div>";
 
                        }            
                        
                        //textProductReview += "<hr style='border-top: 1px solid #525252 !important;  margin-bottom: 0px !important;' >";
 
                    }                   
 
                  textProductReview += " </div><div style='text-align: right;padding-top:10px;'>";
 
                    // textProductReview += " <div style='padding: 10px;'><span><a href='http://www.facebook.com/share.php?u=" + window.location.href + "' target='_blank' class = 'divmobilescreenicons' style='  font-size: 18px; '><i class='fa fa-facebook-square'  style='color: #3b5998;' aria-hidden='true'></i></a>&nbsp;<a href='https://twitter.com/share?url=" + window.location.href + "' target='_blank' style='font-size: 18px;'><i class='fa fa-twitter-square'  style='color: #55acee;' aria-hidden='true'></i></a>&nbsp;<a style='font-size: 18px;'><i class='fa fa-instagram '  style='color: #b12928;' aria-hidden='true'></i></a>&nbsp;<a href = 'whatsapp://send?text=" + window.location.href + "' target='_blank' style='font-size: 18px;'><i class='fa fa-whatsapp '  style='color: green;' aria-hidden='true'></i></a><span> ";
 
                    // if (item.shopify_cust_id == currentUserId) {
 
                    //     textProductReview += "<button style='background-color: #b12928 !important; color: white; padding: 8px; border-radius: 25px; font-size: 12px;' data-toggle='modal' data-target='#myModalForAskQuestion" + item.review_id + "' ><b>Ask A Question ?</b></button>";
 
                    // } 
 
                  // textProductReview += "<span><a style='font-size: 15px;' onclick='return reviewLike(" + item.review_id + ")' ><img width='18' height='18' style='vertical-align: middle !important' src='https://cdn.shopify.com/s/files/1/0318/4076/3948/files/Wbste_Icons_50x50_Up.png?v=1622101528'> <label id='text_likes_count" + index + "' >";
 
 //                    if (item.review_like_Count) {
 //                        textProductReview += "" + item.review_like_Count + "";
 //                    } else {
 //                        textProductReview += "0";
 //                    }
 
 //                    textProductReview += "</label> </a><a style='font-size: 15px; color: #515151;' onclick='return reviewDislike(" + item.review_id + ")'  ><img width='18' height='18' style='vertical-align: middle !important' src='https://cdn.shopify.com/s/files/1/0318/4076/3948/files/Wbste_Icons_50x50_Down2.png?v=1622101528'> <label id='text_dislikes_count" + index + "' >"
 
 //                    if (item.review_dislike_count) {
 //                        textProductReview += "" + item.review_dislike_count + "";
 //                    } else {
 //                        textProductReview += "0";
 //                    }
 
                    textProductReview += "</div></div> <div id='myModalForAskQuestion" + item.review_id + "' class='modal fade' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'>Ask A Question ? <button type='button' class='close' data-dismiss='modal'>&times;</button></div><div class='modal-body'><input type='hidden' name='reviewId' id='reviewId" + item.review_id + "' value='" + item.review_id + "'><input type='text' name='question' id='question" + item.review_id + "' value='' placeholder='Ask A Question ?' ></div><div class='modal-footer'><button type='button' class='btn btn-default' style='background-color: #B12928 !important; color: white; width:20%; height: 50px; background-color: #b12928!important; padding-left: 16px!important;  padding-right: 16px!important;  border-radius: 8px!important; font-weight: bold!important; text-transform: uppercase!important;  box-shadow: 6.894399988070802px 5.785088487178854px 10px 0px #333333 !important; ' onclick='submitProductReviewQuestion(" + item.review_id + ")'  >Submit</button><button type='button' class='btn btn-default' data-dismiss='modal' style='background-color: #B12928 !important; color: white; width:20%; height: 50px; background-color: #b12928!important; padding-left: 16px!important;  padding-right: 16px!important;  border-radius: 8px!important; font-weight: bold!important; text-transform: uppercase!important;  box-shadow: 6.894399988070802px 5.785088487178854px 10px 0px #333333 !important; ' >Close</button></div></div></div>";
 
                    textProductReview += "</article>";
                });
 
                textProductReview += "</main>";
            }
            $('#resultProductReview').html(textProductReview);
        }
    function apply_pagination(records, totalPages) {
            $pagination.twbsPagination({
                totalPages: visiblepages,
                visiblePages: 5,
                onPageClick: function(event, page) {
                    displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
                    endRec = (displayRecordsIndex) + recPerPage;
                    displayRecords = records;
                    offset = displayRecordsIndex;
                    var defaultSort = "Most Recent"
                    getReviewsBySorting(defaultSort);
                 
 
                }
            });
      
        }
 
  
 });
 
 //script for USP
 
 
 //   var shopidy_product_id = '{{product.id}}';
  
 //       $.ajax({
 //             type: "POST",
 //             url: 'http://custoengage.uglifestyle.in/getUspDetails',
 //             data: { "product_id": shopidy_product_id },
 //             dataType: 'json',
 //             success: function (data) {
 //               console.log(data);
               
 //                if (data.statusCode == 100) {
 //                   data = data.data.rows;
 //                   var html = '';
 //                   var i;
 //                   for (i = 0; i < data.length; i++) {
 //                         html += '<li class="spec">' + data[i].usp_title + '</i>';
                     
 //                   }
 //                   $('#prod-usp').html(html);
 //                } else {
 //                   $('#prod-usp-div').hide();
 //                }
 //             },
 //             error: function (xhr, status, error) {
 //                console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
 //             }
 //       });
 