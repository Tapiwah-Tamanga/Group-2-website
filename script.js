let slideIndices = {
    'food-slideshow': 1,
    'drinks-slideshow': 1
};

function initSlideshows() {
    if (document.getElementById('food-slideshow')) {
        showSlides(1, 'food-slideshow');
        setInterval(() => plusSlides(1, 'food-slideshow'), 2000);
    }
    if (document.getElementById('drinks-slideshow')) {
        showSlides(1, 'drinks-slideshow');
        setInterval(() => plusSlides(1, 'drinks-slideshow'), 2000);
    }
}

function plusSlides(n, slideshowId) {
    showSlides(slideIndices[slideshowId] += n, slideshowId);
}

function showSlides(n, slideshowId) {
    let i;
    let container = document.getElementById(slideshowId);
    if (!container) return;

    let slides = container.getElementsByClassName("slide");
    if (slides.length === 0) return;

    if (n > slides.length) { slideIndices[slideshowId] = 1 }
    if (n < 1) { slideIndices[slideshowId] = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndices[slideshowId] - 1].style.display = "block";
}

document.addEventListener("DOMContentLoaded", initSlideshows);

var names = ["Jollof Rice", "Chicken Wrap", "Pizza", "Seasoned Chips", "Fanta"];
var emojis = ["<img src='rice and chicken strips.jpg' alt='Rice'>", "<img src='chicken wrap.jpg' alt='Chicken'>", "<img src='pepperoni pizza.jpg' alt='Pizza'>", "<img src='seasoned chips.jpg' alt='Chips'>", "<img src='fanta orange.jpg' alt='Drink'>"];
var prices = [3500, 4200, 19000, 2800, 1500];
var quantities = [0, 0, 0, 0, 0];

function changeQty(id, change) {
    var index = id - 1;
    quantities[index] = quantities[index] + change;
    if (quantities[index] < 0) {
        quantities[index] = 0;
    }
    document.getElementById("qty" + id).textContent = quantities[index];
    updateSummary();
}

function updateSummary() {
    var linesHTML = "";
    var total = 0;
    var anyAdded = false;

    for (var i = 0; i < 5; i++) {
        if (quantities[i] > 0) {
            anyAdded = true;
            var subtotal = quantities[i] * prices[i];
            total = total + subtotal;
            linesHTML += '<div class="summary-line">'
                + '<span>' + emojis[i] + ' ' + names[i] + ' x ' + quantities[i] + '</span>'
                + '<span>MK ' + subtotal.toLocaleString() + '</span>'
                + '</div>';
        }
    }

    document.getElementById("empty-msg").style.display = anyAdded ? "none" : "block";
    document.getElementById("summary-lines").innerHTML = linesHTML;

    var totalRow = document.getElementById("summary-total");
    if (anyAdded) {
        totalRow.style.display = "flex";
        document.getElementById("total-display").textContent = "MK " + total.toLocaleString();
    } else {
        totalRow.style.display = "none";
    }
}

function toggleAddress() {
    var type = document.getElementById("order-type").value;
    var addressGroup = document.getElementById("address-group");
    addressGroup.style.display = (type === "pickup") ? "none" : "block";
}

function placeOrder() {
    var name = document.getElementById("name").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var email = document.getElementById("email").value.trim();
    var type = document.getElementById("order-type").value;
    var address = document.getElementById("address").value.trim();

    var anyAdded = quantities.some(function(q) { return q > 0; });

    if (!anyAdded) { alert("Please add at least one item using the + button."); return; }
    if (name === "") { alert("Please enter your name."); return; }
    if (phone === "") { alert("Please enter your phone number."); return; }
    if (email === "") { alert("Please enter your email address."); return; }
    if (type === "delivery" && address === "") { alert("Please enter your delivery address."); return; }

    document.getElementById("success-msg").style.display = "block";
    document.getElementById("success-msg").scrollIntoView({ behavior: "smooth" });
}

function sendMessage() {
    var name = document.getElementById("contact-name").value.trim();
    var email = document.getElementById("contact-email").value.trim();
    var phone = document.getElementById("contact-phone").value.trim();
    var subject = document.getElementById("contact-subject").value.trim();
    var message = document.getElementById("contact-message").value.trim();

    if (name === "") { alert("Please enter your full name."); return; }
    if (email === "") { alert("Please enter your email address."); return; }
    if (phone === "") { alert("Please enter your phone number."); return; }
    if (subject === "") { alert("Please enter a subject."); return; }
    if (message === "") { alert("Please enter your message."); return; }

    document.getElementById("success-msg").style.display = "block";
    document.getElementById("success-msg").scrollIntoView({ behavior: "smooth" });
}
