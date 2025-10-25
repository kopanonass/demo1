// Show register page
function showRegister(){
    document.getElementById('loginBox').style.display='none';
    document.getElementById('registerBox').style.display='block';
}

// Enter dashboard (Phase 2)
function enterDashboard(){
    document.getElementById('authOverlay').style.display='none';
    document.getElementById('dashboard').style.display='flex';
}

// Switch sections in dashboard
function showSection(id){
    document.querySelectorAll('.card-section').forEach(s=>s.style.display='none');
    document.getElementById(id).style.display='block';
}

// Paystack payment integration
document.getElementById("payButton").addEventListener("click", function(event){
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const cell = document.getElementById("cell").value;
    const amount = document.getElementById("amount").value.replace("R","");

    const amountInCents = parseFloat(amount) * 100;

    let handler = PaystackPop.setup({
        key: 'pk_test_37f6e17a87a1b9c58710566f532eb835a9e327ab', // your public key
        email: email,
        amount: amountInCents,
        currency: 'ZAR',
        ref: 'PS' + Math.floor(Math.random() * 1000000000 + 1),
        metadata: {
            custom_fields: [
                { display_name: "Full Name", variable_name: "full_name", value: name },
                { display_name: "Cell Number", variable_name: "cell_number", value: cell }
            ]
        },
        callback: function(response){
            alert('Payment Successful. Reference: ' + response.reference);
            enterDashboard(); // open dashboard after successful payment
        },
        onClose: function(){
            alert('Payment window closed.');
        }
    });

    handler.openIframe();
});
