 const clickableImgs = document.querySelectorAll('.clickable-img');
    clickableImgs.forEach(img => {
        img.addEventListener('click', () => {
            const target = img.getAttribute('data-target');
            if (target) window.location.href = target;
        });
        img.style.cursor = 'pointer';
    });