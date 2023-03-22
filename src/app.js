const elements = {
  productOverview: document.querySelector("[data-product-overview]"),
  productDetail: document.querySelector("[data-product-detail]"),
  products: [...document.querySelectorAll("[data-product]")],
};

const handleViewProduct = (product) => {
  window.history.pushState(
    product.slug,
    `${product.name} - ${product.brand}`,
    `/product/${product.slug}`
  );

  elements.productDetail.querySelector("[data-product-name]").innerHTML =
    product.name;
  elements.productDetail.querySelector("[data-product-brand]").innerHTML =
    product.brand;
  elements.productDetail.querySelector("[data-product-price]").innerHTML =
    product.price;
  elements.productDetail.querySelector("[data-product-description]").innerHTML =
    product.description;
  elements.productDetail.querySelector("[data-product-image]").src =
    product.image;

  elements.productOverview.dataset.isVisible = "false";
  elements.productDetail.dataset.isVisible = "true";
};

const addEventListenersForProduct = (productElement, product) => {
  const productLinkElements = productElement.querySelector(
    "[data-product-link]"
  );

  productLinkElements.addEventListener("click", (e) => {
    e.preventDefault();
    handleViewProduct(product);
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

const handleSPARouting = () => {
  elements.products.forEach((productElement) => {
    const product = getProductForProductElement(productElement);

    addEventListenersForProduct(productElement, product);
  });

  if (window.location.pathname.startsWith("/product/")) {
    window.history.pushState({ page: "" }, "", "/");
  }

  window.addEventListener("popstate", () => {
    elements.productOverview.dataset.isVisible = "true";
    elements.productDetail.dataset.isVisible = "false";
  });
};

handleSPARouting();
