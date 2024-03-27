const router = require('express').Router()
const { STRIPE_SECRET_KEY, CLIENT_URL } = process.env
const stripe = require('stripe')(STRIPE_SECRET_KEY)

router.post('/create-checkout-session', async (req, res, next) => {
    // try {

    const { cart } = req.body
    let line_items = []
    if (cart.length) {
        line_items = cart.map(({ name, price, image, quantity }) => ({
            price_data: {
                currency: 'usd',
                unit_amount: price * 100,
                product_data: {
                    name: name,
                    images: [image]
                }
            },
            quantity: quantity
        }))
    }
    // console.log(await stripe.checkout)
    const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: line_items,
        mode: 'payment',
        return_url: `${CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    })

    res.send({ clientSecret: session.client_secret })
    // } catch (error) {
    //     next(error)
    // }
})

router.get('/session-status', async (req, res, next) => {
    try {
        const { session_id } = req.query
        const session = await stripe.checkout.sessions.retrieve(session_id)
        console.log(session)

        if (session) {
            res.send({
                status: session.status,
                customer_email: session.customer_details.email
            })
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router