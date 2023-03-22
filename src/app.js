const elements = {
  main: document.querySelector("[data-main]"),
};

const templates = {
  productOverview: document.querySelector("[data-template-product-overview]"),
  productDetail: document.querySelector("[data-template-product-detail]"),
};

const handleViewProduct = (product) => {
  renderProductDetail();

  window.history.pushState(
    product.slug,
    `${product.name} - ${product.brand}`,
    `/product/${product.slug}`
  );

  document
    .querySelector("[data-product-detail]")
    .querySelector("[data-product-name]").innerHTML = product.name;
  document
    .querySelector("[data-product-detail]")
    .querySelector("[data-product-brand]").innerHTML = product.brand;
  document
    .querySelector("[data-product-detail]")
    .querySelector("[data-product-price]").innerHTML = product.price;
  document
    .querySelector("[data-product-detail]")
    .querySelector("[data-product-description]").innerHTML =
    product.description;
  document
    .querySelector("[data-product-detail]")
    .querySelector("[data-product-image]").src = product.image;
  document
    .querySelector("[data-product-detail]")
    .querySelector(
      "[data-product-image]"
    ).style.viewTransitionName = `${product.slug}-image`;
  document
    .querySelector("[data-product-detail]")
    .querySelector(
      "[data-product-details]"
    ).style.viewTransitionName = `${product.slug}-details`;
};

const addEventListenersForProduct = (productElement, product) => {
  const productLinkElements = productElement.querySelector(
    "[data-product-link]"
  );

  productLinkElements.addEventListener("click", (e) => {
    e.preventDefault();

    if (!document.startViewTransition) {
      handleViewProduct(product);
    } else {
      document.startViewTransition(() => {
        handleViewProduct(product);
      });
    }
  });
};

const getProductForProductElement = (productElement) => ({
  slug: productElement.dataset.product,
  name: productElement.querySelector("[data-product-name]").textContent,
  brand: productElement.querySelector("[data-product-brand]").textContent,
  price: productElement.querySelector("[data-product-price]").textContent,
  description: productElement.querySelector("[data-product-description]")
    .textContent,
  image: productElement.querySelector("[data-product-image]").src,
});

const renderProductOverview = () => {
  const productOverviewNode = templates.productOverview.content.cloneNode(true);

  elements.main.innerHTML = null;
  elements.main.appendChild(productOverviewNode);

  [...document.querySelectorAll("[data-product]")].forEach((productElement) => {
    const product = getProductForProductElement(productElement);

    addEventListenersForProduct(productElement, product);
  });
};

const renderProductDetail = () => {
  const productDetailNode = templates.productDetail.content.cloneNode(true);

  elements.main.innerHTML = null;
  elements.main.appendChild(productDetailNode);
};

const handleSPARouting = () => {
  [...document.querySelectorAll("[data-product]")].forEach((productElement) => {
    const product = getProductForProductElement(productElement);

    addEventListenersForProduct(productElement, product);
  });

  if (window.location.pathname.startsWith("/product/")) {
    window.history.replaceState({ page: "" }, "", "/");
  }

  window.addEventListener("popstate", () => {
    if (!document.startViewTransition) {
      renderProductOverview();
    } else {
      document.startViewTransition(() => {
        renderProductOverview();
      });
    }
  });
};

renderProductOverview();
handleSPARouting();
