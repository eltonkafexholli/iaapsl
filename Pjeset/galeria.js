document.write(`
<!DOCTYPE html>
<html lang="sq">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Scoped styles with unique class names to prevent conflicts */
        .school-gallery-container {
            background: linear-gradient(135deg, #f5f6fa 60%, #e9e6f7 100%);
            padding: 8rem 2rem;
            position: relative;
            z-index: 1;
            font-family: Arial, sans-serif;
        }

        .school-gallery-container::before {
            content: '';
            position: absolute;
            inset: 0;
            background: url('data:image/svg+xml;utf8,<svg width="100%25" height="100%25" xmlns="http://www.w3.org/2000/svg"><rect width="100%25" height="100%25" fill="none"/><circle cx="30" cy="30" r="1.5" fill="%23d4af37" fill-opacity="0.08"/><circle cx="80" cy="80" r="1.5" fill="%231a4b84" fill-opacity="0.06"/></svg>');
            opacity: 0.5;
            z-index: 0;
            pointer-events: none;
        }

        /* Professional Masonry Gallery */
        .school-masonry-gallery {
            column-count: 4;
            column-gap: 2.5rem;
            max-width: 1400px;
            margin: 0 auto;
            padding: 3rem 0 2rem 0;
        }

        .school-masonry-item {
            break-inside: avoid;
            margin-bottom: 2.5rem;
            background: linear-gradient(135deg, #fff 80%, #f5f6fa 100%);
            border-radius: 2.2rem;
            box-shadow: 0 8px 32px 0 rgba(26,75,132,0.10), 0 2px 8px 0 rgba(212,175,55,0.08);
            overflow: hidden;
            position: relative;
            transition: box-shadow 0.3s, transform 0.3s;
            cursor: pointer;
            animation: schoolMasonryFadeIn 1s cubic-bezier(.4,2,.3,1);
            opacity: 0;
            animation-fill-mode: forwards;
        }

        .school-masonry-item:nth-child(1) { animation-delay: 0.1s; }
        .school-masonry-item:nth-child(2) { animation-delay: 0.2s; }
        .school-masonry-item:nth-child(3) { animation-delay: 0.3s; }
        .school-masonry-item:nth-child(4) { animation-delay: 0.4s; }
        .school-masonry-item:nth-child(5) { animation-delay: 0.5s; }
        .school-masonry-item:nth-child(6) { animation-delay: 0.6s; }
        .school-masonry-item:nth-child(7) { animation-delay: 0.7s; }
        .school-masonry-item:nth-child(8) { animation-delay: 0.8s; }
        .school-masonry-item:nth-child(9) { animation-delay: 0.9s; }
        .school-masonry-item:nth-child(10) { animation-delay: 1s; }

        @keyframes schoolMasonryFadeIn {
            from { opacity: 0; transform: translateY(40px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .school-masonry-item img {
            width: 100%;
            display: block;
            border-radius: 2.2rem;
            transition: transform 0.5s cubic-bezier(.4,2,.3,1), box-shadow 0.3s, filter 0.3s;
            box-shadow: 0 0 0 6px rgba(212,175,55,0.10);
            border: 3px solid transparent;
            background: #fff;
        }

        .school-masonry-item:hover {
            box-shadow: 0 16px 48px 0 rgba(26,75,132,0.18), 0 8px 32px 0 rgba(212,175,55,0.13);
            transform: translateY(-10px) scale(1.03);
            z-index: 2;
        }

        .school-masonry-item:hover img {
            transform: scale(1.08) rotate(-1deg);
            filter: brightness(1.10) saturate(1.18);
            box-shadow: 0 0 0 12px #d4af3744, 0 16px 48px rgba(26,75,132,0.13);
            border: 3px solid #d4af37;
        }

        .school-masonry-caption {
            position: absolute;
            left: 0; right: 0; bottom: 0;
            background: linear-gradient(0deg, rgba(26,75,132,0.85) 60%, transparent 100%);
            color: #fff;
            font-size: 1.2rem;
            font-weight: 600;
            padding: 1.2rem 1.5rem 1.2rem 1.5rem;
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.3s, transform 0.3s;
            border-bottom-left-radius: 2.2rem;
            border-bottom-right-radius: 2.2rem;
            pointer-events: none;
        }

        .school-masonry-item:hover .school-masonry-caption {
            opacity: 1;
            transform: translateY(0);
        }

        /* Gallery Pagination Styles */
        .school-gallery-pagination {
            text-align: center;
            margin: 2rem 0 1rem 0;
        }

        .school-gallery-page-btn {
            margin: 0 6px 0 0;
            padding: 6px 14px;
            border-radius: 8px;
            border: none;
            background: #eee;
            color: #1a4b84;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s, color 0.2s;
        }

        .school-gallery-page-btn:hover {
            background: #d4af37;
            color: #fff;
        }

        .school-gallery-page-btn.active,
        .school-gallery-page-btn:focus {
            background: #1a4b84;
            color: #fff;
            outline: none;
        }

        /* Modal Styles */
        .school-gallery-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            justify-content: center;
            align-items: center;
        }

        .school-gallery-modal-img {
            max-width: 90%;
            max-height: 90vh;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }

        .school-gallery-modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            color: white;
            font-size: 30px;
            cursor: pointer;
            background: none;
            border: none;
            padding: 10px;
        }

        /* Section Header Styles */
        .school-section-header {
            text-align: center;
            margin-bottom: 6rem;
        }

        .school-section-title {
            font-size: 4rem;
            font-weight: 800;
            letter-spacing: -1px;
            margin-bottom: 2rem;
            position: relative;
            display: inline-block;
            color: #1a4b84;
        }

        .school-section-divider {
            width: 100px;
            height: 4px;
            background: #d4af37;
            margin: 0 auto;
        }

        @media only screen and (max-width: 600px) { 
            .school-section-title {
                font-size: 2.2rem;
                font-weight: 800;
                letter-spacing: -1px;
                margin-bottom: 2rem;
                position: relative;
                display: inline-block;
                color: #1a4b84;
            }

            .school-masonry-gallery {
                column-count: 1 !important;
                column-gap: 1.5rem !important;
                padding: 1rem !important;
            }

            .school-masonry-item {
                width: 100% !important;
                margin-bottom: 1.5rem !important;
                border-radius: 1rem !important;
            }

            .school-masonry-item img {
                width: 100% !important;
                height: 300px !important;
                object-fit: cover !important;
                border-radius: 1rem !important;
            }

            .school-masonry-caption {
                display: none !important;
            }

            .school-gallery-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 9999;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .school-gallery-modal-img {
                max-width: 100%;
                max-height: 80vh;
                object-fit: contain;
                border-radius: 1rem;
                margin-bottom: 1rem;
            }

            .school-gallery-modal-caption {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background: rgba(0, 0, 0, 0.8);
                color: #fff;
                padding: 1rem;
                text-align: center;
                font-size: 1.1rem;
                z-index: 10000;
            }

            .school-gallery-pagination {
                margin: 1rem 0 !important;
            }

            .school-gallery-page-btn {
                padding: 0.5rem 1rem !important;
                font-size: 1rem !important;
                margin: 0 0.3rem !important;
            }
        }
    </style>
</head>
<body>
    <!-- This is the container where the gallery will be inserted -->
    <div id="school-gallery-container"></div>

    <script>
        // Create a namespace for our gallery to avoid conflicts
        const SchoolGallery = {
            // Gallery data
           images: [
    { src: 'images/galeria/1.png', caption: '', desc: 'Përshkrimi i aktivitetit të parë' },
    { src: 'images/galeria/2.png', caption: '', desc: 'Përshkrimi i aktivitetit të dytë' },
    { src: 'images/galeria/3.png', caption: '', desc: 'Përshkrimi i aktivitetit të tretë' },
    { src: 'images/galeria/4.png', caption: '', desc: 'Përshkrimi i aktivitetit të katërt' },
    { src: 'images/galeria/5.png', caption: '', desc: 'Përshkrimi i aktivitetit të pestë' },
    { src: 'images/galeria/6.png', caption: '', desc: 'Përshkrimi i aktivitetit të gjashtë' },
    { src: 'images/galeria/7.png', caption: '', desc: 'Përshkrimi i aktivitetit të shtatë' },
    { src: 'images/galeria/8.png', caption: '', desc: 'Përshkrimi i aktivitetit të tetë' },
    { src: 'images/galeria/9.png', caption: '', desc: 'Përshkrimi i aktivitetit të nëntë' },
    { src: 'images/galeria/10.png', caption: '', desc: 'Përshkrimi i aktivitetit të dhjetë' },
    { src: 'images/galeria/11.png', caption: '', desc: 'Përshkrimi i aktivitetit të njëmbëdhjetë' },
    { src: 'images/galeria/12.png', caption: '', desc: 'Përshkrimi i aktivitetit të dymbëdhjetë' },
    { src: 'images/galeria/13.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/14.png', caption: '', desc: 'Përshkrimi i aktivitetit të katërmbëdhjetë' },
    { src: 'images/galeria/15.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/16.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/17.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/18.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/19.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/20.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/21.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/22.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/23.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/24.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/25.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/26.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/27.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/28.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/29.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/30.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/31.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/32.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/33.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/34.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/35.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/36.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/37.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/38.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/39.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/40.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/41.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/42.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/43.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/44.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/45.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/46.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/47.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/48.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' },
    { src: 'images/galeria/49.png', caption: '', desc: 'Përshkrimi i aktivitetit të trembëdhjetë' }
],

            
            // Configuration
            config: {
                imagesPerPage: 10,
                currentPage: 1,
                containerId: 'school-gallery-container'
            },
            
            // Initialize the gallery
            init: function() {
                // Create the gallery structure
                this.createGalleryStructure();
                
                // Shuffle images
                this.shuffleArray(this.images);
                
                // Calculate total pages
                this.config.totalPages = Math.ceil(this.images.length / this.config.imagesPerPage);
                
                // Render the gallery
                this.renderGalleryPage(this.config.currentPage);
                this.renderPagination();
                
                // Attach event listeners
                this.attachEventListeners();
            },
            
            // Create the gallery HTML structure
            createGalleryStructure: function() {
                const container = document.getElementById(this.config.containerId);
                if (!container) return;
                
                // Create gallery section
                const gallerySection = document.createElement('section');
                gallerySection.className = 'school-gallery-container';
                
                // Create container
                const innerContainer = document.createElement('div');
                innerContainer.className = 'container';
                
                // Create header
                const header = document.createElement('div');
                header.className = 'school-section-header';
                
                const title = document.createElement('h2');
                title.className = 'school-section-title';
                title.textContent = 'Galeria e Aktiviteteve Shkollore';
                
                const divider = document.createElement('div');
                divider.className = 'school-section-divider';
                
                const pagination = document.createElement('div');
                pagination.id = 'school-gallery-pagination';
                
                // Create gallery
                const gallery = document.createElement('div');
                gallery.id = 'school-masonry-gallery';
                gallery.className = 'school-masonry-gallery';
                
                // Create modal
                const modal = document.createElement('div');
                modal.id = 'school-gallery-modal';
                modal.className = 'school-gallery-modal';
                
                const modalImg = document.createElement('img');
                modalImg.id = 'school-gallery-modal-img';
                modalImg.className = 'school-gallery-modal-img';
                
                const modalCaption = document.createElement('div');
                modalCaption.className = 'school-gallery-modal-caption';
                
                const modalClose = document.createElement('button');
                modalClose.id = 'school-gallery-modal-close';
                modalClose.className = 'school-gallery-modal-close';
                modalClose.innerHTML = '&times;';
                
                // Assemble the structure
                header.appendChild(title);
                header.appendChild(divider);
                header.appendChild(pagination);
                
                innerContainer.appendChild(header);
                innerContainer.appendChild(gallery);
                
                modal.appendChild(modalImg);
                modal.appendChild(modalCaption);
                modal.appendChild(modalClose);
                
                gallerySection.appendChild(innerContainer);
                
                container.appendChild(gallerySection);
                document.body.appendChild(modal);
            },
            
            // Fisher-Yates shuffle
            shuffleArray: function(array) {
                // First shuffle the first 10 images among themselves
                for (let i = 9; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                
                // Then shuffle the remaining images
                for (let i = array.length - 1; i > 10; i--) {
                    const j = Math.floor(Math.random() * (i - 10 + 1)) + 10;
                    [array[i], array[j]] = [array[j], array[i]];
                }
            },
            
            // Render a page of the gallery
            renderGalleryPage: function(page) {
                const startIdx = (page - 1) * this.config.imagesPerPage;
                let images;
                
                if (page === 1) {
                    // For first page, show the shuffled first 10 images
                    images = this.images.slice(0, 10);
                } else {
                    // For other pages, show the shuffled remaining images
                    images = this.images.slice(startIdx, startIdx + this.config.imagesPerPage);
                }
                
                const galleryHtml = images.map(img =>
                    '<div class="school-masonry-item"><img src="' + img.src + '" alt="' + img.caption + '" data-caption="' + img.caption + '"><div class="school-masonry-caption">' + img.caption + '</div></div>'
                ).join('');
                
                const gallery = document.getElementById('school-masonry-gallery');
                if (gallery) {
                    gallery.innerHTML = galleryHtml;
                    this.attachGalleryPopups();
                }
            },
            
            // Render pagination
            renderPagination: function() {
                let html = '<div class="school-gallery-pagination">';
                for (let i = 1; i <= this.config.totalPages; i++) {
                    html += '<button class="school-gallery-page-btn' + (i === this.config.currentPage ? ' active' : '') + '" data-page="' + i + '">' + i + '</button>';
                }
                html += '</div>';
                
                const pagination = document.getElementById('school-gallery-pagination');
                if (pagination) {
                    pagination.innerHTML = html;
                    
                    // Add click handlers directly to the buttons
                    document.querySelectorAll('.school-gallery-page-btn').forEach(btn => {
                        btn.onclick = (e) => {  
                            this.config.currentPage = parseInt(e.target.getAttribute('data-page'));
                            this.renderGalleryPage(this.config.currentPage);
                            this.renderPagination();
                        };
                    });
                }
            },
            
            // Attach event listeners
            attachEventListeners: function() {
                // Modal close button
                const modalClose = document.getElementById('school-gallery-modal-close');
                if (modalClose) {
                    modalClose.addEventListener('click', () => {
                        this.closeModal();
                    });
                }
                
                // Modal background click
                const modal = document.getElementById('school-gallery-modal');
                if (modal) {
                    modal.addEventListener('click', (e) => {
                        if (e.target === modal) {
                            this.closeModal();
                        }
                    });
                }
            },
            
            // Attach popup functionality to gallery images
            attachGalleryPopups: function() {
                const galleryImages = document.querySelectorAll('.school-masonry-gallery img');
                const modal = document.getElementById('school-gallery-modal');
                const modalImg = document.getElementById('school-gallery-modal-img');
                
                if (galleryImages.length && modal && modalImg) {
                    galleryImages.forEach(img => {
                        img.addEventListener('click', () => {
                            modalImg.src = img.src;
                            modalImg.alt = img.alt;
                            modal.style.display = 'flex';
                            document.body.style.overflow = 'hidden';
                        });
                    });
                }
            },
            
            // Close the modal
            closeModal: function() {
                const modal = document.getElementById('school-gallery-modal');
                const modalImg = document.getElementById('school-gallery-modal-img');
                
                if (modal && modalImg) {
                    modal.style.display = 'none';
                    modalImg.src = '';
                    document.body.style.overflow = '';
                }
            }
        };
        
        // Initialize the gallery when the DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            SchoolGallery.init();
        });

        // Update the JavaScript part to handle captions in modal
        document.addEventListener('DOMContentLoaded', function() {
            const gallery = document.querySelector('.school-masonry-gallery');
            const modal = document.querySelector('.school-gallery-modal');
            const modalImg = document.querySelector('.school-gallery-modal-img');
            const modalCaption = document.querySelector('.school-gallery-modal-caption');
            const closeBtn = document.querySelector('.school-gallery-modal-close');

            if (gallery) {
                gallery.addEventListener('click', function(e) {
                    if (e.target.tagName === 'IMG') {
                        modal.style.display = 'flex';
                        modalImg.src = e.target.src;
                        modalCaption.textContent = e.target.getAttribute('data-caption');
                        document.body.style.overflow = 'hidden';
                    }
                });
            }

            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                });
            }

            if (modal) {
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        modal.style.display = 'none';
                        document.body.style.overflow = '';
                    }
                });
            }
        });
    </script>
</body>
</html>
`);	