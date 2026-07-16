const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    button.addEventListener("click", () => {

        const isOpen = item.classList.contains("active");

        faqItems.forEach(faq => {

            faq.classList.remove("active");

            faq.querySelector(".faq-question")
                .setAttribute("aria-expanded", "false");

            faq.querySelector(".faq-answer").style.maxHeight = null;

        });

        if (!isOpen) {

            item.classList.add("active");

            button.setAttribute("aria-expanded", "true");

            answer.style.maxHeight = answer.scrollHeight + "px";

        }

    });

});

/* ==========================================================================
   NOTE: the "Featured Collection" grid (#productGrid) is rendered by
   js/products.js directly from js/products-data.js (CLARUS_PRODUCTS),
   filtered to featured:true items. This keeps Home and the Products
   page permanently in sync — there is no separate product list here
   anymore, so adding one product object to products-data.js is enough
   for it to show up everywhere it should.
   ========================================================================== */
