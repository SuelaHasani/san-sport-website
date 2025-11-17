$(document).ready(function () {
    let total = 0;

    // Add item to cart
    $(".add-btn").click(function () {
        let item = $(this).closest('.item');
        let name = item.data("name");
        let price = parseFloat(item.data("price"));

        $("#cart-list").append(`
            <li data-price="${price}">
                ${name} - $${price}
                <button class="remove-btn">Remove</button>
            </li>
        `);

        total += price;
        $("#total").text(total);
    });

    // Remove item from cart
    $("#cart-list").on("click", ".remove-btn", function () {
        let li = $(this).closest("li");
        let price = parseFloat(li.data("price"));

        total -= price;
        $("#total").text(total);

        li.remove();
    });

    // Checkout open
    $("#checkout-btn").click(function () {
        $("#checkout-total").text(total);
        $("#checkout-modal").fadeIn(200);
    });

    // Close checkout
    $("#close-checkout").click(function () {
        $("#checkout-modal").fadeOut(200);
    });

    // Dark mode toggle (press D)
    $(document).on("keydown", function (e) {
        if (e.key.toLowerCase() === "d") {
            $("body").toggleClass("dark");
        }
    });
});

