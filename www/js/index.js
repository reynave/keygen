document.addEventListener('deviceready', onDeviceReady, false);
let token = "";
let uniqueId = "";
let key = "";
function onDeviceReady() {
    screen.orientation.lock('portrait');
    console.log('Running platformId-' + cordova.platformId + '@' + cordova.version);
    $('.node').html("Device Ready");
    console.log('file', cordova.file);
    $("#token").html(token);
    console.log(device.cordova);
    window['cordova'].plugins.UsbPrinter.getConnectedPrinters((result) => {
        console.log(result);
      
        // result will be list of printers connected to the usb device
        // success callback execution
        var output = '';
        for (var property in result) {
            output += property + ': ' + result[property] + '; ';
        }
        $("#logsPrinter").html("Print getConnectedPrinters " +output);
    }, err => {
        console.error("print no found ", err);
        $("#logsPrinter").html("print no found " + err);
    });

}

$(document).ready(function () {

    $("#fnPrinting").click(function(){
        //1273_1002
        let message = "\n\n\n\ printng dengan android cordova \n ok masuk 11234567890qwertyuiopasdfghjklzxcvbnm \n\n\n";
        let wintec7 = "1155_2007";
        let wintec9 = "1155_2009";
        let wintec10 = "1155_2010";
        let numberWintec = $('#inputNumberPrinter').val();
        
        window['cordova'].plugins.UsbPrinter.connect(numberWintec, (result) => {
            console.log("  // success callback execution")
            $("#logsPrinter").html("success callback execution");
            window['cordova'].plugins.UsbPrinter.print(numberWintec, message, (result) => {
                console.log("result of usb print action", result);
                // alert("result of usb print action");
                // successful callback execution 

                window['cordova'].plugins.UsbPrinter.cutPaper(numberWintec);

            }, err => {
                console.error('Error in usb print action', err)
                alert('Error in usb print action');
                // failure callback execution
            });
        }, err => { 
            console.error("  // failure callback execution")
            alert(' failure callback execution');
        });

        // window['cordova'].plugins.UsbPrinter.getConnectedPrinters((result) => {
        //     console.log(result);
          
        //     // result will be list of printers connected to the usb device
        //     // success callback execution
        //     var output = '';
        //     for (var property in result) {
        //         output += property + ': ' + result[property] + '; ';
        //     }
        //     $("#logsPrinter").html("Print getConnectedPrinters " +output);
        // }, err => {
        //     console.error("print no found ", err);
        //     $("#logsPrinter").html("print no found " + err);
        // });
        
    })

    $(".reload").click(function () {
        $('.reloadRespont').html(" done!");
        console.log('cordova ', device.cordova);
        console.log('model ', device.model);
        console.log('platform ', device.platform);
        console.log('uuid ', device.uuid);
        console.log('manufacturer ', device.manufacturer);
        console.log('isVirtual ', device.isVirtual);
        console.log('serial ', device.serial);
        $("#token").html("Plz check console.log");
        let data = ` cordova : ${device.cordova} <br>  
        model : ${device.model} <br> 
        platform : ${device.platform} <br> 
        uuid : ${device.uuid} <br> 
        manufacturer : ${device.manufacturer} <br> 
        isVirtual : ${device.isVirtual} <br> 
        serial : ${device.serial} <br>  
        `;
        $("#resDevice").html(data);
    });

    $('#submit').click(function () {
        uniqueId = $.md5(reverseString(device.serial));
        let token = device.serial + "@" + uniqueId
        if (device.platform == "Android") {
            console.log("Divice serial : ", device.serial);
            console.log("token : ", token);
            $('.returnData').val(token);

        } else {
            $('.node').html("Not support for " + device.platform);
            alert("Not support for " + device.platform);
        }
    });

    $("#onCam").click(function () {
        navigator.camera.getPicture(cameraSuccess, cameraError, {
            destinationType: Camera.DestinationType.FILE_URI
        });
    });

    $("#testinet").click(function () {
        $.get("http://128.199.94.89/cso1/public/", function(data, status){
            console.log( data, status);
            $(".note1").html(JSON.stringify(data));
          });
    });
});




function cameraSuccess(imageURI) {
    console.log("Camera cameraSuccess.", imageURI);
    upload(imageURI);
}

function cameraError() {
    console.log("Camera cameraError / Close by user");
}

function myFunction() {
    /* Get the text field */
    var copyText = document.getElementById("myInput");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
}


function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]

    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]

    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"

    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}


function upload(fileEntry) {
    var fd = new FormData();
    var files = $('#file')[0].files[0];
    fd.append('file', files);

    $.ajax({
        url: 'upload.php',
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response != 0) {
                alert('file uploaded');
            }
            else {
                alert('file not uploaded');
            }
        },
    });
};