const express = require('express');
const app = express();
const port = 3000; 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
    res.render('main')
})
app.post('/payment', (req, res) => {
    // Handle payment logic here (if needed)
    res.render('payment');
});
app.post('/complete-payment', (req, res) => {
    try {
        const selectedPayment = req.body.payment;

        if (!selectedPayment) {
            throw new Error('Please select a payment method');
        }

        // Your logic for processing the payment

        // Assuming the payment is successful, render the success page
        res.render('paymentsuccess');
    } catch (error) {
        console.error(error);
        res.status(400).render('error', { errorMessage: error.message });
    }
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
