import React from "react";

function ProductSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
  imagePosition = "left", // "left" | "right" on desktop
}) {
  const isImageRight = imagePosition === "right";

  return (
    <div className="container py-4 py-lg-5">
      <div className="row align-items-center justify-content-between g-4 g-lg-5">
        {/* Product Image Column */}
        <div
          className={`col-12 col-lg-6 text-center ${
            isImageRight ? "order-1 order-lg-2" : "order-1 order-lg-1"
          }`}
        >
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
            style={{
              maxHeight: "340px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Product Details / Content Column */}
        <div
          className={`col-12 col-lg-6 px-3 px-md-4 px-lg-5 ${
            isImageRight ? "order-2 order-lg-1" : "order-2 order-lg-2"
          }`}
        >
          <h2 className="fs-2 fw-semibold mb-3 text-dark">{productName}</h2>
          <p
            className="text-muted mb-4"
            style={{ lineHeight: "1.75", fontSize: "16px" }}
          >
            {productDesription}
          </p>

          {/* Action Links */}
          {(tryDemo || learnMore) && (
            <div className="d-flex flex-wrap align-items-center gap-4 mb-4">
              {tryDemo && (
                <a
                  href={tryDemo}
                  style={{ textDecoration: "none" }}
                  className="d-inline-flex align-items-center gap-2 fw-medium text-primary"
                >
                  Try Demo{" "}
                  <i
                    className="fa fa-long-arrow-right"
                    aria-hidden="true"
                  ></i>
                </a>
              )}
              {learnMore && (
                <a
                  href={learnMore}
                  style={{ textDecoration: "none" }}
                  className="d-inline-flex align-items-center gap-2 fw-medium text-primary"
                >
                  Learn More{" "}
                  <i
                    className="fa fa-long-arrow-right"
                    aria-hidden="true"
                  ></i>
                </a>
              )}
            </div>
          )}

          {/* App Store Badges */}
          {(googlePlay || appStore) && (
            <div className="d-flex flex-wrap align-items-center gap-3 mt-2">
              {googlePlay && (
                <a href={googlePlay} target="_blank" rel="noreferrer">
                  <img
                    src="media/images/googlePlayBadge.svg"
                    alt="Get it on Google Play"
                    style={{ height: "40px", width: "auto" }}
                  />
                </a>
              )}
              {appStore && (
                <a href={appStore} target="_blank" rel="noreferrer">
                  <img
                    src="media/images/appstoreBadge.svg"
                    alt="Download on App Store"
                    style={{ height: "40px", width: "auto" }}
                  />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductSection;
