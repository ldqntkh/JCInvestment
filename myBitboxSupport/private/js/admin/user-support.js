var moment = require('moment');

function init(clientlist) {
    $('.listclient').html('');
    var itemClick = $('#clientIdSupport').val();
    for (var index in clientlist) {
        var item = clientlist[index];
        var html = `<div class="item_support ${item.supportStatus === 0? 'item-active':'item-actived'} ${item.clientId === itemClick? 'item-click':''} " data-list-index="${item.clientId}">
                        <h4>${item.clientName}</h4>
                        <small>Status: ${item.supportStatus === 0? 'Waiting':'Supporting'}</small>
                        <small>Time: ${moment(item.clientTimeContact).format('YYYY-MM-DD HH:mm:ss')}</small>
                    </div>`;
        $('.listclient').append(html);
    }
    initItemClick(clientlist);
}

function initItemClick(clientlist) {
    $('.item_support').off('click').on('click', function() {
        var id = $(this).attr('data-list-index');
        var itemClick = clientlist.find(item => item.clientId.toString() === id);
        if (typeof itemClick !== undefined) {
            $('.support-content').html('');
            $('#clientIdSupport').val(itemClick.clientId);

            var html = `<img src="/uploads/${itemClick.clientName}__Screenshot.png"/>`;
            $('.support-content').append(html);
            if (itemClick.supportStatus === 1) {
                // supporting
                // show button done, hidden supporting
                $('.support-text >#supporting').css({display:"none"});
                var idUser = $('#userId').val();
                console.log(idUser + '--------------' + itemClick.userSupport);
                if (idUser == itemClick.userSupport) {
                    $('.support-text >#done').css({display:"block"});
                    intiButtonSupport('#done', 1);
                }
                else $('.support-text >#done').css({display:"none"});
            } else if (itemClick.supportStatus === 2) {
                // done
                // hidden all
                $('.support-text >#supporting').css({display:"none"});
                $('.support-text >#done').css({display:"none"});
            } else {
                // show button supporting
                $('.support-text >#supporting').css({display:"block"});
                intiButtonSupport('#supporting', 0);
                $('.support-text >#done').css({display:"none"});
            }
        }
        $('.listclient >div').removeClass('item-click');
        $(this).addClass('item-click');
    });
}

/**
 * add event for button by element
 * @param {String} btnElement id of button '#id'
 * @param {Number} type 0: support, 1: done
 */
function intiButtonSupport(btnElement, type) {
    $(btnElement).off('click').on('click', function() {
        var clientId = $('#clientIdSupport').val();
        if (clientId !== null) {
            var typeRequest = type == 1? 'done':'support';
            var urlRequest = "/admin/supports/clients/update/" + clientId + "/" + typeRequest;
            $.ajax({
                url: urlRequest, 
                success: function(result){
                    if (result.errCode === 0) {
                        //
                        if (type == 0) {
                            $('#supporting').css({display: 'none'}).off('click');
                            $('#done').css({display: 'block'});
                            intiButtonSupport('#done', 1);
                        }
                        else {
                            $('#supporting').css({display: 'none'}).off('click');
                            $('#done').css({display: 'none'}).off('click');
                            $('#clientIdSupport').val('');
                        }
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
    });
}



var supportPage = {
    init
}

module.exports = supportPage;