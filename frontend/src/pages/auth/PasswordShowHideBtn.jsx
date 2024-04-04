import React, { useEffect } from "react";

const PasswordShowHideBtn = ({ width, fill, id, onClickPassShowHide }) => {
  useEffect(() => {
    const eyeOpen = document.getElementById("eye-" + id);
    const handleMouseMove = (evt) => {
      const x = -(window.innerWidth / 2 - evt.pageX) / 20;
      const y = -(window.innerHeight / 2 - evt.pageY) / 20;
      eyeOpen.style.transform = `translateY(${y}px) translateX(${x}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [id]);

  function handlePasswordShowHideBtnClick(action) {
    if (action === "show") {
      document.getElementById("PasswordShowIcon-" + id).style.display = "block";
      document.getElementById("PasswordHideIcon-" + id).style.display = "none";
      //   document.getElementById(id).type = "text";
      onClickPassShowHide();
    } else {
      document.getElementById("PasswordShowIcon-" + id).style.display = "none";
      document.getElementById("PasswordHideIcon-" + id).style.display = "block";
      //   document.getElementById(id).type = "password";
      onClickPassShowHide();
    }
  }

  return (
    <>
      <svg
        id={"PasswordShowIcon-" + id}
        onClick={() => handlePasswordShowHideBtnClick("hide")}
        className="password-show-hide-btn"
        style={{
          display: "none",
          width: width,
          height: "auto",
          transformStyle: "preserve-3d",
        }}
        viewBox="-4.86 308.794 209.395 182.982"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          style={{
            stroke: fill,
            strokeWidth: "12px",
            strokeLinecap: "round",
            fill: "rgba(255, 255, 255, 0)",
          }}
          d="M 0 400 C 54.851 334.363 142.071 332.628 200 400"
        />
        <path
          style={{
            stroke: fill,
            strokeWidth: "12px",
            strokeLinecap: "round",
            fill: "rgba(255, 255, 255, 0)",
          }}
          d="M 0 449.881 C 54.851 384.244 142.071 382.509 200 449.881"
          transform="matrix(-1, 0, 0, -1, 200.000003, 849.881482)"
        />
        <line
          style={{
            stroke: fill,
            strokeWidth: "12px",
            strokeLinecap: "round",
            fill: "rgba(255, 255, 255, 0)",
          }}
          x1="100"
          y1="314.536"
          x2="100"
          y2="341.15"
        />
        <line
          style={{
            stroke: fill,
            strokeWidth: "12px",
            strokeLinecap: "round",
            fill: "rgba(255, 255, 255, 0)",
          }}
          x1="147.153"
          y1="323.646"
          x2="147.153"
          y2="350.26"
          transform="matrix(0.939693, 0.34202, -0.34202, 0.939693, 124.11902, -30.00853)"
        />
        <line
          style={{
            stroke: fill,
            strokeWidth: "12px",
            strokeLinecap: "round",
            fill: "rgba(255, 255, 255, 0)",
          }}
          x1="187.348"
          y1="345.15"
          x2="187.348"
          y2="371.764"
          transform="matrix(0.766044, 0.642788, -0.642788, 0.766044, 274.243077, -36.561917)"
        />
        <line
          style={{
            stroke: fill,
            strokeWidth: "12px",
            strokeLinecap: "round",
            fill: "rgba(255, 255, 255, 0)",
          }}
          x1="52.494"
          y1="350.005"
          x2="52.494"
          y2="323.391"
          transform="matrix(-0.939693, 0.34202, -0.34202, -0.939693, 216.979648, 635.136667)"
        />
        <line
          style={{
            stroke: fill,
            strokeWidth: "12px",
            strokeLinecap: "round",
            fill: "rgba(255, 255, 255, 0)",
          }}
          x1="12.299"
          y1="371.508"
          x2="12.299"
          y2="344.894"
          transform="matrix(-0.766044, 0.642788, -0.642788, -0.766044, 251.96793, 624.693125)"
        />
        <ellipse
          id={"eye-" + id}
          style={{ stroke: fill, fill: fill }}
          cx="100"
          cy="400"
          rx="30"
          ry="30"
        />
      </svg>
      <svg
        id={"PasswordHideIcon-" + id}
        onClick={() => handlePasswordShowHideBtnClick("show")}
        className="password-show-hide-btn"
        style={{
          display: "block",
          width: width,
          height: "auto",
          transformStyle: "preserve-3d",
        }}
        viewBox="295.283 308.794 209.395 182.982"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          style={{
            stroke: fill,
            strokeWidth: "12px",
            strokeLinecap: "round",
            fill: "rgba(255, 255, 255, 0)",
          }}
          d="M 300 400 C 354.851 465.637 442.071 467.372 500 400"
        />
        <line
          style={{
            fill: "rgb(216, 216, 216)",
            stroke: fill,
            strokeWidth: "12px",
            strokeLinecap: "round",
          }}
          x1="400"
          y1="485.464"
          x2="400"
          y2="458.85"
        />
        <line
          style={{
            fill: "rgb(216, 216, 216)",
            stroke: fill,
            strokeWidth: "12px",
            strokeLinecap: "round",
          }}
          x1="447.153"
          y1="476.355"
          x2="447.153"
          y2="449.741"
          transform="matrix(0.939693, -0.34202, 0.34202, 0.939693, -131.405031, 180.860385)"
        />
        <line
          style={{
            fill: "rgb(216, 216, 216)",
            stroke: fill,
            strokeWidth: "12px",
            strokeLinecap: "round",
          }}
          x1="487.348"
          y1="454.85"
          x2="487.348"
          y2="428.236"
          transform="matrix(0.766044, -0.642788, 0.642788, 0.766044, -169.800616, 416.563117)"
        />
        <line
          style={{
            fill: "rgb(216, 216, 216)",
            stroke: fill,
            strokeWidth: "12px",
            strokeLinecap: "round",
          }}
          x1="352.494"
          y1="449.995"
          x2="352.494"
          y2="476.609"
          transform="matrix(-0.939693, -0.34202, 0.34202, -0.939693, 525.271553, 1019.223526)"
        />
        <line
          style={{
            fill: "rgb(216, 216, 216)",
            stroke: fill,
            strokeWidth: "12px",
            strokeLinecap: "round",
          }}
          x1="312.299"
          y1="428.493"
          x2="312.299"
          y2="455.107"
          transform="matrix(-0.766044, -0.642788, 0.642788, -0.766044, 267.550053, 980.980361)"
        />
      </svg>
    </>
  );
};

export default PasswordShowHideBtn;
