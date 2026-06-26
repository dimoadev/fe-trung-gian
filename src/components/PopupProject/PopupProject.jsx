import React from "react";
import "./index.css";

function PopupProject(props) {
  return (
    <>
      <div className={`${props.open && "open"} project_popup`}>
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            zIndex: 40,
          }}
          onClick={() => props.ClickClosePopup(false)}
        ></div>
        <div className="project_popup-inner">
          <div className="project_popup-content grid">
            <span
              className="project_popup-close"
              onClick={() => props.ClickClosePopup(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
            </span>
            <div className="pp_thumbnail">
              <img
                src={props.image}
                alt="project_img_popup"
                className="project_popup-img"
              />
            </div>
            <div className="project_popup-info">
              <div className="project_popup-subtitle">
                Thông Tin - <span>Chi Tiết</span>
              </div>
              <div className="project_popup-body">
                <h3 className="details_title">{props.name}</h3>
                <p className="details_description">{props.description}</p>
                <ul className="details_info">
                  <li>
                    NSX - <span>{props.date}</span>
                  </li>
                  {props.tech && (
                    <li>
                      Công nghệ - <span>{props.tech}</span>
                    </li>
                  )}
                  <li>
                    Trang thái - <span>{props.status}</span>
                  </li>
                  <li>
                    {/* {props.filter_name === "itcode"
                      ? "Danh Sách Phát "
                      : "Xem Demo "}
                    -{" "} */}
                    <span>
                      <a target="_blank" href={props.link}>
                      {props.link}
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopupProject;
