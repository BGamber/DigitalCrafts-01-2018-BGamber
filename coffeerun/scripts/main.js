var apiAddress = 'http://dc-coffeerun.herokuapp.com/api/coffeeorders/';
var orderForm = document.querySelector('form');

var orderTracker = function() {
    var orderList = [];
    return {
        loadOrderList: function() {
            console.log('Querying server...');
            var onlineList = [];
            $.ajax({
                type: 'GET',
                url: apiAddress,
                success: function(data) {
                    for (var key in data) {
                        onlineList.push(data[key]);
                    };
                    orderList = onlineList;
                    orderTracker.updateOrderList();
                }
           });
            console.log('Query done.')
        },
        addOrder: function(order) {
            $.post(apiAddress, order, function() {
                orderTracker.loadOrderList();
            });
        },
        makeOrderString: function(order) {
            orderString = '';
            orderString += `Order: ${order['coffee']} - `;
            orderString += `Email: ${order['emailAddress']} - `;
            orderString += `Size: ${order['size']} - `;
            orderString += `Flavor: ${order['flavor']} - `;
            orderString += `Strength: ${order['strength']} `;
            return orderString;
        },
        updateOrderList: function() {
            var $pageList = $('#order-list');
            $pageList.empty();
            orderList.forEach(function(order, i) {
                let newListItem = document.createElement('li');
                let orderID = order['_id'].split('').splice(order['_id'].length - 2).join('');
                let email = order['emailAddress'];
                newListItem.setAttribute('data-id', orderID);
                let listText = (i+1)+'. '+orderTracker.makeOrderString(order);
                newListItem.textContent = listText;
                newListItem.classList.add('order-item')
                let $button = $('<a>').attr('href', '#').append($('<span>'));
                $button.addClass('complete-button');
                $button.text('Complete Order');
                $button.click(function fnDel(event) {
                    event.preventDefault();
                    var $parent = $($(this)[0].parentElement);
                    $parent.addClass('order-complete');
                    $(this).removeClass('complete-button');
                    $(this).addClass('undo-button');
                    $(this).text('Undo Delete');
                    $(this).off('click', fnDel);
                    $(this).attr('data-delete', 'true')
                    $(this).click(function fnDelCancel(event) {
                        event.preventDefault();
                        $(this).attr('data-delete', 'false');
                        $(this).text('Cancelling...');
                        $(this).removeClass('undo-button');
                        $parent.removeClass('order-complete');
                    });
                    setTimeout(function() {
                        if (event.target.getAttribute('data-delete') === 'true') {
                            $.ajax({
                                type: 'DELETE',
                                url: apiAddress+email,
                                success: function() {
                                    orderTracker.loadOrderList();
                                }
                            });
                        } else {
                            orderTracker.loadOrderList();
                        };
                    }, 2000);
                });
                $button.click(function(event) {
                    event.preventDefault();
                });
                newListItem.appendChild($button[0]);
                $pageList.append(newListItem);
            });
        }
    };
}();

orderForm.addEventListener('submit', function(event) {
    event.preventDefault();
    event.target.removeEventListener('submit', arguments.callee);
    var order = {};
    for (let i=0; i < orderForm.length; i++) {
        let element = orderForm.elements[i];
        if (element.type === 'radio' && element.checked === true) {
            order[element.name] = element.value;
        } else if (element.type !== 'radio' && element.nodeName !== 'BUTTON') {
            order[element.name] = element.value;
        };
    };
    orderTracker.addOrder(order);
});

var $pop = $('#pop');
$pop.click(function(event) {
    event.preventDefault();
    for (let i=1; i < 10; i++) {
        let newOrder = {
            "coffee": `test${i}`,
            "emailAddress": `test${i}@test.com`,
            "size": "tall",
            "flavor": "None",
            "strength": 50
        }
        $.post(apiAddress, newOrder);
    };
    setTimeout(function() {
        orderTracker.loadOrderList();
    }, 0);
});

// Once everything else is set, load server data!
orderTracker.loadOrderList();