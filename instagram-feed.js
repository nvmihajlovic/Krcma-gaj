// ================================
// Instagram Feed Functionality
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const instagramGrid = document.getElementById('instagramGrid');
    
    if (!instagramGrid) return;

    // Instagram posts data (mock data - replace with real Instagram API)
    const posts = [
        {
            image: 'images/menu1.webp',
            likes: 234,
            caption: 'Пршута домаће производње 🥓'
        },
        {
            image: 'images/menu2.webp',
            likes: 189,
            caption: 'Јагњетина под сачем 🍖'
        },
        {
            image: 'images/menu3.webp',
            likes: 312,
            caption: 'Традиционалне пите 🥧'
        },
        {
            image: 'images/menu4.webp',
            likes: 278,
            caption: 'Месне прљаве 🍽️'
        },
        {
            image: 'images/gallery1.webp',
            likes: 445,
            caption: 'Етно амбијент наше крчме 🏡'
        },
        {
            image: 'images/gallery2.webp',
            likes: 356,
            caption: 'Камин и топла атмосфера 🔥'
        },
        {
            image: 'images/gallery3.webp',
            likes: 298,
            caption: 'Љетња башта 🌿'
        },
        {
            image: 'images/gallery4.webp',
            likes: 267,
            caption: 'Зимски амбијент ❄️'
        },
        {
            image: 'images/gallery5.webp',
            likes: 423,
            caption: 'Сеоски шарм 🌾'
        },
        {
            image: 'images/gallery6.webp',
            likes: 389,
            caption: 'Домаћа ракија 🥃'
        },
        {
            image: 'images/gallery7.webp',
            likes: 412,
            caption: 'Традиција и укус 🍴'
        },
        {
            image: 'images/gallery8.webp',
            likes: 345,
            caption: 'Наш тим 👨‍🍳'
        }
    ];

    // Generate Instagram grid
    function generateInstagramGrid() {
        instagramGrid.innerHTML = '';
        
        posts.forEach((post, index) => {
            const item = document.createElement('div');
            item.className = 'instagram-item';
            item.style.animationDelay = `${index * 0.1}s`;
            
            item.innerHTML = `
                <img src="${post.image}" alt="${post.caption}" loading="lazy" onerror="this.parentElement.style.display='none'">
                <div class="instagram-overlay">
                    <div class="instagram-info">
                        <span class="instagram-likes">
                            <i class="fas fa-heart"></i>
                            ${post.likes}
                        </span>
                        <p class="instagram-caption">${post.caption}</p>
                    </div>
                </div>
            `;
            
            instagramGrid.appendChild(item);
        });
    }

    // Initialize
    generateInstagramGrid();

    // Refresh every 5 minutes (if using real API)
    // setInterval(generateInstagramGrid, 300000);
});
