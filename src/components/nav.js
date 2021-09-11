import React from "react";

export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAmount: this.props.selectedAmount
    };
  }

  render() {
    const categories = ["new", "best", "top"];
    const { handleCategory, activeCategory, handleAmount, posts } = this.props;

    return (
      <div className="nav">
        <h1 className="heading">Hacker News</h1>

        <div className="nav-container">
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
          <form className={posts ? "" : "deactivated"}>
          <label htmlFor="">posts: </label>
            <select
              value={this.props.selectedAmount}
              onChange={e => handleAmount(e)}
            >
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="250">250</option>
              <option value="500">500</option>
            </select>
          </form>
        </div>
      </div>
    );
  }
}
