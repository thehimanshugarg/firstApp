function sendAnalyticsInfo(){try{window.analytics.startTrackerWithId("UA-69271459-1"),window.analytics.setUserId(window.localStorage.email),window.analytics.trackView("Home Screen")}catch(e){}}var pictureSource,destinationType,app={initialize:function(){this.bindEvents()},bindEvents:function(){document.addEventListener("deviceready",this.onDeviceReady,!1)},onDeviceReady:function(){function e(){$("#loginForm");if(void 0!=window.localStorage.email&&void 0!=window.localStorage.password){sendAnalyticsInfo();window.localStorage.email,window.localStorage.password;$.post("json/structure.json",{email:"aa"},function(e){$("#toolbar").show(),$("#category-page").show()},"json")}else $.get("http://collegeboard-env2.elasticbeanstalk.com/collegeInfo/getAllCollegeInfos",function(e){var t=e.success;if(t)var a=e.data;else{var r=e.message;alert(r)}if(t){window.localStorage.collegeData=JSON.stringify(a);var o=$.parseJSON(window.localStorage.getItem("collegeData")),i=[];$.each(o,function(e,t){i.push(t.collegeName)}),$("#register_college").autocomplete({source:i,change:function(e,t){(null==t.item||void 0==t.item)&&($(this).val(""),$(this).attr("disabled",!1))}}),menu.setSwipeable(!1),$("#loginPage").show()}}).fail(function(){alert("Sorry,no internet connection available right now.Please try again later."),menu.setSwipeable(!1),$("#loginPage").show()})}try{var t=PushNotification.init({android:{senderID:"428357888802"},ios:{alert:"true",badge:"true",sound:"true"},windows:{}});t.on("registration",function(e){window.localStorage.regIdPush=e.registrationId}),t.on("notification",function(e){}),t.on("error",function(e){})}catch(a){}app.receivedEvent("deviceready"),void 0!=navigator.camera&&(pictureSource=navigator.camera.PictureSourceType,destinationType=navigator.camera.DestinationType),ons.setDefaultDeviceBackButtonListener(function(){navigator.app.exitApp()}),$(document).on("click","a[href^=http], a[href^=https]",function(e){e.preventDefault();var t=$(this),a=t.data("inAppBrowser")||"_blank";window.open(t.attr("href"),a)}),e(),app.updateInterestedCategories(),app.getCount("Notices")},getCount:function(e){if(void 0!=window.localStorage.profileData){var t=$.parseJSON(window.localStorage.getItem("profileData")),a=[];if(null!=t){$.each(t.interestedCategories,function(e,t){a.push(t.categoryId)});var r=a.join(","),o=[];$.each(t.interestedCategories,function(t,a){if(void 0!=window.localStorage["feedEntriesData"+e+a.categoryId+a.categoryName]){var r=JSON.parse(window.localStorage.getItem("feedEntriesData"+e+a.categoryId+a.categoryName));"undefined"!=typeof r[0]&&"undefined"!=typeof r[0].publishedDate?o.push(r[0].publishedDate):o.push(0)}else o.push(0)});var i=o.join(",");"Notices"==e&&(getCountUrl="http://collegeboard-env2.elasticbeanstalk.com/noticeInfo/getNoticesInfoForCategories?userId="+t.user_id+"&categoriesToFetch="+r+"&dates="+i),$.get(getCountUrl,function(a){$.each(t.interestedCategories,function(t,a){window.localStorage["#notification"+e+"Count-"+a.categoryId]=0}),$.each(a,function(t,a){$("#notification"+e+"Count-"+t).text(a),a>0&&$("#notificationNew"+e).text("New "+e),window.localStorage["#notification"+e+"Count-"+t]=a.mostRecentNoticeCount,window.localStorage["#notificationTimestamp"+e+"Date-"+t]=a.mostRecentNoticeDate})}).fail(function(){})}}},updateInterestedCategories:function(){if(void 0!=window.localStorage.email||void 0!=window.localStorage.password){var e=window.localStorage.getItem("email"),t=window.localStorage.getItem("password"),a="http://collegeboard-env2.elasticbeanstalk.com/userInfo/userSignIn?userEmail="+e+"&userPassword="+t;$.get(a,function(e){var t=e.success;if(t)var a=e.data.userName,r=e.data.rollNumber,o=e.data.yearGrad,i=e.data.branch,n=e.data.company,s=e.data.userId,l=e.data.contactNumber,c=e.data.emailAddress,d=e.data.password,u=e.data.collegeName,g=e.data.userCategories,m=e.data.collegeBranches,p=e.data.status,f=e.data.fbUrl,h=e.data.twitterUrl,v=e.data.linkedinUrl,w=e.data.interests,b=e.data.specialUser;if(t){var y={register_email:c,user_id:s,contact_nos:l,register_yearGrad:o,register_branch:i,register_company:n,register_password:d,register_name:a,register_college:u,register_roll:r,interestedCategories:g,userCollegeBranches:m,register_status:p,register_fbUrl:f,register_twitterUrl:h,register_linkedinUrl:v,register_interests:w,special_user:b};window.localStorage.profileData=JSON.stringify(y)}}).fail(function(){})}},receivedEvent:function(e){}};!function(){"use strict";var e=angular.module("sensationFeedPlugin",["onsen","sensationFeedPlugin.data","ngSanitize"]);document.addEventListener("deviceready",function(){angular.bootstrap(document,["sensationFeedPlugin"])},!1),e.controller("loginController",["$scope","$http","FeedPluginData",function(e,t,a){e.name="harry",e.forgotPassword=function(){var a=$("#loginForm");$("#submitButton",a).attr("disabled","disabled");var r=$("#email",a).val();""!=r?(t({method:"GET",url:"http://collegeboard-env2.elasticbeanstalk.com/userInfo/forgotPassword?userEmail="+r,async:!1}).success(function(e,t,a,r){var o=e.success;if(o)alert("Your existing password has been sent to your registered email address !!");else{var i=e.message;alert(i)}}).error(function(t,a,r,o){alert("Sorry,no internet connection available right now.Please try again later."),e.isLoggedIn="no"}),$("#submitButton").removeAttr("disabled")):alert("You must enter a valid email")},e.userLogin=function(){var a=$("#loginForm");$("#submitButton",a).attr("disabled","disabled");var r=$("#email",a).val(),o=$("#password",a).val(),i=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;""!=r&&""!=o&&r.match(i)?(t({method:"GET",url:"http://collegeboard-env2.elasticbeanstalk.com/userInfo/userSignIn?userEmail="+r+"&userPassword="+o,async:!1}).success(function(e,t,a,r){var o=e.success;if(o)var i=e.data.userName,n=e.data.rollNumber,s=e.data.yearGrad,l=e.data.branch,c=e.data.company,d=e.data.userId,u=e.data.contactNumber,g=e.data.emailAddress,m=e.data.password,p=e.data.collegeName,f=e.data.userCategories,h=e.data.collegeBranches,v=e.data.status,w=e.data.fbUrl,b=e.data.twitterUrl,y=e.data.linkedinUrl,_=e.data.interests,I=e.data.specialUser;else{var S=e.message;alert(S)}if(o){window.localStorage.email=g,window.localStorage.password=m;var N={register_email:g,user_id:d,contact_nos:u,register_yearGrad:s,register_branch:l,register_company:c,register_password:m,register_name:i,register_college:p,register_roll:n,interestedCategories:f,userCollegeBranches:h,register_status:v,register_fbUrl:w,register_twitterUrl:b,register_linkedinUrl:y,register_interests:_,special_user:I};window.localStorage.profileData=JSON.stringify(N),$("#loginPage").hide(),$("#toolbar").show(),$("#category-page").show(),app.getCount("Notices"),menu.setSwipeable(!0)}}).error(function(t,a,r,o){alert("Sorry,no internet connection available right now.Please try again later."),e.isLoggedIn="no"}),$("#submitButton").removeAttr("disabled")):(alert("You must enter valid email and password"),$("#submitButton").removeAttr("disabled"))},$("#login-form-link").click(function(e){$("#loginForm").delay(100).fadeIn(100),$("#registerForm").fadeOut(100),$("#register-form-link").removeClass("active"),$(this).addClass("active"),e.preventDefault()})}]),e.controller("registerController",["$scope","$http","FeedPluginData",function(e,t,a){$("#register-form-link").click(function(e){$("#registerForm").delay(100).fadeIn(100),$("#loginForm").fadeOut(100),$("#login-form-link").removeClass("active"),$(this).addClass("active"),e.preventDefault()}),e.userRegister=function(){var e="iPad"==navigator.userAgent.match(/iPad/i)?"iPad":"iPhone"==navigator.userAgent.match(/iPhone/i)?"iPhone":"Android"==navigator.userAgent.match(/Android/i)?"Android":"BlackBerry"==navigator.userAgent.match(/BlackBerry/i)?"BlackBerry":"null";alert("deviceType = "+e);var a=$("#registerForm");$("#register_submitButton",a).attr("disabled","disabled");var r=$("#register_email",a).val(),o=$("#register_password",a).val(),i=$("#register_confirmPassword",a).val(),n=$("#register_name",a).val(),s=$("#register_roll",a).val(),l=$("#register_college",a).val(),c=$("#register_contactNumber",a).val(),d=$("#referenceCode",a).val(),u=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;if(""!=r&&""!=o&&o==i&&r.match(u)){var g=new FormData;g.append("userName",n),g.append("rollNumber",s),g.append("contactNumber",c),g.append("email",r),g.append("password",o),g.append("collegeName",l),g.append("referenceCode",d),g.append("deviceType",e);var m="http://collegeboard-env2.elasticbeanstalk.com";t.post(m+"/userInfo/userSignUp",g,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).success(function(e){var t=e.success;if(t)var a=e.data.userName,r=e.data.rollNumber,o=e.data.userId,i=e.data.contactNumber,n=e.data.emailAddress,s=e.data.password,l=e.data.collegeName,c=e.data.userCategories,d=e.data.collegeBranches;else{var u=e.message;alert(u)}if(t){window.localStorage.email=n,window.localStorage.password=s;var g={register_email:n,user_id:o,contact_nos:i,register_password:s,register_name:a,register_college:l,register_roll:r,interestedCategories:c,userCollegeBranches:d};window.localStorage.profileData=JSON.stringify(g),$("#loginPage").hide(),$("#toolbar").show(),$("#category-page").show(),app.getCount("Notices"),menu.setSwipeable(!0)}else alert("Your registration failed try again")}).error(function(e){alert(e.message),alert("Sorry,no internet connection available right now.Please try again later")}),$("#register_submitButton").removeAttr("disabled")}else alert("You must enter a valid email ,password and matching confirm password "),$("#register_submitButton").removeAttr("disabled")}}]),e.controller("FeedPluginCategoriesController",["$scope","$http","FeedPluginData",function(e,t,a){t({method:"GET",url:a.url}).success(function(t,a,r,o){e.categories=t.categories}).error(function(e,t,a,r){}),e.retrieveCollege=function(e){if(void 0!=window.localStorage.profileData){var t=JSON.parse(window.localStorage.getItem("profileData"));return t.register_college}},e.showDetail=function(t){var r=e.categories[t],o=JSON.parse(window.localStorage.getItem("profileData"));a.selectedItem=r,a.profileData=o,"notices"==r.title.toLowerCase()&&app.getCount("Notices"),e.ons.navigator.pushPage("feed-category.html",{title:r.title})},e.showHiddenPage=function(e){$("#loginPage").is(":hidden")&&void 0!=window.localStorage.email&&void 0!=window.localStorage.password&&($("#toolbar").show(),$("#category-page").show())},e.getNotificationEarlyHack=function(){app.getCount("Notices")},e.getName=function(e){return"a"}}]),e.controller("FeedPluginCategoryController",["$scope","FeedPluginData",function(e,t){e.title=t.selectedItem.title,t.mainCategory=t.selectedItem.title,$.each(t.profileData.interestedCategories,function(e,a){"notices"==t.mainCategory.toLowerCase()&&(void 0!=window.localStorage["#notificationNoticesCount-"+a.categoryId]?a.categoryNotifications=JSON.parse(window.localStorage.getItem("#notificationNoticesCount-"+a.categoryId)):a.categoryNotifications=0)});var a=t.profileData.interestedCategories;a=a.sort(function(e,t){var a=window.localStorage.getItem("#notificationTimestampNoticesDate-"+t.categoryId),r=window.localStorage.getItem("#notificationTimestampNoticesDate-"+e.categoryId);return a-r}),e.items=a,e.showDetail=function(a){var r=e.items[a];t.selectedItem=r,e.ons.navigator.pushPage("feed-master.html",{title:r.categoryName})}}]),e.controller("FeedPluginMasterController",["$scope","$http","FeedPluginData",function(e,t,a){function r(t){var r=1,o=15;e.paginationLimit=function(){return o*r},e.hasMoreItems=function(){return r<Object.keys(t).length/o},e.showMoreItems=function(){r+=1},e.showDetail=function(r){var o=t[r];a.selectedItem=o,e.ons.navigator.pushPage("feed-detail.html",o)}}e.msg="Loading...",e.feeds="";var o=a.profileData.user_id,i=window.localStorage.getItem("regIdPush"),n=new FormData;n.append("userId",o),n.append("deviceKey",i);var s="/userInfo/registerDevice",l="http://collegeboard-env2.elasticbeanstalk.com";t.post(l+s,n,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).success(function(e){}).error(function(e){});var o=a.profileData.user_id,c=a.mainCategory,d=a.selectedItem.categoryId,u=a.selectedItem.categoryName,g=a.selectedItem.categoryDescription;if(void 0!=window.localStorage["feedEntriesData"+c+d+u]){e.title=u,e.description=g;var m=JSON.parse(window.localStorage.getItem("feedEntriesData"+c+d+u));m=$.map(m,function(e,t){return[e]}),e.feeds=m,r(m)}var p="http://collegeboard-env2.elasticbeanstalk.com/noticeInfo/getNotices?userId="+o+"&categoriesToFetch="+d;"notices"==c.toLowerCase()&&(p="http://collegeboard-env2.elasticbeanstalk.com/noticeInfo/getNotices?userId="+o+"&categoriesToFetch="+d),t({method:"GET",url:p,async:!1}).success(function(t,a,o,i){var n=t.success;if(n){var s=t.data,l={},m={},p=0,f={};"notices"==c.toLowerCase()&&$.each(s,function(e,t){var a=new Date(t.creationDate),r=a.toDateString();f={id:t.noticeId,title:t.noticeHeading,images:{url1:t.noticeImageId},publishedDate:t.creationDate,content:t.noticeDescription,urlLink:t.noticeUrl,socialLink:t.noticeFBUrl,postedById:t.userInfo.userId,postedByRoll:t.userInfo.rollNumber,postedByName:t.userInfo.userName,contentSnippet:r},m[p++]=f}),l={entries:m},e.title=u,e.description=g,e.feeds=l.entries;var h=l.entries,v=JSON.stringify(h);window.localStorage["feedEntriesData"+c+d+u]=v;var w=$.map(h,function(e,t){return[e]});e.feeds=w,h=w,e.msg="",r(h)}else if(e.title=u,e.description=g,void 0!=window.localStorage["feedEntriesData"+c+d+u]){alert("No new notices");var h=JSON.parse(window.localStorage.getItem("feedEntriesData"+c+d+u));h=$.map(h,function(e,t){return[e]}),e.feeds=h,e.msg="",r(h)}else{t.message;alert("No new notices"),e.msg=""}}).error(function(t,a,o,i){if(void 0!=window.localStorage["feedEntriesData"+c+d+u]){e.title=u,e.description=g,alert("No internet connection available.");var n=JSON.parse(window.localStorage.getItem("feedEntriesData"+c+d+u));n=$.map(n,function(e,t){return[e]}),e.feeds=n,e.msg="",r(n)}else e.title=u,e.description=g,e.msg="No notices to fetch in this category"})}]),e.controller("FeedPluginDetailController",["$scope","$http","$sce","FeedPluginData",function(e,t,a,r){e.item=r.selectedItem,e.item.mainCategory=r.mainCategory,e.item.title=r.selectedItem.title,e.item.publishedFullDate=new Date(r.selectedItem.publishedDate),e.item.publishedDate=e.item.publishedFullDate.toDateString(),e.item.content=r.selectedItem.content,e.item.urlLink=r.selectedItem.urlLink,e.item.socialLink=r.selectedItem.socialLink,e.item.postedByName=r.selectedItem.postedByName,e.item.postedById=r.selectedItem.postedById,e.item.postedByRoll=r.selectedItem.postedByRoll,e.item.myUserId=r.profileData.user_id,void 0!=e.item.images&&(e.item.images.url1=r.selectedItem.images.url1),"notices"==r.mainCategory.toLowerCase()&&(e.item.noticeId=r.selectedItem.id),e.deleteItem=function(){var a=confirm("Are you sure you want to delete?");if(a){var o=new FormData,i="";"notices"==r.mainCategory.toLowerCase()&&(o.append("noticeId",e.item.noticeId),i="/noticeInfo/deleteNotice");var n="http://collegeboard-env2.elasticbeanstalk.com";t.post(n+i,o,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).success(function(e){var t=e.success;if(t)alert("Deleted");else{var a=e.message;alert("error in deleting try later"+a)}}).error(function(e){alert("Sorry,no internet connection available right now.Please try again later.")})}},e.checkItemPermission=function(){return e.item.myUserId==e.item.postedById},e.setInfoState=function(a){var o=confirm("Are you sure you want to mark report item?");if(o){var i=new FormData,n="";"notices"==r.mainCategory.toLowerCase()&&(i.append("noticeId",e.item.noticeId),n="/noticeInfo/changeNoticeState"),"spam"==a.toLowerCase()?i.append("infoState","REPORTED_SPAM"):"abuse"==a.toLowerCase()&&i.append("infoState","REPORTED_ABUSE");var s="http://collegeboard-env2.elasticbeanstalk.com";t.post(s+n,i,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).success(function(e){var t=e.success;if(t)alert("This notice has been reported for review....");else{var a=e.message;alert("error in reporting try later"+a)}}).error(function(e){alert("Sorry,no internet connection available right now. Please try again later..")})}},e.getTrustedResourceUrl=function(e){return a.trustAsResourceUrl(e)},e.loadURL=function(e){"http"!=e.substring(0,4).toLowerCase()&&(e="http://"+e),window.open(e,"_blank")},e.shareFeed=function(){var t="Shared Notice from COLLEGE LOOPIN app",a=e.item.title+":"+e.item.content;a=a.replace(/(<([^>]+)>)/gi,"");var r="https://play.google.com/store/apps/details?id=com.collegeloopin";window.plugins.socialsharing.share(a,t,null,r)}}]),e.controller("noticePostController",["$scope","$http",function(e,t){var a=JSON.parse(window.localStorage.getItem("profileData")),r=a.interestedCategories;if(!a.special_user){var o=["Internship","Placement","Fest","Sharing Goods","MBA","Masters","First Year","Second Year","Third Year","Fourth Year","Hostel","Alumni","Music","Sports","Food","Travel","Events","Technology","Marketing","Competitions","Entrepreneurship","Deals","Others"];r=r.filter(function(e){return o.indexOf(e.categoryName)>-1})}var i="iPad"==navigator.userAgent.match(/iPad/i)?"iPad":"iPhone"==navigator.userAgent.match(/iPhone/i)?"iPhone":"Android"==navigator.userAgent.match(/Android/i)?"Android":"BlackBerry"==navigator.userAgent.match(/BlackBerry/i)?"BlackBerry":"null";e.allCategories=r,e.disableButton=!1,e.postNoticeButtonText="Post Notice",e.deviceType=i,e.capturePhotoEdit=function(){navigator.camera.getPicture(e.onPhotoDataSuccess,e.onFail,{quality:20,allowEdit:!0,destinationType:destinationType.DATA_URL})},e.onFail=function(e){alert("Failed because: "+e)},e.onPhotoDataSuccess=function(t){t="data:image/jpeg;base64,"+t,e.imageBlob=e.dataURItoBlob(t);var a=document.getElementById("uploadPreview");a.src=t},e.dataURItoBlob=function(e){var t;t=e.split(",")[0].indexOf("base64")>=0?atob(e.split(",")[1]):unescape(e.split(",")[1]);for(var a=e.split(",")[0].split(":")[1].split(";")[0],r=new Uint8Array(t.length),o=0;o<t.length;o++)r[o]=t.charCodeAt(o);return new Blob([r],{type:a})},e.loadImageFile=function(){var t=new FileReader;if(t.onload=function(t){var a=new Image;a.onload=function(){var t=document.createElement("canvas"),r=t.getContext("2d");t.width=399,t.height=300,r.drawImage(a,0,0,a.width,a.height,0,0,t.width,t.height),document.getElementById("uploadPreview").src=t.toDataURL();var o=t.toDataURL();e.imageBlob=e.dataURItoBlob(o)},a.src=t.target.result},0!==document.getElementById("uploadImage").files.length){var a=document.getElementById("uploadImage").files[0];t.readAsDataURL(a)}},e.submitForm=function(){e.postNoticeButtonText="Wait ...",e.disableButton=!0;var a=e.subject,r=e.message,o=e.url,i=e.fbUrl,n=e.imageBlob,s=e.isSelected;if(void 0==a||""==a)return alert("Please provide a heading for the notice.."),e.postNoticeButtonText="Post Notice",e.disableButton=!1,!1;if(void 0==s||""==s)return alert("Please select a category for the notice.."),e.postNoticeButtonText="Post Notice",e.disableButton=!1,!1;var l=JSON.parse(window.localStorage.getItem("profileData")),c=l.user_id,d=new FormData;d.append("userId",c),d.append("noticeHeading",a),d.append("noticeDescription",r),d.append("categories",s),d.append("noticeUrl",o),d.append("noticeFBUrl",i),d.append("noticeImageFile",n);var u="http://collegeboard-env2.elasticbeanstalk.com";t.post(u+"/noticeInfo/postNotice",d,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).success(function(t){var a=t.success;if(a)alert("Your Notice has been posted"),e.disableButton=!1,e.postNoticeButtonText="Post Notice",e.subject="",e.message="",e.cat1="",e.url="",e.fbUrl="",e.imageBlob="",e.isSelected="",document.getElementById("uploadPreview").src="";else{var r=t.message;alert("notice was'nt posted contact us"+r),e.disableButton=!1,e.postNoticeButtonText="Post Notice"}}).error(function(t){alert("Sorry,no internet connection available right now. Please try again later.."),e.disableButton=!1,e.postNoticeButtonText="Post Notice"})}}]),e.controller("profileController",["$scope","$http","FeedPluginData",function(e,t,a){var r=$.parseJSON(window.localStorage.getItem("profileData"));e.name=r.register_name,e.email=r.register_email,e.college=r.register_college,e.contactNumber=r.contact_nos,e.roll=r.register_roll,e.yearGrad=r.register_yearGrad,void 0!=r.register_branch&&null!=r.register_branch&&""!=r.register_branch&&(e.branch=r.register_branch.branchName),e.company=r.register_company,e.status=r.register_status,e.fbUrl=r.register_fbUrl,e.twitterUrl=r.register_twitterUrl,e.interests=r.register_interests,e.linkedinUrl=r.register_linkedinUrl,e.loadURL=function(e){"http"!=e.substring(0,4).toLowerCase()&&(e="http://"+e),window.open(e,"_blank")},e.editProfile=function(){e.ons.navigator.pushPage("editProfile.html",{compulsory:"selectedItem.categoryName"})}}]),e.controller("editProfileController",["$scope","$http",function(e,t){var a=$.parseJSON(window.localStorage.getItem("profileData"));e.editProfileButtonText="Submit",e.name=a.register_name,e.email=a.register_email,e.college=a.register_college,e.userCollegeBranches=a.userCollegeBranches,e.contactNumber=a.contact_nos,e.roll=a.register_roll,e.yearGrad=a.register_yearGrad,null!=a.register_branch&&(e.branch=a.register_branch.branchId),e.company=a.register_company,e.user_id=a.user_id,e.status=a.register_status,e.fbUrl=a.register_fbUrl,e.twitterUrl=a.register_twitterUrl,e.interests=a.register_interests,e.linkedinUrl=a.register_linkedinUrl,null==e.branch&&(e.branch="");for(var r=[],o=1970;2030>=o;o++)r.push(o);e.gradYearList=r,e.userSelectedBranch=function(e){return e==a.register_branch.branchId?!0:void 0},e.userSelectedYear=function(e){return e==a.register_yearGrad?!0:void 0},e.submitForm=function(){e.disableButton=!0,e.editProfileButtonText="Wait...";var a=e.contactNumber,r=e.roll,o=e.user_id,i=e.yearGrad,n=e.branch,s=e.company,l=e.status,c=e.fbUrl,d=e.twitterUrl,u=e.linkedinUrl,g=e.interests,m=new FormData;void 0!=r&&null!=r&&m.append("rollNumber",r),void 0!=i&&null!=i&&""!=i&&m.append("yearGrad",i),void 0!=a&&null!=a&&m.append("contactNumber",a),void 0!=n&&null!=n&&""!=n&&m.append("branch",n),void 0!=s&&null!=s&&m.append("company",s),void 0!=l&&null!=l&&m.append("status",l),void 0!=c&&null!=c&&m.append("fbUrl",c),void 0!=d&&null!=d&&m.append("twitterUrl",d),void 0!=u&&null!=u&&m.append("linkedinUrl",u),void 0!=g&&null!=g&&m.append("interests",g),m.append("userId",o);var p="http://collegeboard-env2.elasticbeanstalk.com";t.post(p+"/userInfo/editUserInfo",m,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).success(function(t){var a=t.success;if(a){alert("Your information has been edited . Go back.");var r=t.data.userName,o=t.data.rollNumber,i=t.data.userId,n=t.data.yearGrad,s=t.data.branch,l=t.data.company,c=t.data.contactNumber,d=t.data.collegeBranches,u=t.data.emailAddress,g=t.data.password,m=t.data.collegeName,p=t.data.userCategories,f=t.data.status,h=t.data.fbUrl,v=t.data.twitterUrl,w=t.data.linkedinUrl,b=t.data.interests,y=t.data.specialUser,_={register_email:u,user_id:i,contact_nos:c,register_yearGrad:n,register_branch:s,userCollegeBranches:d,register_company:l,register_password:g,register_name:r,register_college:m,register_roll:o,interestedCategories:p,register_status:f,register_fbUrl:h,register_twitterUrl:v,register_linkedinUrl:w,register_interests:b,special_user:y};window.localStorage.profileData=JSON.stringify(_),e.disableButton=!1,e.editProfileButtonText="Submit"}else{var I=t.message;alert("Following error occured while editing profile info : "+I),e.disableButton=!1,e.editProfileButtonText="Submit"}}).error(function(t){alert("Sorry,no internet connection available right now. Please try again later.."),e.disableButton=!1,e.editProfileButtonText="Submit"})}}]),e.controller("peopleSearchController",["$scope","$http",function(e,t){var a=$.parseJSON(window.localStorage.getItem("profileData"));e.user_id=a.user_id,e.userCollegeBranches=a.userCollegeBranches;for(var r=[],o=1970;2030>=o;o++)r.push(o);e.gradYearList=r,e.searchButtonText="Submit",e.submitForm=function(){e.disableButton=!0,e.searchButtonText="Wait...";var a=e.user_id,r=e.name,o=e.roll,i=e.yearGrad,n=e.branch,s=e.interest,l=e.company,c=new FormData;c.append("userId",a),c.append("userName",r),c.append("rollNumber",o),c.append("yearGrad",i),c.append("branch",n),c.append("interest",s),c.append("company",l),(void 0==r||null==r)&&(r=""),(void 0==o||null==o)&&(o=""),(void 0==i||null==i)&&(i=""),(void 0==n||null==n)&&(n=""),(void 0==s||null==s)&&(s=""),(void 0==l||null==l)&&(l="");var d="http://collegeboard-env2.elasticbeanstalk.com",u=d+"/userInfo/searchUser?userId="+a+"&userName="+r+"&rollNumber="+o+"&yearGrad="+i+"&interest="+s+"&branch="+n+"&company="+l;t({method:"GET",url:u}).success(function(t){var r=t.success;if(r){var o=[],i={},n=t.data;$.each(n,function(e,t){var r=t.userName,n=t.rollNumber,s=t.collegeName,l=t.status,c=t.fbUrl,d=t.graduationYear;if(void 0!=t.branch&&null!=t.branch&&""!=t.branch)var u=t.branch.branchName;var g=t.company,m=t.twitterUrl,p=t.linkedInUrl,f=t.interests,h={user_id:a,singleUser_name:r,singleUser_college:s,singleUser_roll:n,singleUser_yearGrad:d,singleUser_branch:u,singleUser_company:g,singleUser_status:l,singleUser_fbUrl:c,singleUser_twitterUrl:m,singleUser_linkedinUrl:p,singleUser_interests:f};o.push(h),i[e]=h}),window.localStorage.searchDataWrapper=JSON.stringify(i),e.ons.navigator.pushPage("searchDisplay.html"),e.disableButton=!1,e.searchButtonText="Submit"}else{var s=t.message;alert("Following error occired while searching :"+s),e.disableButton=!1,e.searchButtonText="Submit"}}).error(function(t){alert("Sorry,no internet connection available right now. Please try again later.."),e.disableButton=!1,e.searchButtonText="Submit"})}}]),e.controller("searchDisplayController",["$scope",function(e){var t=$.parseJSON(window.localStorage.getItem("searchDataWrapper"));e.feeds=$.map(t,function(e,t){return[e]}),e.showDetail=function(t){var a=e.feeds[t];e.ons.navigator.pushPage("searchSingleUserDisplay.html",{selectedItem:a})}}]),e.controller("searchSingleUserDisplayController",["$scope","$http","FeedPluginData",function(e,t,a){var r=e.ons.navigator.getCurrentPage().options.selectedItem;e.name=r.singleUser_name,e.email=r.singleUser_email,e.yearGrad=r.singleUser_yearGrad,e.branch=r.singleUser_branch,e.company=r.singleUser_company,e.college=r.singleUser_college,e.contactNumber=r.singleUser_contactNumber,e.roll=r.singleUser_roll,e.status=r.singleUser_status,e.fbUrl=r.singleUser_fbUrl,e.twitterUrl=r.singleUser_twitterUrl,e.interests=r.singleUser_interests,e.linkedinUrl=r.singleUser_linkedinUrl,e.loadURL=function(e){"http"!=e.substring(0,4).toLowerCase()&&(e="http://"+e),window.open(e,"_blank")}}]),e.controller("menuController",["$scope",function(e){e.showHiddenHome=function(){$("#toolbar").show(),$("#category-page").show()}}])}();