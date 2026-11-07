import { siteFooter, siteHeader } from "./components/common.js";
import { homePage } from "./pages/home.js";
import { getHomeData } from "./services/home-service.js";

const app = document.querySelector("#app");

async function render() {
  try {
    const data = await getHomeData();
    app.innerHTML = `<div class="site">${siteHeader()}${homePage(data)}${siteFooter()}</div>`;
    const hero = app.querySelector(".hero");
    if (hero) {
      const heroTrack = hero.querySelector("[data-hero-track]");
      const slides = Array.from(hero.querySelectorAll("[data-hero-slide]"));
      const dots = Array.from(hero.querySelectorAll("[data-hero-to]"));
      let activeIndex = 0;
      let timer;
      const showSlide = (index) => {
        activeIndex = index;
        heroTrack.style.transform = `translateX(-${index * 100}%)`;
        slides.forEach((slide, i) => {
          slide.classList.toggle("is-active", i === index);
          slide.setAttribute("aria-hidden", String(i !== index));
          slide.inert = i !== index;
        });
        dots.forEach((dot, i) => {
          dot.classList.toggle("is-active", i === index);
          dot.setAttribute("aria-pressed", String(i === index));
        });
      };
      const stopRotation = () => window.clearInterval(timer);
      const startRotation = () => {
        stopRotation();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        timer = window.setInterval(() => showSlide((activeIndex + 1) % slides.length), 6000);
      };
      dots.forEach((dot) => dot.addEventListener("click", () => {
        showSlide(Number(dot.dataset.heroTo));
        startRotation();
      }));
      hero.addEventListener("pointerenter", stopRotation);
      hero.addEventListener("pointerleave", startRotation);
      hero.addEventListener("focusin", stopRotation);
      hero.addEventListener("focusout", (event) => {
        if (!hero.contains(event.relatedTarget)) startRotation();
      });
      showSlide(0);
      startRotation();
    }
    const storeFinder = app.querySelector("[data-store-finder]");
    if (storeFinder) {
      const filters = Array.from(storeFinder.querySelectorAll("[data-store-filter]"));
      const cards = Array.from(storeFinder.querySelectorAll("[data-store-card]"));
      const mapPins = Array.from(storeFinder.querySelectorAll("[data-region-map]"));
      const storeList = storeFinder.querySelector("[data-store-list]");
      const heading = storeFinder.querySelector("[data-store-list-heading]");
      const visibleCount = storeFinder.querySelector("[data-store-visible-count]");
      const listHint = storeFinder.querySelector("[data-store-list-hint]");
      const mapTitle = storeFinder.querySelector("[data-store-map-title]");
      let activeRegion = "전체";
      let selectedStoreIndex = null;
      const setStoreRegion = (region) => {
        activeRegion = region;
        selectedStoreIndex = null;
        filters.forEach((filter) => {
          const active = filter.dataset.storeFilter === region;
          filter.classList.toggle("is-active", active);
          filter.setAttribute("aria-pressed", String(active));
        });
        mapPins.forEach((pin) => {
          const active = pin.dataset.regionMap === region;
          pin.classList.toggle("is-active", active);
          pin.setAttribute("aria-pressed", String(active));
        });
        cards.forEach((card) => {
          card.hidden = region !== "전체" && card.dataset.region !== region;
          card.classList.remove("is-selected");
          card.querySelector("[data-store-address]").hidden = true;
          const storeButton = card.querySelector("[data-store-open]");
          storeButton.setAttribute("aria-expanded", "false");
          storeButton.innerHTML = '주소 보기 <span aria-hidden="true">⌄</span>';
        });
        const count = cards.filter((card) => !card.hidden).length;
        heading.firstChild.textContent = region === "전체" ? "전국 매장 " : `${region} 매장 `;
        visibleCount.textContent = String(count);
        mapTitle.textContent = region === "전체" ? "전국 매장 안내" : `${region} 매장 안내`;
        listHint.textContent = region === "전체" ? "매장 주소 보기를 누르면 상세 주소를 확인할 수 있습니다." : `${region} 매장에서 주소 보기를 누르면 상세 주소가 표시됩니다.`;
      };
      filters.forEach((filter) => filter.addEventListener("click", () => setStoreRegion(filter.dataset.storeFilter)));
      mapPins.forEach((pin) => pin.addEventListener("click", () => {
        setStoreRegion(pin.dataset.regionMap);
        if (window.matchMedia("(max-width: 800px)").matches) storeList.scrollIntoView({ behavior:"smooth", block:"center" });
      }));
      storeFinder.querySelectorAll("[data-store-open]").forEach((button) => button.addEventListener("click", () => {
        const card = button.closest("[data-store-card]");
        const index = Number(button.dataset.storeOpen);
        if (activeRegion !== card.dataset.region) setStoreRegion(card.dataset.region);
        if (selectedStoreIndex === index) {
          selectedStoreIndex = null;
          card.classList.remove("is-selected");
          card.querySelector("[data-store-address]").hidden = true;
          button.setAttribute("aria-expanded", "false");
          button.innerHTML = '주소 보기 <span aria-hidden="true">⌄</span>';
          listHint.textContent = `${card.dataset.region} 매장에서 주소 보기를 누르면 상세 주소가 표시됩니다.`;
          return;
        }
        selectedStoreIndex = index;
        cards.forEach((item) => {
          const selected = item === card;
          item.classList.toggle("is-selected", selected);
          item.querySelector("[data-store-address]").hidden = !selected;
          const itemButton = item.querySelector("[data-store-open]");
          itemButton.setAttribute("aria-expanded", String(selected));
          itemButton.innerHTML = selected ? '주소 숨기기 <span aria-hidden="true">⌃</span>' : '주소 보기 <span aria-hidden="true">⌄</span>';
        });
        listHint.textContent = `${button.dataset.storeName}의 실제 매장 주소입니다.`;
      }));
    }
    app.querySelectorAll("[data-carousel]").forEach((carousel) => {
      const track = carousel.querySelector(".horizontal-rail__track, .store-carousel__track");
      const region = carousel.closest(".section");
      if (!track || !region) return;
      let deferred = track.querySelector(":scope > template[data-carousel-deferred]");
      const activeCard = () => track.querySelector(":scope > [data-category]:not([hidden])") || track.querySelector(":scope > :not(template):not([hidden])");
      const applyFilter = (card) => {
        const selected = carousel.dataset.activeFilter || "전체";
        if (card.dataset.category) card.hidden = selected !== "전체" && card.dataset.category !== selected;
      };
      const appendBatch = () => {
        if (!deferred) return 0;
        const batch = Array.from(deferred.content.children).slice(0, 4);
        batch.forEach((card) => {
          applyFilter(card);
          track.insertBefore(card, deferred);
        });
        if (!deferred.content.children.length) {
          deferred.remove();
          deferred = null;
        }
        return batch.length;
      };
      const cardStep = () => {
        const card = activeCard();
        return card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : 0;
      };
      const fillViewport = () => {
        let safety = 0;
        while (deferred && track.scrollWidth <= carousel.clientWidth && safety++ < 25) {
          if (!appendBatch()) break;
        }
      };
      fillViewport();
      const advance = (direction) => {
        const step = cardStep();
        if (!step) return;
        const end = track.scrollWidth - carousel.clientWidth;
        if (direction > 0 && carousel.scrollLeft >= end - 2) {
          if (appendBatch()) carousel.scrollBy({ left: step, behavior: "smooth" });
          else carousel.scrollTo({ left: 0, behavior: "smooth" });
        }
        else if (direction < 0 && carousel.scrollLeft <= 2) {
          while (appendBatch()) {}
          carousel.scrollTo({ left: track.scrollWidth - carousel.clientWidth, behavior: "smooth" });
        }
        else carousel.scrollBy({ left: step * direction, behavior: "smooth" });
      };
      carousel.addEventListener("scroll", () => {
        if (deferred && track.scrollWidth - carousel.scrollLeft - carousel.clientWidth < cardStep() * 2) appendBatch();
      }, { passive: true });
      region.querySelector("[data-carousel-prev]")?.addEventListener("click", () => advance(-1));
      region.querySelector("[data-carousel-next]")?.addEventListener("click", () => advance(1));
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let timer = window.setInterval(() => advance(1), 4800);
      const pause = () => window.clearInterval(timer);
      const resume = () => { window.clearInterval(timer); timer = window.setInterval(() => advance(1), 4800); };
      region.addEventListener("pointerenter", pause);
      region.addEventListener("pointerleave", resume);
      region.addEventListener("focusin", pause);
      region.addEventListener("focusout", resume);
    });
    app.querySelectorAll(".filter-pills").forEach((group) => {
      group.addEventListener("click", (event) => {
        const button = event.target.closest(".filter-pill");
        if (!button) return;
        group.querySelectorAll(".filter-pill").forEach((pill) => pill.classList.toggle("is-active", pill === button));
        const selected = button.textContent.trim();
        const rail = group.closest(".section")?.querySelector("[data-carousel]");
        if (rail) rail.dataset.activeFilter = selected;
        const track = rail?.querySelector(".horizontal-rail__track");
        let deferred = track?.querySelector(":scope > template[data-carousel-deferred]");
        while (selected !== "전체" && track && deferred && !Array.from(track.children).some((card) => card.dataset.category === selected)) {
          const batch = Array.from(deferred.content.children).slice(0, 4);
          batch.forEach((card) => track.insertBefore(card, deferred));
          if (!deferred.content.children.length) { deferred.remove(); deferred = null; }
        }
        rail?.querySelectorAll("[data-category]").forEach((card) => {
          card.hidden = selected !== "전체" && card.dataset.category !== selected;
        });
        if (rail) rail.scrollTo({ left: 0, behavior: "smooth" });
        if (rail) {
          let deferred = track?.querySelector(":scope > template[data-carousel-deferred]");
          let safety = 0;
          while (deferred && track.scrollWidth <= rail.clientWidth && safety++ < 25) {
            const batch = Array.from(deferred.content.children).slice(0, 4);
            batch.forEach((card) => {
              card.hidden = selected !== "전체" && card.dataset.category !== selected;
              track.insertBefore(card, deferred);
            });
            if (!deferred.content.children.length) { deferred.remove(); deferred = null; }
          }
        }
      });
    });
  } catch (error) {
    console.error(error);
    app.innerHTML = `<main class="site"><p role="alert">페이지 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p></main>`;
  }
}

render();
