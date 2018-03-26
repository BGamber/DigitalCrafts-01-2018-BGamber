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
    let $button = $('<a>').attr('href', '#');
    $button.addClass('complete-button');
    $button.text('Complete Order');
    $button.click(function fnDel(event) {
        event.preventDefault();
        var $parent = $($(this)[0].parentElement);
        $parent.addClass('order-complete');
        $(this).toggleClass('complete-button undo-button');
        $(this).text('Undo Delete');
        $(this).attr('data-delete', 'true');
        $(this).off('click', fnDel);
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
                var delPromise = fetch(apiAddress+targetEmail, {method: 'DELETE'});
                delPromise.then(orderTracker.loadOrderList)
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
            console.log("Querying server...");
            var getPromise = fetch(apiAddress);
            getPromise
                .then(function(serverData) {
                    return serverData.json();
                })
                .then(function(jsonData) {
                    return Object.values(jsonData);
                })
                .then(function(orderValues) {
                    orderList = orderValues;
                    orderTracker.updateOrderList();
                    console.log("Query complete.");
                });
            getPromise.catch(function(reason) {
                console.log(`Query failed: ${reason}`);
            })
                
        },
        addOrder: function(order) {
            let addPromise = fetch(apiAddress, 
                {method: 'POST',
                body: JSON.stringify(order),
                headers: new Headers({
                    'Content-Type': 'application/json'
              })
            });
            addPromise.then(function() {
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
    var testData = [
        { coffee: "Chai Latte", emailAddress: "dangerfoot@johnroscoe.com", size: "tall", flavor: "None", strength: "30" },
        { coffee: "Green Tea Latte", emailAddress: "dry.humor@freshrefresh.com", size: "grande", flavor: "None", strength: "50" },
        { coffee: "Double Espresso", emailAddress: "hachacha@spicymeatball.net", size: "tall", flavor: "Almond", strength: "80" },
        { coffee: "Pumpkin Spice Latte, Nonfat, 6cm of Foam, No Syrup, Two Splenda Packets, Stirred for 4.8 Seconds, Two Lids", emailAddress: "singlesoccermom65@sixkidsandadog.com", size: "grande", flavor: "None", strength: "100" },
        { coffee: "Coffee", emailAddress: "bob@nofrills.com", size: "short", flavor: "Mocha", strength: "60" },
        { coffee: "The Tom Frank", emailAddress: "t.frank@themanhimself.com", size: "tall", flavor: "Mocha", strength: "57" },
        { coffee: "Vanilla Frappuchino", emailAddress: "icequeen92@nevertoocold.net", size: "tall", flavor: "None", strength: "25" },
    ];
    var promiseArray = testData.map(function(item) {
        return $.post(apiAddress, item);
    });
    var bigPromise = Promise.all(promiseArray);
    bigPromise.then(orderTracker.loadOrderList());
    bigPromise.catch(function(reason) {
        console.log(`Populate failed: ${reason}`);
    });
});

// Once everything else is set, load server data!
orderTracker.loadOrderList();
