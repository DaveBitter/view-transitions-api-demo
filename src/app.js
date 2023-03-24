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

  const productDetailElement = document.querySelector("[data-product-detail]");
  const { name, brand, price, description, image, slug } = product;

  productDetailElement.querySelector("[data-product-name]").innerHTML = name;
  productDetailElement.querySelector("[data-product-brand]").innerHTML = brand;
  productDetailElement.querySelector("[data-product-price]").innerHTML = price;
  productDetailElement.querySelector("[data-product-description]").innerHTML =
    description;
  productDetailElement.querySelector("[data-product-image]").src = image;
  productDetailElement.querySelector(
    "[data-product-image]"
  ).style.viewTransitionName = `${slug}-image`;
  productDetailElement.querySelector(
    "[data-product-details]"
  ).style.viewTransitionName = `${slug}-details`;
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
