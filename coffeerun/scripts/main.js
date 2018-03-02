var apiAddress = 'http://dc-coffeerun.herokuapp.com/api/coffeeorders/';
var orderForm = document.querySelector('form');

// Reads form data and coverts to an object
var createOrder = function(form) {
    let order = {};
    for (let i=0; i < form.length; i++) {
        let element = form.elements[i];
        if (element.type === 'radio' && element.checked === true) {
            order[element.name] = element.value;
        } else if (element.type !== 'radio' && element.nodeName !== 'BUTTON') {
            order[element.name] = element.value;
        };
    };
    return order;
};

// Constructs and returns the "Complete Order" button for each listing
var createCompleteButton = function(targetEmail) {
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
        // Timer for completing/deleting orders; waits two seconds then 
        // checks 'data-delete' flag before sending DELETE request
        setTimeout(function() {
            if (event.target.getAttribute('data-delete') === 'true') {
                $.ajax({
                    type: 'DELETE',
                    url: apiAddress+targetEmail,
                    success: function() {
                        orderTracker.loadOrderList();
                    }
                });
            } else {
                orderTracker.loadOrderList();
            };
        }, 2000);
    });
    // This blocks default behavior even when previous listener is cleared
    $button.click(function(event) {
        event.preventDefault();
    });
    // return only HTML element
    return $button[0];
};

var orderTracker = function() {
    var orderList = [];
    return {
        loadOrderList: function() {
            console.log('Querying server...');
            $.ajax({
                type: 'GET',
                url: apiAddress,
                success: function(data) {
                    orderList = Object.values(data);
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
                let email = order['emailAddress'];
                let listText = (i+1)+'. '+orderTracker.makeOrderString(order);
                newListItem.textContent = listText;
                newListItem.classList.add('order-item')
                let button = createCompleteButton(email);
                newListItem.appendChild(button);
                $pageList.append(newListItem);
            });
        }
    };
}();

orderForm.addEventListener('submit', function(event) {
    event.preventDefault();
    event.target.removeEventListener('submit', arguments.callee);
    order = createOrder(orderForm);
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