document.addEventListener('DOMContentLoaded', () => {
    // Lógica específica para la página de Recursos (filtrado por categorías)

    const categoryButtons = document.querySelectorAll('.category-btn');
    const recursoCards = document.querySelectorAll('.recurso-card');

    if (categoryButtons.length > 0 && recursoCards.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase 'active' de todos los botones y añadirla al clicado
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterCategory = button.dataset.category;

                recursoCards.forEach(card => {
                    const cardCategories = card.dataset.category.split(' '); // Obtiene todas las categorías de la tarjeta
                    
                    if (filterCategory === 'all' || cardCategories.includes(filterCategory)) {
                        card.style.display = 'flex'; // Muestra la tarjeta
                    } else {
                        card.style.display = 'none'; // Oculta la tarjeta
                    }
                });
            });
        });
    }

    console.log('Script de recursos.js cargado y listo.');

    // La lógica del modal de descarga ya está en script.js (global),
    // por lo que no es necesario duplicarla aquí. Asegúrate de que script.js
    // se cargue primero en recursos.html.
});