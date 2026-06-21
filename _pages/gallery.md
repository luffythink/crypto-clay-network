---
layout: page
title: 生活
description: 记录陶艺、器物、窑火和共同生活中值得被保留的片刻。
permalink: /life/
nav: true
nav_order: 4
---

<div class="gallery">
  {% for image in site.data.gallery %}
    {% capture gallery_description %}
      <div class="gallery-lightbox-description">
        <p>{{ image.caption }}</p>
        <p class="gallery-lightbox-meta">
          {% if image.category %}{{ image.category }}{% endif %}
          {% if image.date %}&nbsp;·&nbsp;{{ image.date }}{% endif %}
          {% if image.location %}&nbsp;·&nbsp;{{ image.location }}{% endif %}
          {% if image.credit %}<br>图片：{{ image.credit }}{% endif %}
        </p>
      </div>
    {% endcapture %}
    <article class="gallery-item gallery-item--{{ image.orientation | default: 'landscape' }}{% if image.featured %} gallery-item--featured{% endif %}">
      <a href="{{ '/assets/img/gallery/' | append: image.url | relative_url }}" 
         class="gallery-image-link glightbox" 
         data-title="{{ image.title }}" 
         data-description="{{ gallery_description | strip_newlines | escape }}">
        <img
          src="{{ '/assets/img/gallery/' | append: image.url | relative_url }}"
          alt="{{ image.alt }}"
          loading="lazy"
        >
      </a>
      <div class="gallery-item-content">
        <p class="gallery-item-category">{{ image.category }}</p>
        <h2>{{ image.title }}</h2>
        <p class="gallery-item-caption">{{ image.caption }}</p>
        <p class="gallery-item-meta">
          {{ image.date }}
          {% if image.location %}&nbsp;·&nbsp;{{ image.location }}{% endif %}
          {% if image.credit %}&nbsp;·&nbsp;{{ image.credit }}{% endif %}
        </p>
      </div>
    </article>
  {% endfor %}
</div>

<link href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    const lightbox = GLightbox({
      selector: '.glightbox',
      skin: 'clean',
      touchNavigation: true,
      loop: true,
      openEffect: 'zoom',
      closeEffect: 'zoom',
      slideEffect: 'slide',
      descPosition: 'left',
      zoomable: false,
      autoplayVideos: false,
      moreLength: 0
    });
  });
</script>

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
    align-items: start;
  }

  .gallery-item {
    overflow: hidden;
    border: 1px solid var(--global-divider-color);
    border-radius: 10px;
    background: var(--global-bg-color);
  }

  .gallery-item--featured {
    grid-column: 1 / -1;
  }

  .gallery-image-link {
    display: block;
    padding: 0;
    background: #f5f3ef;
  }

  .gallery-image-link img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  .gallery-item:hover .gallery-image-link img {
    transform: scale(1.01);
  }

  .gallery-item-content {
    padding: 1rem 1.1rem 1.1rem;
  }

  .gallery-item-content h2 {
    margin: 0.15rem 0 0.65rem;
    font-size: 1.25rem;
  }

  .gallery-item-category {
    margin: 0;
    color: var(--global-theme-color);
    font-size: 0.8rem;
    font-weight: 600;
  }

  .gallery-item-caption {
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    line-height: 1.65;
  }

  .gallery-item-meta,
  .gallery-lightbox-meta {
    margin: 0;
    color: var(--global-text-color-light);
    font-size: 0.82rem;
  }

  .gallery-lightbox-description p {
    color: inherit;
  }

  .glightbox-clean .gslide-description .gdesc-inner {
    color: #3d3c42;
  }

  .glightbox-clean .gslide-title {
    font-weight: bold;
    color: #3d3c42;
  }

  @media (min-width: 768px) {
    html[data-theme="dark"] .glightbox-clean .gslide-description .gdesc-inner {
      color: #f1ddd8;
      background: #26282e;
    }
    html[data-theme="dark"] .glightbox-clean .gslide-title {
      color: #f1ddd8;
      font-weight: bold;
    }
  }

  .gdesc-inner {
    width: 100%;
    box-sizing: border-box;
  }

  .glightbox-container {
    background: rgba(0, 0, 0, 0.8);
  }

  /* Title in the lightbox */
  .glightbox-clean .gslide-title {
    font-family: var(--bs-body-font-family, "Lato", system-ui, sans-serif);
    font-weight: bold;
    font-size: 1.1rem;
  }

  /* Description/caption in the lightbox */
  .glightbox-clean .gslide-description .gdesc-inner {
    font-family: var(--bs-body-font-family, "Lato", system-ui, sans-serif);
    font-weight: 200;
    font-size: 0.95rem;
    line-height: 1.4;
  }

  @media (max-width: 767px) {
    .gallery {
      grid-template-columns: 1fr;
    }

    .gallery-item--featured {
      grid-column: auto;
    }
  }
</style>
