
var io = require('socket.io-client');
var moment = require('moment');
var socket = null;
var clientlist = [];
var pages = {
    supportPage : require('./user-support')
}

$(window).on("load", function () {
    if (location.href.indexOf('login') < 0) {
        // Connect to server
        socket = io();
        socket.on('connect', function(socket) {
            console.log('Connected!');
        })
        .on('client-request-support', function(socket_data) {
            //console.log(socket_data);
            if (location.href.indexOf('supports') > 0) {
                // update list
                for (var index in clientlist) {
                    if (clientlist[index].clientId.toString() === socket_data.clientId) {
                        //clientlist[index] = null;
                        clientlist.splice(index, 1);
                    }
                }
                clientlist.unshift(socket_data);
                pages.supportPage.init(clientlist);
            }
            else {
                // show dialog
                var html = `<div class="dialog-support">
                                <a href="/admin/supports">
                                    <strong>Client need support: ${socket_data.clientName}</strong><br>
                                    <small>Time: ${moment(socket_data.clientTimeContact).format('YYYY-MM-DD HH:mm:ss')}</small>
                                </a>
                            </div>`;
                $('body').append(html);
            }
            // play audio
            var audio = new Audio('/sounds/ting_ting.mp3');
            audio.play();
        })
        .on('user-update-clientStatus', function(socket_data) {
            if (location.href.indexOf('supports') > 0) {
                // update list
                for (var index in clientlist) {
                    if (clientlist[index].clientId.toString() === socket_data.clientId) {
                        //clientlist[index] = null;
                        clientlist.splice(index, 1);
                    }
                }
                clientlist.unshift(socket_data);
                pages.supportPage.init(clientlist);
            }
        })
        .on('user-done-clientStatus', function(socket_data) {
            if (location.href.indexOf('supports') > 0) {
                // update list
                for (var index in clientlist) {
                    if (clientlist[index].clientId.toString() === socket_data.clientId) {
                        //clientlist[index] = null;
                        clientlist.splice(index, 1);
                    }
                }
                pages.supportPage.init(clientlist);
            }
        });
    }

    if (location.href.indexOf('supports') > 0) {
        loadClientSupport();
    }
});

function loadClientSupport() {
    $.ajax({url: "/admin/supports/clients/status/support", 
        success: function(result){
            if (result.errCode === 0) {
                clientlist = JSON.parse(result.data);
                pages.supportPage.init(clientlist);
            }
            else {
                alert(result.errMessage);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); 
            alert("Error: " + errorThrown); 
        }
    });
}
