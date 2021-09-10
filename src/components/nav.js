import React from "react";

export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.amount
    };
  }

  render() {
    const categories = ["new", "best", "top"];

    const { handleCategory, activeCategory, posts } = this.props;

    return (
      <div className="nav">
        <h1 className="heading">Hacker News</h1>

        <ul className="categories">
          {categories.map((category, index) => {
            return (
              <li
                className={
                  category === activeCategory && posts
                    ? "active-category category"
                    : "category"
                }
                onClick={() => handleCategory(category)}
                key={index}
              >
                {category}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
